#!/usr/bin/env ts-node
import assert from 'assert';
import fs from 'fs';

const entries = String(fs.readFileSync(process.argv[2]))
  .replace(/\r\n/g, '\n')
  .split('\n');

const mostCommon = (entries: string[]) =>
  entries
    .reduce((bits: number[], _row) => {
      const row = _row.split('');
      for (const position in row) {
        const bit = row[position];
        if (isNaN(bits[position])) {
          bits[position] = 0;
        }
        if (bit === '1') {
          bits[position]++;
        } else {
          bits[position]--;
        }
      }
      return bits;
    }, [])
    .map(Math.sign);

let remaining = [...entries];
for (let position = 0; remaining.length > 1; position++) {
  remaining = remaining.filter((entry) => {
    if (mostCommon(remaining)[position] === 0) {
      return Number(entry[position]) === 1;
    }
    return Number(entry[position]) === (mostCommon(remaining)[position] === -1 ? 0 : 1);
  });
}

assert(remaining.length === 1);

const oxygenGeneratorRating = remaining[0]
  .split('')
  .reverse()
  .map(Number)
  .reduce((n, bit, position) => n + bit * Math.pow(2, position), 0);

remaining = [...entries];
for (let position = 0; remaining.length > 1; position++) {
  remaining = remaining.filter((entry) => {
    if (mostCommon(remaining)[position] === 0) {
      return Number(entry[position]) === 0;
    }
    return Number(entry[position]) !== (mostCommon(remaining)[position] === -1 ? 0 : 1);
  });
}

const co2ScrubberRating = remaining[0]
  .split('')
  .reverse()
  .map(Number)
  .reduce((n, bit, position) => n + bit * Math.pow(2, position), 0);

console.log({
  oxygenGeneratorRating,
  co2ScrubberRating,
  product: oxygenGeneratorRating * co2ScrubberRating,
});
