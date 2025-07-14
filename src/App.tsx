import { SidebarLeft } from "@/components/sidebar-left";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { TaskPanel } from "@/components/task-panel";
import "react-big-calendar/lib/css/react-big-calendar.css";
import GanttGraph from "@/components/gantt-graph";
import { CalendarView } from "@/components/calendar-view";

export default function Page() {
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);

  return (
    <SidebarProvider>
      <SidebarInset className="h-screen flex flex-col">
        <div className="flex flex-1 overflow-hidden">
          <SidebarLeft />

          <Tabs defaultValue="calendar" className="flex flex-1 flex-col overflow-hidden">
            {/* 固定头部 */}
            <header className="bg-background flex h-14 shrink-0 items-center gap-2 z-10">
              <div className="flex flex-1 items-center gap-2 px-3">
                <SidebarTrigger />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <TabsList className="grid w-fit grid-cols-2">
                  <TabsTrigger value="calendar">日历</TabsTrigger>
                  <TabsTrigger value="gantt">甘特图</TabsTrigger>
                </TabsList>

                <div className="flex items-center gap-2 px-3 absolute right-0 top-0 h-14">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
                  >
                    {isRightPanelOpen ? (
                      <X className="h-4 w-4" />
                    ) : (
                      <Menu className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </header>

            {/* 日历视图 */}
            <TabsContent
              value="calendar"
              className="flex flex-1 m-0 overflow-hidden"
            >
              <div className="flex flex-1 overflow-hidden">
                <div className="flex-1 overflow-hidden">
                  <CalendarView />
                </div>
                {isRightPanelOpen && (
                  <div className="task-panel">
                    <TaskPanel />
                  </div>
                )}
              </div>
            </TabsContent>

            {/* 甘特图视图 */}
            <TabsContent
              value="gantt"
              className="flex flex-1 m-0 overflow-hidden"
            >
              <div className="flex flex-1 overflow-hidden">
                <div className="flex-1 overflow-hidden p-4 pr-0">
                  <div className="w-full h-full overflow-auto">
                    <GanttGraph />
                  </div>
                </div>
                {isRightPanelOpen && (
                  <div className="task-panel">
                    <TaskPanel />
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
