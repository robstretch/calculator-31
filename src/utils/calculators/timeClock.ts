export interface TimeEntry {
  date: string;
  clockIn: string;
  clockOut: string;
  breakDuration: number; // In minutes
}

export interface TimeClockResult {
  regularHours: number;
  overtimeHours: number;
  totalPay: number;
  regularPay: number;
  overtimePay: number;
  hoursPerDay: {
    date: string;
    hours: number;
    overtime: number;
    pay: number;
  }[];
  totalBreakTime: number;
  averageHoursPerDay: number;
}

export function calculateTimeClock(
  entries: TimeEntry[],
  hourlyRate: number,
  overtimeRate: number = 1.5,
  regularHoursPerWeek: number = 40
): TimeClockResult {
  let totalRegularHours = 0;
  let totalOvertimeHours = 0;
  let totalBreakTime = 0;
  const hoursPerDay: { date: string; hours: number; overtime: number; pay: number; }[] = [];

  // Group entries by week
  const weeklyHours = new Map<string, number>();
  
  entries.forEach(entry => {
    // Calculate hours worked for this entry
    const clockIn = new Date(`${entry.date}T${entry.clockIn}`);
    const clockOut = new Date(`${entry.date}T${entry.clockOut}`);
    let hoursWorked = (clockOut.getTime() - clockIn.getTime()) / (1000 * 60 * 60);
    
    // Subtract break time
    hoursWorked -= entry.breakDuration / 60;
    totalBreakTime += entry.breakDuration;

    // Get week number for this entry
    const weekStart = new Date(entry.date);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const weekKey = weekStart.toISOString().split('T')[0];

    // Add hours to weekly total
    const currentWeekHours = weeklyHours.get(weekKey) || 0;
    weeklyHours.set(weekKey, currentWeekHours + hoursWorked);

    // Calculate overtime for this day based on weekly hours
    const weekTotal = weeklyHours.get(weekKey) || 0;
    let regularHours = hoursWorked;
    let overtimeHours = 0;

    if (weekTotal > regularHoursPerWeek) {
      const overtimeToday = Math.min(
        hoursWorked,
        weekTotal - regularHoursPerWeek
      );
      regularHours = hoursWorked - overtimeToday;
      overtimeHours = overtimeToday;
    }

    totalRegularHours += regularHours;
    totalOvertimeHours += overtimeHours;

    // Calculate pay for this day
    const regularPay = regularHours * hourlyRate;
    const overtimePay = overtimeHours * hourlyRate * overtimeRate;

    hoursPerDay.push({
      date: entry.date,
      hours: regularHours,
      overtime: overtimeHours,
      pay: regularPay + overtimePay
    });
  });

  const regularPay = totalRegularHours * hourlyRate;
  const overtimePay = totalOvertimeHours * hourlyRate * overtimeRate;

  return {
    regularHours: Math.round(totalRegularHours * 100) / 100,
    overtimeHours: Math.round(totalOvertimeHours * 100) / 100,
    totalPay: regularPay + overtimePay,
    regularPay,
    overtimePay,
    hoursPerDay,
    totalBreakTime,
    averageHoursPerDay: (totalRegularHours + totalOvertimeHours) / entries.length
  };
}