export function formatDate(
date: Date,
): string {
return [
date.getFullYear(),
String(
date.getMonth() + 1,
).padStart(2, '0'),
String(
date.getDate(),
).padStart(2, '0'),
].join('-')
}

export function parseDate(
dateString: string,
): Date {
const [
year,
month,
day,
] = dateString
.split('-')
.map(Number)

return new Date(
year,
month - 1,
day,
)
}

export function getTodayDate(): string {
return formatDate(
new Date(),
)
}

export function addDays(
dateString: string,
amount: number,
): string {
const date =
parseDate(dateString)

date.setDate(
date.getDate() + amount,
)

return formatDate(date)
}

export function getWeekStart(
dateString: string,
): string {
const date =
parseDate(dateString)

const day =
date.getDay()

const difference =
day === 0
? -6
: 1 - day

date.setDate(
date.getDate() +
difference,
)

return formatDate(date)
}

export function getWeekDates(
dateString: string,
): string[] {
const weekStart =
getWeekStart(dateString)

return Array.from(
{ length: 7 },
(_, index) =>
addDays(
weekStart,
index,
),
)
}

/*

* ISO week key
*
* Example:
* 2026-W33
*
* Weeks start on Monday.
*
* The week-year is determined by
* the Thursday belonging to that week.
  */
  export function getWeekKey(
  dateString: string,
  ): string {
  const date =
  parseDate(dateString)

const day =
date.getDay()

const isoDay =
day === 0
? 7
: day

/*

* Move to Thursday of the
* current ISO week.
  */
  const thursday =
  new Date(date)

thursday.setDate(
thursday.getDate() +
(4 - isoDay),
)

const weekYear =
thursday.getFullYear()

/*

* January 4 is always inside
* ISO week 1.
  */
  const januaryFourth =
  new Date(
  weekYear,
  0,
  4,
  )

const januaryFourthDay =
januaryFourth.getDay()

const januaryFourthIsoDay =
januaryFourthDay === 0
? 7
: januaryFourthDay

/*

* Find Monday of ISO week 1.
  */
  const weekOneMonday =
  new Date(
  januaryFourth,
  )

weekOneMonday.setDate(
weekOneMonday.getDate() -
(januaryFourthIsoDay - 1),
)

const differenceInDays =
Math.round(
(
date.getTime() -
weekOneMonday.getTime()
) /
86400000,
)

const weekNumber =
Math.floor(
differenceInDays / 7,
) + 1

return (
String(weekYear) +
'-W' +
String(
weekNumber,
).padStart(2, '0')
)
}

/*

* Compatibility helpers
*
* These are currently used by
* DailyHistoryGrid.
  */

export function getDayName(
dateString: string,
): string {
return parseDate(
dateString,
).toLocaleDateString(
'en-US',
{
weekday: 'short',
},
)
}

export function getDayNumber(
dateString: string,
): number {
return parseDate(
dateString,
).getDate()
}

export function getSixMonthsAgo(
dateString: string = getTodayDate(),
): string {
const date =
parseDate(dateString)

date.setMonth(
date.getMonth() - 6,
)

return formatDate(date)
}

export function isBeforeDate(
firstDate: string,
secondDate: string,
): boolean {
return (
parseDate(firstDate).getTime() <
parseDate(secondDate).getTime()
)
}

export function getSixMonthDates(
dateString: string,
): string[] {
const endDate =
parseDate(dateString)

const startDate =
new Date(endDate)

startDate.setMonth(
startDate.getMonth() - 6,
)

const dates: string[] = []

const currentDate =
new Date(startDate)

while (
currentDate <= endDate
) {
dates.push(
formatDate(
currentDate,
),
)

currentDate.setDate(
  currentDate.getDate() + 1,
)

}

return dates
}
