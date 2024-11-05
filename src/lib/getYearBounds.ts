export const getYearBounds = (year: number) => {
  const startOfYear = new Date(year, 0, 1)

  const endOfYear = new Date(
    year,
    11,
    31,
    23,
    59,
    59,
  )

  return [startOfYear.getTime(), endOfYear.getTime()]
}
