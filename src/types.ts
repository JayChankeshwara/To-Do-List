export type TaskFrequency =
  | {
      type: 'daily'
    }
  | {
      type: 'weekly'
      days: number[]
    }

export type DailyTask = {
  id: number
  title: string
  createdAt: string
  completions: Record<string, boolean>
}

export type WeeklyTask = {
  id: number
  title: string
  createdAt: string
  completions: Record<string, boolean>
}

export type Goal = {
  id: number
  title: string
  priority: 'low' | 'medium' | 'high'
  completed: boolean
  createdAt: string
}

export type FreeTimeTask = {
  id: number
  title: string
  createdAt: string
}

export type WeekDay = {
  date: string
  dayName: string
  dayNumber: number
}

export type Tab =
  | 'daily'
  | 'weekly'
  | 'goals'
  | 'freeTime'