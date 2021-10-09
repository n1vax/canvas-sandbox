import Painter from "../Painter";
import Vector2 from "../Vector2";

abstract class Texture {
  constructor(
    protected readonly _painter: Painter,
    public position: Vector2
  ) {
  }

  abstract draw(): void;
}

export default Texture;