import SpriteSheet from "./SpriteSheet";

function loadImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    try {
      const image = new Image();
      image.addEventListener("load", () => {
        resolve(image);
      });
      image.src = url;
    } catch (error) {
      reject(error);
    }
  });
}

const canvas = document.getElementById("screen") as HTMLCanvasElement;
const context = canvas.getContext("2d");

context.fillRect(0, 0, 50, 50);

loadImage(require("../img/tiles.png")).then(image => {
  const sprites = new SpriteSheet(image, 16, 16);
  sprites.define("ground", 0, 0);
  sprites.draw("ground", context, 45, 62);
});
