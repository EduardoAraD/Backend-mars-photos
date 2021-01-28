export function firstDate (date1: string, date2: string) {
  const val1 = (new Date(date1)).getTime()
  const val2 = (new Date(date2)).getTime()
  if (val1 < val2) return 1
  else if (val1 === val2) return 0
  else return -1
}
