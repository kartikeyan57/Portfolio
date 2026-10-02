/*
 * ESP32 Flight Simulator Controller — WebSocket version (OPTIONAL)
 * Use this ONLY if you want wireless control instead of USB Web Serial.
 * Same wiring as esp32_flight_controller.ino:
 *  MPU-6050 SDA -> GPIO 21, SCL -> GPIO 22, VCC -> 3V3, GND -> GND
 *  Pushbutton: GND rail <-> GPIO 4 (INPUT_PULLUP, pressed = LOW)
 *
 * Libraries: Adafruit MPU6050, Adafruit Sensor, ArduinoWebsockets (by Gil Maimon)
 *
 * Setup:
 *  1. Set WIFI_SSID / WIFI_PASS below.
 *  2. Flash, open Serial Monitor @115200 to get the ESP32 IP.
 *  3. In flight-sim.html, choose "WebSocket" and enter ws://<ESP32-IP>:81
 */

#include <WiFi.h>
#include <Wire.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include <ArduinoWebsockets.h>

using namespace websockets;

const char* WIFI_SSID = "YOUR_WIFI_SSID";
const char* WIFI_PASS = "YOUR_WIFI_PASSWORD";

static const int PIN_SDA    = 21;
static const int PIN_SCL    = 22;
static const int PIN_BUTTON = 4;

Adafruit_MPU6050 mpu;
WebsocketsServer wsServer;
WebsocketsClient wsClients[4];  // up to 4 browsers

float pitch = 0, roll = 0, yaw = 0;
unsigned long prevMicros = 0;
const float ALPHA = 0.96f;
float gyroOffX = 0, gyroOffY = 0, gyroOffZ = 0;

int lastBtnRaw = HIGH, btnStable = HIGH;
unsigned long lastDebounce = 0;

void calibrateGyro(int samples = 500) {
  float fx = 0, fy = 0, fz = 0;
  for (int i = 0; i < samples; i++) {
    sensors_event_t a, g, t;
    mpu.getEvent(&a, &g, &t);
    fx += g.gyro.x; fy += g.gyro.y; fz += g.gyro.z;
    delay(2);
  }
  gyroOffX = fx / samples;
  gyroOffY = fy / samples;
  gyroOffZ = fz / samples;
}

void setup() {
  Serial.begin(115200);
  pinMode(PIN_BUTTON, INPUT_PULLUP);
  Wire.begin(PIN_SDA, PIN_SCL);
  Wire.setClock(400000);

  if (!mpu.begin()) {
    Serial.println("MPU6050 not found!");
    while (1) delay(1000);
  }
  mpu.setAccelerometerRange(MPU6050_RANGE_8_G);
  mpu.setGyroRange(MPU6050_RANGE_500_DEG);
  mpu.setFilterBandwidth(MPU6050_BAND_21_HZ);
  delay(500);
  calibrateGyro();

  sensors_event_t a, g, t;
  mpu.getEvent(&a, &g, &t);
  roll  = atan2(a.acceleration.y, a.acceleration.z) * 180.0 / PI;
  pitch = atan2(-a.acceleration.x,
            sqrt(a.acceleration.y * a.acceleration.y +
                 a.acceleration.z * a.acceleration.z)) * 180.0 / PI;
  prevMicros = micros();

  WiFi.begin(WIFI_SSID, WIFI_PASS);
  Serial.print("Connecting WiFi");
  while (WiFi.status() != WL_CONNECTED) { delay(500); Serial.print("."); }
  Serial.println();
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.println("In the game, connect to: ws://" + WiFi.localIP().toString() + ":81");

  wsServer.listen(81);
}

void loop() {
  // Accept new browser connections (non-blocking)
  if (wsServer.poll()) {
    WebsocketsClient c = wsServer.accept();
    if (c.available()) {
      for (byte i = 0; i < 4; i++) {
        if (!wsClients[i].available()) { wsClients[i] = c; break; }
      }
    }
  }
  // Keep existing clients alive
  for (byte i = 0; i < 4; i++) {
    if (wsClients[i].available()) wsClients[i].poll();
  }

  static unsigned long lastSend = 0;
  unsigned long nowMs = millis();

  sensors_event_t a, g, t;
  mpu.getEvent(&a, &g, &t);

  unsigned long nowUs = micros();
  float dt = (nowUs - prevMicros) / 1000000.0f;
  prevMicros = nowUs;
  if (dt <= 0 || dt > 0.1f) dt = 0.02f;

  float gx = g.gyro.x * 180.0 / PI - gyroOffX * 180.0 / PI;
  float gy = g.gyro.y * 180.0 / PI - gyroOffY * 180.0 / PI;
  float gz = g.gyro.z * 180.0 / PI - gyroOffZ * 180.0 / PI;

  float accRoll  = atan2(a.acceleration.y, a.acceleration.z) * 180.0 / PI;
  float accPitch = atan2(-a.acceleration.x,
                     sqrt(a.acceleration.y * a.acceleration.y +
                          a.acceleration.z * a.acceleration.z)) * 180.0 / PI;

  pitch = ALPHA * (pitch + gy * dt) + (1 - ALPHA) * accPitch;
  roll  = ALPHA * (roll  + gx * dt) + (1 - ALPHA) * accRoll;
  yaw  += gz * dt;
  if (yaw > 180) yaw -= 360;
  if (yaw < -180) yaw += 360;

  int raw = digitalRead(PIN_BUTTON);
  int click = 0;
  if (raw != lastBtnRaw) lastDebounce = nowMs;
  lastBtnRaw = raw;
  if ((nowMs - lastDebounce) > 25) {
    if (raw != btnStable) {
      btnStable = raw;
      if (btnStable == LOW) click = 1;
    }
  }
  int btn = (btnStable == LOW) ? 1 : 0;

  if (nowMs - lastSend >= 50) {  // 20 Hz over WiFi
    lastSend = nowMs;
    char buf[160];
    snprintf(buf, sizeof(buf),
      "{\"pitch\":%.2f,\"roll\":%.2f,\"yaw\":%.2f,"
      "\"gx\":%.2f,\"gy\":%.2f,\"gz\":%.2f,"
      "\"btn\":%d,\"click\":%d}",
      pitch, roll, yaw, gx, gy, gz, btn, click);
    for (byte i = 0; i < 4; i++) {
      if (wsClients[i].available()) wsClients[i].send(buf);
    }
    Serial.println(buf);  // also visible on USB for debugging
  }
  delay(2);
}
