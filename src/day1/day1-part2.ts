#!/usr/bin/env ts-node
import fs from 'fs';

console.log(
  String(fs.readFileSync(process.argv[2]))
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map(Number)
    .reduce((acc, _, i, array) => {
      if (i < 3) {
        return acc;
      }
      const w1 = array[i - 3] + array[i - 2] + array[i - 1];
      const w2 = array[i - 2] + array[i - 1] + array[i];
      return acc + (w2 > w1 ? 1 : 0);
    }, 0)
);
