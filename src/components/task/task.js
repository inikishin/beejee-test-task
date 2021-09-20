import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from './task-styles';
import {Card, CardHeader, CardContent, makeStyles, Modal} from "@material-ui/core";
import TaskEdit from "../task-edit/task-edit";
import {editTask} from "../../services/actions/tasks";
import Status from "../status/status";
import SimpleMessage from "../simple-message/simple-message";

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
                <CardHeader title={`User: ${username}`} subheader={`email: ${email}`}/>
                <CardContent>
                    <Status isEdit={false} statusNumber={status} />
                    <hr />
                    <h4>Description:</h4>
                    <p>{text}</p>
                </CardContent>
            </Card>
            <Modal open={isModalOpen} onClose={closeEditModal}>

                {isAuthenticated ?
                    <TaskEdit title="Edit task" closeModal={closeEditModal} okModal={editTaskModal} username={username}
                           email={email} text={text} status={status}/>
                :
                    <SimpleMessage text='You are not authenticated' />
                }
            </Modal>
        </>
    )
}

export default Task;