export interface WeddingAlcoholResult {
  totalDrinks: number;
  beer: {
    cases: number;
    bottles: number;
    kegs: number;
  };
  wine: {
    bottles: number;
    cases: number;
  };
  spirits: {
    bottles: number;
    cases: number;
  };
  estimatedCost: {
    beer: number;
    wine: number;
    spirits: number;
    total: number;
  };
}

const DRINKS_PER_PERSON_PER_HOUR = 1;
const DRINKS_PER_BEER_CASE = 24;
const DRINKS_PER_KEG = 165;
const DRINKS_PER_WINE_BOTTLE = 5;
const DRINKS_PER_SPIRITS_BOTTLE = 17;

const PRICES = {
  beerCase: 30,
  wineBottle: 15,
  spiritsBottle: 25
};

export function calculateWeddingAlcohol(
  guestCount: number,
  hours: number,
  drinkingGuests: number,
  beerRatio: number,
  wineRatio: number,
  spiritsRatio: number
): WeddingAlcoholResult {
  // Calculate total drinks needed
  const totalDrinks = Math.ceil(
    guestCount * drinkingGuests * hours * DRINKS_PER_PERSON_PER_HOUR * 1.1 // 10% buffer
  );

  // Calculate drinks by type
  const beerDrinks = Math.ceil(totalDrinks * beerRatio);
  const wineDrinks = Math.ceil(totalDrinks * wineRatio);
  const spiritsDrinks = Math.ceil(totalDrinks * spiritsRatio);

  // Calculate beer quantities
  const beerCases = Math.ceil(beerDrinks / DRINKS_PER_BEER_CASE);
  const beerKegs = Math.ceil(beerDrinks / DRINKS_PER_KEG);

  // Calculate wine quantities
  const wineBottles = Math.ceil(wineDrinks / DRINKS_PER_WINE_BOTTLE);
  const wineCases = Math.ceil(wineBottles / 12);

  // Calculate spirits quantities
  const spiritsBottles = Math.ceil(spiritsDrinks / DRINKS_PER_SPIRITS_BOTTLE);
  const spiritsCases = Math.ceil(spiritsBottles / 12);

  // Calculate costs
  const beerCost = beerCases * PRICES.beerCase;
  const wineCost = wineBottles * PRICES.wineBottle;
  const spiritsCost = spiritsBottles * PRICES.spiritsBottle;

  return {
    totalDrinks,
    beer: {
      cases: beerCases,
      bottles: beerCases * DRINKS_PER_BEER_CASE,
      kegs: beerKegs
    },
    wine: {
      bottles: wineBottles,
      cases: wineCases
    },
    spirits: {
      bottles: spiritsBottles,
      cases: spiritsCases
    },
    estimatedCost: {
      beer: beerCost,
      wine: wineCost,
      spirits: spiritsCost,
      total: beerCost + wineCost + spiritsCost
    }
  };
}