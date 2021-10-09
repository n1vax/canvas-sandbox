import { useEffect, useRef } from "react"
import AnimationLoop, { AnimationLoopObserver } from "./lib/AnimationLoop";
import Painter from "./lib/Painter";
import Renderer, { RendererResizeObserver } from "./lib/Renderer";
import { TextureShapeCircle } from "./lib/Texture";
import Vector2 from "./lib/Vector2";

interface Props {

}

const App = (props: Props) => {
  const canvasElRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvasEl = canvasElRef.current!;
    const renderer = new Renderer(canvasEl);
    const rendererResizeObserver = new RendererResizeObserver(renderer);
    const painter = new Painter(renderer);
    const circleTexture = new TextureShapeCircle(
      painter,
      new Vector2(),
      {
        radius: 10
      }
    )

    const animationLoop = new AnimationLoop();

    const update = () => {
      rendererResizeObserver.update();

      circleTexture.position = new Vector2(
        canvasEl.offsetWidth / 2,
        canvasEl.offsetHeight / 2
      )
      circleTexture.radius = canvasEl.offsetWidth / 2;

      circleTexture.draw();
    }

    const observer: AnimationLoopObserver = ({ runtime, deltaTime }) => {
      update();
    }

    animationLoop.add(observer)
    animationLoop.start();

    return () => {
      animationLoop.destroy();
      rendererResizeObserver.destroy();
    }
  }, []);

  return (
    <div className="app">
      <canvas className="canvas" ref={canvasElRef} />
    </div>
  )
}

export default App
