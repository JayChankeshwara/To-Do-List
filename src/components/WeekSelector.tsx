type WeekDay = {
  date: string
  dayName: string
  dayNumber: number
}

type WeekSelectorProps = {
  days: WeekDay[]
  selectedDate: string
  onSelectDate: (date: string) => void
}

function WeekSelector({
  days,
  selectedDate,
  onSelectDate,
}: WeekSelectorProps) {
  return (
    <div className="week-selector">
      {days.map((day) => (
        <button
          key={day.date}
          className={selectedDate === day.date ? 'selected-day' : ''}
          onClick={() => onSelectDate(day.date)}
        >
          <span>{day.dayName}</span>
          <strong>{day.dayNumber}</strong>
        </button>
      ))}
    </div>
  )
}

export default WeekSelector