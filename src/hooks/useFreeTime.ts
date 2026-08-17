import { useEffect, useState } from 'react'

import type {
  FreeTimeTask,
} from '../types'

import {
  loadFreeTimeTasks,
  saveFreeTimeTasks,
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

const defaultFreeTimeTasks:
  FreeTimeTask[] = [
    {
      id: 1,
      title: 'Practice chess',
      createdAt: getTodayDate(),
    },

    {
      id: 2,
      title:
        'Watch an educational video',
      createdAt: getTodayDate(),
    },

    {
      id: 3,
      title:
        'Read something interesting',
      createdAt: getTodayDate(),
    },
  ]

export function useFreeTime() {
  const [
    freeTimeTasks,
    setFreeTimeTasks,
  ] = useState<FreeTimeTask[]>(
    () =>
      loadFreeTimeTasks(
        defaultFreeTimeTasks,
      ),
  )

  useEffect(() => {
    saveFreeTimeTasks(
      freeTimeTasks,
    )
  }, [freeTimeTasks])

  const addFreeTimeTask = (
    title: string,
  ) => {
    const newTask: FreeTimeTask = {
      id: Date.now(),
      title,
      createdAt: getTodayDate(),
    }

    setFreeTimeTasks(
      (currentTasks) => [
        ...currentTasks,
        newTask,
      ],
    )
  }

  const deleteFreeTimeTask = (
    id: number,
  ) => {
    setFreeTimeTasks(
      (currentTasks) =>
        currentTasks.filter(
          (task) =>
            task.id !== id,
        ),
    )
  }

  const editFreeTimeTask = (
    id: number,
    title: string,
  ) => {
    setFreeTimeTasks(
      (currentTasks) =>
        currentTasks.map(
          (task) =>
            task.id === id
              ? {
                  ...task,
                  title,
                }
              : task,
        ),
    )
  }

  return {
    freeTimeTasks,
    addFreeTimeTask,
    deleteFreeTimeTask,
    editFreeTimeTask,
  }
}