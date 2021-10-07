import {UPDATE_LIST} from "./types";
import {Action} from "../../../../common/types";
import {PESSOAL} from "../../constants";
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

export interface StateAtividadePessoal {
    Pessoal: KindList,
}

const columns: Columns = {
    columns: {
        [`${PESSOAL}-1`]: {
            id: `${PESSOAL}-1`,
            title: "To do",
            taskIds: [],
        },
        [`${PESSOAL}-2`]: {
            id: `${PESSOAL}-2`,
            title: "In progress",
            taskIds: [],
        },
        [`${PESSOAL}-3`]: {
            id: `${PESSOAL}-3`,
            title: "Done",
            taskIds: [],
        },
    },

    columnOrder: [`${PESSOAL}-1`, `${PESSOAL}-2`, `${PESSOAL}-3`],
};


export const initialStateAtividadePessoal: StateAtividadePessoal = {
    Pessoal: {
        ...columns,
        tasks: {},
    },
};

export const pessoalReducer: (state: StateAtividadePessoal, action: Action) => StateAtividadePessoal = (state: StateAtividadePessoal = initialStateAtividadePessoal, action: Action) => {
    switch (action.type) {
        case UPDATE_LIST:
            return {
                ...state,
                Pessoal: action.payload.list
            };
        default:
            return state;
    }
};
