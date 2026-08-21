import { useState } from 'react'
import type { WeeklyTask } from '../types'

type WeeklyTaskListProps = {
  tasks: WeeklyTask[]
  selectedWeek: string
  onToggleTask: (
    id: number,
    week: string,
  ) => void
  onEditTask: (
    id: number,
    title: string,
  ) => void
  onDeleteTask: (
    id: number,
  ) => void
}

function WeeklyTaskList({
  tasks,
  selectedWeek,
  onToggleTask,
  onEditTask,
  onDeleteTask,
}: WeeklyTaskListProps) {
  const [
    editingId,
    setEditingId,
  ] = useState<number | null>(null)

  const [
    editingTitle,
    setEditingTitle,
  ] = useState('')

  const startEditing = (
    task: WeeklyTask,
  ) => {
    setEditingId(task.id)
    setEditingTitle(task.title)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditingTitle('')
  }

  const saveEditing = (
    id: number,
  ) => {
    const trimmedTitle =
      editingTitle.trim()

    if (!trimmedTitle) {
      return
    }

    onEditTask(
      id,
      trimmedTitle,
    )

    setEditingId(null)
    setEditingTitle('')
  }

  const handleDelete = (
    task: WeeklyTask,
  ) => {
    const confirmed =
      window.confirm(
        `Delete "${task.title}"?`,
      )

    if (!confirmed) {
      return
    }

    if (editingId === task.id) {
      cancelEditing()
    }

    onDeleteTask(task.id)
  }

  if (tasks.length === 0) {
    return (
      <div className="weekly-empty-state">
        <strong>
          No weekly tasks yet.
        </strong>

        <span>
          Add your first weekly task above.
        </span>
      </div>
    )
  }

  return (
    <div className="weekly-task-list">

      {tasks.map(task => {
        const completed =
          task.completions[
            selectedWeek
          ] ?? false

        const isEditing =
          editingId === task.id

        return (
          <div
            key={task.id}
            className={[
              'weekly-task',
              completed
                ? 'completed'
                : '',
              isEditing
                ? 'weekly-task-editing'
                : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >

            {isEditing ? (

              <div className="weekly-task-edit">

                <input
                  type="text"
                  value={editingTitle}
                  onChange={event =>
                    setEditingTitle(
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
                        task.id,
                      )
                    }

                    if (
                      event.key ===
                      'Escape'
                    ) {
                      cancelEditing()
                    }
                  }}
                  aria-label="Edit weekly task"
                />

                <div className="weekly-task-edit-actions">

                  <button
                    type="button"
                    className="weekly-task-save"
                    onClick={() =>
                      saveEditing(
                        task.id,
                      )
                    }
                    disabled={
                      !editingTitle.trim()
                    }
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    className="weekly-task-cancel"
                    onClick={
                      cancelEditing
                    }
                  >
                    Cancel
                  </button>

                </div>

              </div>

            ) : (

              <>

                <label className="weekly-task-main">

                  <input
                    type="checkbox"
                    checked={completed}
                    onChange={() =>
                      onToggleTask(
                        task.id,
                        selectedWeek,
                      )
                    }
                    aria-label={
                      completed
                        ? `Mark ${task.title} incomplete`
                        : `Mark ${task.title} complete`
                    }
                  />

                  <span
                    className={
                      completed
                        ? 'completed'
                        : ''
                    }
                    title={task.title}
                  >
                    {task.title}
                  </span>

                </label>


                <div className="weekly-task-actions">

                  <button
                    type="button"
                    onClick={() =>
                      startEditing(task)
                    }
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="weekly-task-delete"
                    onClick={() =>
                      handleDelete(task)
                    }
                  >
                    Delete
                  </button>

                </div>

              </>

            )}

          </div>
        )
      })}

    </div>
  )
}

export default WeeklyTaskList