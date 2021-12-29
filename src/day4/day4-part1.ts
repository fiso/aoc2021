#!/usr/bin/env ts-node
import fs from 'fs';

const rows = String(fs.readFileSync(process.argv[2]))
  .replace(/\r\n/g, '\n')
  .split('\n')
  .filter(Boolean);

const numbers = rows[0].split(',').map(Number);

const boards = rows.slice(1).reduce((boards: number[][], row) => {
  if (boards.length === 0 || boards[boards.length - 1].length === 25) {
    boards.push([]);
  }

  boards[boards.length - 1].push(...row.split(' ').filter(Boolean).map(Number));
  return boards;
}, []);

const getBoardSum = (board: number[]) =>
  board.reduce((sum, val) => sum + (val === -1 ? 0 : val), 0);

const boardSize = 5;

function boardHasWon(board: number[]) {
  for (let row = 0; row < boardSize; row++) {
    let full = true;
    for (let x = 0; x < boardSize; x++) {
      if (board[boardSize * row + x] !== -1) {
        full = false;
        break;
      }
    }

    if (full) {
      return true;
    }
  }

  for (let col = 0; col < boardSize; col++) {
    let full = true;
    for (let y = 0; y < boardSize; y++) {
      if (board[boardSize * y + col] !== -1) {
        full = false;
        break;
      }
    }

    if (full) {
      return true;
    }
  }
  return false;
}

function findWinningBoardSum(boards: number[][], numbers: number[]) {
  for (const number of numbers) {
    for (const board of boards) {
      for (const index in board) {
        if (board[index] === number) {
          board[index] = -1;
          if (boardHasWon(board)) {
            return getBoardSum(board) * number;
          }
        }
      }
    }
  }
}

console.log(findWinningBoardSum(boards, numbers));
