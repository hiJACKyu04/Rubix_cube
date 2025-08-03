# Rubix Cube 3D - Architecture Block Diagram

## 4-Layer Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              RUBIX CUBE 3D                                  │
│                              ARCHITECTURE                                   │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                                UI LAYER                                     │
│                            (User Interface)                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐             │
│   │   Solve Buttons │  │  Custom Shuffle │  │  Rotation Ctrl  │             │
│   │                 │  │                 │  │                 │             │
│   │ • LBL Solver    │  │ • Input Field   │  │ • U/D/L/R/F/B   │             │
│   │ • Two-Phase     │  │ • Validation    │  │ • Prime/Double  │             │
│   │                 │  │ • Move History  │  │ • Slice Moves   │             │
│   └─────────────────┘  └─────────────────┘  └─────────────────┘             │
│            │                      │                      │                  │
│            └──────────────────────┼──────────────────────┘                  │
│                                   │                                         │
│  ┌────────────────────────────────┼────────────────────────────────────┐    │
│  │                       Terminal & History                            │    │
│  │                                                                     │    │
│  │    ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐    │    │
│  │    │  Typewriter     │  │  Message Log    │  │  Timestamp      │    │    │
│  │    │  Effect         │  │  System         │  │  Tracking       │    │    │
│  │    └─────────────────┘  └─────────────────┘  └─────────────────┘    │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                   │                                         │
└───────────────────────────────────┼─────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            ALGORITHM LAYER                                  │
│                           (Solving Methods)                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│       ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐         │
│       │   LBL Solver    │  │  Two-Phase      │  │  Utility        │         │
│       │   (lbl.js)      │  │  (two-phase.js) │  │  Functions      │         │
│       │                 │  │                 │  │                 │         │
│       │ • Step 1: Cross │  │ • Phase 1:      │  │ • Move          │         │
│       │ • Step 2: F2L   │  │   Subgroup G1   │  │   Validation    │         │
│       │ • Step 3: OLL   │  │ • Phase 2:      │  │ • Custom        │         │
│       │ • Step 4: PLL   │  │   Subgroup G0   │  │   Shuffle       │         │
│       └─────────────────┘  └─────────────────┘  └─────────────────┘         │
│            │                      │                      │                  │
│            └──────────────────────┼──────────────────────┘                  │
│                                   │                                         │
│  ┌────────────────────────────────┼────────────────────────────────────┐    │
│  │                    Algorithm Utilities                              │    │
│  │                                                                     │    │
│  │    ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐    │    │
│  │    │  Move Validation│  │  State Analysis │  │  Solution       │    │    │
│  │    │  & Parsing      │  │  & Recognition  │  │  Optimization   │    │    │
│  │    └─────────────────┘  └─────────────────┘  └─────────────────┘    │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                   │                                         │
└───────────────────────────────────┼─────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              STATE LAYER                                    │
│                           (Data Management)                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│       ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐         │
│       │  Cube State     │  │  Move History   │  │  Validation     │         │
│       │  Object         │  │  & Tracking     │  │  Engine         │         │
│       │                 │  │                 │  │                 │         │
│       │ • Centers (6)   │  │ • Move Sequence │  │ • Color Count   │         │
│       │ • Edges (12)    │  │ • Undo/Redo     │  │ • Edge Parity   │         │
│       │ • Corners (8)   │  │ • State History │  │ • Corner Parity │         │
│       └─────────────────┘  └─────────────────┘  └─────────────────┘         │
│               │                      │                      │               │
│               └──────────────────────┼──────────────────────┘               │
│                                      │                                      │
│   ┌──────────────────────────────────┼──────────────────────────────────┐   │
│   │                      State Synchronization                          │   │
│   │                                                                     │   │
│   │    ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐    │   │
│   │    │  3D State       │  │  2D State       │  │  Real-time      │    │   │
│   │    │  (cubeGL)       │  │  (canvas)       │  │  Updates        │    │   │
│   │    └─────────────────┘  └─────────────────┘  └─────────────────┘    │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
└────────────────────────────────────┼────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           VISUALIZATION LAYER                               │
│                           (3D & 2D Rendering)                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│       ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐         │
│       │  3D Renderer    │  │  2D Canvas      │  │  Background     │         │
│       │  (Three.js)     │  │  Renderer       │  │  Animation      │         │
│       │                 │  │                 │  │                 │         │
│       │ • WebGL Context │  │ • Top-down View │  │ • Stars Effect  │         │
│       │ • Cube Geometry │  │ • Face Mapping  │  │ • Parallax      │         │
│       │ • Lighting      │  │ • Color Grid    │  │ • Responsive    │         │
│       └─────────────────┘  └─────────────────┘  └─────────────────┘         │
│              │                      │                      │                │
│              └──────────────────────┼──────────────────────┘                │
│                                     │                                       │
│  ┌──────────────────────────────────┼──────────────────────────────────┐    │
│  │                    Interaction & Controls                           │    │
│  │                                                                     │    │
│  │    ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐    │    │
│  │    │  Mouse/Touch    │  │  Camera         │  │  Animation      │    │    │
│  │    │  Controls       │  │  Management     │  │  System         │    │    │
│  │    └─────────────────┘  └─────────────────┘  └─────────────────┘    │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

