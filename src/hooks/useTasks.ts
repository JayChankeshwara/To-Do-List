import { useEffect, useState } from 'react'

import type {
  DailyTask,
} from '../types'

import {
  loadTasks,
  saveTasks,
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

const defaultTasks: DailyTask[] = [
  {
    id: 1,
    title: 'Exercise',
    completions: {},
    createdAt: getTodayDate(),
  },

  {
    id: 2,
    title: 'Read 20 pages',
    completions: {},
    createdAt: getTodayDate(),
  },

  {
    id: 3,
    title: 'Work on personal project',
    completions: {},
    createdAt: getTodayDate(),
  },
]

export function useTasks() {
  const [tasks, setTasks] =
    useState<DailyTask[]>(() =>
      loadTasks(defaultTasks),
    )

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const addTask = (
    title: string,
  ) => {
    const newTask: DailyTask = {
      id: Date.now(),
      title,
      completions: {},
      createdAt: getTodayDate(),
    }

    setTasks(
      (currentTasks) => [
        ...currentTasks,
        newTask,
      ],
    )
  }

  const deleteTask = (
    id: number,
  ) => {
    setTasks(
      (currentTasks) =>
        currentTasks.filter(
          (task) =>
            task.id !== id,
        ),
    )
  }

  const editTask = (
    id: number,
    newTitle: string,
  ) => {
    setTasks(
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

  const toggleTask = (
    id: number,
    selectedDate: string,
  ) => {
    setTasks(
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
                selectedDate
              ] ?? false

            return {
              ...task,

              completions: {
                ...task.completions,

                [selectedDate]:
                  !currentValue,
              },
            }
          },
        ),
    )
  }

  return {
    tasks,
    addTask,
    deleteTask,
    editTask,
    toggleTask,
  }
}