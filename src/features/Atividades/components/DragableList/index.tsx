import React from "react";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import {AppWrapper} from "./components/styled/Wrappers";
import Layout from "../../../../common/components/layout";


type Props = {
    moveTask: (from: {index: number, droppableId: string}, to: {index: number, droppableId: string}, draggableId: string) => void,
    children: any,
}


const DragableList = (props: Props) => {

    // const {state, setState} = props;
    const {moveTask} = props;

    const onDragEnd = (result: DropResult) => {

        const { destination, source, draggableId } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        moveTask(
            source,
            destination,
            draggableId
        );
    };

    return (
        <Layout>
            <AppWrapper>
                <DragDropContext onDragEnd={onDragEnd}>
                    {props.children}
                </DragDropContext>
            </AppWrapper>
        </Layout>
    );
};


export default DragableList;
