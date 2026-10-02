// ─────────────────────────────────────────────────────────────────────────
// PROFILE DATA
// Everything on the site is driven from here. Update your info in this
// file only — you should never need to touch a component to change copy.
// ─────────────────────────────────────────────────────────────────────────

export const profile = {
  name: 'Kartikeyan Sharma',
  firstName: 'Kartikeyan',
  role: 'Electronics & Computer Engineering Student',
  tagline: 'I learn by building.',
  bio: 'I build things that combine electronics, software, sensors and mechanical systems — from robots and drones to connected hardware prototypes.',
  location: 'Bennett University',
  currentlyLine: 'Electronics & Computer Engineering @ Bennett University',
  internshipLine: 'Intern @ TSUYO Manufacturing',
  resumeUrl: '/resume.pdf',
  email: 'kartikeyansharma456@gmail.com',
  linkedin: 'https://www.linkedin.com/in/kartikeyan-sharma-83b7253a0?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  github: 'YOUR_GITHUB_URL',
}

export type DashboardItem = {
  id: string
  label: string
  value: string
  subvalue?: string
  tag?: string
  accent?: 'signal' | 'volt' | 'circuit' | 'beacon'
}

export const dashboard: DashboardItem[] = [
  {
    id: 'currently',
    label: 'CURRENTLY',
    value: 'Engineering Student',
    subvalue: 'B.Tech in Electronics & Computer Engineering at Bennett University',
    tag: '2025–2029',
    accent: 'volt',
  },
  {
    id: 'focus',
    label: 'FOCUS',
    value: 'Robotics + Electronics',
    subvalue: 'Autonomous robotics, kinematics, sensor integration & embedded control',
    tag: 'CORE DISCIPLINE',
    accent: 'signal',
  },
  {
    id: 'experience',
    label: 'EXPERIENCE',
    value: 'IIT Jammu + TSUYO',
    subvalue: 'Motor winding, manufacturing quality & automotive electric powertrain research',
    tag: 'INDUSTRY & LAB',
    accent: 'circuit',
  },
  {
    id: 'building',
    label: 'BUILDING',
    value: 'Hardware Prototypes',
    subvalue: 'SHAMPY quadruped robot, F450 UAV drone, PMSM motor controller & IoT hubs',
    tag: 'ACTIVE BUILDS',
    accent: 'beacon',
  },
  {
    id: 'learning',
    label: 'LEARNING',
    value: 'PCB Design & Automation',
    subvalue: 'Multi-layer power electronics, Field-Oriented Control (FOC) & CAN bus protocols',
    tag: 'ADVANCED STUDY',
    accent: 'volt',
  },
]

export const interests = [
  'Robotics',
  'Electronics',
  'IoT',
  'Drones',
  'Motors & Controllers',
  'PCB Design',
  'Automation',
  'Hardware Integration',
]

export type ExperienceEntry = {
  id: string
  org: string
  role: string
  period?: string
  topics: string[]
  accent: 'orange' | 'blue'
}

export const experience: ExperienceEntry[] = [
  {
    id: 'tsuyo',
    org: 'TSUYO Manufacturing',
    role: 'Engineering Intern',
    topics: [
      'Motor manufacturing',
      'Motor winding',
      'Motor controllers',
      'Varnishing',
      'PMSM motors',
      'Electronics',
      'PCB design / R&D',
      'Manufacturing',
      'Testing',
    ],
    accent: 'orange',
  },
  {
    id: 'iit-jammu',
    org: 'IIT Jammu',
    role: 'Summer Intern',
    period: '2-month internship',
    topics: [
      'IoT',
      'ESP32',
      'Sensors',
      'Hardware integration',
      'Drone mathematics',
      'Drone assembly',
      'Web application protocols',
    ],
    accent: 'blue',
  },
]

export type ProjectStatus = 'IN DEVELOPMENT' | 'PROTOTYPE' | 'COMPLETED' | 'RESEARCH / EXPERIMENTATION'
export type ProjectCategory = 'ROBOTICS' | 'IOT' | 'ELECTRONICS' | 'DRONES' | 'RESEARCH'

