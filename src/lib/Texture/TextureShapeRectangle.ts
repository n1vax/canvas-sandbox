import Texture from "./Texture";
import Painter from "../Painter";
import Size from "../Size";
import Vector2 from "../Vector2";

interface TextureShapeRectangleProperties {
  size: Size
}

export class TextureShapeRectangle extends Texture {
  public size: Size;

  constructor(
    painter: Painter,
    position: Vector2,
    properties: TextureShapeRectangleProperties
  ) {
    super(painter, position);

    this.size = properties.size;
  }

  draw() {
    this._painter.drawRect(
      this.position,
      this.size
    )
  }
}

export default TextureShapeRectangle;