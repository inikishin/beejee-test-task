import React, {useEffect, useState} from "react";
import styles from './task-list-style';
import {useDispatch, useSelector} from "react-redux";
import {CREATE_CLOSE_ALERT, EDIT_CLOSE_ALERT, getTasksList, SET_PAGE} from "../../services/actions/tasks";
import {Grid, makeStyles, FormLabel, RadioGroup, FormControlLabel, Radio, Box} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Pagination from '@material-ui/lab/Pagination';
import Task from "../task/task";

const useStyles = makeStyles(theme => (styles));

function TasksList() {
    const classes = useStyles();

    const [sortValue, setSortValue] = useState('none')
    const [directionValue, setDirectionValue] = useState('asc')

    const dispatch = useDispatch();
    const {
        tasks,
        isLoadingTasks,
        hasErrorTasks,
        taskEdited,
        taskCreated,
        currentPage,
        fullTasksCount
    } = useSelector(store => ({...store.tasks}));

    useEffect(() => {
        dispatch(getTasksList(currentPage, sortValue, directionValue));
    }, [dispatch, taskEdited, taskCreated, currentPage, sortValue, directionValue]);


    let pages = Math.ceil(fullTasksCount / 3);

    const changePage = (e) => {
        dispatch({type: SET_PAGE, page: Number(e.target.innerText)})
    }

    const handleSortChange = (e) => {
        setSortValue(e.target.value)
    }

    const handleDirectionChange = (e) => {
        setDirectionValue(e.target.value)
    }

    const handleCreateAlertClose = (e) => {
        dispatch({type: CREATE_CLOSE_ALERT});
    }

    const handleEditAlertClose = (e) => {
        dispatch({type: EDIT_CLOSE_ALERT});
    }

    if (hasErrorTasks) {
        return (
            <div className={classes.taskListContainer}>
                <h2>Error! Please check console</h2>
            </div>
        );
    } else {
        return (
            <div className={classes.taskListContainer}>
                {taskCreated && <MuiAlert elevation={6} variant="filled" severity="success" onClose={handleCreateAlertClose}>Task
                    created!</MuiAlert>}
                {taskEdited && <MuiAlert elevation={6} variant="filled" severity="success" onClose={handleEditAlertClose}>Task
                    edited!</MuiAlert>}
                <div className={classes.ordersContainer}>
                    <div className={classes.ordersItem}>
                        <FormLabel component="legend">Order by:</FormLabel>
                        <RadioGroup name="sort" value={sortValue} onChange={handleSortChange}>
                            <FormControlLabel value="none" control={<Radio/>} label="None"/>
                            <FormControlLabel value="username" control={<Radio/>} label="Username"/>
                            <FormControlLabel value="email" control={<Radio/>} label="E-mail"/>
                            <FormControlLabel value="status" control={<Radio/>} label="Status"/>
                        </RadioGroup>
                    </div>
                    <div className={classes.ordersItem}>
                        <FormLabel component="legend">Direction by:</FormLabel>
                        <RadioGroup name="direction" value={directionValue} onChange={handleDirectionChange}>
                            <FormControlLabel value="asc" control={<Radio/>} label="asc"/>
                            <FormControlLabel value="desc" control={<Radio/>} label="desc"/>
                        </RadioGroup>
                    </div>
                </div>

                <Grid container spacing={10} justifyContent="center" alignItems="center">

                    {isLoadingTasks ?
                        <Grid item md={4} xs={12}>
                            <h2>Data loading...</h2>
                        </Grid>
                        :
                        tasks.map(item => (
                            <Grid item md={4} xs={12} key={item.id}>
                                <Task {...item} />
                            </Grid>
                        ))}

                </Grid>
                <Grid container spacing={10} justifyContent="center" alignItems="center">
                    <Box marginTop={5}>
                        <Pagination count={pages} onChange={changePage}/>
                    </Box>
                </Grid>
            </div>
        );
    }
}

export default TasksList;