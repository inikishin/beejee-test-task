import React, {useEffect, useState} from "react";
import styles from './task-list-style';
import {useDispatch, useSelector} from "react-redux";
import {getTasksList, SET_PAGE} from "../../services/actions/tasks";
import {Grid, makeStyles, FormLabel, RadioGroup, FormControlLabel, Radio} from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import Task from "../task/task";

const useStyles = makeStyles(theme => (styles));

function TasksList() {
    const classes = useStyles();

    const [sortValue, setSortValue] = useState('none')

    const dispatch = useDispatch();
    const {
        tasks,
        isLoadingTasks,
        hasErrorTasks,
        isCreatingTask,
        isEditingTask,
        currentPage,
        fullTasksCount
    } = useSelector(store => ({...store.tasks}));

    useEffect(() => {
        dispatch(getTasksList(currentPage, sortValue));
    }, [isCreatingTask, isEditingTask, currentPage, sortValue]);


    let pages = Math.ceil(fullTasksCount / 3);

    const changePage = (e) => {
        console.log(Number(e.target.innerText));
        dispatch({type: SET_PAGE, page: Number(e.target.innerText)})
    }

    const handleSortChange = (e) => {
        setSortValue(e.target.value)
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
                <div>
                    <FormLabel component="legend">Order by:</FormLabel>
                    <RadioGroup aria-label="gender" name="sort" value={sortValue} onChange={handleSortChange}>
                        <FormControlLabel value="none" control={<Radio/>} label="None"/>
                        <FormControlLabel value="username" control={<Radio/>} label="Username"/>
                        <FormControlLabel value="email" control={<Radio/>} label="E-mail"/>
                        <FormControlLabel value="status" control={<Radio/>} label="Status"/>
                    </RadioGroup>
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
                    <Pagination count={pages} onChange={changePage}/>
                </Grid>
            </div>
        );
    }
}

export default TasksList;