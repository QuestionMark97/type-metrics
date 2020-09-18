export function deepClone(...objs) {
  if (typeof objs !== 'object') throw new TypeError("Expected argument of type 'object'");
  const clones = [];
  for (let i = 0; i < objs.length; i++) {
    const obj = objs[i];
    const clone = {};
    Object.getOwnPropertyNames(obj).forEach((key) => {
      const val = obj[key];
      if (typeof val === 'object') {
        clone[key] = deepClone(val);
        if (Array.isArray(val)) clone[key] = Array.from(clone[key]);
      } else clone[key] = val;
    });
    clones.push(clone);
  }
  if (clones.length === 1) return clones[0];
  return clones;
}

export function mixColors(color1, color2, weight1 = 1, weight2 = 1) {
  const splitColor = (c) => [c.substring(1, 3), c.substring(3, 5), c.substring(5, 7)];
  const avgHex = (hex1, hex2, w1, w2) => (
    (w1 * parseInt(hex1, 16) + w2 * parseInt(hex2, 16)) / (w1 + w2)
  );
  const [r1, g1, b1] = splitColor(color1);
  const [r2, g2, b2] = splitColor(color2);
  const r = Number(avgHex(r1, r2, weight1, weight2).toFixed()).toString(16);
  const g = Number(avgHex(g1, g2, weight1, weight2).toFixed()).toString(16);
  const b = Number(avgHex(b1, b2, weight1, weight2).toFixed()).toString(16);
  return `#${r}${g}${b}`;
}
