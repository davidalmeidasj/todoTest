import {Backdrop, Box, Wrapper} from "./Styles";

type Props = {
    children: any,
    display: boolean,
    close: () => void,

}

const Modal = (props: Props) => {

    const {children, display, close} = props;

    return (
        (display) ? <Wrapper>
            <Backdrop onClick={close} />
            <Box>{children}</Box>
        </Wrapper> : null
    )
};


export default Modal;
