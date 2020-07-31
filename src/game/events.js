export const battleEvent = (callback) => {
  const sprites = document.getElementsByClassName("sprite");
  for (let sprite of sprites) {
    sprite.addEventListener("click", callback);
  }
};

export const replayEvent = (callback) => {
  const replayButton = document.getElementById("replay-button");
  replayButton.addEventListener("click", callback);
};
