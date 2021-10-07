import {all, put, select, takeLatest} from 'redux-saga/effects';
import {ADD_TO_LIST, REMOVE_FROM_LIST, UPDATE_LIST, UPDATE_TASK} from "./types";
import {Action} from "../../../common/types";
import {PESSOAL, TRABALHO} from "../constants";
import {KindList} from "../Pessoal/redux/reducer";
import {State} from "../../../infra/store/reducers";
import {updateList as updateListPessoal} from "../Pessoal/redux/action";
import {updateList as updateListTrabalho} from "../Trabalho/redux/action";
import {Task} from "../components/DragableList/components/types";
import {getType} from "../../../common/utils/functions";

const getTaskFromPessoal = (state: State) => state.PESSOAL.Pessoal.tasks;
const getPessoal = (state: State) => state.PESSOAL.Pessoal;
const getTaskFromTrabalho = (state: State) => state.TRABALHO.Trabalho.tasks;
const getTrabalho = (state: State) => state.TRABALHO.Trabalho;

let cardID = 1;

function* executeUpdateList(action: Action) {

    const {from, to, draggableId} = action.payload;

    const typeFrom = getType(from.droppableId),
        typeTo = getType(to.droppableId);

    let task: Task = {id: '', content: ''};

    if (typeFrom === PESSOAL) {

        const tasks: Record<string, Task> = yield select(getTaskFromPessoal);

        task = tasks[draggableId];
    } else {
        const tasks: Record<string, Task> = yield select(getTaskFromTrabalho);

        task = tasks[draggableId];
    }

    const pessoal: KindList = yield select(getPessoal);
    const trabalho: KindList = yield select(getTrabalho);

    const state: any = {
        [PESSOAL]: pessoal,
        [TRABALHO]: trabalho
    }

    if (!to) {
        return;
    }

    if (
        to.droppableId === from.droppableId &&
        to.index === from.index
    ) {
        return;
    }

    // list start
    let start: any = '';
    // will drop
    let finish: any = '';

    const columnsFrom = state[typeFrom].columns,
        columnsTo = state[typeTo].columns;

    // list start
    start = columnsFrom[from.droppableId];
    // will drop
    finish = columnsTo[to.droppableId];

    // Move to same list
    if (start === finish) {
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(from.index, 1);
        newTaskIds.splice(to.index, 0, draggableId);

        const newColumn = {
            ...start,
            taskIds: newTaskIds,
        };

        const newState: any = {
            [typeFrom]: {
                ...state[typeFrom],
                columns: {
                    ...columnsFrom,
                    [newColumn.id]: newColumn,
                },
            }
        };

        if (typeFrom === PESSOAL) {
            yield put(updateListPessoal(newState[PESSOAL]));
        } else {
            yield put(updateListTrabalho(newState[TRABALHO]));
        }

        return;
    }

    // Moving between lists

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(to.index, 0, draggableId);

    const startTaskIds: any = start.taskIds;

    const newStart = {
        ...start,
        taskIds: startTaskIds.filter((item: any) => item !== task.id),
    };

    const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
    };


    let stateFrom = {
        ...state[typeFrom],
        columns: {
            ...columnsFrom,
            [newStart.id]: newStart,
        },
    }

    if (typeFrom === PESSOAL) {
        yield put(updateListPessoal(stateFrom));
    } else {
        yield put(updateListTrabalho(stateFrom));
    }

    const newPessoal: KindList = yield select(getPessoal);
    const newTrabalho: KindList = yield select(getTrabalho);

    const newState: any = {
        [PESSOAL]: newPessoal,
        [TRABALHO]: newTrabalho
    }

    const newColumnsTo = newState[typeTo].columns;

    const stateTo = {
        ...newState[typeTo],
        columns: {
            ...newColumnsTo,
            [newFinish.id]: newFinish,
        },
        tasks: {
            ...newState[typeTo].tasks,
            [task.id]: task
        }
    }

    if (typeTo === PESSOAL) {
        yield put(updateListPessoal(stateTo));
    } else {
        yield put(updateListTrabalho(stateTo));
    }
}

