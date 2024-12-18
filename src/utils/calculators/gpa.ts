export interface Course {
  name: string;
  grade: string;
  credits: string;
}

export const gradePoints: { [key: string]: number } = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'D-': 0.7,
  'F': 0.0
};

export function calculateGPA(
  courses: Course[],
  previousGPA: string,
  previousCredits: string
) {
  let totalPoints = 0;
  let totalCredits = 0;

  courses.forEach(course => {
    const credits = parseFloat(course.credits) || 0;
    const gradePoint = gradePoints[course.grade] || 0;
    totalPoints += credits * gradePoint;
    totalCredits += credits;
  });

  const semesterGPA = totalCredits > 0 ? totalPoints / totalCredits : 0;

  // Calculate cumulative GPA
  const prevGPA = parseFloat(previousGPA) || 0;
  const prevCredits = parseFloat(previousCredits) || 0;
  const prevPoints = prevGPA * prevCredits;
  
  const cumulativeGPA = (totalCredits + prevCredits) > 0 
    ? (totalPoints + prevPoints) / (totalCredits + prevCredits)
    : 0;

  return {
    semesterGPA,
    cumulativeGPA,
    totalCredits: totalCredits + prevCredits
  };
}