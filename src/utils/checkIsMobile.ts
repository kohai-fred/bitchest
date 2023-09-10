export default (): Boolean => {
  if (
    /Android|iPhone/i.test(navigator.userAgent) ||
    window.matchMedia("(pointer:coarse)").matches
  )
    return true;

  return false;
};
