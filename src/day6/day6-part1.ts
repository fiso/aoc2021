#!/usr/bin/env ts-node
import fs from 'fs';

const fish = String(fs.readFileSync(process.argv[2]))
  .replace(/\r\n/g, '\n')
  .split(',')
  .filter(Boolean)
  .map(Number);

function tick(fish: number[]) {
  for (const i in fish) {
    if (--fish[i] < 0) {
      fish[i] = 6;
      fish.push(8);
    }
  }
}

for (let day = 0; day < 80; day++) {
  tick(fish);
}

console.log(fish.length);