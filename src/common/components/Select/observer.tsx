import React, {useEffect, useRef} from 'react'

function useObserver(ref: any, onClick: () => void, isOpen: boolean) {
    // CLose modal if clicked on outside of element
    function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
            isOpen && onClick()
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    })
}

type Props = {
    children: any,
    onClick: () => void,
    isOpen: boolean
}

function Wrapper(props: Props) {
    const { children, onClick, isOpen } = props;
    const wrapperRef = useRef(null)
    useObserver(wrapperRef, onClick, isOpen)

    return <div ref={wrapperRef}>{children}</div>
}

export default Wrapper
