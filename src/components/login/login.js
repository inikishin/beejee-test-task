import React, {useState} from 'react';
import styles from './login-styles';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    FormControlLabel,
    Grid,
    makeStyles,
    TextField, Typography
} from "@material-ui/core";
import {AccountCircle, SecurityRounded} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {login} from "../../services/actions/auth";

const useStyles = makeStyles(theme => (styles));

function Login({closeModal}) {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [form, setFormValue] = useState({username: '', password: ''});
    const [errors, setErrors] = useState([]);

    const onChange = (e) => {
        setFormValue({...form, [e.target.name]: e.target.value});
    }

    const submitForm = () => {

        let localErrors = []
        if (form.username === '') {
            localErrors.push('Field username is empty');
        }
        if (form.password === '') {
            localErrors.push('Field password is empty');
        }

        if (localErrors.length > 0) {
            setErrors(localErrors)
        } else {
            let task = new FormData();
            task.append("username", form.username);
            task.append("password", form.password);

            dispatch(login(task));
            closeModal();
        }
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
                                           value={form.username} onChange={onChange}/>
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
                                           value={form.password} onChange={onChange}/>
                            </Grid>
                        </Grid>
                    </div>

                    <div className={classes.buttonsContainer}>
                        <Button variant="contained" color="primary" onClick={submitForm}>
                            OK
                        </Button>
                        <Button variant="contained" color="secondary" onClick={closeModal}>
                            Cancel
                        </Button>
                    </div>

                    {(errors.length > 0) && <div className={classes.errorMessages}>
                        <Typography variant="caption" display="block" gutterBottom color="danger">Here is following
                            errors:</Typography>
                        {errors.map(item => (
                            <Typography variant="caption" display="block" gutterBottom
                                        color="danger">{item}</Typography>
                        ))}
                    </div>}

                </form>
            </CardContent>
        </Card>
    )
}

export default Login;
