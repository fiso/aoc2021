#!/usr/bin/env ts-node
import fs from 'fs';

const numbers = String(fs.readFileSync(process.argv[2]))
  .replace(/\r\n/g, '\n')
  .split(',')
  .filter(Boolean)
  .map(Number);

const max = numbers.reduce(
  (acc, val) => (val > acc ? val : acc),
  Number.NEGATIVE_INFINITY
);

const min = numbers.reduce(
  (acc, val) => (val < acc ? val : acc),
  Number.POSITIVE_INFINITY
);

function costToAlignAt(crabs: number[], horizontalPosition: number): number {
  let sum = 0;
  for (let i = 0; i < crabs.length; i++) {
    const steps = Math.abs(horizontalPosition - crabs[i]);
    if (steps > 0) {
      sum += (1 + steps) / 2 * steps;
    }
  }
  return sum;
}

const costs = [...new Array(max - min + 1)].map((_, i) =>
  costToAlignAt(numbers, i)
);

console.log(
  costs.reduce((acc, val) => (val < acc ? val : acc), Number.POSITIVE_INFINITY)
);
