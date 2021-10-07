import {State} from "../../../infra/store/reducers";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import React from "react";
import {Container, Grid, Label} from "../components/DragableList/components/styled/Wrappers";
import Column from "../components/DragableList/components/Column";
import {StateAtividadeTrabalho} from "./redux/reducer";
import {Task} from "../components/DragableList/components/types";

type Props = {
    atividades: StateAtividadeTrabalho,
    removeTask: (list: string, task: Task) => void,
    updateTask: (from: string, to: string, task: Task) => void,
}


const TrabalhoBoard = (props: Props) => {

    const {atividades, removeTask, updateTask} = props;

    const { columns, tasks, columnOrder } = atividades.Trabalho;

    return (
        <>
            <Container>
                <Label> Quadro do Trabalho</Label>
                <Grid>
                    {columnOrder.map((columnId) => {
                        const column = columns[columnId];
                        const tasksData = column.taskIds.map(
                            (taskId: string) => tasks[taskId],
                        );
                        return (
                            <Column key={column.id} column={column} tasks={tasksData} removeTask={removeTask} updateTask={updateTask}  />
                        );
                    })}
                </Grid>
            </Container>
        </>
    );
};

const mapStateToProps = (store: State) => {
    return {
        atividades: store.TRABALHO,
    };
};

const mapToDispatchToProps = (dispatch: Dispatch) => {
    return {

    };
};

export default connect(mapStateToProps, mapToDispatchToProps)(TrabalhoBoard);