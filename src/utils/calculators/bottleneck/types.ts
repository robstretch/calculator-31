export interface Component {
  name: string;
  score: number;
  type: 'cpu' | 'gpu' | 'ram' | 'storage';
}

export interface BottleneckResult {
  bottleneckPercentage: number;
  bottleneckComponent: string;
  recommendations: {
    component: string;
    reason: string;
    suggestion: string;
  }[];
  componentAnalysis: {
    component: string;
    utilization: number;
    status: 'balanced' | 'bottleneck' | 'underutilized';
  }[];
  balanceScore: number; // 0-100
}