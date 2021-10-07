import {ADD_TO_LIST, REMOVE_FROM_LIST, UPDATE_LIST, UPDATE_TASK} from "./types";
import {Task} from "../components/DragableList/components/types";

export const updateList = (from: {index: number, droppableId: string}, to: {index: number, droppableId: string}, draggableId: string) => {

    return {
        type: UPDATE_LIST,
        payload: {
            from,
            to,
            draggableId
        }
    };
};

export const addToList = (list: string, task: string|Task) => {
    return {
        type: ADD_TO_LIST,
        payload: {
            list,
            task
        }
    };
};

export const updateTask = (from: string, to: string, task: Task) => {
    return {
        type: UPDATE_TASK,
        payload: {
            from,
            to,
            task
        }
    };
};

export const removeFromList = (list: string, task: Task) => {

    return {
        type: REMOVE_FROM_LIST,
        payload: {
            list,
            task
        }
    };
};