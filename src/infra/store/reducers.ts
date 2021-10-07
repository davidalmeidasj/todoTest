import {combineReducers} from "redux";
import {History} from "history";
import {connectRouter, RouterState} from "connected-react-router";
import {StateAtividadeTrabalho, trabalhoReducer} from "../../features/Atividades/Trabalho/redux/reducer";
import {pessoalReducer, StateAtividadePessoal} from "../../features/Atividades/Pessoal/redux/reducer";

const rootReducer = (history: History) =>
    combineReducers({
        PESSOAL: pessoalReducer,
        TRABALHO: trabalhoReducer,
        router: connectRouter(history)
    });

export interface State {
    PESSOAL: StateAtividadePessoal;
    TRABALHO: StateAtividadeTrabalho;
    router: RouterState;
}

export default rootReducer;