export type Project = {
  id: string
  name: string
  tagline: string
  description?: string
  categories: ProjectCategory[]
  components: string[]
  features: string[]
  status: ProjectStatus
  note?: string
  specs?: { label: string; value: string }[]
}

export const projects: Project[] = [
  {
    id: 'shampy',
    name: 'SHAMPY',
    tagline: 'A multifunctional robotic companion prototype using ESP32, servos, ultrasonic sensing, OLED and IMU.',
    description:
      'SHAMPY is a four-legged autonomous robotic quadruped designed as an interactive companion and hardware experimentation testbed. Controlled by an ESP32 dual-core processor, SHAMPY integrates micro servos for inverse kinematic walking gaits, an MPU9250 9-DOF IMU for active balance stabilization, and ultrasonic distance sensing for autonomous obstacle avoidance.',
    categories: ['ROBOTICS'],
    components: ['ESP32', 'SG90 Servos', 'MPU9250 IMU', 'Ultrasonic HC-SR04', 'SSD1306 OLED', 'PCA9685 PWM Driver', 'LiPo Battery Rail'],
    features: [
      'Four-legged movement with inverse kinematics',
      'Head and neck articulation for expressive interactions',
      'Ultrasonic obstacle avoidance and proximity detection',
      '9-Axis IMU active balance and orientation stabilization',
      'OLED real-time battery and system status readout',
      'Autonomous go-to-base docking concept',
      'Local Wi-Fi web dashboard interface',
    ],
    status: 'IN DEVELOPMENT',
    specs: [
      { label: 'PROCESSOR', value: 'ESP32 Dual-Core 240MHz' },
      { label: 'ACTUATION', value: '8x SG90 Micro Servos' },
      { label: 'SENSING', value: 'MPU9250 9-DOF + Ultrasonic' },
      { label: 'POWER', value: '7.4V 2S LiPo with Buck Regulation' },
    ],
  },
  {
    id: 'quadcopter',
    name: 'Quadcopter',
    tagline: 'Custom UAV / drone prototype built around an F450 frame with a full flight electronics stack.',
    description:
      'Custom-built quadrotor UAV designed on an F450 rigid frame platform. Engineered with high-thrust brushless DC motors, 30A electronic speed controllers (ESCs), an open-source flight controller, high-precision GPS positioning, and an ExpressLRS (ELRS) 2.4GHz low-latency telemetry link for autonomous navigation and manual piloting.',
    categories: ['DRONES', 'ROBOTICS'],
    components: ['F450 Frame', 'Flight Controller', 'BLDC Motors 920KV', '30A ESCs', 'M8N GPS Module', 'ELRS 2.4GHz Receiver', '3S 2200mAh LiPo', '1045 Propellers'],
    features: [
      'Precision frame and propulsion assembly',
      'Multi-protocol flight controller wiring and configuration',
      'High-accuracy GPS autonomous waypoint navigation',
      'ExpressLRS ultra-low latency radio link',
      'Vibration damping and power distribution design',
    ],
    status: 'IN DEVELOPMENT',
    note: 'Concepts shown reflect the current build plan, not implemented capability.',
    specs: [
      { label: 'FRAME', value: 'F450 Glass Fiber Wheelbase' },
      { label: 'PROPULSION', value: '4x 2212 920KV BLDC Motors' },
      { label: 'ESC', value: '4x 30A SimonK Firmware' },
      { label: 'TELEMETRY', value: 'ExpressLRS 2.4GHz' },
    ],
  },
  {
    id: 'smart-farm',
    name: 'Smart Farm',
    tagline: 'Voice-controlled smart agriculture prototype for monitoring and automating small growing environments.',
    description:
      'An automated greenhouse microclimate monitoring and control system built on Arduino Mega. Integrates multi-channel capacitive soil moisture sensors, ambient temperature and humidity probes, automated ventilation via DC blower fans, and offline voice command recognition for hands-free irrigation and environmental regulation.',
    categories: ['IOT', 'ELECTRONICS'],
    components: ['Arduino Mega', 'Soil Moisture Sensor', 'DHT22 Sensor', 'Ultrasonic Sensor', 'DC Fans', 'Relay Module', 'Servo Valves', 'Voice Recognition Module'],
    features: [
      'Multi-zone capacitive soil moisture monitoring',
      'Ambient temperature and relative humidity sensing',
      'Automated blower fan ventilation control',
      'Offline voice-triggered actions and commands',
      'Automated water reservoir monitoring and alerts',
    ],
    status: 'PROTOTYPE',
    specs: [
      { label: 'CONTROLLER', value: 'Arduino Mega 2560' },
      { label: 'TELEMETRY', value: 'Soil Moisture + DHT22 Temp/RH' },
      { label: 'ACTUATION', value: 'High-Current Relays + Servo Valves' },
      { label: 'INTERFACE', value: 'Voice Module + Status LEDs' },
    ],
  },
  {
    id: 'smart-home',
    name: 'Smart Home',
    tagline: 'Arduino-based home automation system for everyday sensing and control.',
    description:
      'Comprehensive embedded home automation unit featuring sensor-driven ambient lighting, automated servo door lock mechanisms, passive infrared (PIR) occupancy detection, and real-time environment telemetry displayed on an I2C 16x2 LCD panel.',
    categories: ['IOT', 'ELECTRONICS'],
    components: ['Arduino Uno', 'DHT11', 'Ultrasonic Sensor', 'PIR Motion Sensor', 'SG90 Servo', '1602 I2C LCD', 'LED Indicators', 'Buzzer Alarm'],
    features: [
      'Real-time PIR passive infrared motion detection',
      'Environmental temperature and humidity monitoring',
      'Automated servo locking and gate control',
      '16x2 character I2C LCD status screen',
      'Multi-stage threshold security alarms',
    ],
    status: 'COMPLETED',
    specs: [
      { label: 'CONTROLLER', value: 'Arduino Uno ATmega328P' },
      { label: 'SENSORS', value: 'PIR Motion + Ultrasonic + DHT11' },
      { label: 'OUTPUT', value: '16x2 I2C LCD + Audio Buzzer' },
      { label: 'LOCK', value: 'Micro Servo Lock Mechanism' },
    ],
  },
  {
    id: 'esp32-mqtt',
    name: 'ESP32 Security / MQTT',
    tagline: 'Secure IoT communication experiments exploring encrypted messaging between embedded devices.',
    description:
      'Research and benchmarking project investigating end-to-end cryptographic overhead on resource-constrained microcontrollers. Implements TLS 1.3 encrypted MQTT publish-subscribe messaging pipelines, RSA vs ECDSA asymmetric key exchange performance profiling, and ultra-low-power deep sleep duty cycling on ESP32 silicon.',
    categories: ['IOT', 'RESEARCH'],
    components: ['ESP32', 'MQTT Broker (Mosquitto)', 'TLS 1.3', 'mbedTLS Library', 'RSA-2048', 'ECDSA secp256r1', 'Deep Sleep RTC'],
    features: [
      'ESP32 → MQTT → TLS 1.3 secure communication pipeline',
      'Comparative RSA vs ECDSA cryptographic benchmarking',
      'Deep sleep power profiling and duty cycle optimization',
      'Security vs power consumption trade-off analysis',
      'Encrypted non-volatile credential flash storage',
    ],
    status: 'RESEARCH / EXPERIMENTATION',
    specs: [
      { label: 'PROTOCOL', value: 'MQTT over TLS (Port 8883)' },
      { label: 'CRYPTO', value: 'Hardware AES-256 + SHA + ECDSA' },
      { label: 'POWER', value: '10µA Deep Sleep Duty-Cycled' },
      { label: 'PLATFORM', value: 'ESP-IDF / FreeRTOS' },
    ],
  },
  {
    id: 'pmsm-controller',
    name: 'PMSM Motor Controller',
    tagline: 'Custom 3-phase field-oriented motor controller board for high-efficiency brushless synchronous motors.',
    description:
      'Custom high-efficiency motor controller hardware and firmware built for Permanent Magnet Synchronous Motors (PMSM) and high-pole BLDC motors. Designed around a 3-phase MOSFET power inverter, low-side shunt current amplifiers, hall effect rotor angle sensing, and Field-Oriented Control (FOC) space vector modulation for smooth torque regulation across dynamic load conditions.',
    categories: ['ELECTRONICS', 'ROBOTICS'],
    components: ['STM32 Microcontroller', '3-Phase MOSFET Inverter', 'Gate Driver IC', 'Shunt Current Amplifiers', 'Hall Effect Sensors', 'CAN Bus Transceiver', 'Custom 4-Layer PCB'],
    features: [
      'Field-Oriented Control (FOC) torque and velocity algorithms',
      'High-efficiency 3-phase MOSFET inverter power stage',
      'Real-time shunt resistor current sensing and phase monitoring',
      'Space Vector Pulse Width Modulation (SVPWM)',
      'Over-current, over-voltage, and thermal shutdown safety suite',
      'CAN bus and high-frequency PWM telemetry input interfaces',
    ],
    status: 'PROTOTYPE',
    specs: [
      { label: 'ARCHITECTURE', value: '3-Phase Full-Bridge Inverter' },
      { label: 'VOLTAGE / CURRENT', value: '12V–48V DC, 25A Cont. / 45A Peak' },
      { label: 'MODULATION', value: '20kHz Space Vector PWM (SVPWM)' },
      { label: 'COMMUNICATION', value: 'CAN Bus 2.0B + UART + PWM' },
    ],
  },
]

