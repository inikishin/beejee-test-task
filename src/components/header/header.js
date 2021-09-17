import React, {useState} from "react";
import styles from './header-styles';
import {makeStyles, Button, Modal, Grid} from "@material-ui/core";
import TaskEdit from "../task-edit/task-edit";
import {useDispatch, useSelector} from "react-redux";
import {createTask} from "../../services/actions/tasks";
import Login from "../login/login";

const useStyles = makeStyles(theme => (styles));

function Header() {
    const classes = useStyles();

    const dispatch = useDispatch();
    const {isAuthenticated} = useSelector(store => ({...store.auth}))

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const openLoginModal = () => {
        setIsLoginOpen(true);
    }

    const closeLoginModal = () => {
        setIsLoginOpen(false);
    }

    const openEditModal = () => {
        setIsModalOpen(true);
    }

    const closeEditModal = () => {
        setIsModalOpen(false);
    }

    const createTaskModal = (form) => {
        let task = new FormData();
        task.append("username", form.username);
        task.append("email", form.email);
        task.append("text", form.text);

        dispatch(createTask(task));
        setIsModalOpen(false);
    }

    const logout = () => {
        console.log('Exit');
    }

    return (
        <div className={classes.headerContainer}>
            <h1>Task manager</h1>
            <div className={classes.buttonContainer}>
                {
                    !isAuthenticated ? <div className={classes.button}>
                            <Button variant="contained" color="primary" size='large' onClick={openLoginModal}>Login</Button>
                        </div>
                        :
                        <div className={classes.button}>
                            <Button variant="contained" color="default" size='large'
                                    onClick={logout}>Logout</Button>
                        </div>
                }
                <div className={classes.button}>
                    <Button variant="contained" color="secondary" size='large' onClick={openEditModal}>Create
                        task</Button>
                </div>
            </div>
            <Modal open={isModalOpen} onClose={closeEditModal}>
                <TaskEdit title="Create task" closeModal={closeEditModal} okModal={createTaskModal} username='' email=''
                          text='' status={0}/>
            </Modal>

            <Modal open={isLoginOpen} onClose={closeLoginModal}>
                <Login closeModal={closeLoginModal}/>
            </Modal>
        </div>
    )
}

export default Header;