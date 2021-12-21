#!/usr/bin/env ts-node
import fs from 'fs';

console.log(
  String(fs.readFileSync(process.argv[2]))
    .replace(/\r\n/g, '\n')
    .split('\n')
    .reduce(
      (position, command) => {
        const [instruction, operand] = command.split(' ');
        if (instruction === 'forward') {
          position.horizontal += Number(operand);
        } else {
          position.depth += Number(operand) * (instruction === 'up' ? -1 : 1);
        }
        position.multiple = position.horizontal * position.depth;
        return position;
      },
      { horizontal: 0, depth: 0, multiple: 0 }
    )
);
