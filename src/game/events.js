export const startBattle = (callback) => {
  const avatars = document.getElementsByClassName("avatar");
  for (let avatar of avatars) {
    avatar.addEventListener("click", callback);
  }
};
