import { useState } from 'react'
import type { Goal } from '../types'

type AddGoalFormProps = {
  onAddGoal: (
    title: string,
    priority: Goal['priority'],
  ) => void
}

function AddGoalForm({
  onAddGoal,
}: AddGoalFormProps) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] =
    useState<Goal['priority']>('medium')

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    const trimmedTitle =
      title.trim()

    if (!trimmedTitle) {
      return
    }

    onAddGoal(
      trimmedTitle,
      priority,
    )

    setTitle('')
    setPriority('medium')
  }

  return (
    <form
      className="add-goal-form"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={title}
        onChange={(event) =>
          setTitle(event.target.value)
        }
        placeholder="Add a new goal..."
      />

      <select
        value={priority}
        onChange={(event) =>
          setPriority(
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

      <button type="submit">
        Add Goal
      </button>
    </form>
  )
}

export default AddGoalForm