### Equation 1
`Ax * A + Bx * B = Px`

### Equation 2
`Ay * A + By * B = Py`

### Solve Equation 1 for B
- Ax * A + Bx * B = Px
- ~~Ax * A~~ + Bx * B = Px - **Ax * A**
- Bx * B = Px - Ax * A
- ~~Bx~~ * B = Px / **Bx** - (Ax * A) / **Bx**
- B = Px / Bx - (Ax * A) / Bx

### Substitute B from Equation 1 into Equation 2 and solve for A
- Ay * A + By * **B** = Py
- Ay * A + By * (**Px / Bx - (Ax * A) / Bx**) = Py
- Ay * A + (By * Px) / Bx - (By * Ax * A) / Bx = Py
- ~~Ay~~ * A + (By * Px) / (Bx * **Ay**) - (By * Ax * A) / (Bx * **Ay**) = Py / **Ay**
- A + (By * Px) / (Bx * Ay) - (By * Ax * A) / (Bx * Ay) = Py / Ay
- A + ~~(By * Px) / (Bx * Ay)~~ - (By * Ax * A) / (Bx * Ay) = Py / Ay - **(By * Px) / (Bx * Ay)**
- A - (By * Ax * A) / (Bx * Ay) = Py / Ay - (By * Px) / (Bx * Ay)
- A * (1 - (By * Ax) / (Bx * Ay)) = Py / Ay - (By * Px) / (Bx * Ay)
- A * ~~(1 - (By * Ax) / (Bx * Ay))~~ = (Py / Ay - (By * Px) / (Bx * Ay)) / **(1 - (By * Ax) / (Bx * Ay))**
- A = (Py / Ay - (By * Px) / (Bx * Ay)) / (1 - (By * Ax) / (Bx * Ay))

### Final solution
- `A = (Py / Ay - (By * Px) / (Bx * Ay)) / (1 - (By * Ax) / (Bx * Ay))`
- `B = Px / Bx - (Ax * A) / Bx`
