export function loadImage(url: string) {
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

export function loadLevel(name: string) {
  return fetch(`/levels/${name}.json`).then(r => r.json());
}
