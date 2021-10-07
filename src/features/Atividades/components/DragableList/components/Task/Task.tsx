import * as React from "react";
import {Draggable} from "react-beautiful-dnd";
import styled from "styled-components";
import {Task as TaskInterface} from "../types";
import {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextArea from "../../../../../../common/components/TextArea/TextArea";
import Select from "../../../../../../common/components/Select/Select";
import {Button} from "../../../../../../common/components/styled/button";
import {capitalize, getType} from "../../../../../../common/utils/functions";

interface Props {
    task: TaskInterface;
    list: string;
    index: number;
    onClickToRemove: (list: string, task: TaskInterface) => void;
    onClickToUpdate: (from: string, to: string, task: TaskInterface) => void;
}

interface TaskStylesProps {
    isDragging?: boolean;
}

const TaskStyles = styled.li<TaskStylesProps>`
  width: ${({ theme }) => `calc(${theme.size.listSize} - 25px)`};
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  box-shadow: 1px 2px 3px ${({ theme }) => theme.colors.secondary};
  margin: 1rem 0;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) =>  theme.colors.text};
  position: relative;
  word-wrap: break-word;
`;

const CardContainer = styled.div`
    margin: 0 0 8px 0;
    position: relative;
    max-width: 100%;
    min-height: 88px;
    height: auto;
    word-wrap: break-word;
  `;


const CardContext = styled.div`
    margin: 0 0 8px 0;
    position: relative;
    max-width: 90%;
    height: auto;
    word-wrap: break-word;
  `;

const EditButton = styled.i`
    position: absolute;
    display: none;
    right: 0;
    top: 5px;
    opacity: 0.5;
    ${TaskStyles}:hover & {
      display: block;
      cursor: pointer;
    }
    &:hover {
      opacity: 0.8;
    }
  `;

const DeleteButton = styled.i`
    position: absolute;
    display: none;
    right: 0;
    bottom: 5px;
    opacity: 0.5;
    ${TaskStyles}:hover & {
      display: block;
      cursor: pointer;
    }
    &:hover {
      opacity: 0.8;
    }
  `;
const Label = styled.span`
    font-size: 16px;
    width: 80%;
  `;

const Task = (props: Props) => {

    const { task, index, list, onClickToRemove, onClickToUpdate } = props;

    const [isEditing, setIsEditing] = useState(false);
    const [textTask, setTextTask] = useState(task.content);
    const [selected, setSelected] = useState(capitalize(getType(list)));

    const handleClickRemove = () => {
        onClickToRemove(list, task);
    }

    const handleClickUpdate = () => {
        const editTask = {
            id: task.id,
            content: textTask
        }

        const from = list,
            to = (getType(selected).toLowerCase() === getType(from).toLowerCase() ? from : `${selected.toLowerCase()}-1`);

        onClickToUpdate(from, to, editTask);
        setIsEditing(false);
    }

    const renderEditForm = () => {
        return (
            <TaskStyles>
                <CardContainer>
                    <TextArea placeholder={'Descrição da Tarefa'} setValue={setTextTask} value={textTask}/>

                    <Select selected={selected} onSelect={setSelected} placeholder="Selecione a categoria" options={[{ name: 'Pessoal' }, { name: 'Trabalho' }]}/>

                    <Button
                        onClick={handleClickUpdate}
                    >
                        Enviar
                    </Button>

                    <Button
                        background={'#656262FF'}
                        onClick={() => setIsEditing(false)}
                    >
                        Cancelar
                    </Button>
                </CardContainer>
            </TaskStyles>
        );
    };

    const renderCard = () => (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <TaskStyles
                    isDragging={snapshot.isDragging}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}>
                    <CardContainer>
                        <EditButton
                            onMouseDown={() => setIsEditing(true)}
                        >
                            <FontAwesomeIcon icon="pencil-alt" />
                        </EditButton>
                        <DeleteButton  onClick={handleClickRemove}>
                            <FontAwesomeIcon icon="trash-alt" />
                        </DeleteButton>

                        <CardContext>
                            <Label>
                                {task.content}
                            </Label>
                        </CardContext>


                    </CardContainer>

                </TaskStyles>
            )}
        </Draggable>
    )

    return isEditing ? renderEditForm() : renderCard();
};
export default Task;
