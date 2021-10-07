import * as React from "react";
import { Droppable } from "react-beautiful-dnd";
import {Column as ColumnInterface, Task as TaskInterface} from "../types";
import {TaskList, Title, Wrapper} from "../styled/elements";
import Task from "../Task/Task";

interface Props {
    column: ColumnInterface;
    tasks: TaskInterface[];
    removeTask: (list: string, task: TaskInterface) => void;
    updateTask: (from: string, to: string, task: TaskInterface) => void,
}

const Column = (props: Props) => {

    const { column, tasks, removeTask, updateTask } = props;

    const onClickToRemove = (list: string, task: TaskInterface) => {
        removeTask(list, task)
    }

    const onClickToUpdate = (from: string, to: string, task: TaskInterface) => {
        updateTask(from, to, task);
    }

    return (
        <Wrapper>
            <Title> {column.title} </Title>
            <Droppable
                droppableId={column.id}
                // Will only be able to drop into the 2 first columns
                // type={column.id === "column-3" ? "done" : "active"}
            >
                {(provided, snapshot) => (
                    <TaskList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}>
                        {tasks.map((task, index) => (
                            <Task key={task.id} list={column.id} task={task} index={index} onClickToRemove={onClickToRemove}  onClickToUpdate={onClickToUpdate} />
                        ))}
                        {provided.placeholder}
                    </TaskList>
                )}
            </Droppable>
        </Wrapper>
    );
};
export default Column;
