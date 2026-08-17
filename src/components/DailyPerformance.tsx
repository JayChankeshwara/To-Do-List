import type { DailyTask } from '../types'

type DailyPerformanceProps = {
  tasks: DailyTask[]
}

function getTodayDate() {
  const date = new Date()

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-')
}

function getMonthDates() {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()

  const daysInMonth = new Date(
    year,
    month + 1,
    0,
  ).getDate()

  const dates: string[] = []

  for (let day = 1; day <= daysInMonth; day++) {
    dates.push(
      [
        year,
        String(month + 1).padStart(2, '0'),
        String(day).padStart(2, '0'),
      ].join('-'),
    )
  }

  return dates
}

function DailyPerformance({
  tasks,
}: DailyPerformanceProps) {
  const dates = getMonthDates()
  const today = getTodayDate()

  if (tasks.length === 0) {
    return (
      <section className="daily-performance">
        <div className="daily-performance-header">
          <div>
            <h3>Daily Performance</h3>
            <p>
              A simple visual view of your monthly consistency.
            </p>
          </div>
        </div>

        <div className="daily-performance-empty">
          Add some daily tasks to start tracking performance.
        </div>
      </section>
    )
  }

  return (
    <section className="daily-performance">
      <div className="daily-performance-header">
        <div>
          <h3>Daily Performance</h3>

          <p>
            Your consistency this month.
          </p>
        </div>
      </div>

      <div className="daily-performance-list">
        {tasks.map((task) => (
          <div
            className="daily-performance-item"
            key={task.id}
          >
            <div className="daily-performance-task">
              <span>
                {task.title}
              </span>
            </div>

            <div className="daily-performance-bar">
              {dates.map((date) => {
                const completed =
                  task.completions[date] === true

                const future =
                  date > today

                return (
                  <span
                    key={date}
                    className={[
                      'daily-performance-segment',
                      completed
                        ? 'completed'
                        : '',
                      future
                        ? 'future'
                        : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    title={`${date}${
                      future
                        ? ': future'
                        : completed
                          ? ': completed'
                          : ': not completed'
                    }`}
                  />
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default DailyPerformance