import SpriteSheet from "./SpriteSheet";

function drawBackground(
  background,
  context: CanvasRenderingContext2D,
  sprites
) {
  background.ranges.forEach(([x1, x2, y1, y2]) => {
    for (let x = x1; x < x2; x++) {
      for (let y = y1; y < y2; y++) {
        sprites.drawTile(background.tile, context, x, y);
      }
    }
  });
}

export function createBackgroundLayer(backgrounds, sprites) {
  const buffer = document.createElement("canvas");
  buffer.width = 256;
  buffer.height = 240;

  backgrounds.forEach(background => {
    drawBackground(background, buffer.getContext("2d"), sprites);
  });

  return function drawBackgroundLayer(context: CanvasRenderingContext2D) {
    context.drawImage(buffer, 0, 0);
  };
}

export function createSpriteLayer(entity) {
  return function drawSpriteLayer(context: CanvasRenderingContext2D) {
    entity.draw(context);
  };
}
