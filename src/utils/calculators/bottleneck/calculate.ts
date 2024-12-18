import { Component, BottleneckResult } from './types';

function calculateUtilization(component: Component, otherComponents: Component[]): number {
  const relativeScore = component.score / Math.max(...otherComponents.map(c => c.score));
  return Math.min(100, relativeScore * 100);
}

function getComponentStatus(utilization: number): 'balanced' | 'bottleneck' | 'underutilized' {
  if (utilization > 90) return 'bottleneck';
  if (utilization < 60) return 'underutilized';
  return 'balanced';
}

export function calculateBottleneck(components: Component[]): BottleneckResult {
  // Calculate utilization for each component
  const analysis = components.map(component => {
    const otherComponents = components.filter(c => c !== component);
    const utilization = calculateUtilization(component, otherComponents);
    return {
      component: component.name,
      utilization,
      status: getComponentStatus(utilization)
    };
  });

  // Find bottleneck
  const bottleneck = analysis.find(a => a.status === 'bottleneck');
  const bottleneckPercentage = bottleneck ? bottleneck.utilization : 0;

  // Generate recommendations
  const recommendations = analysis
    .filter(a => a.status !== 'balanced')
    .map(a => {
      if (a.status === 'bottleneck') {
        return {
          component: a.component,
          reason: `${a.component} is limiting system performance`,
          suggestion: `Consider upgrading ${a.component} to improve overall system performance`
        };
      } else {
        return {
          component: a.component,
          reason: `${a.component} is not being fully utilized`,
          suggestion: `Current ${a.component} may be overpowered for this system configuration`
        };
      }
    });

  // Calculate overall balance score
  const balanceScore = 100 - Math.abs(
    analysis.reduce((sum, a) => sum + Math.abs(80 - a.utilization), 0) / components.length
  );

  return {
    bottleneckPercentage,
    bottleneckComponent: bottleneck?.component || 'None',
    recommendations,
    componentAnalysis: analysis,
    balanceScore
  };
}