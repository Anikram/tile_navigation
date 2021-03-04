

export default function (func, delay) {

  let cooldown = false;

  return function () {
    if (cooldown) {
      return
    }

    func.apply(this,arguments);

    cooldown = true;

    setTimeout(() => {
      func()
      cooldown = false
    }, delay);
  }
  // If setTimeout is already scheduled, no need to do anything

}
