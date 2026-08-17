import { useEffect, useState } from 'react'

import type {
  WeeklyTask,
} from '../types'

import {
  loadWeeklyTasks,
  saveWeeklyTasks,
} from '../storage'

function getTodayDate() {
  const date = new Date()

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

const defaultWeeklyTasks:
  WeeklyTask[] = [
    {
      id: 1,
      title: 'Clean the room',
      completions: {},
      createdAt: getTodayDate(),
    },

    {
      id: 2,
      title: 'Review finances',
      completions: {},
      createdAt: getTodayDate(),
    },

    {
      id: 3,
      title: 'Plan next week',
      completions: {},
      createdAt: getTodayDate(),
    },
  ]

export function useWeeklyTasks() {
  const [
    weeklyTasks,
    setWeeklyTasks,
  ] = useState<WeeklyTask[]>(
    () =>
      loadWeeklyTasks(
        defaultWeeklyTasks,
      ),
  )

  useEffect(() => {
    saveWeeklyTasks(
      weeklyTasks,
    )
  }, [weeklyTasks])

  const addWeeklyTask = (
    title: string,
  ) => {
    const newTask: WeeklyTask = {
      id: Date.now(),
      title,
      completions: {},
      createdAt: getTodayDate(),
    }

    setWeeklyTasks(
      (currentTasks) => [
        ...currentTasks,
        newTask,
      ],
    )
  }

  const deleteWeeklyTask = (
    id: number,
  ) => {
    setWeeklyTasks(
      (currentTasks) =>
        currentTasks.filter(
          (task) =>
            task.id !== id,
        ),
    )
  }

  const editWeeklyTask = (
    id: number,
    newTitle: string,
  ) => {
    setWeeklyTasks(
      (currentTasks) =>
        currentTasks.map(
          (task) =>
            task.id === id
              ? {
                  ...task,
                  title: newTitle,
                }
              : task,
        ),
    )
  }

  const toggleWeeklyTask = (
    id: number,
    weekKey: string,
  ) => {
    setWeeklyTasks(
      (currentTasks) =>
        currentTasks.map(
          (task) => {
            if (
              task.id !== id
            ) {
              return task
            }

            const currentValue =
              task.completions[
                weekKey
              ] ?? false

            return {
              ...task,

              completions: {
                ...task.completions,

                [weekKey]:
                  !currentValue,
              },
            }
          },
        ),
    )
  }

  return {
    weeklyTasks,
    addWeeklyTask,
    deleteWeeklyTask,
    editWeeklyTask,
    toggleWeeklyTask,
  }
}