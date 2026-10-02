export type SkillPlaycard = {
  id: string
  name: string
  category: 'Electronics' | 'Software' | 'Engineering'
  suit: string
  level: 'Core Mastery' | 'Advanced' | 'Proficient' | 'Primary Tool'
  role: string
  summary: string
  specs: { label: string; value: string }[]
  applications: string[]
  accentColor: string
}

export const skillPlaycards: Record<string, SkillPlaycard> = {
  // ─── ELECTRONICS CATEGORY ───
  Electronics: {
    id: 'electronics-hub',
    name: 'Electronics',
    category: 'Electronics',
    suit: '⚡',
    level: 'Core Mastery',
    role: 'Circuits, Silicon, Power Systems & Signal Chains',
    summary:
      'The physical foundation of hardware engineering. Encompasses component selection, low-noise circuit schematics, multi-rail power distribution, microcontrollers, and sensor interfacing.',
    specs: [
      { label: 'Domain', value: 'Embedded & Hardware' },
      { label: 'Core Voltages', value: '3.3V, 5V, 12V LiPo' },
      { label: 'Protocols', value: 'I2C, SPI, UART, PWM' },
      { label: 'Focus', value: 'Real-World Physical Systems' },
    ],
    applications: ['Autonomous Robotics', 'FPV Racing Drones', 'IoT Sensor Hubs'],
    accentColor: '#2563EB',
  },
  ESP32: {
    id: 'esp32',
    name: 'ESP32',
    category: 'Electronics',
    suit: '⚡',
    level: 'Core Mastery',
    role: 'Dual-Core 240MHz SoC with Wi-Fi & BLE',
    summary:
      'My primary microcontroller for high-throughput embedded projects, wireless telemetry, and real-time sensor processing. Leverages dual Xtensa cores to split communication protocols from time-critical control loops.',
    specs: [
      { label: 'Clock Speed', value: '240 MHz Dual-Core' },
      { label: 'Wireless', value: 'Wi-Fi 802.11b/g/n + BLE' },
      { label: 'RTOS', value: 'FreeRTOS Enabled' },
      { label: 'I/O Peripherals', value: 'SPI, I2C, ADC, PWM' },
    ],
    applications: ['Quadcopter Telemetry', 'IoT Sensor Gateways', 'Motor Controller Bridges'],
    accentColor: '#2563EB',
  },
  Arduino: {
    id: 'arduino',
    name: 'Arduino',
    category: 'Electronics',
    suit: '⚡',
    level: 'Core Mastery',
    role: 'Rapid Hardware Prototyping & Microcontrollers',
    summary:
      'The rapid prototyping backbone for quick breadboard experiments, sensor verification, and initial mechanical actuation testing before spinning custom PCBs.',
    specs: [
      { label: 'Ecosystem', value: 'AVR / ARM / SAMD' },
      { label: 'Logic Levels', value: '3.3V / 5V TTL' },
      { label: 'Toolchain', value: 'Bare-metal C / C++' },
      { label: 'Strength', value: 'Zero-Friction MVP Testing' },
    ],
    applications: ['Sensor Calibration Rigs', 'Actuator Test Benches', 'Rapid Breadboard MVPs'],
    accentColor: '#2563EB',
  },
  Sensors: {
    id: 'sensors',
    name: 'Sensors',
    category: 'Electronics',
    suit: '⚡',
    level: 'Advanced',
    role: 'Environmental, Inertial & Distance Transducers',
    summary:
      'Deep experience integrating ultrasonic, optical, capacitive, and analog transducers into microcontrollers. Designing low-noise signal filtering and analog-to-digital sampling routines.',
    specs: [
      { label: 'Bus Types', value: 'I2C, SPI, Analog ADC' },
      { label: 'Transducers', value: 'ToF, Ultrasonic, Pressure' },
      { label: 'Filtering', value: 'Moving Average & Low-Pass' },
      { label: 'Sampling', value: 'Interrupt-Driven ISRs' },
    ],
    applications: ['Obstacle Avoidance', 'Environmental Telemetry', 'Precision Altitude Hold'],
    accentColor: '#2563EB',
  },
  IMU: {
    id: 'imu',
    name: 'IMU',
    category: 'Electronics',
    suit: '⚡',
    level: 'Advanced',
    role: '6-DoF / 9-DoF Inertial Measurement Units',
    summary:
      'Extensive work with MPU6050 and MPU9250 MEMS gyroscopes and accelerometers. Implemented sensor fusion, DMP parsing, and complementary/Kalman filtering for orientation tracking.',
    specs: [
      { label: 'Sensors', value: '3-Axis Gyro + 3-Axis Accel' },
      { label: 'Fusion', value: 'Mahony & Complementary' },
      { label: 'Update Rate', value: 'Up to 1 kHz Sampling' },
      { label: 'Interface', value: 'High-Speed I2C / SPI' },
    ],
    applications: ['Self-Balancing Robots', 'Quadcopter Attitude Fusion', 'Gimbal Stabilization'],
    accentColor: '#2563EB',
  },
  Motors: {
    id: 'motors',
    name: 'Motors',
    category: 'Electronics',
    suit: '⚡',
    level: 'Advanced',
    role: 'BLDC, Coreless, DC & Stepper Actuation',
    summary:
      'Hands-on expertise selecting and driving brushless outrunners, precision stepper motors, and micro coreless DC motors based on torque curves, RPM ratings, and thermal dissipation.',
    specs: [
      { label: 'Motor Types', value: 'High-KV BLDC, Steppers, Servos' },
      { label: 'Power Rails', value: '3.7V LiPo up to 24V Regulated' },
      { label: 'Profiling', value: 'Torque vs Current Curves' },
      { label: 'Mounting', value: 'Custom 3D Printed Brackets' },
    ],
    applications: ['FPV Drone Propulsion', 'Robotic Arm Joints', 'High-Speed Wheel Drives'],
    accentColor: '#2563EB',
  },
  'Motor Controllers': {
    id: 'motor-controllers',
    name: 'Motor Controllers',
    category: 'Electronics',
    suit: '⚡',
    level: 'Advanced',
    role: 'H-Bridges, ESCs & High-Current PWM Drivers',
    summary:
      'Controlling power MOSFET stages, electronic speed controllers (ESCs with DShot/PWM), and H-bridge chips. Managing inductive flyback protection and current sensing.',
    specs: [
      { label: 'Protocols', value: 'DShot300/600, 50Hz PWM' },
      { label: 'Power Stage', value: 'Discrete N-Channel MOSFETs' },
      { label: 'Protection', value: 'Flyback & TVS Diodes' },
      { label: 'Control Loop', value: 'Closed-Loop PID Tracking' },
    ],
    applications: ['Brushless ESC Tuning', 'High-Frequency PWM Motor Drives', 'Servo Actuation'],
    accentColor: '#2563EB',
  },
  IoT: {
    id: 'iot',
    name: 'IoT',
    category: 'Electronics',
    suit: '⚡',
    level: 'Advanced',
    role: 'Connected Hardware & Remote Telemetry',
    summary:
      'Architecting end-to-end connected physical systems: pushing telemetry over MQTT / WebSockets to cloud dashboards and receiving remote control commands with sub-second latency.',
    specs: [
      { label: 'Protocols', value: 'MQTT, WebSockets, HTTP REST' },
      { label: 'Serialization', value: 'Protobuf & Compact JSON' },
      { label: 'Edge Handling', value: 'Local Buffering & Fallback' },
      { label: 'Security', value: 'WPA2 & Device Auth Tokens' },
    ],
    applications: ['Remote Telemetry Dashboards', 'Distributed Sensors', 'Wireless Robotics Control'],
    accentColor: '#2563EB',
  },
  'PCB Design': {
    id: 'pcb-design',
    name: 'PCB Design',
    category: 'Electronics',
    suit: '⚡',
    level: 'Advanced',
    role: 'Schematic Capture & Board Layout',
    summary:
      'Designing custom multi-layer printed circuit boards: schematic engineering, component selection, trace impedance routing, power planes, and manufacturing Gerber generation.',
    specs: [
      { label: 'Layers', value: '2-Layer & 4-Layer Designs' },
      { label: 'Design Tools', value: 'KiCad EDA' },
      { label: 'Power Routing', value: 'Star Grounds & Copper Pours' },
      { label: 'Assembly', value: 'SMD & Through-Hole Soldering' },
    ],
    applications: ['Custom ESP32 Carrier Boards', 'Motor Driver Shields', 'Sensor Breakout Boards'],
    accentColor: '#2563EB',
  },

  // ─── SOFTWARE CATEGORY ───
  Software: {
    id: 'software-hub',
    name: 'Software',
    category: 'Software',
    suit: '💻',
    level: 'Core Mastery',
    role: 'Firmware, Systems Programming & Developer Toolchains',
    summary:
      'The intelligence that brings physical hardware to life. Writing low-latency C++ firmware, Python tooling for data visualization, and leveraging industry-standard EDA and version control.',
    specs: [
      { label: 'Languages', value: 'C++, C, Python' },
      { label: 'Environment', value: 'PlatformIO, VS Code, Linux' },
      { label: 'VCS', value: 'Git & GitHub Workflows' },
      { label: 'Architecture', value: 'Deterministic Event Loops' },
    ],
    applications: ['Flight Controllers', 'Automation Scripts', 'Hardware Telemetry Viewers'],
    accentColor: '#FF8A3D',
  },
  'C++': {
    id: 'cpp',
    name: 'C++',
    category: 'Software',
    suit: '💻',
    level: 'Core Mastery',
    role: 'Embedded Systems & Low-Latency Firmware',
    summary:
      'The core language for low-level embedded hardware, high-frequency control loops, memory-efficient data structures, and deterministic real-time hardware timers.',
    specs: [
      { label: 'Standards', value: 'C++14 / C++17 / C++20' },
      { label: 'Target', value: 'Bare-Metal & FreeRTOS' },
      { label: 'Memory', value: 'Zero-Allocation in ISR Loops' },
      { label: 'Strength', value: 'Direct Register Manipulation' },
    ],
    applications: ['Flight Control Algorithms', 'Real-Time Signal Filtering', 'Hardware Drivers'],
    accentColor: '#FF8A3D',
  },
  Python: {
    id: 'python',
    name: 'Python',
    category: 'Software',
    suit: '💻',
    level: 'Advanced',
    role: 'Automation, Data Analysis & Computer Vision',
    summary:
      'Scripting laboratory automation, parsing serial logs, prototyping sensor fusion mathematics, and running OpenCV image processing pipelines for robotics.',
    specs: [
      { label: 'Libraries', value: 'NumPy, OpenCV, PySerial' },
      { label: 'Usage', value: 'Rapid Tooling & Automation' },
      { label: 'Data', value: 'Serial Plotting & Log Analysis' },
      { label: 'Speed', value: 'Vectorized Array Operations' },
    ],
    applications: ['Serial Telemetry Plotting', 'Computer Vision Tracking', 'Automated Test Scripts'],
    accentColor: '#FF8A3D',
  },
  'Arduino IDE': {
    id: 'arduino-ide',
    name: 'Arduino IDE',
    category: 'Software',
    suit: '💻',
    level: 'Proficient',
    role: 'Board Support Package Management & Quick Flashing',
    summary:
      'Utilized for rapid library testing, verification of third-party sensor breakout boards, and initial firmware flashing across AVR and ESP32 targets.',
    specs: [
      { label: 'Toolchain', value: 'GCC AVR / Xtensa Toolchains' },
      { label: 'Utilities', value: 'Serial Monitor & Plotter' },
      { label: 'Purpose', value: 'Instant Sensor Smoke Testing' },
      { label: 'Support', value: 'Broad Board Ecosystem' },
    ],
    applications: ['Library Benchmarking', 'Quick Flashing', 'Hardware Smoke Tests'],
    accentColor: '#FF8A3D',
  },
  'VS Code': {
    id: 'vscode',
    name: 'VS Code',
    category: 'Software',
    suit: '💻',
    level: 'Core Mastery',
    role: 'Primary IDE with PlatformIO & Embedded Toolchains',
    summary:
      'Primary development environment using PlatformIO for multi-target firmware builds, C/C++ IntelliSense, Git staging, and integrated serial terminal debugging.',
    specs: [
      { label: 'Ecosystem', value: 'PlatformIO & C/C++ Extension' },
      { label: 'Build Systems', value: 'CMake, PlatformIO INI' },
      { label: 'Debugging', value: 'Serial Logger & SWD Probes' },
      { label: 'Focus', value: 'Multi-Target Firmware Development' },
    ],
    applications: ['Multi-Board Firmware Projects', 'Embedded Systems Coding', 'Source Control'],
    accentColor: '#FF8A3D',
  },
  'Git / GitHub': {
    id: 'git-github',
    name: 'Git / GitHub',
    category: 'Software',
    suit: '💻',
    level: 'Core Mastery',
    role: 'Version Control, CI/CD & Hardware Documentation',
    summary:
      'Managing branching strategies, tracking iterative hardware schematic revisions, firmware version tags, and collaborative engineering repositories.',
    specs: [
      { label: 'Workflow', value: 'Feature Branching & Semantic Tags' },
      { label: 'Tracking', value: 'Commit-Level Hardware Changes' },
      { label: 'Automation', value: 'GitHub Actions CI Pipelines' },
      { label: 'Collab', value: 'Pull Requests & Code Reviews' },
    ],
    applications: ['Firmware Release Management', 'Hardware Change Logs', 'Collaborative Builds'],
    accentColor: '#FF8A3D',
  },
  KiCad: {
    id: 'kicad',
    name: 'KiCad',
    category: 'Software',
    suit: '💻',
    level: 'Advanced',
    role: 'Open-Source Electronic Design Automation (EDA)',
    summary:
      'Primary tool for schematic capture, custom component footprints, 3D PCB visualization, differential impedance routing, and Gerber manufacturing files.',
    specs: [
      { label: 'Suites', value: 'Eeschema & Pcbnew' },
      { label: 'Outputs', value: 'Gerbers, Drill Files, Pick & Place' },
      { label: 'Rules', value: 'Custom 6mil DRC Constraints' },
      { label: '3D Preview', value: 'Raytraced STEP Models' },
    ],
    applications: ['Drone Power Distribution Boards', 'Custom MCU Carriers', 'Sensor Breakouts'],
    accentColor: '#FF8A3D',
  },

  // ─── ENGINEERING CATEGORY ───
  Engineering: {
    id: 'engineering-hub',
    name: 'Engineering',
    category: 'Engineering',
    suit: '⚙️',
    level: 'Core Mastery',
    role: 'CAD, Systems Integration, Prototyping & Field Debugging',
    summary:
      'The bridge between the drawing board and physical reality. Transforming schematics into rugged mechanical prototypes through parametric 3D printing, wiring harnesses, and systematic bench testing.',
    specs: [
      { label: 'Methodology', value: 'Build · Test · Break · Refine' },
      { label: 'CAD Platforms', value: 'Parametric Solid Modeling' },
      { label: 'Fabrication', value: 'FDM 3D Printing & Laser Cutting' },
      { label: 'Integration', value: 'Electro-Mechanical Packaging' },
    ],
    applications: ['Airframe Fabrication', 'Robotic Chassis Assembly', 'Lab Test Benches'],
    accentColor: '#0F766E',
  },
  'CAD / 3D Modelling': {
    id: 'cad-3d-modelling',
    name: 'CAD / 3D Modelling',
    category: 'Engineering',
    suit: '⚙️',
    level: 'Advanced',
    role: 'Parametric CAD & Mechanical Enclosure Design',
    summary:
      'Designing parametric 3D models, snap-fit enclosures, custom drone arms, motor mounts, and mechanical linkages with tight tolerances tailored for additive manufacturing.',
    specs: [
      { label: 'Tools', value: 'Fusion 360 & SolidWorks' },
      { label: 'File Formats', value: 'STEP, STL, DXF, 3MF' },
      { label: 'Tolerances', value: '±0.15mm Fit for FDM Printing' },
      { label: 'Optimization', value: 'Strength-to-Weight Geometry' },
    ],
    applications: ['FPV Drone Airframe Parts', 'Sensor Camera Mounts', 'Custom Project Enclosures'],
    accentColor: '#0F766E',
  },
  'Hardware Integration': {
    id: 'hardware-integration',
    name: 'Hardware Integration',
    category: 'Engineering',
    suit: '⚙️',
    level: 'Core Mastery',
    role: 'System-Level Mechanical & Electrical Packaging',
    summary:
      'The art of connecting silicon to mechanics: calculating power budgets, wire gauge sizing, vibrational isolation of sensors, and EMI shield layout.',
    specs: [
      { label: 'Wiring', value: 'High-Flex Silicone AWG & JST/XT30' },
      { label: 'Damping', value: 'TPU Isolation for IMU Sensors' },
      { label: 'Power Reg', value: 'High-Efficiency Buck Converters' },
      { label: 'Thermal', value: 'Airflow Channels & Passive Sinks' },
    ],
    applications: ['Quadcopter Assembly', 'Robotic Arm Wiring Harnesses', 'Rugged Field Enclosures'],
    accentColor: '#0F766E',
  },
  Prototyping: {
    id: 'prototyping',
    name: 'Prototyping',
    category: 'Engineering',
    suit: '⚙️',
    level: 'Core Mastery',
    role: 'Iterative Build-Measure-Learn Engineering',
    summary:
      'Moving rapidly from concept sketch to breadboard, laser-cut acrylic frame, 3D printed housing, and operational physical prototype within short feedback loops.',
    specs: [
      { label: 'Speed', value: '24-48h Concept to Physical MVP' },
      { label: 'Fabrication', value: 'Rapid FDM Printing & CNC' },
      { label: 'Validation', value: 'Smoke Testing & Stress Audits' },
      { label: 'Approach', value: 'Fail Fast, Rebuild Stronger' },
    ],
    applications: ['Functional Drone Prototypes', 'Robotic Grippers', 'Hardware Testbeds'],
    accentColor: '#0F766E',
  },
  Troubleshooting: {
    id: 'troubleshooting',
    name: 'Troubleshooting',
    category: 'Engineering',
    suit: '⚙️',
    level: 'Core Mastery',
    role: 'Oscilloscope, Multimeter & Logic Analyzer Debugging',
    summary:
      'Methodical root-cause fault diagnosis: probing bus contention on I2C lines with logic analyzers, measuring voltage sag under motor load, and resolving firmware race conditions.',
    specs: [
      { label: 'Instruments', value: 'Multimeter, Logic Analyzer, Scope' },
      { label: 'Techniques', value: 'Signal Auditing & Continuity Checks' },
      { label: 'Diagnostics', value: 'Serial Debug Streams & Assertions' },
      { label: 'Outcome', value: 'Rock-Solid Hardware Reliability' },
    ],
    applications: ['I2C Bus Contention Fixes', 'Cold Solder Joint Isolation', 'Motor Back-EMF Suppression'],
    accentColor: '#0F766E',
  },
  Automation: {
    id: 'automation',
    name: 'Automation',
    category: 'Engineering',
    suit: '⚙️',
    level: 'Advanced',
    role: 'Feedback Loops & Autonomous State Machines',
    summary:
      'Implementing autonomous state machines, PID closed-loop control algorithms, and automated sensor data collection routines without human intervention.',
    specs: [
      { label: 'Control Loops', value: 'Discrete PID & State Machines' },
      { label: 'Loop Rate', value: 'Deterministic 50Hz–500Hz Rates' },
      { label: 'Triggers', value: 'Hardware Sensor Interrupts' },
      { label: 'Failsafes', value: 'Watchdog Timers & Auto-Recovery' },
    ],
    applications: ['Autonomous Navigation Logic', 'PID Flight Stabilization', 'Battery Cutoff Safety'],
    accentColor: '#0F766E',
  },
}
