
import { useEffect, useState } from 'react'
import type { DailyTask } from '../types'

type TaskCardProps = {
  task: DailyTask
  selectedDate: string
  onToggleTask: (
    id: number,
    selectedDate: string,
  ) => void
  onDeleteTask: (id: number) => void
  onEditTask: (
    id: number,
    title: string,
  ) => void
}

function TaskCard({
  task,
  selectedDate,
  onToggleTask,
  onDeleteTask,
  onEditTask,
}: TaskCardProps) {
  const completed =
    task.completions[selectedDate] ?? false

  const [isEditing, setIsEditing] =
    useState(false)

  const [editedTitle, setEditedTitle] =
    useState(task.title)

  useEffect(() => {
    setEditedTitle(task.title)
  }, [task.title])

  const handleSave = () => {
    const trimmedTitle =
      editedTitle.trim()

    if (!trimmedTitle) {
      return
    }

    onEditTask(
      task.id,
      trimmedTitle,
    )

    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedTitle(task.title)
    setIsEditing(false)
  }

  return (
    <div className="task">

      <input
        type="checkbox"
        checked={completed}
        onChange={() =>
          onToggleTask(
            task.id,
            selectedDate,
          )
        }
      />

      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(event) =>
              setEditedTitle(
                event.target.value,
              )
            }
            autoFocus
          />

          <button
            type="button"
            onClick={handleSave}
          >
            Save
          </button>

          <button
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <span
            className={
              completed
                ? 'completed'
                : ''
            }
          >
            {task.title}
          </span>

          <button
            type="button"
            onClick={() =>
              setIsEditing(true)
            }
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() =>
              onDeleteTask(task.id)
            }
          >
            Delete
          </button>
        </>
      )}

    </div>
  )
}

export default TaskCard
