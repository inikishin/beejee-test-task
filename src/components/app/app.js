import './app.css';

import {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';

import {Container} from "@material-ui/core";
import TasksList from "../tasks-list/tasks-list";
import Header from "../header/header";
import {LOGIN_WITH_TOKEN} from "../../services/actions/auth";


function App() {
    const dispatch = useDispatch();
    const auth = useSelector((store) => store.auth);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!auth.isAuthenticated && token) {
            dispatch({type: LOGIN_WITH_TOKEN, token: token});
        }
    }, []);

    return (
        <>
            <Header />
            <Container maxWidth="lg">
                <TasksList/>
            </Container>
        </>
    );
}

export default App;
