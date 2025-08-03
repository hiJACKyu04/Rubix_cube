# Geo Cube

A Rubik's cube solver with interactive 3D visualization and multiple solving algorithms.

&nbsp;

## Features

- **3D Interactive Cube**: Rotate and manipulate the cube with mouse controls
- **2D Cube View**: Real-time 2D representation showing all 6 faces with individual square colors
- **Multiple Solving Algorithms**: 
  - Layer By Layer (LBL) algorithm
  - Two-Phase algorithm
- **Custom Shuffle**: Input custom move sequences with validation
- **Terminal History**: Track and display all cube operations and solutions
- **Move Counter**: Shows the number of moves taken to solve the cube
- **Stars Background**: Dynamic animated background effect
- **Responsive Design**: Works on desktop and mobile devices

&nbsp;

## Play It

[Geo_Cube](https://hijackyu04.github.io/Rubix_cube/)

&nbsp;

## Structure

```
├── index.html                     # Main HTML file
├── cube/
│   ├── css/
│   │   └── style.css             # Main stylesheet
│   └── js/
│       ├── lbl.js                # Layer by layer algorithm
│       ├── two-phase.js          # Two-phase algorithm
│       ├── util.js               # Type, shuffle and reset
│       └── initial.js            # Initialize 3D cube
├── lib/
│   ├── cubejs/                   # Two-phase algorithm
│   └── cuber/                    # Rubik's cube simulator
└── assets/
    ├── favicon.svg               # Site favicon
    └── twist.jpg                 # Twist diagram
```

&nbsp;

## About Cube

The cube simulator is from [Cuber](https://github.com/marklundin/cube).

### Face

```
                                               Back(B)
                                             -----------
                                           /   Up(U)   /|
                                          /     1     / |
                                          -----------  Right(R)
                                         |           |  |
                                 Left(L) |  Front(F) |  .
                                         |           | /
                                         |           |/
                                          -----------
                                            Down(D)
```

&nbsp;

### Slice

- **Standing(S):** The layer between F and B
- **Middle(M):** The layer between L and R
- **Equator(E):** The layer between U and D

&nbsp;

### Default Color

- Front: Blue
- Back: Green
- Left: Orange
- Right: Red
- Up: Yellow
- Down: White

&nbsp;

### Rotations

#### Face

A **capital** letter by each face itself means a **clockwise** rotation of the face while a **counterclockwise** turn is marked by a **small** letter.

For example:

- **U:** A quarter clockwise turn on the Up face (90°).
- **u:** A quarter counterclockwise turn on the Up face (-90°).

![twist](assets/twist.jpg)

#### Slice

- **S/s:** Rotate slice **S** like a **F/f**
- **M/m:** Rotate slice **M** like a **L/l**
- **E/e:** Rotate slice **E** like an **U/u**

#### Whole Cube

- **X/x:** Rotate the cube like a **R/r**
- **Y/y:** Rotate the cube like an **U/u**
- **Z/z:** Rotate the cube like a **F/f**

&nbsp;

## Algorithm

### Layer By Layer

- [x] The First Layer Edges
- [x] The First Layer Corners
- [x] The Second Layer
- [x] The Top Cross
- [x] The Third Layer Corners (Position)
- [x] The Third Layer Corners (Orient)
- [x] The Third Layer Edges

### Two-Phase Algorithm

- [x] Phase 1: Reduce the cube to G1 subgroup (U, D, FF, BB, LL, RR moves only)
- [x] Phase 2: Solve the cube from G1 subgroup using only U, D, FF, BB, LL, RR moves
- [x] Optimal solution finding using IDA* search algorithm
- [x] Move pruning and symmetry reduction for efficiency
- [x] Average solution length of 20 moves or less

&nbsp;

## Usage

1. **Shuffle**: Click "Shuffle" to randomize the cube
2. **Custom Shuffle**: Enter a valid move sequence (e.g., "R U X U'") and click "Custom Shuffle"
3. **Solve**: Choose between "LBL" (Layer By Layer) or "Two-Phase" solving algorithms
4. **2D View**: Watch the real-time 2D representation update as you manipulate the cube
5. **History**: Scroll down to view the terminal history of all operations

&nbsp;

## Valid Move Notation

The custom shuffle input accepts standard Rubik's cube notation:

### Move Notation Conversion

| Standard Notation | Project Notation |                       Description                       |
|-------------------|------------------|---------------------------------------------------------|
|       U, U'       |       U, u       | Up face (clockwise/counterclockwise)                    |
|       D, D'       |       D, d       | Down face (clockwise/counterclockwise)                  |
|       L, L'       |       L, l       | Left face (clockwise/counterclockwise)                  |
|       R, R'       |       R, r       | Right face (clockwise/counterclockwise)                 |
|       F, F'       |       F, f       | Front face (clockwise/counterclockwise)                 |
|       B, B'       |       B, b       | Back face (clockwise/counterclockwise)                  |
|       E, E'       |       E, e       | Equator slice (clockwise/counterclockwise)              |
|       M, M'       |       M, m       | Middle slice (clockwise/counterclockwise)               |
|       S, S'       |       S, s       | Standing slice (clockwise/counterclockwise)             |
|       X, X'       |       x, X       | Whole cube rotation like R (clockwise/counterclockwise) |
|       Y, Y'       |       y, Y       | Whole cube rotation like U (clockwise/counterclockwise) |
|       Z, Z'       |       z, Z       | Whole cube rotation like F (clockwise/counterclockwise) |

### Supported Moves
- **Face moves**: U, D, L, R, F, B (clockwise) and u, d, l, r, f, b (counterclockwise)
- **Slice moves**: S, M, E (clockwise) and s, m, e (counterclockwise)
- **Whole cube**: X, Y, Z (clockwise) and x, y, z (counterclockwise)

