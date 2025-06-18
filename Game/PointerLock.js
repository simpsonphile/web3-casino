class PointerLock {
  constructor({ domElement, onChange }) {
    this.domElement = domElement;
    this.onChange = onChange;
  }

  _canRequestLock() {
    const now = performance.now();

    return !(
      this.lastPointerLockActivationTimestamp !== null &&
      now - this.lastPointerLockActivationTimestamp < 1000
    );
  }

  init() {
    document.addEventListener("click", async () => {
      if (window.commandManager.checkIfModeEnabled("menu")) return;
      this.requestPointerLock();
    });

    document.addEventListener(
      "pointerlockchange",
      this.onPointerLockChange.bind(this),
      false
    );

    document.addEventListener(
      "pointerlockerror",
      this.onPointerLockError.bind(this),
      false
    );
  }

  requestPointerLock() {
    if (!this._canRequestLock()) return;
    this.domElement.requestPointerLock();
  }

  exitPointerLock() {
    if (document.exitPointerLock) {
      document.exitPointerLock();
    } else if (document.msExitPointerLock) {
      // For Internet Explorer
      document.msExitPointerLock();
    }
  }

  isPointerLocked() {
    return document.pointerLockElement === this.domElement;
  }

  onPointerLockChange() {
    this.lastPointerLockActivationTimestamp = performance.now();
    if (!this.isPointerLocked()) {
      document.body.classList.remove("cursor-locked");
      this.onChange(false);
    } else {
      document.body.classList.add("cursor-locked");
      this.onChange(true);
    }
  }

  onPointerLockError() {
    console.error("Error while attempting to lock the pointer.");
  }
}

export default PointerLock;
