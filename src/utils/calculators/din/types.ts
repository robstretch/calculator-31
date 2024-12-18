export interface DINInput {
  weight: number;
  height: number;
  age: number;
  skierType: 'beginner' | 'intermediate' | 'advanced';
  bootLength: number; // in mm
  unit: 'metric' | 'imperial';
}

export interface DINResult {
  dinSetting: number;
  toeRelease: number;
  heelRelease: number;
  skierCode: string;
  bootSoleLength: string;
  recommendations: {
    category: string;
    suggestion: string;
  }[];
  safetyChecks: {
    check: string;
    status: 'pass' | 'warning' | 'fail';
    message: string;
  }[];
  maintenanceSchedule: {
    component: string;
    interval: string;
    description: string;
  }[];
}