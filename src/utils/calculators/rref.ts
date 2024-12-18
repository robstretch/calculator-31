export interface Matrix {
  rows: number;
  cols: number;
  values: number[][];
}

export interface RREFResult {
  steps: {
    description: string;
    matrix: number[][];
  }[];
  finalMatrix: number[][];
  rank: number;
  isConsistent?: boolean;
}

function copyMatrix(matrix: number[][]): number[][] {
  return matrix.map(row => [...row]);
}

function swapRows(matrix: number[][], row1: number, row2: number): void {
  [matrix[row1], matrix[row2]] = [matrix[row2], matrix[row1]];
}

function multiplyRow(matrix: number[][], row: number, scalar: number): void {
  matrix[row] = matrix[row].map(value => value * scalar);
}

function addMultipleOfRow(matrix: number[][], sourceRow: number, targetRow: number, scalar: number): void {
  matrix[targetRow] = matrix[targetRow].map((value, col) => 
    value + scalar * matrix[sourceRow][col]
  );
}

export function calculateRREF(matrix: Matrix): RREFResult {
  const steps: { description: string; matrix: number[][]; }[] = [];
  const m = matrix.rows;
  const n = matrix.cols;
  const augmented = copyMatrix(matrix.values);
  let lead = 0;
  let rank = 0;

  steps.push({
    description: "Initial matrix",
    matrix: copyMatrix(augmented)
  });

  // Forward elimination
  for (let r = 0; r < m && lead < n; r++) {
    // Find pivot
    let i = r;
    while (i < m && Math.abs(augmented[i][lead]) < 1e-10) {
      i++;
    }

    if (i === m) {
      lead++;
      r--;
      continue;
    }

    // Swap rows if necessary
    if (i !== r) {
      swapRows(augmented, i, r);
      steps.push({
        description: `Swap row ${i + 1} with row ${r + 1}`,
        matrix: copyMatrix(augmented)
      });
    }

    // Make pivot 1
    let pivot = augmented[r][lead];
    if (pivot !== 1) {
      multiplyRow(augmented, r, 1 / pivot);
      steps.push({
        description: `Multiply row ${r + 1} by ${(1 / pivot).toFixed(4)}`,
        matrix: copyMatrix(augmented)
      });
    }

    // Eliminate column
    for (let i = 0; i < m; i++) {
      if (i !== r && Math.abs(augmented[i][lead]) > 1e-10) {
        const factor = -augmented[i][lead];
        addMultipleOfRow(augmented, r, i, factor);
        steps.push({
          description: `Add ${factor.toFixed(4)} times row ${r + 1} to row ${i + 1}`,
          matrix: copyMatrix(augmented)
        });
      }
    }

    lead++;
    rank++;
  }

  // Check if system is consistent (for augmented matrices)
  let isConsistent: boolean | undefined;
  if (n - m === 1) { // If it's an augmented matrix
    isConsistent = true;
    for (let i = rank; i < m; i++) {
      if (Math.abs(augmented[i][n-1]) > 1e-10) {
        isConsistent = false;
        break;
      }
    }
  }

  return {
    steps,
    finalMatrix: augmented,
    rank,
    isConsistent
  };
}