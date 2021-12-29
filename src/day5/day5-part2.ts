#!/usr/bin/env ts-node
import fs from 'fs';

const rows = String(fs.readFileSync(process.argv[2]))
  .replace(/\r\n/g, '\n')
  .replace(/\s->\s/g, ',')
  .split('\n')
  .filter(Boolean);

type HeatMap = { [hash: string]: number };

function incrementPointsOnLine(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  heatMap: HeatMap
) {
  for (let x = x1, y = y1; ; ) {
    const hash = `x${x}y${y}`;
    heatMap[hash] = (heatMap[hash] || 0) + 1;

    let xComplete = true, yComplete = true;
    const dx = Math.sign(x2 - x);
    const dy = Math.sign(y2 - y);
    if (dx !== 0) {
      x += dx;
      xComplete = false;
    }
    if (dy !== 0) {
      y += dy;
      yComplete = false;
    }
    if (xComplete && yComplete) {
      break;
    }
  }
}

const heatMap = rows.reduce((heatMap: HeatMap, row) => {
  const coords = row.split(',').map(Number);
  incrementPointsOnLine(coords[0], coords[1], coords[2], coords[3], heatMap);
  return heatMap;
}, {});

console.log(Object.values(heatMap).filter((n) => n > 1).length);
