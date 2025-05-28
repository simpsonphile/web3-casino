class ProgressLoader {
  constructor(onProgress) {
    this.loadedMap = new Map();
    this.totalMap = new Map();
    this.onProgress = onProgress;
  }

  update(name, loaded, total) {
    this.loadedMap.set(name, loaded);
    this.totalMap.set(name, total || 0);

    const totalLoaded = Array.from(this.loadedMap.values()).reduce(
      (a, b) => a + b,
      0
    );
    const totalSize = Array.from(this.totalMap.values()).reduce(
      (a, b) => a + b,
      0
    );

    const progress = totalSize > 0 ? totalLoaded / totalSize : 0;

    if (this.onProgress) this.onProgress(progress);
  }
}

export default ProgressLoader;
