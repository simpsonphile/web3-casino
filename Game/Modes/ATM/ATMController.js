class ATMController {
  constructor() {}

  setStep(step) {
    const { step: currentStep, setStep } = window.atmStore.getState();
    if (currentStep !== "main") return;
    if (step === "deposit") setStep("deposit");
    else if (step === "withdraw") setStep("withdraw");
    else if (step === "history") setStep("history");
    else setStep("main");
  }

  onExit() {
    const {
      step: currentStep,
      setStep,
      setIsVisible,
    } = window.atmStore.getState();

    if (currentStep === "main") {
      setIsVisible(false);
      window.commandManager.setMode("movement");
      window.player.switchCameraMode("third-person");
    } else if (
      currentStep === "deposit" ||
      currentStep === "withdraw" ||
      currentStep === "history"
    ) {
      setStep("main");
    }
  }
}

export default ATMController;
