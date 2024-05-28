import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import focusTrap from '@src/util/focusTrap.ts'

const ModalBaseDiv = styled(
    React.forwardRef<HTMLDivElement, { animate?: boolean }>(({ animate = false, ...others }, ref) => <div ref={ref} {...others} />)
)`
    background-color: ${({ animate }) => animate ? "rgba(0, 0, 0, 0.25)" : "transparent"};
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    transition: background-color 0.3s ease;    
` as React.ElementType

const ModalBaseContent = styled(
    ({ animate = false, ...others }: { animate?: boolean }) => <div {...others} />
)`
    opacity: ${({ animate }) => animate ? "1" : "0"};
    display: flex;
    transform: ${({ animate }) => animate ? "translateY(0px)" : "translateY(-100px)"};
    transition: opacity 0.3s ease, transform 0.3s ease;
    max-height: 100%;
    overflow: auto;
` as React.ElementType


const ModalBaseComp: React.ElementType = ({
    children,
    mounted, 
    open, 
    others,
    setMounted
}) => {
    const baseRef = useRef<HTMLDivElement | null>(null)
    const [animate, setAnimate] = useState(false)

    useEffect(() => {

        if(!open && mounted){
            setAnimate(false)
            setTimeout(() => {setMounted(false)}, 350)
        }
        if (!animate){
            
            setTimeout(() => {
                setAnimate(true)
            }, 50)
        }
        if (baseRef.current){
            focusTrap(baseRef.current)
            baseRef.current.focus()
        }
    }, [open])

    return (
        <ModalBaseDiv tabIndex="-1" ref={baseRef} animate={animate} {...others}>
            <ModalBaseContent role="dialog" animate={animate}>
                {children}
            </ModalBaseContent>
        </ModalBaseDiv>
    )
}

const ModalBase = styled(ModalBaseComp)`
    background
    display: flex;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    top: 0;
`

export default ModalBase