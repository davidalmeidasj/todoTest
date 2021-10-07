import {UPDATE_LIST} from "./types";
import {Action} from "../../../../common/types";
import {TRABALHO} from "../../constants";
import {Column, ColumnId, Task, TaskId} from "../../components/DragableList/components/types";

interface Columns {
    columns: Record<ColumnId, Column>;
    columnOrder: ColumnId[];
}

export interface KindList {
    columns: Record<ColumnId, Column>;
    columnOrder: ColumnId[],
    tasks: Record<TaskId, Task>
}

export interface StateAtividadeTrabalho {
    Trabalho: KindList,
}

const columns: Columns = {
    columns: {
        [`${TRABALHO}-1`]: {
            id: `${TRABALHO}-1`,
            title: "To do",
            taskIds: [],
        },
        [`${TRABALHO}-2`]: {
            id: `${TRABALHO}-2`,
            title: "In progress",
            taskIds: [],
        },
        [`${TRABALHO}-3`]: {
            id: `${TRABALHO}-3`,
            title: "Done",
            taskIds: [],
        },
    },

    columnOrder: [`${TRABALHO}-1`, `${TRABALHO}-2`, `${TRABALHO}-3`],
};


export const initialStateAtividadeTrabalho: StateAtividadeTrabalho = {
    Trabalho: {
        ...columns,
        tasks: {},
    },
};

export const trabalhoReducer: (state: StateAtividadeTrabalho, action: Action) => StateAtividadeTrabalho = (state: StateAtividadeTrabalho = initialStateAtividadeTrabalho, action: Action) => {
    switch (action.type) {
        case UPDATE_LIST:
            return {
                ...state,
                Trabalho: action.payload.list
            };
        default:
            return state;
    }
};
