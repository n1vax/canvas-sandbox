import Renderer from "./Renderer";
import Size from "./Size";
import Vector2 from "./Vector2";

class Painter {
  constructor(
    public readonly renderer: Renderer
  ) {
  }

  drawArc(
    position: Vector2,
    radius: number,
    startAngle: number = 0,
    engAngle: number = Math.PI * 2
  ) {
    const positionWithDPR = Renderer.applyDPR(position);
    const radiusWithDPR = Renderer.applyDPR(radius);

    this.renderer.ctx.arc(
      positionWithDPR.x,
      positionWithDPR.y,
      radiusWithDPR,
      startAngle,
      engAngle
    );

    this.renderer.ctx.fill();
  }

  drawRect(position: Vector2, size: Size) {
    const positionWithDPR = Renderer.applyDPR(position);
    const sizeWithDPR = Renderer.applyDPR(size);

    this.renderer.ctx.rect(
      positionWithDPR.x,
      positionWithDPR.y,
      sizeWithDPR.width,
      sizeWithDPR.height
    );
  }
}

export default Painter;