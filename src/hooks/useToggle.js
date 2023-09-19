import { useState } from "react"

export default function useToggle(defaultValue = false) {
    const [toggle, setToggle] = useState(defaultValue)

    const handleOpen = () => {
        setToggle(true)
    }

    const handleClose = () => {
        setToggle(false)
    }

    const handleToggle = (value) => {
        setToggle(value)
    }

    return {
        toggle,
        handleOpen,
        handleClose,
        handleToggle
    }
}