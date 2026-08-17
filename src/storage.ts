import type {
  DailyTask,
  WeeklyTask,
  Goal,
  FreeTimeTask,
} from './types'

const TASKS_KEY = 'todo_daily_tasks'
const WEEKLY_TASKS_KEY =
  'todo_weekly_tasks'
const GOALS_KEY = 'todo_goals'
const FREE_TIME_TASKS_KEY =
  'todo_free_time_tasks'

function load<T>(
  key: string,
  fallback: T,
): T {
  try {
    const stored =
      localStorage.getItem(key)

    if (!stored) {
      return fallback
    }

    return JSON.parse(stored) as T
  } catch {
    return fallback
  }
}

function save<T>(
  key: string,
  data: T,
) {
  localStorage.setItem(
    key,
    JSON.stringify(data),
  )
}

/* ----------------------------- */
/* Daily Tasks                    */
/* ----------------------------- */

export function loadTasks(
  fallback: DailyTask[],
): DailyTask[] {
  return load(
    TASKS_KEY,
    fallback,
  )
}

export function saveTasks(
  tasks: DailyTask[],
) {
  save(TASKS_KEY, tasks)
}

/* ----------------------------- */
/* Weekly Tasks                   */
/* ----------------------------- */

export function loadWeeklyTasks(
  fallback: WeeklyTask[],
): WeeklyTask[] {
  return load(
    WEEKLY_TASKS_KEY,
    fallback,
  )
}

export function saveWeeklyTasks(
  tasks: WeeklyTask[],
) {
  save(
    WEEKLY_TASKS_KEY,
    tasks,
  )
}

/* ----------------------------- */
/* Goals                          */
/* ----------------------------- */

export function loadGoals(
  fallback: Goal[],
): Goal[] {
  return load(
    GOALS_KEY,
    fallback,
  )
}

export function saveGoals(
  goals: Goal[],
) {
  save(GOALS_KEY, goals)
}

/* ----------------------------- */
/* Free Time                      */
/* ----------------------------- */

export function loadFreeTimeTasks(
  fallback: FreeTimeTask[],
): FreeTimeTask[] {
  return load(
    FREE_TIME_TASKS_KEY,
    fallback,
  )
}

export function saveFreeTimeTasks(
  tasks: FreeTimeTask[],
) {
  save(
    FREE_TIME_TASKS_KEY,
    tasks,
  )
}