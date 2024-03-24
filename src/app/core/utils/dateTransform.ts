function transformDate(date: Date): string {
  const year: number = date.getUTCFullYear();
  const month: string = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day: string = date.getUTCDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function transformDateAddYear(date: Date, numberYear: number): string {
  const year: number = date.getUTCFullYear() + numberYear;
  const month: string = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day: string = date.getUTCDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}
export { transformDate, transformDateAddYear };
