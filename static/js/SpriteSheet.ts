class SpriteSheet {
  tiles: Map<string, HTMLCanvasElement>;

  constructor(
    public image: HTMLImageElement,
    public width: number,
    public height: number
  ) {
    this.tiles = new Map();
  }

  define(name: string, x: number, y: number, w: number, h: number) {
    const buffer = document.createElement("canvas");
    buffer.width = w;
    buffer.height = h;
    buffer.getContext("2d").drawImage(this.image, x, y, w, h, 0, 0, w, h);
    this.tiles.set(name, buffer);
  }

  defineTile(name: string, x: number, y: number) {
    const buffer = document.createElement("canvas");
    buffer.width = this.width;
    buffer.height = this.height;
    buffer
      .getContext("2d")
      .drawImage(
        this.image,
        x * this.width,
        y * this.height,
        this.width,
        this.height,
        0,
        0,
        this.width,
        this.height
      );
    this.tiles.set(name, buffer);
  }

  draw(name: string, context: CanvasRenderingContext2D, x: number, y: number) {
    const buffer = this.tiles.get(name);
    context.drawImage(buffer, x, y);
  }
  drawTile(
    name: string,
    context: CanvasRenderingContext2D,
    x: number,
    y: number
  ) {
    this.draw(name, context, x * this.width, y * this.height);
  }
}

export default SpriteSheet;