function* executeRemoveFromList(action: Action) {

    function mountUpdate(list: KindList) {

        delete list.tasks[action.payload.task.id];

        list.columns = {
            ...list.columns,
            [`${action.payload.list}`]: {
                ...list.columns[`${action.payload.list}`],
                taskIds: list.columns[`${action.payload.list}`].taskIds.filter(item => item !== action.payload.task.id)
            }
        };

        return list;
    }

    let list: KindList;

    const typeFrom = getType(action.payload.list);

    if (typeFrom === PESSOAL) {

        list = yield select(getPessoal);

        yield put(updateListPessoal(mountUpdate(list)));
    } else {

        list = yield select(getTrabalho);

        yield put(updateListTrabalho(mountUpdate(list)));

    }
}

function* executeAddToList(action: Action) {

    function mountUpdate(list: KindList) {

        list.tasks = {
            ...list.tasks,
            [task.id]: task

        };

        list.columns = {
            ...list.columns,
            [`${action.payload.list.toLowerCase()}-1`]: {
                ...list.columns[`${action.payload.list.toLowerCase()}-1`],
                taskIds: list.columns[`${action.payload.list.toLowerCase()}-1`].taskIds.concat(task.id)
            }
        };

        cardID += 1;

        return list;
    }

    const task = (typeof action.payload.task === 'object') ? action.payload.task : {
        id: cardID.toString(),
        content: action.payload.task
    }

    let list: KindList;

    if (action.payload.list.toLowerCase() === PESSOAL) {

        list = yield select(getPessoal);

        yield put(updateListPessoal(mountUpdate(list)));
    } else {

        list = yield select(getTrabalho);

        yield put(updateListTrabalho(mountUpdate(list)));

    }
}

function* executeUpdateTask(action: Action) {
    const {from, to, task} = action.payload;

    const typeFrom = getType(from),
        typeTo = getType(to);

    const pessoal: KindList = yield select(getPessoal);
    const trabalho: KindList = yield select(getTrabalho);

    const state: any = {
        [PESSOAL]: pessoal,
        [TRABALHO]: trabalho
    }

    const columnsFrom = state[typeFrom].columns,
        columnsTo = state[typeTo].columns;

    // list start
    let start = columnsFrom[from];
    // will drop
    let finish = columnsTo[to];

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(to.index, 0, task.id);


    const startTaskIds: any = start.taskIds;

    const newPessoal: KindList = yield select(getPessoal);
    const newTrabalho: KindList = yield select(getTrabalho);

    const newState: any = {
        [PESSOAL]: newPessoal,
        [TRABALHO]: newTrabalho
    }

    const newColumnsTo = newState[typeTo].columns;

    let stateTo;
    if (from === to) {

        console.log(from, to);

        stateTo = {
            ...newState[typeFrom],
            tasks: {
                ...newState[typeFrom].tasks,
                [task.id]: task
            }
        }
    } else {

        const newStart = {
            ...start,
            taskIds: startTaskIds.filter((item: any) => item !== task.id),
        };

        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        };

        let stateFrom = {
            ...state[typeFrom],
            columns: {
                ...columnsFrom,
                [newStart.id]: newStart,
            },
        }

        if (typeFrom === PESSOAL) {
            yield put(updateListPessoal(stateFrom));
        } else {
            yield put(updateListTrabalho(stateFrom));
        }

        stateTo = {
            ...newState[typeTo],
            columns: {
                ...newColumnsTo,
                [newFinish.id]: newFinish,
            },
            tasks: {
                ...newState[typeTo].tasks,
                [task.id]: task
            }
        }

    }

    if (typeTo === PESSOAL) {
        yield put(updateListPessoal(stateTo));
    } else {
        yield put(updateListTrabalho(stateTo));
    }

}

function* watchUpdateList() {
    yield takeLatest(UPDATE_LIST, executeUpdateList);
}

function* watchRemoveFromList() {
    yield takeLatest(REMOVE_FROM_LIST, executeRemoveFromList);
}

function* watchAddToList() {
    yield takeLatest(ADD_TO_LIST, executeAddToList);
}

function* watchUpdateTask() {
    yield takeLatest(UPDATE_TASK, executeUpdateTask);
}

export function* atividadesSaga(): any {
    yield all([
        watchUpdateList(),
        watchRemoveFromList(),
        watchAddToList(),
        watchUpdateTask(),
    ]);
}