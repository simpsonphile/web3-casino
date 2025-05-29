class PointerLock {
  constructor({ domElement, onChange }) {
    this.domElement = domElement;
    this.onChange = onChange;
  }

  init() {
    document.addEventListener("click", async () => {
      if (window.commandManager.checkIfModeEnabled("menu")) return;
      await this.domElement.requestPointerLock();
      this.controlsEnabled = true;
      this.onChange(true);
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
    if (this.domElement.requestPointerLock) {
      this.domElement.requestPointerLock();
    } else if (this.domElement.msRequestPointerLock) {
      // For Internet Explorer
      this.domElement.msRequestPointerLock();
    }

    this.onChange(true);
  }

  exitPointerLock() {
    if (document.exitPointerLock) {
      document.exitPointerLock();
    } else if (document.msExitPointerLock) {
      // For Internet Explorer
      document.msExitPointerLock();
    }
  }

  onPointerLockChange() {
    if (document.pointerLockElement !== this.domElement) {
      this.controlsEnabled = false;
      this.onChange(false);
    }
  }

  onPointerLockError() {
    console.error("Error while attempting to lock the pointer.");
  }
}

export default PointerLock;
