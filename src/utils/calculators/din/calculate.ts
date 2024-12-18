import { DINInput, DINResult } from './types';

// DIN value chart based on skier code and boot sole length
const DIN_CHART = {
  A: [0.75, 0.75, 0.75],
  B: [1.00, 0.75, 0.75],
  C: [1.50, 1.25, 1.25],
  D: [2.00, 1.75, 1.50],
  E: [2.50, 2.25, 2.00],
  F: [3.00, 2.75, 2.50],
  G: [4.00, 3.50, 3.00],
  H: [5.00, 4.50, 4.00],
  I: [6.00, 5.50, 5.00],
  J: [7.50, 6.50, 6.00],
  K: [9.00, 8.00, 7.00],
  L: [10.50, 9.50, 8.50],
  M: [12.00, 11.00, 10.00]
};

function getSkierCode(weight: number, height: number, age: number, type: string): string {
  // Calculate skier code based on weight, height, age, and skier type
  let code = 'F'; // Default code
  
  // Adjust based on weight ranges (simplified)
  if (weight < 30) code = 'A';
  else if (weight < 38) code = 'B';
  else if (weight < 47) code = 'C';
  else if (weight < 56) code = 'D';
  else if (weight < 66) code = 'E';
  else if (weight < 78) code = 'F';
  else if (weight < 91) code = 'G';
  else if (weight < 107) code = 'H';
  else if (weight < 125) code = 'I';
  else if (weight < 147) code = 'J';
  else if (weight < 174) code = 'K';
  else if (weight < 209) code = 'L';
  else code = 'M';

  // Adjust for skier type
  if (type === 'beginner') code = String.fromCharCode(code.charCodeAt(0) - 1);
  if (type === 'advanced') code = String.fromCharCode(code.charCodeAt(0) + 1);

  // Adjust for age
  if (age < 10 || age > 50) code = String.fromCharCode(code.charCodeAt(0) - 1);

  return code;
}

function getSoleLengthRange(length: number): string {
  if (length < 230) return 'short';
  if (length < 290) return 'medium';
  return 'long';
}

export function calculateDIN(input: DINInput): DINResult {
  // Convert to metric if needed
  let weight = input.weight;
  let height = input.height;
  if (input.unit === 'imperial') {
    weight = weight * 0.453592; // lbs to kg
    height = height * 2.54;     // inches to cm
  }

  // Get skier code
  const skierCode = getSkierCode(weight, height, input.age, input.skierType);
  
  // Get boot sole length range
  const soleLengthRange = getSoleLengthRange(input.bootLength);
  
  // Get DIN value from chart
  const soleLengthIndex = soleLengthRange === 'short' ? 0 : 
                         soleLengthRange === 'medium' ? 1 : 2;
  
  const dinSetting = DIN_CHART[skierCode as keyof typeof DIN_CHART][soleLengthIndex];

  // Calculate release values (typically toe is slightly higher than heel)
  const toeRelease = Math.round(dinSetting * 1.1 * 10) / 10;
  const heelRelease = dinSetting;

  const safetyChecks = [
    {
      check: 'DIN Setting Range',
      status: dinSetting > 12 ? 'warning' : 'pass',
      message: dinSetting > 12 ? 
        'High DIN setting - for expert skiers only' : 
        'DIN setting within normal range'
    },
    {
      check: 'Age Factor',
      status: input.age < 10 || input.age > 50 ? 'warning' : 'pass',
      message: input.age < 10 || input.age > 50 ?
        'Age factor suggests lower DIN setting for safety' :
        'Age within standard range'
    },
    {
      check: 'Boot Compatibility',
      status: input.bootLength < 200 || input.bootLength > 400 ? 'fail' : 'pass',
      message: input.bootLength < 200 || input.bootLength > 400 ?
        'Boot sole length outside normal range' :
        'Boot sole length compatible'
    }
  ];

  const maintenanceSchedule = [
    {
      component: 'Binding Test',
      interval: 'Pre-season',
      description: 'Professional binding check and adjustment'
    },
    {
      component: 'Visual Inspection',
      interval: 'Every 5-10 days of skiing',
      description: 'Check for debris and damage'
    },
    {
      component: 'Release Test',
      interval: 'Monthly during season',
      description: 'Verify correct release function'
    }
  ];

  const recommendations = [
    {
      category: 'Setting Verification',
      suggestion: 'Have settings professionally verified before first use'
    },
    {
      category: 'Skier Type',
      suggestion: input.skierType === 'beginner' ?
        'Consider lower settings until technique improves' :
        'Settings appropriate for skill level'
    },
    {
      category: 'Boot Condition',
      suggestion: 'Ensure boot soles are clean and undamaged'
    },
    {
      category: 'Testing',
      suggestion: 'Perform release test in controlled environment'
    }
  ];

  return {
    dinSetting,
    toeRelease,
    heelRelease,
    skierCode,
    bootSoleLength: soleLengthRange,
    recommendations,
    safetyChecks,
    maintenanceSchedule
  };
}