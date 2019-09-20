class Compositor {
  layers: Function[];

  constructor() {
    this.layers = [];
  }

  draw(context: CanvasRenderingContext2D) {
    this.layers.forEach(layer => {
      layer(context);
    });
  }
}

export default Compositor;
