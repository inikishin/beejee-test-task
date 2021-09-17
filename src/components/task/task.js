import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from './task-styles';
import {Card, CardHeader, CardContent, makeStyles, Modal} from "@material-ui/core";
import TaskEdit from "../task-edit/task-edit";
import {editTask} from "../../services/actions/tasks";
import Status from "../status/status";

const useStyles = makeStyles((theme) => (styles));

function Task({id, username, email, text, status}) {
    const classes = useStyles();

    const dispatch = useDispatch();
    const {isAuthenticated, token} = useSelector(store => ({...store.auth}))

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openEditModal = () => {
        setIsModalOpen(true);
    }

    const closeEditModal = () => {
        setIsModalOpen(false);
    }

    const editTaskModal = (form) => {
        let task = new FormData();
        task.append("text", form.text);
        task.append("status", form.status);
        task.append("token", token);

        dispatch(editTask(id, task));
        setIsModalOpen(false);
    }

    return (
        <>
            <Card className={classes.taskContainer} onClick={openEditModal}>
                <CardHeader title={`${username} (${email})`}/>
                <CardContent>
                    <Status isEdit={false} statusNumber={status}></Status>
                    <h4>Description:</h4>
                    <p>{text}</p>
                </CardContent>
            </Card>
            <Modal open={isModalOpen} onClose={closeEditModal}>

                {isAuthenticated ?
                    <TaskEdit title="Edit task" closeModal={closeEditModal} okModal={editTaskModal} username={username}
                           email={email} text={text} status={status}/>
                :
                    <div className={classes.cardContainer}>You are not authenticated</div>}
            </Modal>
        </>
    )
}

export default Task;