import { WPMInput, WPMResult } from './types';

function getRating(wpm: number): string {
  if (wpm < 20) return 'Beginner';
  if (wpm < 40) return 'Basic';
  if (wpm < 60) return 'Intermediate';
  if (wpm < 80) return 'Advanced';
  if (wpm < 100) return 'Professional';
  return 'Expert';
}

function getAccuracyRating(accuracy: number): string {
  if (accuracy < 92) return 'Needs Improvement';
  if (accuracy < 96) return 'Good';
  if (accuracy < 98) return 'Very Good';
  return 'Excellent';
}

export function calculateWPM(input: WPMInput): WPMResult {
  // Calculate total time in minutes
  const totalMinutes = input.time.minutes + (input.time.seconds / 60);
  
  // Calculate raw WPM
  const wpm = Math.round(input.words / totalMinutes);
  
  // Calculate accuracy
  const totalWords = input.words + (input.errors || 0);
  const accuracy = (input.words / totalWords) * 100;
  
  // Calculate net WPM (accounting for errors)
  const netWpm = Math.round(wpm - ((input.errors || 0) / totalMinutes));
  
  // Calculate CPM (assuming average word length of 5 characters)
  const cpm = wpm * 5;

  const statistics = [
    {
      metric: 'Words Per Minute',
      value: wpm,
      rating: getRating(wpm)
    },
    {
      metric: 'Net WPM',
      value: netWpm,
      rating: getRating(netWpm)
    },
    {
      metric: 'Characters Per Minute',
      value: cpm,
      rating: getRating(wpm)
    },
    {
      metric: 'Accuracy',
      value: Math.round(accuracy * 10) / 10,
      rating: getAccuracyRating(accuracy)
    }
  ];

  const recommendations = [
    {
      category: 'Speed',
      suggestion: wpm < 60 ?
        'Practice touch typing to improve speed' :
        'Focus on maintaining accuracy while typing fast'
    },
    {
      category: 'Accuracy',
      suggestion: accuracy < 95 ?
        'Slow down slightly to reduce errors' :
        'Good accuracy - gradually increase speed'
    },
    {
      category: 'Practice',
      suggestion: 'Regular typing practice with varied texts'
    },
    {
      category: 'Technique',
      suggestion: 'Maintain proper hand positioning and posture'
    }
  ];

  return {
    wpm,
    netWpm,
    accuracy,
    cpm,
    scores: {
      speed: getRating(wpm),
      accuracy: getAccuracyRating(accuracy)
    },
    statistics,
    recommendations
  };
}