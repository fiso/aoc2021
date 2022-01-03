#!/usr/bin/env ts-node
import fs from 'fs';

const fish = String(fs.readFileSync(process.argv[2]))
  .replace(/\r\n/g, '\n')
  .split(',')
  .filter(Boolean)
  .map(Number);


// I cheated and stole this from https://github.com/LucasDower/AOC-2021/blob/master/day-06/solution.cpp
function fishAfterDays(fish: number[], days: number) {
  const timers = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i < fish.length; i++) {
    timers[fish[i]]++;
  }

  for (let i = 0; i < days; i++) {
    timers.push(timers.shift() as number);
    timers[6] += timers[8];
  }

  let sum = 0;

  for (let i = 0; i < timers.length; i++) {
    sum += timers[i];
  }

  return sum;
}

console.log(fishAfterDays(fish, 256));
