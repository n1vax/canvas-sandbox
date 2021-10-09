import Size, { ISize } from "./Size";
import Vector2 from "./Vector2";

export class RendererResizeObserver {
  private _lastElSize: Size;
  private _shouldResize: boolean;

  constructor(
    public readonly renderer: Renderer
  ) {
    this._lastElSize = renderer.getElSize();
    this._shouldResize = false;

    this._handleWindowResize = this._handleWindowResize.bind(this);

    this.init();
  }

  init() {
    window.addEventListener("resize", this._handleWindowResize);
  }

  destroy() {
    window.removeEventListener("resize", this._handleWindowResize);
  }

  private _handleWindowResize(): void {
    const elSize = this.renderer.getElSize();

    if (!this._lastElSize.isEqual(elSize)) {
      this._shouldResize = true;
      this._lastElSize = elSize;
    }
  }

  update(): void {
    if (this._shouldResize) {
      this.renderer.resize(this._lastElSize);

      this._shouldResize = false;
    }
  }
}

class Renderer {
  static readonly DPR: number = window.devicePixelRatio;

  public readonly ctx: CanvasRenderingContext2D;
  public readonly el: HTMLCanvasElement;

  constructor(
    canvasEl: HTMLCanvasElement
  ) {
    this.el = canvasEl;
    this.ctx = this.el.getContext("2d")!;

    this.resize(this.getElSize());
  }

  static applyDPR(value: number): number;
  static applyDPR(value: Vector2): Vector2;
  static applyDPR(value: Size): Size;
  static applyDPR(value: any): any {
    if (typeof value === "number") {
      return value * Renderer.DPR;
    } else if (value instanceof Size) {
      return new Size(
        value.width * Renderer.DPR,
        value.height * Renderer.DPR
      )
    } else if (value instanceof Vector2) {
      return new Vector2(
        value.x * Renderer.DPR,
        value.y * Renderer.DPR
      )
    }

    return value;
  }

  getElSize(): Size {
    return new Size(this.el.offsetWidth, this.el.offsetHeight);
  }

  getSize(): Size {
    return new Size(this.el.width, this.el.height);
  }

  resize(size: number | ISize) {
    this.el.width = (typeof size === "number" ? size : size.width) * Renderer.DPR;
    this.el.height = (typeof size === "number" ? size : size.height) * Renderer.DPR;
  }

  clear(): void {
    this.ctx.clearRect(
      0,
      0,
      this.el.width,
      this.el.height
    );
  }
}

export default Renderer;