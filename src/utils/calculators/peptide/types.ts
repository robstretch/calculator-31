export interface AminoAcid {
  code: string;
  name: string;
  mass: number;
  pKa: {
    amine: number;
    carboxyl: number;
    sideChain?: number;
  };
  hydropathy: number;
}

export interface PeptideResult {
  sequence: string;
  molecularWeight: number;
  isoelectricPoint: number;
  hydropathyIndex: number;
  composition: {
    aminoAcid: string;
    count: number;
    percentage: number;
  }[];
  properties: {
    property: string;
    value: number;
    description: string;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}