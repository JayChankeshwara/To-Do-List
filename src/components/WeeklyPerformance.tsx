import type { DailyTask } from '../types'

type WeeklyPerformanceProps = {
  tasks: DailyTask[]
  dates: string[]
}

function WeeklyPerformance({
  tasks,
  dates,
}: WeeklyPerformanceProps) {
  return (
    <section className="weekly-performance">
      <div className="weekly-performance-header">
        <div>
          <h3>Weekly Performance</h3>
          <p>
            A quick visual look at your consistency.
          </p>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="weekly-performance-empty">
          Add some daily tasks to start tracking
          your consistency.
        </div>
      ) : (
        <div className="weekly-performance-list">
          {tasks.map((task) => {
            const completedDays = dates.filter(
              (date) =>
                task.completions[date] === true,
            ).length

            return (
              <div
                className="weekly-performance-item"
                key={task.id}
              >
                <div className="weekly-performance-task">
                  <span>{task.title}</span>

                  <small>
                    {completedDays}/
                    {dates.length}
                  </small>
                </div>

                <div className="weekly-performance-bar">
                  {dates.map((date) => {
                    const completed =
                      task.completions[date] ===
                      true

                    return (
                      <span
                        key={date}
                        className={
                          completed
                            ? 'performance-segment completed'
                            : 'performance-segment'
                        }
                        title={
                          completed
                            ? `${date}: completed`
                            : `${date}: not completed`
                        }
                      />
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default WeeklyPerformance