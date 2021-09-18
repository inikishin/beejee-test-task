import React, {useEffect, useState} from 'react';
import styles from './login-styles';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    makeStyles,
    TextField, Typography
} from "@material-ui/core";
import {AccountCircle, SecurityRounded} from "@material-ui/icons";
import {useSelector, useDispatch} from "react-redux";
import {login, LOGOUT} from "../../services/actions/auth";

const useStyles = makeStyles(theme => (styles));

const Login = React.forwardRef( ({closeModal}, ref) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const {isAuthenticated, isLoggingIn, hasError} = useSelector(store => ({...store.auth}))

    const [form, setFormValue] = useState({username: '', password: ''});
    const [errors, setErrors] = useState({});

    const onChange = (e) => {
        setFormValue({...form, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        if (isAuthenticated) {
            closeModal();
        }
    }, [isAuthenticated, closeModal]);

    const submitForm = () => {

        let localErrors = {};
        if (form.username === '') {
            localErrors.username = {error: true, helperText: 'Field username is empty'}
        }
        if (form.password === '') {
            localErrors.password = {error: true, helperText: 'Field password is empty'}
        }

        if (Object.keys(localErrors).length > 0) {
            setErrors(localErrors);
        } else {
            let task = new FormData();
            task.append("username", form.username);
            task.append("password", form.password);

            dispatch(login(task));
        }
    }

    const handleCancel = () => {
        dispatch({type: LOGOUT})
        closeModal();
    }

    return (
        <Card className={classes.editContainer}>
            <CardHeader title="Authorization"/>
            <CardContent>
                <form>
                    <div className={classes.inputWithIcon}>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <AccountCircle/>
                            </Grid>
                            <Grid item>
                                <TextField name="username" label="Enter user name" fullWidth={true}
                                           value={form.username} onChange={onChange} {...errors.username}/>
                            </Grid>
                        </Grid>
                    </div>

                    <div className={classes.inputWithIcon}>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <SecurityRounded/>
                            </Grid>
                            <Grid item>
                                <TextField name="password" label="Enter password" fullWidth={true} type="password"
                                           value={form.password} onChange={onChange} {...errors.password}/>
                            </Grid>
                        </Grid>
                    </div>

                    <div className={classes.buttonsContainer}>
                        <Button variant="contained" color="primary" onClick={submitForm} disabled={(isLoggingIn)}>
                            OK
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </div>

                    {hasError.error && <div className={classes.errorMessages}>
                        <Typography variant="caption" display="block" gutterBottom>Here is following
                            errors:</Typography>
                        <Typography variant="caption" display="block" gutterBottom>{hasError.message}</Typography>
                    </div>}

                </form>
            </CardContent>
        </Card>
    )
});

export default Login;
