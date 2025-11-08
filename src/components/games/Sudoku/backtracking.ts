import type { CellValue }  from '../../../types/sudoku_types.ts'


function valid_board(squares: CellValue[][]): boolean {
    return true;
}

function isValid(grid: CellValue[][], row: number, col: number, num: number): boolean {
    for (let x = 0; x < 9; x++) {
        if (grid[row][x] === num) return false;
    }

    for (let y = 0; y < 9; y++) {
        if (grid[y][col] === num) return false;
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if (grid[startRow + r][startCol + c] === num) return false;
        }
    }

    return true;
}

function randomPermutation(): number[] {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = nums.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    return nums;
}

export default function BacktrackingNoOpti(squares: CellValue[][]): boolean {
    for (let l = 0; l < 9; l++) {
        for (let c = 0; c < 9; c++) {
            if (squares[l][c] === null) {
                const nums = randomPermutation();
                for (const num of nums) {
                    if (isValid(squares, l, c, num)) {
                        squares[l][c] = num;
                        if (BacktrackingNoOpti(squares)) {
                            return true;
                        } else {
                            squares[l][c] = null; 
                        }
                    }
                }
                return false;
            }
        }
    }

    return true;
}
