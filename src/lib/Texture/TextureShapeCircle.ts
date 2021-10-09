import Texture from "./Texture";
import Painter from "../Painter";
import Vector2 from "../Vector2";

interface TextureShapeCircleProperties {
  radius: number
}

export class TextureShapeCircle extends Texture implements TextureShapeCircleProperties {
  public radius: number;

  constructor(
    painter: Painter,
    position: Vector2,
    properties: TextureShapeCircleProperties
  ) {
    super(painter, position);

    this.radius = properties.radius;
  }

  draw() {
    this._painter.drawArc(
      this.position,
      this.radius,
    )
  }
}

export default TextureShapeCircle;