import { useState } from 'react'

type AddTaskFormProps = {
  onAddTask: (title: string) => void
}

function AddTaskForm({
  onAddTask,
}: AddTaskFormProps) {
  const [title, setTitle] =
    useState('')

  const handleSubmit = (
    event: React.FormEvent,
  ) => {
    event.preventDefault()

    const trimmedTitle =
      title.trim()

    if (!trimmedTitle) {
      return
    }

    onAddTask(trimmedTitle)
    setTitle('')
  }

  return (
    <form
      className="add-task-form"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={title}
        onChange={(event) =>
          setTitle(event.target.value)
        }
        placeholder="Add a task..."
      />

      <button type="submit">
        Add
      </button>
    </form>
  )
}

export default AddTaskForm