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
  const [
    editingId,
    setEditingId,
  ] = useState<number | null>(null)

  const [
    editTitle,
    setEditTitle,
  ] = useState('')

  const [
    editPriority,
    setEditPriority,
  ] = useState<Goal['priority']>('medium')

  const startEditing = (
    goal: Goal,
  ) => {
    setEditingId(goal.id)
    setEditTitle(goal.title)
    setEditPriority(goal.priority)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditTitle('')
    setEditPriority('medium')
  }

  const saveEditing = (
    id: number,
  ) => {
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

  const handleDelete = (
    goal: Goal,
  ) => {
    const confirmed =
      window.confirm(
        `Delete "${goal.title}"?`,
      )

    if (!confirmed) {
      return
    }

    if (editingId === goal.id) {
      cancelEditing()
    }

    onDeleteGoal(goal.id)
  }

  /*
   * Sort goals by priority:
   *
   * High
   * Medium
   * Low
   *
   * Goals with the same priority
   * retain their original order.
   */
  const priorityOrder: Record<
    Goal['priority'],
    number
  > = {
    high: 1,
    medium: 2,
    low: 3,
  }

  const sortedGoals = [
    ...goals,
  ].sort(
    (a, b) =>
      priorityOrder[a.priority] -
      priorityOrder[b.priority],
  )

  if (goals.length === 0) {
    return (
      <div className="goal-empty-state">
        <strong>
          No goals yet.
        </strong>

        <span>
          Add your first goal above.
        </span>
      </div>
    )
  }

  return (
    <div className="goal-list">

      {sortedGoals.map(goal => {

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
                  onChange={event =>
                    setEditTitle(
                      event.target.value,
                    )
                  }
                  autoFocus
                  onKeyDown={event => {

                    if (
                      event.key ===
                      'Enter'
                    ) {
                      saveEditing(
                        goal.id,
                      )
                    }

                    if (
                      event.key ===
                      'Escape'
                    ) {
                      cancelEditing()
                    }

                  }}
                  aria-label="Edit goal"
                />

                <select
                  value={editPriority}
                  onChange={event =>
                    setEditPriority(
                      event.target
                        .value as Goal['priority'],
                    )
                  }
                  aria-label="Goal priority"
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
                  className="goal-save"
                  onClick={() =>
                    saveEditing(
                      goal.id,
                    )
                  }
                  disabled={
                    !editTitle.trim()
                  }
                >
                  Save
                </button>

                <button
                  type="button"
                  className="goal-cancel"
                  onClick={
                    cancelEditing
                  }
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

            <label className="goal-main">

              <input
                type="checkbox"
                checked={
                  goal.completed
                }
                onChange={() =>
                  onToggleGoal(
                    goal.id,
                  )
                }
                aria-label={
                  goal.completed
                    ? `Mark ${goal.title} incomplete`
                    : `Mark ${goal.title} complete`
                }
              />

              <span
                className={
                  goal.completed
                    ? 'completed'
                    : ''
                }
                title={goal.title}
              >
                {goal.title}
              </span>

            </label>


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
                  startEditing(
                    goal,
                  )
                }
              >
                Edit
              </button>

              <button
                type="button"
                className="goal-delete"
                onClick={() =>
                  handleDelete(
                    goal,
                  )
                }
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