"use client";

import * as React from "react"
import { Plus } from "lucide-react"

import { TaskCard } from "@/components/task-card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

// 假数据
const data: {
  user: {
    name: string
    email: string
    avatar: string
  },
  tasks: {
    id: string
    name: string
    time: string
    type: 'todo' | 'event'
    isAllDay?: boolean
    completed?: boolean
    details?: string
  }[]
} = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  tasks: [
    {
      id: "1",
      name: "完成项目文档",
      time: "7-11 23:30",
      type: "todo",
      completed: false,
      details: "## 任务描述\n- 编写API文档\n- 更新README\n- 添加示例代码"
    },
    {
      id: "2",
      name: "年度会议",
      time: "7.11-7.12",
      type: "event",
      isAllDay: true,
      details: "公司年度总结会议，讨论明年发展计划"
    },
    {
      id: "3",
      name: "代码审查",
      time: "7-10 16:00",
      type: "todo",
      completed: true,
      details: "审查新功能的代码实现"
    },
    {
      id: "4",
      name: "客户演示",
      time: "7-12 14:30",
      type: "event",
      isAllDay: false,
      details: "**演示内容：**\n- 新功能展示\n- Q&A环节\n- 反馈收集"
    },
    {
      id: "5",
      name: "修复登录bug",
      time: "7-13 18:00",
      type: "todo",
      completed: false,
      details: "修复用户反馈的登录问题\n\n**问题描述：**\n- 登录页面加载缓慢\n- 验证码显示异常"
    },
    {
      id: "6",
      name: "团队建设活动",
      time: "7.15-7.16",
      type: "event",
      isAllDay: true,
      details: "两天一夜的团队建设活动\n\n**活动安排：**\n- 户外拓展\n- 晚会聚餐\n- 住宿安排"
    }
  ]
}

export function TaskPanel({
  className = ""
}: {
  className?: string
}) {
  const [tasks, setTasks] = React.useState(data.tasks)

  const handleToggleComplete = (id: string, completed: boolean) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, completed } : task
      )
    )
  }

  const handleUpdateDetails = (id: string, details: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, details } : task
      )
    )
  }

  return (
    <div className={`w-80 border-l bg-background flex flex-col ${className}`}>
      {/* 头部 */}
      <div className="border-b h-16 px-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">任务列表</h2>
        <span className="text-sm text-muted-foreground">
          {tasks.filter(task => task.type === 'todo' && !task.completed).length} 待完成
        </span>
      </div>
      
      {/* 内容区域 */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="space-y-3 p-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              name={task.name}
              time={task.time}
              type={task.type}
              isAllDay={task.isAllDay}
              completed={task.completed}
              details={task.details}
              onToggleComplete={handleToggleComplete}
              onUpdateDetails={handleUpdateDetails}
            />
          ))}
        </div>
      </ScrollArea>
      
      {/* 底部 */}
      <div className="border-t p-4">
        <Button variant="outline" className="w-full justify-start gap-2">
          <Plus className="h-4 w-4" />
          添加任务
        </Button>
      </div>
    </div>
  )
}
