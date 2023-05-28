export function getMondaysOfYear(year: number): Date[] {
  const mondays: Date[] = [];
  const date = new Date(year, 0, 1);

  while (date.getFullYear() === year) {
    if (date.getDay() === 1) {
      mondays.push(new Date(date));
    }
    date.setDate(date.getDate() + 1);
  }
  return mondays;
}
export function getDaysBetweenDates(startDate: Date, endDate: Date): Date[] {
  const days: Date[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return days;
}

export function addTimeToDates(dates: Date[], startTime: string, endTime: string): { date: Date; entryTime: string; exitTime: string }[] {
  const datesWithTime: { date: Date; entryTime: string; exitTime: string }[] = [];

  for (const date of dates) {
    const dateWithTime = {
      date,
      entryTime: startTime,
      exitTime: endTime,
    };
    datesWithTime.push(dateWithTime);
  }
  return datesWithTime;
}

export function compareDates(startDate: Date, endDate: Date): string {
  if (startDate > endDate) {
    return "Error the start date is greater than the end date";
  } else {
    return "";
  }
}
