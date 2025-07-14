"use client";

import { useState, useRef, useEffect } from "react";
import { Calendar, momentLocalizer, View } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<View>('month');
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // 检查事件是否来自日历容器内部
      const calendarElement = calendarRef.current;
      if (!calendarElement || !calendarElement.contains(e.target as Node)) {
        return;
      }

      // 检查是否在任务面板区域（通过检查元素类名或data属性）
      const target = e.target as HTMLElement;
      if (target.closest('.task-panel') || target.closest('[data-scroll-area]')) {
        return; // 不处理任务面板内的滚轮事件
      }

      e.preventDefault();
      
      if (e.shiftKey) {
        const views: View[] = ['month', 'week', 'day', 'agenda'];
        const currentIndex = views.indexOf(currentView);
        
        if (e.deltaY > 0) {
          const nextIndex = (currentIndex + 1) % views.length;
          setCurrentView(views[nextIndex]);
        } else {
          const prevIndex = (currentIndex - 1 + views.length) % views.length;
          setCurrentView(views[prevIndex]);
        }
      } else {
        const newDate = new Date(currentDate);
        
        if (currentView === 'month') {
          if (e.deltaY > 0) {
            newDate.setMonth(newDate.getMonth() + 1);
          } else {
            newDate.setMonth(newDate.getMonth() - 1);
          }
        } else if (currentView === 'week') {
          if (e.deltaY > 0) {
            newDate.setDate(newDate.getDate() + 7);
          } else {
            newDate.setDate(newDate.getDate() - 7);
          }
        } else if (currentView === 'day') {
          if (e.deltaY > 0) {
            newDate.setDate(newDate.getDate() + 1);
          } else {
            newDate.setDate(newDate.getDate() - 1);
          }
        }
        
        setCurrentDate(newDate);
      }
    };

    // 监听整个文档的滚轮事件，但只处理日历区域内的
    document.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, [currentDate, currentView]);

  return (
    <div className="w-full h-full flex-1 overflow-hidden p-4" ref={calendarRef}>
      <Calendar
        localizer={localizer}
        events={[]}
        startAccessor="start"
        endAccessor="end"
        date={currentDate}
        view={currentView}
        onNavigate={setCurrentDate}
        onView={setCurrentView}
        style={{ minHeight: "600px" }}
      />
    </div>
  );
}