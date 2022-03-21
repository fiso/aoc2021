#!/usr/bin/env ts-node
import fs from 'fs';

const entries = String(fs.readFileSync(process.argv[2]))
  .replace(/\r\n/g, '\n')
  .split('\n')
  .filter(Boolean)
  .map((row) =>
    ((parts) => ({
      patterns: parts[0],
      outputs: parts[1],
    }))(row.split('|'))
  )
  .map((entry) =>
    ((split) => ({
      patterns: split(entry.patterns),
      outputs: split(entry.outputs),
    }))((str: string) =>
      str
        .split(' ')
        .filter(Boolean)
        .map((str) => str.trim())
    )
  );

console.log(
  entries
    .map((entry) => entry.outputs)
    .flat()
    .filter((output) => [2, 4, 3, 7].some((n) => n === output.length))
    .map((output) => output.length)
    .length
);
