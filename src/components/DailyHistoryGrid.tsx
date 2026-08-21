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

  const [
    menuTaskId,
    setMenuTaskId,
  ] = useState<number | null>(null)

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

  const currentWeekStart =
    getWeekStart(today)

  const isCurrentWeek =
    firstDate ===
    currentWeekStart

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

  /*
   * Open / close the task action popup.
   */
  const toggleTaskMenu = (
    taskId: number,
  ) => {
    setMenuTaskId(
      current =>
        current === taskId
          ? null
          : taskId,
    )
  }

  /*
   * Start editing.
   */
  const startEditing = (
    task: DailyTask,
  ) => {
    setMenuTaskId(null)

    setEditingTaskId(
      task.id,
    )

    setEditedTitle(
      task.title,
    )
  }

  /*
   * Close edit popup.
   */
  const cancelEditing = () => {
    setEditingTaskId(null)
    setEditedTitle('')
  }

  /*
   * Save edited task.
   */
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
   * Delete task.
   */
  const deleteTask = (
    task: DailyTask,
  ) => {
    setMenuTaskId(null)

    const confirmed =
      window.confirm(
        `Delete "${task.title}"?`,
      )

    if (confirmed) {
      onDeleteTask(
        task.id,
      )
    }
  }

  /*
   * Prevent selecting
   * future dates.
   */
  const selectDate = (
    date: string,
  ) => {
    if (isFutureDate(date)) {
      return
    }

    onSelectedDateChange(date)
  }

  /*
   * Find the task currently
   * selected in the action popup.
   */
  const menuTask =
    tasks.find(
      task =>
        task.id ===
        menuTaskId,
    )

  return (
    <section className="daily-history-container">

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
            date => {
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
            task => {

              return (
                <div
                  className="daily-task-row"
                  key={task.id}
                >

                  {/* =========================
                      TASK NAME
                     ========================= */}

                  <div
                    className="daily-task-name"
                    title={task.title}
                  >

                    <span className="daily-task-title">
                      {task.title}
                    </span>


                    {/* =========================
                        THREE DOT BUTTON
                       ========================= */}

                    <button
                      type="button"
                      className="daily-task-menu-button"
                      onClick={() =>
                        toggleTaskMenu(
                          task.id,
                        )
                      }
                      aria-label={`Manage ${task.title}`}
                      aria-expanded={
                        menuTaskId ===
                        task.id
                      }
                    >
                      ⋮
                    </button>

                  </div>


                  {/* =========================
                      COMPLETION CELLS
                     ========================= */}

                  {dates.map(
                    date => {

                      const beforeTaskCreated =
                        date <
                        task.createdAt

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
                            .join(' ')}
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


      {/* =====================================================
          TASK ACTION POPUP
         ===================================================== */}

      {menuTask && (
        <div
          className="daily-task-action-backdrop"
          onMouseDown={event => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setMenuTaskId(null)
            }
          }}
        >

          <div
            className="daily-task-action-popup"
            role="dialog"
            aria-modal="true"
            aria-labelledby="daily-task-action-title"
          >

            <div className="daily-task-action-header">

              <span>
                Task options
              </span>

              <button
                type="button"
                className="daily-task-action-close"
                onClick={() =>
                  setMenuTaskId(null)
                }
                aria-label="Close"
              >
                ×
              </button>

            </div>


            <div
              id="daily-task-action-title"
              className="daily-task-action-task-name"
              title={menuTask.title}
            >
              {menuTask.title}
            </div>


            <div className="daily-task-action-buttons">

              <button
                type="button"
                className="daily-task-action-edit"
                onClick={() =>
                  startEditing(
                    menuTask,
                  )
                }
              >
                Edit
              </button>

              <button
                type="button"
                className="daily-task-action-delete"
                onClick={() =>
                  deleteTask(
                    menuTask,
                  )
                }
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      )}


      {/* =====================================================
          EDIT TASK MODAL
         ===================================================== */}

      {editingTaskId !== null && (
        <div
          className="daily-task-modal-backdrop"
          onMouseDown={event => {
            if (
              event.target ===
              event.currentTarget
            ) {
              cancelEditing()
            }
          }}
        >

          <div
            className="daily-task-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-daily-task-title"
          >

            <h3 id="edit-daily-task-title">
              Edit Daily Task
            </h3>

            <label
              htmlFor="daily-task-edit-input"
            >
              Task name
            </label>

            <input
              id="daily-task-edit-input"
              type="text"
              value={
                editedTitle
              }
              onChange={event =>
                setEditedTitle(
                  event.target.value,
                )
              }
              autoFocus
              onKeyDown={event => {

                if (
                  event.key ===
                  'Enter'
                ) {
                  saveEdit(
                    editingTaskId,
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

            <div className="daily-task-modal-actions">

              <button
                type="button"
                className="daily-task-modal-cancel"
                onClick={
                  cancelEditing
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="daily-task-modal-save"
                onClick={() =>
                  saveEdit(
                    editingTaskId,
                  )
                }
                disabled={
                  !editedTitle.trim()
                }
              >
                Save
              </button>

            </div>

          </div>

        </div>
      )}

    </section>
  )
}

export default DailyHistoryGrid