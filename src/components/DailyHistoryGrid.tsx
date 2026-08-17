import {
useEffect,
useRef,
useState,
} from 'react'

import type { DailyTask } from '../types'

import {
addDays,
getDayName,
getDayNumber,
getSixMonthsAgo,
getTodayDate,
getWeekDates,
getWeekStart,
isBeforeDate,
} from '../utils/dateUtils'

type DailyHistoryGridProps = {
tasks: DailyTask[]
selectedDate: string
onSelectedDateChange: (
date: string,
) => void
onToggleTask: (
id: number,
date: string,
) => void
onDeleteTask: (
id: number,
) => void
onEditTask: (
id: number,
title: string,
) => void
}

function DailyHistoryGrid({
tasks,
selectedDate,
onSelectedDateChange,
onToggleTask,
onDeleteTask,
onEditTask,
}: DailyHistoryGridProps) {
const selectedDateRef =
useRef<HTMLButtonElement | null>(
null,
)

const [
editingTaskId,
setEditingTaskId,
] = useState<number | null>(null)

const [
editedTitle,
setEditedTitle,
] = useState('')

const dates =
getWeekDates(selectedDate)

const today =
getTodayDate()

const oldestDate =
getSixMonthsAgo()

const firstDate =
dates[0]

const previousWeekStart =
addDays(
firstDate,
-7,
)

const canGoPrevious =
!isBeforeDate(
previousWeekStart,
oldestDate,
)

/*

* Current week's Monday.
  */
  const currentWeekStart =
  getWeekStart(today)

/*

* Is the currently displayed
* week the current week?
  */
  const isCurrentWeek =
  firstDate ===
  currentWeekStart

/*

* Future week protection.
*
* This should normally be false
* because the next button is
* disabled on the current week,
* but this provides an additional
* safety check.
  */
  const goToPreviousWeek = () => {
  if (!canGoPrevious) {
  return
  }

onSelectedDateChange(

  addDays(
    selectedDate,
    -7,
  ),
)

}

const goToNextWeek = () => {
if (isCurrentWeek) {
return
}

const nextWeekStart =
  addDays(
    firstDate,
    7,
  )

if (
  nextWeekStart >
  currentWeekStart
) {
  return
}

onSelectedDateChange(
  addDays(
    selectedDate,
    7,
  ),
)

}

useEffect(() => {
selectedDateRef.current?.scrollIntoView(
{
behavior: 'smooth',
block: 'nearest',
inline: 'nearest',
},
)
}, [selectedDate])

const isFutureDate = (
date: string,
) => {
return date > today
}

const startEditing = (
task: DailyTask,
) => {
setEditingTaskId(
task.id,
)

setEditedTitle(
  task.title,
)

}

const cancelEditing = () => {
setEditingTaskId(null)
setEditedTitle('')
}

const saveEdit = (
id: number,
) => {
const trimmedTitle =
editedTitle.trim()

if (!trimmedTitle) {
  return
}

onEditTask(
  id,
  trimmedTitle,
)

setEditingTaskId(null)
setEditedTitle('')

}

/*

* Prevent selecting a future
* date from the header.
  */
  const selectDate = (
  date: string,
  ) => {
  if (isFutureDate(date)) {
  return
  }
onSelectedDateChange(date)

}

return ( <section className="daily-history-container">

  {/* =========================
      WEEK NAVIGATION
     ========================= */}

  <div className="daily-week-navigation">

    <button
      type="button"
      className="history-navigation-button"
      onClick={
        goToPreviousWeek
      }
      disabled={
        !canGoPrevious
      }
      aria-label="Previous week"
    >
      ‹
    </button>


    <div className="daily-week-label">
      {dates[0]} – {dates[6]}
    </div>


    <button
      type="button"
      className="history-navigation-button"
      onClick={
        goToNextWeek
      }
      disabled={
        isCurrentWeek
      }
      aria-label="Next week"
    >
      ›
    </button>

  </div>


  {/* =========================
      DAILY GRID
     ========================= */}

  <div className="daily-history-scroll">

    <div className="daily-history-grid">

      {/* =========================
          HEADER
         ========================= */}

      <div className="daily-task-name-header">
        <span>
          Tasks
        </span>
      </div>


      {dates.map(
        (date) => {
          const isSelected =
            date ===
            selectedDate

          const isToday =
            date === today

          const isFuture =
            isFutureDate(
              date,
            )

          return (
            <button
              type="button"
              key={date}
              ref={
                isSelected
                  ? selectedDateRef
                  : null
              }
              className={[
                'daily-date',
                isSelected
                  ? 'selected'
                  : '',
                isToday
                  ? 'today'
                  : '',
                isFuture
                  ? 'future'
                  : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() =>
                selectDate(date)
              }
              disabled={
                isFuture
              }
              aria-label={`Select ${date}`}
            >

              <span>
                {getDayName(
                  date,
                )}
              </span>

              <strong>
                {getDayNumber(
                  date,
                )}
              </strong>

              {isToday && (
                <small>
                  TODAY
                </small>
              )}

            </button>
          )
        },
      )}


      {/* =========================
          EMPTY STATE
         ========================= */}

      {tasks.length === 0 && (
        <div className="daily-empty-state">

          <strong>
            No daily tasks yet.
          </strong>

          <span>
            Add your first daily
            task below.
          </span>

        </div>
      )}


      {/* =========================
          TASK ROWS
         ========================= */}

      {tasks.map(
        (task) => {

          const isEditing =
            editingTaskId ===
            task.id

          return (
            <div
              className="daily-task-row"
              key={task.id}
            >

              {/* =========================
                  TASK NAME + ACTIONS
                 ========================= */}

              <div
                className="daily-task-name"
                title={
                  isEditing
                    ? undefined
                    : task.title
                }
              >

                {isEditing ? (
                  <div className="daily-task-edit">

                    <input
                      type="text"
                      value={
                        editedTitle
                      }
                      onChange={(
                        event,
                      ) =>
                        setEditedTitle(
                          event.target
                            .value,
                        )
                      }
                      autoFocus
                      onKeyDown={(
                        event,
                      ) => {
                        if (
                          event.key ===
                          'Enter'
                        ) {
                          saveEdit(
                            task.id,
                          )
                        }

                        if (
                          event.key ===
                          'Escape'
                        ) {
                          cancelEditing()
                        }
                      }}
                    />

                    <button
                      type="button"
                      className="daily-edit-save"
                      onClick={() =>
                        saveEdit(
                          task.id,
                        )
                      }
                    >
                      Save
                    </button>

                    <button
                      type="button"
                      className="daily-edit-cancel"
                      onClick={
                        cancelEditing
                      }
                    >
                      Cancel
                    </button>

                  </div>
                ) : (
                  <>

                    <span className="daily-task-title">
                      {task.title}
                    </span>

                    <div className="daily-task-actions">

                      <button
                        type="button"
                        onClick={() =>
                          startEditing(
                            task,
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
onClick={() => {
  const confirmed = window.confirm(
    `Delete "${task.title}"?`,
  )

  if (confirmed) {
    onDeleteTask(task.id)
  }
}}
                      >
                        Delete
                      </button>

                    </div>

                  </>
                )}

              </div>


              {/* =========================
                  COMPLETION CELLS
                 ========================= */}

              {dates.map(
                (date) => {

const beforeTaskCreated =
  date < task.createdAt

const completed =
  task.completions[
    date
  ] ??
  false

const future =
  isFutureDate(
    date,
  )

                  return (
<button
  type="button"
  key={`${task.id}-${date}`}
  className={[
    'daily-cell',
    completed
      ? 'completed'
      : '',
    future
      ? 'future'
      : '',
    beforeTaskCreated
      ? 'before-created'
      : '',
  ]
    .filter(
      Boolean,
    )
    .join(
      ' ',
    )}
  disabled={
    future ||
    beforeTaskCreated
  }
                      onClick={() =>
                        onToggleTask(
                          task.id,
                          date,
                        )
                      }
                      aria-label={
                        future
                          ? `${task.title} - future date`
                          : `${task.title} - ${
                              completed
                                ? 'completed'
                                : 'not completed'
                            }`
                      }
                    >

{beforeTaskCreated
  ? ''
  : future
    ? '·'
    : completed
      ? '✓'
      : '×'}

                    </button>
                  )
                },
              )}

            </div>
          )
        },
      )}

    </div>

  </div>

</section>

)
}

export default DailyHistoryGrid