```

## Data Flow Architecture

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│    UI       │───▶│ Algorithm   │───▶│   State     │───▶│Visualization│
│  Layer      │    │   Layer     │    │   Layer     │    │   Layer     │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       ▲                   │                   │                   │
       │                   │                   │                   │
       └───────────────────┼───────────────────┼───────────────────┘
                           │                   │
                    ┌─────────────┐    ┌─────────────┐
                    │   Move      │    │   State     │
                    │ Validation  │    │  Updates    │
                    └─────────────┘    └─────────────┘
```

## Component Dependencies

### UI Layer Dependencies:
- **HTML Structure**: index.html
- **Styling**: cube/css/style.css
- **User Input**: Custom shuffle, solve buttons, rotation controls

### Algorithm Layer Dependencies:
- **LBL Solver**: cube/js/lbl.js
- **Two-Phase**: cube/js/two-phase.js, lib/cubejs/
- **Utilities**: cube/js/util.js

### State Layer Dependencies:
- **State Management**: cubeGL object, cube object
- **Move Tracking**: Terminal history system
- **Validation**: Color consistency, parity checking

### Visualization Layer Dependencies:
- **3D Engine**: Three.js, lib/cuber/
- **2D Canvas**: Custom canvas renderer
- **Background**: Stars animation system

## Key Features by Layer

### UI Layer Features:
- ✅ Multiple solving algorithm buttons
- ✅ Custom move sequence input
- ✅ Real-time terminal with typewriter effect
- ✅ Terminal history with timestamps
- ✅ Individual face rotation controls
- ✅ Responsive design with space theme

### Algorithm Layer Features:
- ✅ Layer By Layer (LBL) solver
- ✅ Two-Phase optimal algorithm
- ✅ Move validation and parsing
- ✅ Solution optimization
- ✅ Custom shuffle functionality

### State Layer Features:
- ✅ 54-piece state tracking
- ✅ Move history and undo/redo
- ✅ Real-time state synchronization
- ✅ Cube validity validation
- ✅ Color consistency checking

### Visualization Layer Features:
- ✅ Interactive 3D cube rendering
- ✅ Real-time 2D top-down view
- ✅ Mouse/touch controls
- ✅ Smooth animations
- ✅ Stars background effect

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **3D Graphics**: Three.js, WebGL
- **2D Graphics**: HTML5 Canvas
- **UI Framework**: Vanilla JavaScript
- **Styling**: Custom CSS with space theme
- **Animation**: CSS transitions, JavaScript animations

## File Organization

```
Rubix Cube 3D/
├── index.html                 # Main UI layer
├── cube/
│   ├── css/style.css         # UI styling
│   └── js/
│       ├── lbl.js           # Algorithm layer (LBL)
│       ├── two-phase.js     # Algorithm layer (Two-Phase)
│       ├── util.js          # State layer utilities
│       └── initial.js       # Visualization layer init
├── lib/
│   ├── cubejs/              # Algorithm layer library
│   ├── cuber/               # Visualization layer library
│   └── typewriting/         # UI layer library
└── assets/                  # Visualization layer resources
```

This architecture ensures clean separation of concerns, maintainable code, and scalable design for future enhancements. 