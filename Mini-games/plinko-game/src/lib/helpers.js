
export function generateBucketColors(count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const factor = i / (count - 1);

    // Interpolating between neon light blue (0, 255, 255) and neon pink (255, 20, 147)
    const r = Math.round(255 * factor); // Red goes from 0 to 255
    const g = Math.round(255 - 235 * factor); // Green goes from 255 to 20
    const b = Math.round(255 - 108 * factor); // Blue goes from 255 to 147

    const color = `rgb(${r}, ${g}, ${b})`;
    colors.push(color);
  }
  return colors;
}

function shuffle(array) {
  const nArr = [...array];
  for (let i = nArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [nArr[i], nArr[j]] = [nArr[j], nArr[i]];
  }
  return nArr;
}

export function generateBallPath({ rows, multiplier, multipliers }) {
  const bucketsFrom0 =
    Math.ceil(rows / 2) - [...multipliers].reverse().indexOf(multiplier);
  const side = Math.random() > 0.5 ? 'R' : 'L';
  const sideCount = Math.abs(bucketsFrom0 - Math.ceil(rows / 2));
  const otherSide = rows - sideCount;

  const newArr = (symbol, l) => new Array(l).fill(symbol);

  const path =
    side === 'R'
      ? [...newArr('R', sideCount), ...newArr('L', otherSide)]
      : [...newArr('L', sideCount), ...newArr('R', otherSide)];

  const shuffledPath = shuffle(path);

  return shuffledPath;
}

export function interpolateWithMomentum(
  arr,
  easedT = (t) => t * t * (3 - 2 * t),
  speed = 1,
  bounce = () => 0
) {
  const result = [];

  function easeInterpolation(start, end, steps) {
    const values = [];
    const delta = end - start;

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const bounceDelta = bounce(t) * Math.abs(delta) * 0.3;
      const value = start + delta * easedT(t) - bounceDelta;
      values.push(value);
    }

    values[0] = start;
    values[steps] = end;

    return values;
  }

  for (let i = 0; i < arr.length - 1; i++) {
    const start = arr[i];
    const end = arr[i + 1];

    const steps = Math.ceil(Math.abs(end - start) / speed);

    const interpolatedSegment = easeInterpolation(start, end, steps);

    result.push(...interpolatedSegment.slice(0, -1));
  }

  result.push(arr[arr.length - 1]);

  return result;
}

export function interpolateYWithMomentum(arr) {
  return interpolateWithMomentum(
    arr,
    (t) => t ** 3, // todo unnatural
    2,
    (t) => Math.sin(t * Math.PI * 2) * (1 - t)
  );
}

export function interpolateXWithMomentum(arr) {
  return interpolateWithMomentum(arr, (t) => t * t * (3 - 2 * t));
}
