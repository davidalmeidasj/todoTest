export type TaskId = string;

export interface Task {
    id: TaskId;
    content: string;
}

export type ColumnId = string;

export interface Column {
    id: ColumnId;
    title: string;
    taskIds: TaskId[];
}