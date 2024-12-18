import { AminoAcid, PeptideResult } from './types';

const AMINO_ACIDS: { [key: string]: AminoAcid } = {
  A: { code: 'A', name: 'Alanine', mass: 89.1, pKa: { amine: 9.87, carboxyl: 2.35 }, hydropathy: 1.8 },
  C: { code: 'C', name: 'Cysteine', mass: 121.2, pKa: { amine: 10.78, carboxyl: 1.71, sideChain: 8.33 }, hydropathy: 2.5 },
  D: { code: 'D', name: 'Aspartic Acid', mass: 133.1, pKa: { amine: 9.82, carboxyl: 1.88, sideChain: 3.65 }, hydropathy: -3.5 },
  E: { code: 'E', name: 'Glutamic Acid', mass: 147.1, pKa: { amine: 9.67, carboxyl: 2.19, sideChain: 4.25 }, hydropathy: -3.5 },
  F: { code: 'F', name: 'Phenylalanine', mass: 165.2, pKa: { amine: 9.24, carboxyl: 1.83 }, hydropathy: 2.8 },
  G: { code: 'G', name: 'Glycine', mass: 75.1, pKa: { amine: 9.60, carboxyl: 2.34 }, hydropathy: -0.4 },
  H: { code: 'H', name: 'Histidine', mass: 155.2, pKa: { amine: 9.17, carboxyl: 1.82, sideChain: 6.00 }, hydropathy: -3.2 },
  I: { code: 'I', name: 'Isoleucine', mass: 131.2, pKa: { amine: 9.76, carboxyl: 2.32 }, hydropathy: 4.5 },
  K: { code: 'K', name: 'Lysine', mass: 146.2, pKa: { amine: 9.06, carboxyl: 2.20, sideChain: 10.54 }, hydropathy: -3.9 },
  L: { code: 'L', name: 'Leucine', mass: 131.2, pKa: { amine: 9.60, carboxyl: 2.36 }, hydropathy: 3.8 },
  M: { code: 'M', name: 'Methionine', mass: 149.2, pKa: { amine: 9.21, carboxyl: 2.28 }, hydropathy: 1.9 },
  N: { code: 'N', name: 'Asparagine', mass: 132.1, pKa: { amine: 8.80, carboxyl: 2.02 }, hydropathy: -3.5 },
  P: { code: 'P', name: 'Proline', mass: 115.1, pKa: { amine: 10.60, carboxyl: 1.99 }, hydropathy: -1.6 },
  Q: { code: 'Q', name: 'Glutamine', mass: 146.2, pKa: { amine: 9.13, carboxyl: 2.17 }, hydropathy: -3.5 },
  R: { code: 'R', name: 'Arginine', mass: 174.2, pKa: { amine: 9.09, carboxyl: 2.18, sideChain: 12.48 }, hydropathy: -4.5 },
  S: { code: 'S', name: 'Serine', mass: 105.1, pKa: { amine: 9.15, carboxyl: 2.21 }, hydropathy: -0.8 },
  T: { code: 'T', name: 'Threonine', mass: 119.1, pKa: { amine: 9.12, carboxyl: 2.09 }, hydropathy: -0.7 },
  V: { code: 'V', name: 'Valine', mass: 117.1, pKa: { amine: 9.72, carboxyl: 2.32 }, hydropathy: 4.2 },
  W: { code: 'W', name: 'Tryptophan', mass: 204.2, pKa: { amine: 9.39, carboxyl: 2.38 }, hydropathy: -0.9 },
  Y: { code: 'Y', name: 'Tyrosine', mass: 181.2, pKa: { amine: 9.11, carboxyl: 2.20, sideChain: 10.07 }, hydropathy: -1.3 }
};

function calculateMolecularWeight(sequence: string): number {
  return sequence.split('').reduce((sum, aa) => sum + AMINO_ACIDS[aa].mass, 0) - 
    (sequence.length - 1) * 18.015; // Subtract water lost in peptide bond formation
}

function calculateIsoelectricPoint(sequence: string): number {
  // Simplified pI calculation using average of relevant pKa values
  const charges = sequence.split('').map(aa => AMINO_ACIDS[aa].pKa);
  const pKaValues = charges.flatMap(pKa => [pKa.amine, pKa.carboxyl, pKa.sideChain].filter(Boolean));
  return pKaValues.reduce((sum, pKa) => sum + pKa, 0) / pKaValues.length;
}

function calculateHydropathyIndex(sequence: string): number {
  const total = sequence.split('').reduce((sum, aa) => sum + AMINO_ACIDS[aa].hydropathy, 0);
  return total / sequence.length;
}

export function calculatePeptide(sequence: string): PeptideResult {
  // Calculate composition
  const composition = sequence.split('').reduce((acc, aa) => {
    acc[aa] = (acc[aa] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  const compositionArray = Object.entries(composition).map(([aa, count]) => ({
    aminoAcid: AMINO_ACIDS[aa].name,
    count,
    percentage: (count / sequence.length) * 100
  }));

  const molecularWeight = calculateMolecularWeight(sequence);
  const isoelectricPoint = calculateIsoelectricPoint(sequence);
  const hydropathyIndex = calculateHydropathyIndex(sequence);

  const properties = [
    {
      property: 'Length',
      value: sequence.length,
      description: 'Number of amino acids'
    },
    {
      property: 'Molecular Weight',
      value: Math.round(molecularWeight * 100) / 100,
      description: 'Daltons (Da)'
    },
    {
      property: 'Isoelectric Point',
      value: Math.round(isoelectricPoint * 100) / 100,
      description: 'pH at which net charge is zero'
    },
    {
      property: 'Hydropathy Index',
      value: Math.round(hydropathyIndex * 100) / 100,
      description: 'Average hydrophobicity'
    }
  ];

  const recommendations = [
    {
      category: 'Solubility',
      suggestion: hydropathyIndex > 0 ?
        'Consider adding polar residues to improve solubility' :
        'Good solubility expected in aqueous solutions'
    },
    {
      category: 'Stability',
      suggestion: sequence.includes('C') ?
        'Monitor oxidation state of cysteine residues' :
        'Sequence appears stable under normal conditions'
    },
    {
      category: 'Buffer Selection',
      suggestion: `Use buffer with pH ${Math.round(isoelectricPoint)} ± 1 for optimal stability`
    },
    {
      category: 'Storage',
      suggestion: 'Store lyophilized at -20°C, reconstituted at -80°C'
    }
  ];

  return {
    sequence,
    molecularWeight,
    isoelectricPoint,
    hydropathyIndex,
    composition: compositionArray,
    properties,
    recommendations
  };
}