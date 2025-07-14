import React, { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown, ChevronRight, Edit, Check, X } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

interface TaskCardProps {
  id: string
  name: string
  time: string
  type: 'todo' | 'event'
  isAllDay?: boolean
  completed?: boolean
  details?: string
  onToggleComplete?: (id: string, completed: boolean) => void
  onUpdateDetails?: (id: string, details: string) => void
}

export function TaskCard({
  id,
  name,
  time,
  type,
  isAllDay = false,
  completed = false,
  details = '',
  onToggleComplete,
  onUpdateDetails
}: TaskCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(details)

  const handleToggleComplete = () => {
    onToggleComplete?.(id, !completed)
  }

  const handleSaveEdit = () => {
    onUpdateDetails?.(id, editContent)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditContent(details)
    setIsEditing(false)
  }

  // 格式化时间显示
  const formatTime = () => {
    if (type === 'todo') {
      return `截止: ${time}`
    }
    if (isAllDay) {
      return `全天 ${time}`
    }
    return time
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {type === 'todo' && (
              <Checkbox
                checked={completed}
                onCheckedChange={handleToggleComplete}
                className="data-[state=checked]:bg-green-500"
              />
            )}
            <div className="flex-1">
              <h3 className={`font-medium ${completed ? 'line-through text-muted-foreground' : ''}`}>
                {name}
              </h3>
              <p className="text-sm text-muted-foreground">{formatTime()}</p>
            </div>
          </div>
          
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {isOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        </div>
      </CardHeader>

      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">详情</h4>
                {!isEditing && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    编辑
                  </Button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-3">
                  <Textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    placeholder="输入详情内容（支持 Markdown 格式）..."
                    className="min-h-[100px]"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSaveEdit}>
                      <Check className="h-3 w-3 mr-1" />
                      保存
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                      <X className="h-3 w-3 mr-1" />
                      取消
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="prose prose-sm max-w-none">
                  {details ? (
                    <ReactMarkdown>{details}</ReactMarkdown>
                  ) : (
                    <p className="text-muted-foreground italic">暂无详情</p>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}