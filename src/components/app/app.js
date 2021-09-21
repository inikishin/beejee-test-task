import {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';

import styles from './app-styles';

import {Box, Container, makeStyles} from "@material-ui/core";
import TasksList from "../tasks-list/tasks-list";
import Header from "../header/header";
import {LOGIN_WITH_TOKEN} from "../../services/actions/auth";

const useStyles = makeStyles(theme => (styles));

function App() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const auth = useSelector((store) => store.auth);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!auth.isAuthenticated && token) {
            dispatch({type: LOGIN_WITH_TOKEN, token: token});
        }
    }, []);

    return (
        <Box className={classes.container}>
            <Header />
            <Box >
            <Container maxWidth="lg">
                <TasksList/>
            </Container>
                </Box>
        </Box>
    );
}

export default App;