export const categoryFilters: ('ALL' | ProjectCategory)[] = ['ALL', 'ROBOTICS', 'IOT', 'ELECTRONICS', 'DRONES', 'RESEARCH']

export type LabComponent = {
  id: string
  label: string
  detail: string[]
  connectsTo: string[]
  position: { x: number; y: number }
}

export const labComponents: LabComponent[] = [
  { id: 'pcb', label: 'PCB', detail: ['CUSTOM BOARD', 'POWER + SIGNAL'], connectsTo: ['esp32', 'battery'], position: { x: 12, y: 55 } },
  { id: 'esp32', label: 'ESP32', detail: ['DUAL-CORE MCU', 'WI-FI + BLE'], connectsTo: ['pcb', 'imu', 'oled', 'sensor', 'servo'], position: { x: 34, y: 30 } },
  { id: 'imu', label: 'IMU', detail: ['MPU9250', '6/9 AXIS IMU', 'I2C'], connectsTo: ['esp32'], position: { x: 58, y: 15 } },
  { id: 'oled', label: 'OLED', detail: ['SSD1306', 'I2C DISPLAY'], connectsTo: ['esp32'], position: { x: 78, y: 32 } },
  { id: 'servo', label: 'SERVO', detail: ['SG90', 'PWM CONTROL'], connectsTo: ['esp32', 'motor'], position: { x: 82, y: 62 } },
  { id: 'sensor', label: 'SENSOR', detail: ['ULTRASONIC', 'DISTANCE SENSING'], connectsTo: ['esp32'], position: { x: 60, y: 78 } },
  { id: 'motor', label: 'MOTOR', detail: ['PMSM', 'CONTROLLER DRIVEN'], connectsTo: ['servo', 'battery'], position: { x: 38, y: 82 } },
  { id: 'battery', label: 'BATTERY', detail: ['LiPo CELL', 'REGULATED RAIL'], connectsTo: ['pcb', 'motor'], position: { x: 14, y: 85 } },
]

export type SkillCategory = {
  title: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Electronics',
    skills: ['ESP32', 'Arduino', 'Sensors', 'IMU', 'Motors', 'Motor Controllers', 'IoT', 'PCB Design'],
  },
  {
    title: 'Software',
    skills: ['C++', 'Python', 'Arduino IDE', 'VS Code', 'Git / GitHub', 'KiCad'],
  },
  {
    title: 'Engineering',
    skills: ['CAD / 3D Modelling', 'Hardware Integration', 'Prototyping', 'Troubleshooting', 'Automation'],
  },
]

export const education = {
  institution: 'Bennett University',
  degree: 'B.Tech — Electronics & Computer Engineering',
}

export const navLinks = [
  { label: 'ABOUT', href: '#about' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'CONTACT', href: '#contact' },
]
