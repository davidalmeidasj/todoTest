import {all} from 'redux-saga/effects';
import {atividadesSaga} from "../../features/Atividades/redux/saga";

export function* saga() {
    yield all([
        atividadesSaga()
    ]);
}
