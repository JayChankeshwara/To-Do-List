import type { DailyTask } from '../types'

export type TaskStats = {
  completed: number
  total: number
  percentage: number
}

export function getTaskStats(
  task: DailyTask,
  dates: string[],
): TaskStats {
  const total = dates.length

  const completed = dates.filter(
    (date) =>
      task.completions[date] === true,
  ).length

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (completed / total) * 100,
        )

  return {
    completed,
    total,
    percentage,
  }
}

export function getOverallStats(
  tasks: DailyTask[],
  dates: string[],
): TaskStats {
  if (tasks.length === 0) {
    return {
      completed: 0,
      total: 0,
      percentage: 0,
    }
  }

  const total =
    tasks.length * dates.length

  const completed =
    tasks.reduce(
      (count, task) => {
        return (
          count +
          dates.filter(
            (date) =>
              task.completions[
                date
              ] === true,
          ).length
        )
      },
      0,
    )

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (completed / total) * 100,
        )

  return {
    completed,
    total,
    percentage,
  }
}