
export type AnimationLoopObserver = (event: AnimationLoopEvent) => void;

export interface AnimationLoopEvent {
  deltaTime: number;
  runtime: number;
}

class AnimationLoop {
  private _rafId: number = -1;
  private _startTime: number = 0;
  private _lastUpdate: number = 0;
  private _fps: number = 240;
  private _fpsInterval: number = 1000 / this._fps;
  private _observers: AnimationLoopObserver[] = [];

  constructor() {
    this._loop = this._loop.bind(this);
  }

  public add(observer: AnimationLoopObserver): boolean {
    if (this._observers.indexOf(observer) === -1) {
      this._observers.push(observer);

      return true;
    }

    return false;
  }

  public remove(observer: AnimationLoopObserver) {
    this._observers = this._observers.filter(o => o !== observer);
  }

  public clear() {
    this._observers = [];
  }

  private _notifyObservers(event: AnimationLoopEvent) {
    for (let i = 0; i < this._observers.length; ++i) {
      const observer = this._observers[i];

      observer(event);
    }
  }

  private _loop() {
    const currentTime = this._getTime();
    const runtime = currentTime - this._startTime;
    const deltaTime = currentTime - this._lastUpdate;

    if (deltaTime >= this._fpsInterval) {
      this._lastUpdate = currentTime;

      this._notifyObservers({
        runtime,
        deltaTime
      });
    }

    this._rafId = requestAnimationFrame(this._loop);
  }

  private _getTime() {
    return Date.now();
  }

  public start() {
    let currentTime = this._getTime();

    this._startTime = currentTime;
    this._lastUpdate = currentTime;

    this._rafId = requestAnimationFrame(this._loop);
  }

  public stop() {
    cancelAnimationFrame(this._rafId);
  }

  public destroy() {
    this.stop();
    this.clear();
  }
}

export default AnimationLoop;