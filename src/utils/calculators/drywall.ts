export interface DrywallResult {
  sheets: number;
  screws: number;
  joint: {
    tape: number;  // In feet
    compound: number;  // In pounds
  };
  estimatedCost: {
    sheets: number;
    screws: number;
    tape: number;
    compound: number;
    total: number;
  };
  coverage: {
    totalArea: number;
    wastePercentage: number;
  };
}

const SHEET_WIDTH = 4;  // Standard 4ft width
const SHEET_LENGTH = 8; // Standard 8ft length
const SHEET_AREA = SHEET_WIDTH * SHEET_LENGTH;
const SCREWS_PER_SHEET = 32;  // Average number of screws per sheet
const TAPE_PER_SHEET = 14;    // Average feet of tape per sheet
const COMPOUND_PER_SHEET = 3.5; // Pounds of joint compound per sheet

const PRICES = {
  sheet: 15,       // Average price per sheet
  screws: 0.10,    // Price per screw
  tape: 0.10,      // Price per foot of tape
  compound: 0.75   // Price per pound of compound
};

export function calculateDrywall(
  length: number,
  width: number,
  height: number,
  openings: { width: number; height: number; }[] = []
): DrywallResult {
  // Calculate total wall area
  const totalWallArea = 2 * (length * height + width * height);
  
  // Subtract openings (doors, windows)
  const openingsArea = openings.reduce((sum, opening) => sum + (opening.width * opening.height), 0);
  const netArea = totalWallArea - openingsArea;
  
  // Add 10% for waste
  const areaWithWaste = netArea * 1.1;
  
  // Calculate number of sheets needed
  const sheets = Math.ceil(areaWithWaste / SHEET_AREA);
  
  // Calculate materials
  const screws = sheets * SCREWS_PER_SHEET;
  const tape = sheets * TAPE_PER_SHEET;
  const compound = sheets * COMPOUND_PER_SHEET;
  
  // Calculate costs
  const sheetCost = sheets * PRICES.sheet;
  const screwsCost = screws * PRICES.screws;
  const tapeCost = tape * PRICES.tape;
  const compoundCost = compound * PRICES.compound;
  
  return {
    sheets,
    screws,
    joint: {
      tape,
      compound
    },
    estimatedCost: {
      sheets: Math.round(sheetCost),
      screws: Math.round(screwsCost),
      tape: Math.round(tapeCost),
      compound: Math.round(compoundCost),
      total: Math.round(sheetCost + screwsCost + tapeCost + compoundCost)
    },
    coverage: {
      totalArea: Math.round(netArea),
      wastePercentage: 10
    }
  };
}