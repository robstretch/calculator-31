import { AquariumDimensions, AquariumResult } from './types';

const CUBIC_INCHES_PER_GALLON = 231;
const CUBIC_CM_PER_LITER = 1000;
const WEEKLY_WATER_CHANGE = 0.25; // 25% weekly water change
const EVAPORATION_RATE = 0.02; // 2% weekly evaporation
const FILTER_TURNOVER = 4; // Filter should turn over volume 4x per hour

export function calculateAquarium(dimensions: AquariumDimensions): AquariumResult {
  // Calculate volume
  let volumeGallons: number;
  if (dimensions.unit === 'inches') {
    volumeGallons = (dimensions.length * dimensions.width * dimensions.height) / CUBIC_INCHES_PER_GALLON;
  } else {
    const volumeLiters = (dimensions.length * dimensions.width * dimensions.height) / CUBIC_CM_PER_LITER;
    volumeGallons = volumeLiters * 0.264172;
  }

  // Calculate stocking levels (1 inch of fish per gallon rule)
  const stocking = {
    smallFish: Math.floor(volumeGallons / 1), // 1 gallon per inch
    mediumFish: Math.floor(volumeGallons / 2), // 2 gallons per inch
    largeFish: Math.floor(volumeGallons / 5)  // 5 gallons per inch
  };

  // Calculate maintenance requirements
  const maintenance = {
    waterChangeVolume: volumeGallons * WEEKLY_WATER_CHANGE,
    weeklyEvaporation: volumeGallons * EVAPORATION_RATE,
    filterSize: volumeGallons * FILTER_TURNOVER,
    heaterWattage: Math.ceil(volumeGallons * 5) // 5 watts per gallon rule
  };

  // Generate recommendations
  const recommendations = [
    {
      category: 'Filtration',
      suggestion: `Use a filter rated for ${Math.round(maintenance.filterSize)} GPH (gallons per hour)`
    },
    {
      category: 'Heating',
      suggestion: `Install a ${maintenance.heaterWattage}W heater for tropical fish`
    },
    {
      category: 'Maintenance',
      suggestion: `Change ${Math.round(maintenance.waterChangeVolume)} gallons weekly`
    },
    {
      category: 'Stocking',
      suggestion: `Start with hardy fish and add slowly over time`
    }
  ];

  // Water parameters guide
  const waterParameters = [
    {
      parameter: 'Temperature',
      idealRange: '75-80°F (24-27°C)',
      recommendation: 'Use a reliable thermometer and heater'
    },
    {
      parameter: 'pH',
      idealRange: '6.8-7.8',
      recommendation: 'Test weekly and maintain stability'
    },
    {
      parameter: 'Ammonia',
      idealRange: '0 ppm',
      recommendation: 'Test twice weekly during cycling'
    },
    {
      parameter: 'Nitrite',
      idealRange: '0 ppm',
      recommendation: 'Monitor during cycling process'
    },
    {
      parameter: 'Nitrate',
      idealRange: '<20 ppm',
      recommendation: 'Reduce through regular water changes'
    }
  ];

  return {
    volume: {
      gallons: Math.round(volumeGallons * 10) / 10,
      liters: Math.round(volumeGallons * 3.78541 * 10) / 10
    },
    stocking,
    maintenance,
    recommendations,
    waterParameters
  };
}