import { Gantt, Task} from 'gantt-task-react';
import "gantt-task-react/dist/index.css";

const tasks: Task[] = [
    {
      start: new Date(2020, 1, 1),
      end: new Date(2020, 1, 2),
      name: 'Idea',
      id: 'Task 0',
      type:'task',
      progress: 45,
      isDisabled: true,
      styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
    },
    
]

const GanttGraph = () => {

  return (

    <Gantt 
      tasks={tasks} 
    />
  );
};

export default GanttGraph;