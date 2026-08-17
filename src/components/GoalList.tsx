import { useState } from 'react'
import type { Goal } from '../types'

type GoalListProps = {
  goals: Goal[]
  onToggleGoal: (id: number) => void
  onDeleteGoal: (id: number) => void
  onEditGoal: (
    id: number,
    title: string,
    priority: Goal['priority'],
  ) => void
}

function GoalList({
  goals,
  onToggleGoal,
  onDeleteGoal,
  onEditGoal,
}: GoalListProps) {
  const [editingId, setEditingId] =
    useState<number | null>(null)

  const [editTitle, setEditTitle] =
    useState('')

  const [editPriority, setEditPriority] =
    useState<Goal['priority']>('medium')

  const startEditing = (goal: Goal) => {
    setEditingId(goal.id)
    setEditTitle(goal.title)
    setEditPriority(goal.priority)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditTitle('')
    setEditPriority('medium')
  }

  const saveEditing = (id: number) => {
    const trimmedTitle =
      editTitle.trim()

    if (!trimmedTitle) {
      return
    }

    onEditGoal(
      id,
      trimmedTitle,
      editPriority,
    )

    cancelEditing()
  }

  if (goals.length === 0) {
    return (
      <div className="goal-empty-state">
        No goals yet.
      </div>
    )
  }

  return (
    <div className="goal-list">

      {goals.map((goal) => {

        const isEditing =
          editingId === goal.id

        if (isEditing) {
          return (
            <div
              className="goal-item goal-editing"
              key={goal.id}
            >

              <div className="goal-edit-form">

                <input
                  type="text"
                  value={editTitle}
                  onChange={(event) =>
                    setEditTitle(
                      event.target.value,
                    )
                  }
                  autoFocus
                />

                <select
                  value={editPriority}
                  onChange={(event) =>
                    setEditPriority(
                      event.target
                        .value as Goal['priority'],
                    )
                  }
                >
                  <option value="low">
                    Low
                  </option>

                  <option value="medium">
                    Medium
                  </option>

                  <option value="high">
                    High
                  </option>
                </select>

              </div>

              <div className="goal-actions">

                <button
                  type="button"
                  onClick={() =>
                    saveEditing(goal.id)
                  }
                >
                  Save
                </button>

                <button
                  type="button"
                  onClick={cancelEditing}
                >
                  Cancel
                </button>

              </div>

            </div>
          )
        }

        return (
          <div
            className={[
              'goal-item',
              goal.completed
                ? 'completed'
                : '',
            ]
              .filter(Boolean)
              .join(' ')}
            key={goal.id}
          >

            <div className="goal-main">

              <input
                type="checkbox"
                checked={goal.completed}
                onChange={() =>
                  onToggleGoal(goal.id)
                }
              />

              <span
                className={
                  goal.completed
                    ? 'completed'
                    : ''
                }
              >
                {goal.title}
              </span>

            </div>

            <div className="goal-actions">

              <span
                className={[
                  'goal-priority',
                  `priority-${goal.priority}`,
                ].join(' ')}
              >
                {goal.priority}
              </span>

              <button
                type="button"
                onClick={() =>
                  startEditing(goal)
                }
              >
                Edit
              </button>

              <button
                type="button"
onClick={() => {
  const confirmed = window.confirm(
    `Delete "${goal.title}"?`,
  )

  if (confirmed) {
    onDeleteGoal(goal.id)
  }
}}
              >
                Delete
              </button>

            </div>

          </div>
        )
      })}

    </div>
  )
}

export default GoalList