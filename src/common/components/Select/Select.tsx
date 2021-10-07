import React, {useState} from 'react'
import Observer from './observer'
import {ArrowIcon, Option, OptionsWrapper, PreviewBox, SelectedOption, Wrapper} from "./Styles";

type Props = {
    placeholder: string,
    options: Array<{name: string}>,
    selected?: string,
    onSelect: (value: string) => void
}

export default function Select(props: Props) {
    const { placeholder, options, onSelect, selected = '' } = props;
    const [isOpen, setOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState(selected)

    const handleToggle = () => {
        setOpen(!isOpen)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleOption = (option: {name: string}) => {
        setSelectedOption(option.name)
        onSelect(option.name);
    }

    const optionsList = options.map((option: {name: string}) => {
        return (
            // hasDesc={!!option.name}
            <Option data-title={option.name} onClick={() => handleOption(option)} key={option.name}>
                {option.name}
            </Option>
        )
    })

    const optionsHeight = 55 * options.length

    return (
        <Observer onClick={handleClose} isOpen={isOpen}>
            <Wrapper onClick={handleToggle}>
                <PreviewBox>
                    <ArrowIcon isOpen={isOpen}>▼</ArrowIcon>
                    <SelectedOption isOption={!!selectedOption}>{selectedOption || placeholder}</SelectedOption>
                </PreviewBox>
                {isOpen && (<OptionsWrapper optionsHeight={optionsHeight} isOpen={isOpen}>
                    {optionsList}
                </OptionsWrapper>)}
            </Wrapper>
        </Observer>
    )
}