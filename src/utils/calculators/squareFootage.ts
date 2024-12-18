export interface Room {
  name: string;
  shape: 'rectangular' | 'circular' | 'triangular' | 'l-shaped';
  dimensions: {
    length?: number;
    width?: number;
    radius?: number;
    base?: number;
    height?: number;
    mainLength?: number;
    mainWidth?: number;
    extensionLength?: number;
    extensionWidth?: number;
  };
}

export interface SquareFootageResult {
  totalArea: number;
  roomAreas: {
    name: string;
    area: number;
    perimeter: number;
  }[];
  totalPerimeter: number;
  paintNeeded: number;      // In gallons (1 gallon covers ~400 sq ft)
  flooringNeeded: number;   // Area + 10% for waste
  estimatedCost: {
    paint: number;
    flooring: number;
    total: number;
  };
}

const PAINT_COVERAGE = 400;  // Square feet per gallon
const PAINT_COST = 35;      // Average cost per gallon
const FLOORING_COST = 7;    // Average cost per square foot
const WASTE_FACTOR = 1.1;   // 10% extra for waste/cuts

function calculateRoomArea(room: Room): { area: number; perimeter: number } {
  let area = 0;
  let perimeter = 0;

  switch (room.shape) {
    case 'rectangular':
      if (room.dimensions.length && room.dimensions.width) {
        area = room.dimensions.length * room.dimensions.width;
        perimeter = 2 * (room.dimensions.length + room.dimensions.width);
      }
      break;

    case 'circular':
      if (room.dimensions.radius) {
        area = Math.PI * Math.pow(room.dimensions.radius, 2);
        perimeter = 2 * Math.PI * room.dimensions.radius;
      }
      break;

    case 'triangular':
      if (room.dimensions.base && room.dimensions.height) {
        area = (room.dimensions.base * room.dimensions.height) / 2;
        // Using Pythagorean theorem for sides
        const side = Math.sqrt(Math.pow(room.dimensions.base/2, 2) + Math.pow(room.dimensions.height, 2));
        perimeter = room.dimensions.base + (2 * side);
      }
      break;

    case 'l-shaped':
      if (room.dimensions.mainLength && room.dimensions.mainWidth && 
          room.dimensions.extensionLength && room.dimensions.extensionWidth) {
        area = (room.dimensions.mainLength * room.dimensions.mainWidth) +
               (room.dimensions.extensionLength * room.dimensions.extensionWidth);
        perimeter = (2 * room.dimensions.mainLength) + (2 * room.dimensions.mainWidth) +
                   (2 * room.dimensions.extensionLength) + (2 * room.dimensions.extensionWidth) - 
                   (2 * Math.min(room.dimensions.mainWidth, room.dimensions.extensionWidth));
      }
      break;
  }

  return { area, perimeter };
}

export function calculateSquareFootage(rooms: Room[]): SquareFootageResult {
  const roomAreas = rooms.map(room => {
    const { area, perimeter } = calculateRoomArea(room);
    return {
      name: room.name,
      area: Math.round(area * 100) / 100,
      perimeter: Math.round(perimeter * 100) / 100
    };
  });

  const totalArea = roomAreas.reduce((sum, room) => sum + room.area, 0);
  const totalPerimeter = roomAreas.reduce((sum, room) => sum + room.perimeter, 0);

  // Calculate materials needed
  const paintNeeded = Math.ceil((totalPerimeter * 8) / PAINT_COVERAGE); // Assuming 8ft ceiling height
  const flooringNeeded = totalArea * WASTE_FACTOR;

  // Calculate costs
  const paintCost = paintNeeded * PAINT_COST;
  const flooringCost = flooringNeeded * FLOORING_COST;

  return {
    totalArea: Math.round(totalArea * 100) / 100,
    roomAreas,
    totalPerimeter: Math.round(totalPerimeter * 100) / 100,
    paintNeeded,
    flooringNeeded: Math.round(flooringNeeded * 100) / 100,
    estimatedCost: {
      paint: Math.round(paintCost),
      flooring: Math.round(flooringCost),
      total: Math.round(paintCost + flooringCost)
    }
  };
}