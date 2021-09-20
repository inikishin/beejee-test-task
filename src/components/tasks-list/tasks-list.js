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
    const [directionValue, setDirectionValue] = useState('asc')

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
        dispatch(getTasksList(currentPage, sortValue, directionValue));
    }, [dispatch, isCreatingTask, isEditingTask, currentPage, sortValue, directionValue]);


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

    if (hasErrorTasks) {
        return (
            <div className={classes.taskListContainer}>
                <h2>Error! Please check console</h2>
            </div>
        );
    } else {
        return (
            <div className={classes.taskListContainer}>
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
                    <Pagination count={pages} onChange={changePage}/>
                </Grid>
            </div>
        );
    }
}

export default TasksList;