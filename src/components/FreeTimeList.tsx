import { useState } from 'react'
import type { FreeTimeTask } from '../types'

type FreeTimeListProps = {
  tasks: FreeTimeTask[]
  onDeleteTask: (id: number) => void
  onEditTask: (
    id: number,
    title: string,
  ) => void
}

function FreeTimeList({
  tasks,
  onDeleteTask,
  onEditTask,
}: FreeTimeListProps) {
  const [editingId, setEditingId] =
    useState<number | null>(null)

  const [editTitle, setEditTitle] =
    useState('')

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>
          No free time activities yet.
        </p>
      </div>
    )
  }

  const startEditing = (
    task: FreeTimeTask,
  ) => {
    setEditingId(task.id)
    setEditTitle(task.title)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditTitle('')
  }

  const saveEditing = (
    task: FreeTimeTask,
  ) => {
    const trimmedTitle =
      editTitle.trim()

    if (!trimmedTitle) {
      return
    }

    onEditTask(
      task.id,
      trimmedTitle,
    )

    cancelEditing()
  }

  return (
    <div>
      {tasks.map((task) => {
        const isEditing =
          editingId === task.id

        return (
          <div
            className="task"
            key={task.id}
          >

            {isEditing ? (
              <>
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

                <button
                  type="button"
                  onClick={() =>
                    saveEditing(task)
                  }
                >
                  Save
                </button>

                <button
                  type="button"
                  onClick={
                    cancelEditing
                  }
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span>
                  {task.title}
                </span>

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
onClick={() => {
  const confirmed = window.confirm(
    `Delete "${task.title}"?`,
  )

  if (confirmed) {
    onDeleteTask(task.id)
  }
}}
                >
                  Delete
                </button>
              </>
            )}

          </div>
        )
      })}
    </div>
  )
}

export default FreeTimeList