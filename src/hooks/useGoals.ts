import { useEffect, useState } from 'react'

import type {
  Goal,
} from '../types'

import {
  loadGoals,
  saveGoals,
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

const defaultGoals: Goal[] = [
  {
    id: 1,
    title: 'Buy a bike',
    priority: 'high',
    completed: false,
    createdAt: getTodayDate(),
  },

  {
    id: 2,
    title: 'Change job',
    priority: 'high',
    completed: false,
    createdAt: getTodayDate(),
  },

  {
    id: 3,
    title: 'Build this To-Do app',
    priority: 'medium',
    completed: false,
    createdAt: getTodayDate(),
  },
]

export function useGoals() {
  const [goals, setGoals] =
    useState<Goal[]>(() =>
      loadGoals(defaultGoals),
    )

  useEffect(() => {
    saveGoals(goals)
  }, [goals])

  const addGoal = (
    title: string,
    priority: Goal['priority'],
  ) => {
    const newGoal: Goal = {
      id: Date.now(),
      title,
      priority,
      completed: false,
      createdAt: getTodayDate(),
    }

    setGoals(
      (currentGoals) => [
        ...currentGoals,
        newGoal,
      ],
    )
  }

  const deleteGoal = (
    id: number,
  ) => {
    setGoals(
      (currentGoals) =>
        currentGoals.filter(
          (goal) =>
            goal.id !== id,
        ),
    )
  }

  const editGoal = (
    id: number,
    title: string,
    priority: Goal['priority'],
  ) => {
    setGoals(
      (currentGoals) =>
        currentGoals.map(
          (goal) =>
            goal.id === id
              ? {
                  ...goal,
                  title,
                  priority,
                }
              : goal,
        ),
    )
  }

  const toggleGoal = (
    id: number,
  ) => {
    setGoals(
      (currentGoals) =>
        currentGoals.map(
          (goal) =>
            goal.id === id
              ? {
                  ...goal,
                  completed:
                    !goal.completed,
                }
              : goal,
        ),
    )
  }

  return {
    goals,
    addGoal,
    deleteGoal,
    editGoal,
    toggleGoal,
  }
}