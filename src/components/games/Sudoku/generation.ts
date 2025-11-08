import type { CellValue }  from '../../../types/sudoku_types.ts'


function shuffleGrille(grille: CellValue[][]): CellValue[][] {
    const copy = grille.map(row => [...row]);

  // 1. Relabeling aléatoire des chiffres 1–9
  const digits = [1,2,3,4,5,6,7,8,9];
  const shuffled = digits.sort(() => Math.random() - 0.5);
  const map = Object.fromEntries(digits.map((d, i) => [d, shuffled[i]]));
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (copy[i][j] !== null)
        copy[i][j] = map[copy[i][j] as number];
    }
  }

  // 2. Permuter les lignes dans chaque band
  for (let band = 0; band < 3; band++) {
    const rows = [0,1,2].map(x => 3*band + x).sort(() => Math.random() - 0.5);
    const newRows = rows.map(r => copy[r]);
    for (let x = 0; x < 3; x++) copy[3*band + x] = newRows[x];
  }

  // 3. Permuter les colonnes dans chaque stack
  for (let stack = 0; stack < 3; stack++) {
    const cols = [0,1,2].map(x => 3*stack + x).sort(() => Math.random() - 0.5);
    copy.forEach(row => {
      const vals = cols.map(c => row[c]);
      for (let x = 0; x < 3; x++) row[3*stack + x] = vals[x];
    });
  }

  // 4. Permuter les bands et les stacks entre eux
  const bandOrder = [0,1,2].sort(() => Math.random() - 0.5);
  const stackOrder = [0,1,2].sort(() => Math.random() - 0.5);

  const tmp = bandOrder.map(b => copy.slice(3*b, 3*b+3)).flat();
  for (let i = 0; i < 9; i++) copy[i] = tmp[i];

  const final = copy.map(row => {
    const newRow = [];
    for (const s of stackOrder) newRow.push(...row.slice(3*s, 3*s+3));
    return newRow;
  });

  // 5. (Optionnel) Transposer aléatoirement
  if (Math.random() < 0.5) {
    return final[0].map((_, j) => final.map(row => row[j]));
  }

  return final;
}



