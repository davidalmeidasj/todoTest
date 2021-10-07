import React, {useRef} from "react";
import {TextAreaInput} from "./Styles";


type Props = {
    placeholder: string,
    value: string,
    setValue: (value: string) => void
}

const TextArea = (props: Props) => {
    const textAreaRef: React.Ref<any> = useRef(null);

    return (
        <TextAreaInput
            placeholder={props.placeholder}
            value={props.value}
            onChange={e => props.setValue(e.target.value)}
            ref={textAreaRef}
        />
    );
}

export default TextArea;
