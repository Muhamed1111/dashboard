import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { kanbanData, kanbanGrid } from '../data/dummy';
import { Header } from '../components';
import { EditorData } from '../data/dummy';
const groupTasksByStatus = (tasks, columns) => {
  const grouped = {};
  columns.forEach(col => grouped[col.keyField] = []);
  tasks.forEach(task => {
    if (grouped[task.Status]) {
      grouped[task.Status].push(task);
    }
  });
  return grouped;
};

const Kanban = () => {
  const [tasksByStatus, setTasksByStatus] = useState(
    groupTasksByStatus(kanbanData, kanbanGrid)
  );

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    if (sourceCol === destCol) {
      const updatedTasks = Array.from(tasksByStatus[sourceCol]);
      const [movedTask] = updatedTasks.splice(source.index, 1);
      updatedTasks.splice(destination.index, 0, movedTask);

      setTasksByStatus(prev => ({
        ...prev,
        [sourceCol]: updatedTasks,
      }));
    } else {
      const sourceTasks = Array.from(tasksByStatus[sourceCol]);
      const destTasks = Array.from(tasksByStatus[destCol]);
      const [movedTask] = sourceTasks.splice(source.index, 1);

      movedTask.Status = destCol;
      destTasks.splice(destination.index, 0, movedTask);

      setTasksByStatus(prev => ({
        ...prev,
        [sourceCol]: sourceTasks,
        [destCol]: destTasks,
      }));
    }
  };

  return (
    <div className="dark:bg-secondary-dark-bg dark:text-white m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl overflow-x-auto">
     <Header category="App" title="Kanban" />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6 min-w-full">
          {kanbanGrid.map(({ headerText, keyField }) => (
            <Droppable droppableId={keyField} key={keyField}>
              {(provided) => (
                <div
                  className="dark:bg-secondary-dark-bg dark:text-white bg-gray-100 p-4 rounded w-full min-w-[250px]"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h3 className="font-semibold text-lg mb-3">{headerText}</h3>
                  {tasksByStatus[keyField]?.map((task, index) => (
                    <Draggable
                      draggableId={String(task.Id)}
                      index={index}
                      key={String(task.Id)}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white rounded p-3 mb-3 shadow border-l-4"
                          style={{
                            borderColor: task.Color,
                            ...provided.draggableProps.style,
                          }}
                        >
                          <h4 className="font-semibold text-sm">{task.Title}</h4>
                          <p className="text-xs text-gray-600 mt-1">{task.Summary}</p>
                          <p className="text-[11px] text-gray-500 mt-1 italic">
                            Assignee: {task.Assignee}
                          </p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Kanban
