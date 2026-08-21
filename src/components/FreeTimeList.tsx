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

  if (tasks.length === 0) {
    return (
      <div className="free-time-empty-state">
        No free time activities yet.
      </div>
    )
  }

  return (
    <div className="free-time-list">

      {tasks.map((task) => {

        const isEditing =
          editingId === task.id

        return (
          <div
            className={
              isEditing
                ? 'free-time-task free-time-task-editing'
                : 'free-time-task'
            }
            key={task.id}
          >

            {isEditing ? (

              <div className="free-time-task-edit">

                <input
                  type="text"
                  value={editTitle}
                  onChange={(event) =>
                    setEditTitle(
                      event.target.value,
                    )
                  }
                  autoFocus
                  onKeyDown={(event) => {

                    if (
                      event.key === 'Enter'
                    ) {
                      saveEditing(task)
                    }

                    if (
                      event.key === 'Escape'
                    ) {
                      cancelEditing()
                    }

                  }}
                />

                <div className="free-time-task-edit-actions">

                  <button
                    type="button"
                    onClick={() =>
                      saveEditing(task)
                    }
                    disabled={
                      !editTitle.trim()
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

                </div>

              </div>

            ) : (

              <>

                <div
                  className="free-time-task-title"
                  title={task.title}
                >
                  {task.title}
                </div>

                <div className="free-time-task-actions">

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

                      const confirmed =
                        window.confirm(
                          `Delete "${task.title}"?`,
                        )

                      if (confirmed) {
                        onDeleteTask(
                          task.id,
                        )
                      }

                    }}
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

export default FreeTimeList