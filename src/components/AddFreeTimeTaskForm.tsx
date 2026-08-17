import { useState } from 'react'

type AddFreeTimeTaskFormProps = {
  onAddTask: (title: string) => void
}

function AddFreeTimeTaskForm({
  onAddTask,
}: AddFreeTimeTaskFormProps) {
  const [title, setTitle] = useState('')

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    const trimmedTitle = title.trim()

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
        placeholder="Add something useful..."
        value={title}
        onChange={(event) =>
          setTitle(event.target.value)
        }
      />

      <button type="submit">
        Add
      </button>
    </form>
  )
}

export default AddFreeTimeTaskForm