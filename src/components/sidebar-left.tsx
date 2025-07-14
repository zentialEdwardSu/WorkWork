"use client";

import * as React from "react"
import { Plus } from "lucide-react"

import { Calendars } from "@/components/calendars"
import { DatePicker } from "@/components/date-picker"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarRail
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  calendars: [
    {
      name: "My Calendars",
      items: ["Personal", "Work", "Family"],
    },
    {
      name: "Favorites",
      items: ["Holidays", "Birthdays"],
    },
    {
      name: "Other",
      items: ["Travel", "Reminders", "Deadlines"],
    },
  ],
};

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader className="border-sidebar-border h-16 border-b">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild className="px-4 py-4">
            <Button variant="outline" className="w-full justify-start gap-2">
              <Plus className="h-4 w-4" />
              新建日程
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>新建日程</DialogTitle>
              <DialogDescription>
                创建一个新的日程安排
              </DialogDescription>
            </DialogHeader>
            {/* 这里可以添加表单内容 */}
            <div className="p-4">
              <p>日程表单内容将在这里显示</p>
            </div>
          </DialogContent>
        </Dialog>
      </SidebarHeader>
      <SidebarContent>
        <DatePicker />
        <SidebarSeparator className="mx-0" />
        <Calendars calendars={data.calendars} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Plus />
              <span>New Calendar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
