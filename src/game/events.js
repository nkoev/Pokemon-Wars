export const battleEvent = (callback) => {
  const sprites = document.getElementsByClassName("sprite");
  for (let sprite of sprites) {
    sprite.addEventListener("click", callback);
  }
};
