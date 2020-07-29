export const battleEvent = (callback) => {
  const avatars = document.getElementsByClassName("avatar");
  for (let avatar of avatars) {
    avatar.addEventListener("click", callback);
  }
};

export const replayEvent = (callback) => {
  const replayButton = document.getElementById("replay-button");
  replayButton.addEventListener("click", callback);
};
