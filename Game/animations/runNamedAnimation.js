const runNamedAnimation = ({
  obj,
  name,
  check = () => true,
  recordOriginal = () => ({}),
  animate,
  onComplete = () => {},
}) => {
  if (!obj || !obj.material || !check(obj)) return;

  obj.userData.animation ??= {};
  const anim = obj.userData.animation;

  if (anim[name]?.active) return;

  anim[name] = {
    ...anim[name],
    active: true,
    ...recordOriginal(obj),
  };

  animate(obj, () => {
    onComplete(obj);
    anim[name].active = false;
  });
};

export default runNamedAnimation;
