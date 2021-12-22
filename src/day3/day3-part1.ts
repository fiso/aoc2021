#!/usr/bin/env ts-node
import assert from 'assert';
import fs from 'fs';

const gamma = String(fs.readFileSync(process.argv[2]))
  .replace(/\r\n/g, '\n')
  .split('\n')
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
  .map((n) => (n > 0 ? 1 : 0))
  .reverse()
  .reduce<number>((n, bit, position) => n + bit * Math.pow(2, position), 0);

const epsilon = gamma ^ 0b111111111111;

console.log({ gamma, epsilon, product: gamma * epsilon });
