#!/usr/bin/env ts-node
import fs from 'fs';

console.log(
  String(fs.readFileSync(process.argv[2]))
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map(Number)
    .reduce(
      (acc, val, i, array) => acc + (i > 0 ? (val > array[i - 1] ? 1 : 0) : 0),
      0
    )
);
