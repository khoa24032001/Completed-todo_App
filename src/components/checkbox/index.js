import React, { useEffect } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PropTypes from 'prop-types';



export const CheckBox = ({ state }) => {
    const [completed, setCompleted] = React.useState(state);

    useEffect(() => {
        setCompleted(state)
    }, [state])

    // const changeStatus = () => {
    //     setCompleted(!completed);
    // }
    return (
        <>
            {
                !completed ? <CheckCircleOutlineIcon sx={{ color: "gray", fontSize: "50px" }} /> :
                    <CheckCircleOutlineIcon sx={{ color: "green", fontSize: "50px" }} />

                // !completed ? <CheckCircleOutlineIcon sx={{ color: "gray", fontSize: "50px" }} onClick={changeStatus} /> :
                //     <CheckCircleOutlineIcon sx={{ color: "green", fontSize: "50px" }} onClick={changeStatus} />
            }
        </>
    )
}

CheckBox.propTypes = {
    state: PropTypes.bool.isRequired,
}