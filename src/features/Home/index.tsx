import React, {useState} from "react";
import {connect} from "react-redux";
import DragableList from "../Atividades/components/DragableList";
import {addToList, removeFromList, updateList, updateTask} from "../Atividades/redux/action";
import {Dispatch} from "redux";
import PessoalBoard from "../Atividades/Pessoal";
import TrabalhoBoard from "../Atividades/Trabalho";
import {Button} from "../../common/components/styled/button";
import {Container} from "../../common/components/styled/elements";
import Modal from "../../common/components/Modal/Modal";
import TextArea from "../../common/components/TextArea/TextArea";
import Select from "../../common/components/Select/Select";
import {Task} from "../Atividades/components/DragableList/components/types";

type Props = {
    updateList: (from: {index: number, droppableId: string}, to: {index: number, droppableId: string}, draggableId: string) => void,
    addTask: (list: string, task: string|Task) => void,
    updateTask: (from: string, to: string, task: Task) => void,
    removeTask: (list: string, task: Task) => void,
}

const Home = (props: Props) => {

    const {updateList, addTask, removeTask, updateTask} = props;

    const [showModal, setShowModal] = useState(false);
    const [textTask, setTextTask] = useState('');
    const [selected, setSelected] = useState('');

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const submitTask = () => {
        addTask(selected, textTask);
        setShowModal(!showModal);
        setTextTask('');
        setSelected('');
    };

    return (
        <Container>
            <Button
             onClick={toggleModal}
            >
                Cadastrar Tarefa
            </Button>

            <DragableList moveTask={updateList}>
                <>
                    <PessoalBoard removeTask={removeTask} updateTask={updateTask}/>
                    <TrabalhoBoard removeTask={removeTask} updateTask={updateTask}/>
                </>
            </DragableList>

            <Modal display={showModal} close={toggleModal}>
                <h1>Tarefa</h1>
                <TextArea placeholder={'Descrição da Tarefa'} setValue={setTextTask} value={textTask}/>

                <Select onSelect={setSelected} placeholder="Selecione a categoria" options={[{ name: 'Pessoal' }, { name: 'Trabalho' }]}/>

                <Button
                    onClick={submitTask}
                >
                    Enviar
                </Button>
            </Modal>
        </Container>
    );
};

const mapToDispatchToProps = (dispatch: Dispatch) => {
    return {
        updateList: (from: {index: number, droppableId: string}, to: {index: number, droppableId: string}, draggableId: string) => dispatch(updateList(from, to, draggableId)),
        addTask: (list: string, task: string|Task) => dispatch(addToList(list, task)),
        updateTask: (from: string, to: string, task: Task) => dispatch(updateTask(from, to, task)),
        removeTask: (list: string, task: Task) => dispatch(removeFromList(list, task)),
    };
};

export default connect(null, mapToDispatchToProps)(Home);
