export const battleEvent = (callback) => {
  const avatars = document.getElementsByClassName("avatar");
  for (let avatar of avatars) {
    avatar.addEventListener("click", callback);
  }
};
