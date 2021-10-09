class Vector2 {
  constructor(
    public x: number = 0,
    public y: number = 0
  ) {

  }

  invert(): this {
    this.x = -this.x;
    this.y = -this.y;

    return this;
  }

  add(v: Vector2): this {
    this.x += v.x;
    this.y += v.y;

    return this;
  }

  sub(v: Vector2): this {
    this.x -= v.x;
    this.y -= v.y;

    return this;
  }

  multiply(v: number | Vector2): this {
    if (typeof v === "number") {
      this.x *= v;
      this.y *= v;
    } else {
      this.x *= v.x;
      this.y *= v.y;
    }

    return this;
  }

  crossProduct(v: Vector2): number {
    return this.x * v.y - this.y * v.x;
  }

  clone(): Vector2 {
    return new Vector2(
      this.x,
      this.y
    );
  }

  distance(v: Vector2): number {
    const x = this.x - v.x;
    const y = this.y - v.y;

    return Math.hypot(x, y);
  }

  magnitude() {
    return Math.hypot(this.x, this.y);
  }

  normalize(): this {
    const m = this.magnitude();

    if (m > 0) {
      this.multiply(1 / m);
    }

    return this;
  }
}

export default Vector2;