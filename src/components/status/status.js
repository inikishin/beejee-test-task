import React from 'react';
import styles from './status-style';
import {FormControlLabel, Checkbox, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => (styles))

function Status({statusNumber, isEdit, handleChange}) {

    const classes = useStyles();

    const statuses = [
        {code: 0, done: false, isEdited: false},
        {code: 1, done: false, isEdited: true},
        {code: 10, done: true, isEdited: false},
        {code: 11, done: true, isEdited: true},
    ]

    const status = statuses.find(item => (item.code === statusNumber));

    return (
        <div className={classes.statusContainer}>
            {isEdit ?
                <>
                    <div>
                        <FormControlLabel control={
                            <Checkbox checked={status.done} onChange={handleChange} name="status" color="primary"/>
                        }
                                          label="Done"/>
                    </div>
                </>
                :
                <>
                    <p><b>Status:</b> {status.done ? 'Task done' : 'Task undone'}</p>
                </>
            }
            {status.isEdited && <p>edited by admin</p>}
        </div>
    );
}

export default Status;