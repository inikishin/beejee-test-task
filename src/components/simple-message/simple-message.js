import React from 'react';
import styles from './simple-message-styles'
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => (styles));

function SimpleMessage({text}) {
    const classes = useStyles();

    return (
        <div className={classes.messageContainer}>
            {text}
        </div>
    );
}

export default SimpleMessage;