export interface StampDutyInput {
  propertyPrice: number;
  buyerType: 'first-time' | 'next-home' | 'additional';
  propertyType: 'residential' | 'commercial';
  country: 'england' | 'scotland' | 'wales' | 'northern-ireland';
}

export interface StampDutyResult {
  totalTax: number;
  effectiveRate: number;
  bands: {
    threshold: number;
    rate: number;
    taxAmount: number;
  }[];
  breakdown: {
    propertyValue: number;
    stampDuty: number;
    netCost: number;
  };
  savings?: {
    firstTimeBuyer: number;
    normalRate: number;
    saved: number;
  };
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}