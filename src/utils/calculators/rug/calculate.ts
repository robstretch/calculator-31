import { RoomDimensions, RoomLayout, RugResult } from './types';

const STANDARD_SIZES = [
  { length: 5, width: 3 },    // 5' x 3'
  { length: 6, width: 4 },    // 6' x 4'
  { length: 8, width: 5 },    // 8' x 5'
  { length: 9, width: 6 },    // 9' x 6'
  { length: 10, width: 8 },   // 10' x 8'
  { length: 12, width: 9 },   // 12' x 9'
  { length: 14, width: 10 },  // 14' x 10'
  { length: 16, width: 12 }   // 16' x 12'
];

const ROOM_TYPE_COVERAGE = {
  living: { min: 0.5, ideal: 0.75 },
  dining: { min: 0.6, ideal: 0.8 },
  bedroom: { min: 0.4, ideal: 0.6 },
  office: { min: 0.5, ideal: 0.7 }
};

function convertToFeet(value: number, unit: 'feet' | 'meters'): number {
  return unit === 'meters' ? value * 3.28084 : value;
}

function calculateCoverage(rugSize: { length: number; width: number }, roomSize: RoomDimensions): number {
  const roomArea = convertToFeet(roomSize.length, roomSize.unit) * 
                  convertToFeet(roomSize.width, roomSize.unit);
  const rugArea = rugSize.length * rugSize.width;
  return rugArea / roomArea;
}

export function calculateRugSize(room: RoomDimensions, layout: RoomLayout): RugResult {
  // Convert room dimensions to feet
  const roomLength = convertToFeet(room.length, room.unit);
  const roomWidth = convertToFeet(room.width, room.unit);
  const roomArea = roomLength * roomWidth;

  // Calculate minimum size based on furniture
  const minLength = Math.max(...layout.furniture.map(f => f.dimensions.length)) + 2;
  const minWidth = Math.max(...layout.furniture.map(f => f.dimensions.width)) + 2;

  // Get coverage requirements
  const coverage = ROOM_TYPE_COVERAGE[layout.type];

  // Find suitable rug sizes
  const recommendedSizes = STANDARD_SIZES
    .filter(size => 
      size.length >= minLength && 
      size.width >= minWidth &&
      calculateCoverage(size, room) >= coverage.min
    )
    .map(size => ({
      size: `${size.length}' x ${size.width}'`,
      dimensions: size,
      coverage: Math.round(calculateCoverage(size, room) * 100),
      layout: size.length >= roomLength * 0.75 ? 'Wall-to-wall' : 'Floating'
    }))
    .slice(0, 3);

  const guidelines = [
    {
      category: 'Living Room',
      rule: '18" from walls',
      description: 'Leave 18 inches of floor space between rug and walls'
    },
    {
      category: 'Dining Room',
      rule: '24" chair clearance',
      description: 'Extend rug 24 inches beyond table for chair movement'
    },
    {
      category: 'Bedroom',
      rule: '2/3 bed coverage',
      description: 'Rug should extend 2-3 feet beyond sides of bed'
    },
    {
      category: 'Traffic Flow',
      rule: 'Consistent borders',
      description: 'Maintain equal distance from walls on parallel sides'
    }
  ];

  const recommendations = [
    {
      category: 'Size Selection',
      suggestion: roomArea > 200 
        ? 'Consider multiple rugs for distinct seating areas'
        : 'Single large rug will unify the space'
    },
    {
      category: 'Placement',
      suggestion: layout.type === 'dining'
        ? 'Ensure rug extends beyond chairs when pulled out'
        : 'Front legs of furniture should sit on rug'
    },
    {
      category: 'Shape',
      suggestion: roomLength / roomWidth > 1.5
        ? 'Consider runner or oval rug for narrow space'
        : 'Rectangular rug matches room proportions'
    },
    {
      category: 'Pattern Scale',
      suggestion: roomArea < 100
        ? 'Choose smaller patterns to make space feel larger'
        : 'Large patterns work well in spacious room'
    }
  ];

  return {
    recommendedSizes,
    guidelines,
    roomAnalysis: {
      totalArea: roomArea,
      idealCoverage: Math.round(roomArea * coverage.ideal),
      minimumSize: {
        length: minLength,
        width: minWidth
      }
    },
    recommendations
  };
}