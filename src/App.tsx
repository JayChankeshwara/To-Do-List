import { useState } from 'react'
import './App.css'

import type { Tab } from './types'

import { useTasks } from './hooks/useTasks'
import DailyPerformance from './components/DailyPerformance'
import { useWeeklyTasks } from './hooks/useWeeklyTasks'
import { useGoals } from './hooks/useGoals'
import { useFreeTime } from './hooks/useFreeTime'

import WeeklyTaskList from './components/WeeklyTaskList'

import {
  getTodayDate,
  getWeekKey,
  getWeekDates,
  addDays,
} from './utils/dateUtils'

import DailyHistoryGrid from './components/DailyHistoryGrid'
import AddTaskForm from './components/AddTaskForm'
import FreeTimeList from './components/FreeTimeList'
import GoalList from './components/GoalList'
import AddGoalForm from './components/AddGoalForm'

function App() {
  const [currentTab, setCurrentTab] =
    useState<Tab>('daily')

  /*
   * DAILY DATE
   *
   * This controls the Daily tab only.
   */
  const [
    selectedDate,
    setSelectedDate,
  ] = useState(getTodayDate())

  /*
   * WEEKLY DATE
   *
   * This controls the Weekly tab only.
   */
  const [
    selectedWeeklyDate,
    setSelectedWeeklyDate,
  ] = useState(getTodayDate())

  const {
    tasks,
    addTask,
    deleteTask,
    editTask,
    toggleTask,
  } = useTasks()

  const {
    weeklyTasks,
    addWeeklyTask,
    deleteWeeklyTask,
    editWeeklyTask,
    toggleWeeklyTask,
  } = useWeeklyTasks()

  const {
    goals,
    addGoal,
    toggleGoal,
    deleteGoal,
    editGoal,
  } = useGoals()

  const {
    freeTimeTasks,
    addFreeTimeTask,
    deleteFreeTimeTask,
    editFreeTimeTask,
  } = useFreeTime()

  /*
   * WEEKLY TAB WEEK
   */
  const selectedWeeklyWeek =
    getWeekKey(selectedWeeklyDate)

  const selectedWeeklyWeekDates =
    getWeekDates(selectedWeeklyDate)

  /*
   * CURRENT WEEK
   */
  const currentWeekKey =
    getWeekKey(getTodayDate())

  /*
   * Move the Weekly tab one week backwards.
   */
  const goToPreviousWeeklyWeek = () => {
    setSelectedWeeklyDate(
      addDays(
        selectedWeeklyDate,
        -7,
      ),
    )
  }

  /*
   * Move the Weekly tab one week forwards.
   *
   * Future weeks are not allowed.
   */
  const goToNextWeeklyWeek = () => {
    if (
      selectedWeeklyWeek ===
      currentWeekKey
    ) {
      return
    }

    const nextDate =
      addDays(
        selectedWeeklyDate,
        7,
      )

    /*
     * Safety check:
     *
     * Do not allow the selected week
     * to move beyond the current week.
     */
    if (
      getWeekKey(nextDate) >
      currentWeekKey
    ) {
      return
    }

    setSelectedWeeklyDate(
      nextDate,
    )
  }

  /*
   * Return Weekly tab to the
   * current week.
   */
  const goToCurrentWeeklyWeek = () => {
    setSelectedWeeklyDate(
      getTodayDate(),
    )
  }

  /*
   * Readable Weekly date range.
   *
   * Example:
   * Aug 10 – Aug 16
   */
  const weeklyWeekLabel = (() => {
    const firstDate =
      new Date(
        selectedWeeklyWeekDates[0],
      )

    const lastDate =
      new Date(
        selectedWeeklyWeekDates[6],
      )

    const formatDate = (
      date: Date,
    ) =>
      date.toLocaleDateString(
        'en-IN',
        {
          month: 'short',
          day: 'numeric',
        },
      )

    return `${formatDate(
      firstDate,
    )} – ${formatDate(lastDate)}`
  })()

  const isCurrentWeeklyWeek =
    selectedWeeklyWeek ===
    currentWeekKey

  /*
   * Each tab gets its own subtle visual identity.
   *
   * The class is applied to the main app
   * so the CSS can theme the entire active area.
   */

  return (
<main className={`app theme-${currentTab}`}>

      <header className="app-header">

        <h1>
          Todo
        </h1>

        <p>
          Make today count.
        </p>

      </header>


      <nav className="tabs">

        <button
          type="button"
          className={
            currentTab === 'daily'
              ? 'active'
              : ''
          }
          onClick={() =>
            setCurrentTab('daily')
          }
        >
          Daily
        </button>


        <button
          type="button"
          className={
            currentTab === 'weekly'
              ? 'active'
              : ''
          }
          onClick={() =>
            setCurrentTab('weekly')
          }
        >
          Weekly
        </button>


        <button
          type="button"
          className={
            currentTab === 'goals'
              ? 'active'
              : ''
          }
          onClick={() =>
            setCurrentTab('goals')
          }
        >
          Goals
        </button>


        <button
          type="button"
          className={
            currentTab === 'freeTime'
              ? 'active'
              : ''
          }
          onClick={() =>
            setCurrentTab('freeTime')
          }
        >
          Free Time
        </button>

      </nav>


      <section className="tasks">

        {/* =========================
            DAILY
           ========================= */}

        {currentTab === 'daily' && (
          <>

            <h2>
              Daily Tasks
            </h2>


            <DailyHistoryGrid
              tasks={tasks}
              selectedDate={
                selectedDate
              }
              onSelectedDateChange={
                setSelectedDate
              }
              onToggleTask={
                toggleTask
              }
              onDeleteTask={
                deleteTask
              }
              onEditTask={
                editTask
              }
            />


            <DailyPerformance
              tasks={tasks}
            />


            <AddTaskForm
              onAddTask={addTask}
            />

          </>
        )}


        {/* =========================
            WEEKLY
           ========================= */}

        {currentTab === 'weekly' && (
          <>

            <h2>
              Weekly Tasks
            </h2>


            <div className="weekly-navigation">

              <button
                type="button"
                className="weekly-nav-arrow"
                onClick={
                  goToPreviousWeeklyWeek
                }
                aria-label="Previous week"
              >
                ‹
              </button>


              <strong className="weekly-week-label">
                {weeklyWeekLabel}
              </strong>


              <button
                type="button"
                className="weekly-nav-arrow"
                onClick={
                  goToNextWeeklyWeek
                }
                disabled={
                  isCurrentWeeklyWeek
                }
                aria-label="Next week"
              >
                ›
              </button>

            </div>


            {!isCurrentWeeklyWeek && (
              <button
                type="button"
                className="weekly-current-button"
                onClick={
                  goToCurrentWeeklyWeek
                }
              >
                This Week
              </button>
            )}


            <AddTaskForm
              onAddTask={
                addWeeklyTask
              }
            />


            <WeeklyTaskList
              tasks={
                weeklyTasks
              }
              selectedWeek={
                selectedWeeklyWeek
              }
              onToggleTask={
                toggleWeeklyTask
              }
              onEditTask={
                editWeeklyTask
              }
              onDeleteTask={
                deleteWeeklyTask
              }
            />

          </>
        )}


        {/* =========================
            GOALS
           ========================= */}

        {currentTab === 'goals' && (
          <>

            <h2>
              Goals
            </h2>


            <p>
              Things you want to
              accomplish over time.
            </p>


            <AddGoalForm
              onAddGoal={
                addGoal
              }
            />


            <GoalList
              goals={goals}
              onToggleGoal={
                toggleGoal
              }
              onDeleteGoal={
                deleteGoal
              }
              onEditGoal={
                editGoal
              }
            />

          </>
        )}


        {/* =========================
            FREE TIME
           ========================= */}

        {currentTab === 'freeTime' && (
          <>

            <h2>
              Free Time
            </h2>


            <p>
              Useful things you
              can do when you have
              some spare time.
            </p>


            <AddTaskForm
              onAddTask={
                addFreeTimeTask
              }
            />


            <FreeTimeList
              tasks={
                freeTimeTasks
              }
              onDeleteTask={
                deleteFreeTimeTask
              }
              onEditTask={
                editFreeTimeTask
              }
            />

          </>
        )}

      </section>

    </main>
  )
}

export default App