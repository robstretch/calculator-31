export interface NumerologyResult {
  lifePathNumber: number;
  destinyNumber: number;
  soulUrgeNumber: number;
  personalityNumber: number;
  expressionNumber: number;
  interpretation: {
    lifePath: string;
    destiny: string;
    soulUrge: string;
    personality: string;
    expression: string;
  };
}

const vowels = ['a', 'e', 'i', 'o', 'u'];
const numerologyValues: { [key: string]: number } = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
  j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
  s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
};

function reduceToSingleDigit(num: number): number {
  if (num <= 9) return num;
  return reduceToSingleDigit(
    num.toString()
      .split('')
      .reduce((sum, digit) => sum + parseInt(digit), 0)
  );
}

function calculateNameNumber(name: string, includeVowels: boolean): number {
  return reduceToSingleDigit(
    name.toLowerCase()
      .split('')
      .filter(char => char.match(/[a-z]/))
      .filter(char => includeVowels ? vowels.includes(char) : !vowels.includes(char))
      .reduce((sum, char) => sum + (numerologyValues[char] || 0), 0)
  );
}

function calculateLifePathNumber(birthdate: string): number {
  const [year, month, day] = birthdate.split('-').map(Number);
  const yearNum = reduceToSingleDigit(year);
  const monthNum = reduceToSingleDigit(month);
  const dayNum = reduceToSingleDigit(day);
  return reduceToSingleDigit(yearNum + monthNum + dayNum);
}

const interpretations = {
  lifePath: {
    1: "Natural born leader, independent, ambitious, and innovative.",
    2: "Diplomatic, cooperative, sensitive, and peaceful.",
    3: "Creative, expressive, optimistic, and social.",
    4: "Practical, organized, disciplined, and hard-working.",
    5: "Adventurous, freedom-loving, versatile, and adaptable.",
    6: "Nurturing, responsible, caring, and harmonious.",
    7: "Analytical, introspective, spiritual, and wise.",
    8: "Ambitious, business-minded, successful, and powerful.",
    9: "Humanitarian, compassionate, selfless, and spiritual."
  },
  destiny: {
    1: "Leadership and innovation are your destiny.",
    2: "Building relationships and mediating conflicts.",
    3: "Creative expression and inspiring others.",
    4: "Building solid foundations and achieving stability.",
    5: "Experiencing life and inspiring change.",
    6: "Creating harmony and nurturing others.",
    7: "Seeking wisdom and spiritual understanding.",
    8: "Achieving material and professional success.",
    9: "Serving humanity and making a global impact."
  },
  soulUrge: {
    1: "Desires independence and leadership.",
    2: "Seeks harmony and cooperation.",
    3: "Yearns for creative expression.",
    4: "Seeks stability and order.",
    5: "Craves freedom and adventure.",
    6: "Desires love and family.",
    7: "Seeks knowledge and wisdom.",
    8: "Desires success and abundance.",
    9: "Yearns to serve and inspire."
  },
  personality: {
    1: "Appears confident and independent.",
    2: "Comes across as diplomatic and gentle.",
    3: "Appears social and expressive.",
    4: "Comes across as reliable and organized.",
    5: "Appears adventurous and adaptable.",
    6: "Comes across as responsible and caring.",
    7: "Appears mysterious and intellectual.",
    8: "Comes across as confident and capable.",
    9: "Appears compassionate and wise."
  },
  expression: {
    1: "Born to lead and innovate.",
    2: "Natural mediator and peacemaker.",
    3: "Born communicator and artist.",
    4: "Natural builder and organizer.",
    5: "Born adventurer and change agent.",
    6: "Natural counselor and caregiver.",
    7: "Born seeker and philosopher.",
    8: "Natural executive and manager.",
    9: "Born humanitarian and healer."
  }
};

export function calculateNumerology(
  fullName: string,
  birthdate: string
): NumerologyResult {
  const lifePathNumber = calculateLifePathNumber(birthdate);
  const destinyNumber = reduceToSingleDigit(
    fullName.toLowerCase()
      .split('')
      .filter(char => char.match(/[a-z]/))
      .reduce((sum, char) => sum + (numerologyValues[char] || 0), 0)
  );
  const soulUrgeNumber = calculateNameNumber(fullName, true);
  const personalityNumber = calculateNameNumber(fullName, false);
  const expressionNumber = reduceToSingleDigit(soulUrgeNumber + personalityNumber);

  return {
    lifePathNumber,
    destinyNumber,
    soulUrgeNumber,
    personalityNumber,
    expressionNumber,
    interpretation: {
      lifePath: interpretations.lifePath[lifePathNumber as keyof typeof interpretations.lifePath],
      destiny: interpretations.destiny[destinyNumber as keyof typeof interpretations.destiny],
      soulUrge: interpretations.soulUrge[soulUrgeNumber as keyof typeof interpretations.soulUrge],
      personality: interpretations.personality[personalityNumber as keyof typeof interpretations.personality],
      expression: interpretations.expression[expressionNumber as keyof typeof interpretations.expression]
    }
  };
}