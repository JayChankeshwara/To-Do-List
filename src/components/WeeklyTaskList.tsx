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
  onDeleteTask: (id: number) => void
}

function WeeklyTaskList({
  tasks,
  selectedWeek,
  onToggleTask,
  onEditTask,
  onDeleteTask,
}: WeeklyTaskListProps) {

  const [editingId, setEditingId] =
    useState<number | null>(null)

  const [editingTitle, setEditingTitle] =
    useState('')


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


  if (tasks.length === 0) {
    return (
      <div className="weekly-empty-state">
        No weekly tasks yet.
      </div>
    )
  }


  return (
    <div className="weekly-task-list">

      {tasks.map((task) => {

        const completed =
          task.completions[
            selectedWeek
          ] ?? false


        const isEditing =
          editingId === task.id


        return (
          <div
            className={
              completed
                ? 'weekly-task completed'
                : 'weekly-task'
            }
            key={task.id}
          >

            {isEditing ? (

              <div className="weekly-task-edit">

                <input
                  type="text"
                  value={editingTitle}
                  onChange={(event) =>
                    setEditingTitle(
                      event.target.value,
                    )
                  }
                  autoFocus
                />

                <button
                  type="button"
                  onClick={() =>
                    saveEditing(task.id)
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

            ) : (

              <>

                <div className="weekly-task-main">

                  <input
                    type="checkbox"
                    checked={completed}
                    onChange={() =>
                      onToggleTask(
                        task.id,
                        selectedWeek,
                      )
                    }
                  />

                  <span
                    className={
                      completed
                        ? 'completed'
                        : ''
                    }
                  >
                    {task.title}
                  </span>

                </div>


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