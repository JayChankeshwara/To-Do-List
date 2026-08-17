import type { DailyTask } from '../types'
import TaskCard from './TaskCard'

type TaskListProps = {
  tasks: DailyTask[]
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

function TaskList({
  tasks,
  selectedDate,
  onToggleTask,
  onDeleteTask,
  onEditTask,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>
          No tasks scheduled for this day.
        </p>
      </div>
    )
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          selectedDate={selectedDate}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
        />
      ))}
    </div>
  )
}

export default TaskList