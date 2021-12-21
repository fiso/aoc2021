#!/usr/bin/env ts-node
import fs from 'fs';

console.log(
  String(fs.readFileSync(process.argv[2]))
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map(Number)
    .reduce(
      (acc, _, i, array) => acc + (i < 3 ? 0 : array[i] > array[i - 3] ? 1 : 0),
      0
    )
);
