export function generateBucketColors(count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const factor = i / (count - 1);

    const r = Math.round(255 * factor); // Red goes from 0 to 255
    const g = Math.round(255 - 235 * factor); // Green goes from 255 to 20
    const b = Math.round(255 - 108 * factor); // Blue goes from 255 to 147

    const color = `rgb(${r}, ${g}, ${b})`;
    colors.push(color);
  }
  return colors;
}

