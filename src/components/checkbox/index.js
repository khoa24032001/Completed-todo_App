import React, { useEffect } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PropTypes from 'prop-types';



export const CheckBox = ({ state }) => {
    const [completed, setCompleted] = React.useState(state);

    useEffect(() => {
        setCompleted(state)
    }, [state])

    return (
        <>
            {
                !completed ? <CheckCircleOutlineIcon sx={{ color: "gray", fontSize: "50px" }} /> :
                    <CheckCircleOutlineIcon sx={{ color: "green", fontSize: "50px" }} />
            }
        </>
    )
}

CheckBox.propTypes = {
    state: PropTypes.bool.isRequired,
}