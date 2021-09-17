import React, {useState} from "react";
import {useSelector} from 'react-redux';
import styles from './task-edit-styles';
import {
    Card,
    CardHeader,
    CardContent,
    Button,
    TextField,
    Grid,
    Typography,
    makeStyles
} from "@material-ui/core";
import {AccountCircle, EmailRounded} from '@material-ui/icons';
import Status from "../status/status";

const useStyles = makeStyles(theme => (styles));

function TaskEdit({title, closeModal, okModal, username, email, text, status}) {
    const classes = useStyles();

    const {isAuthenticated} = useSelector(store => ({...store.auth}))

    const [form, setFormValue] = useState({username: username, email: email, text: text, status: status});
    const [errors, setErrors] = useState([]);

    const onChange = (e) => {
        setFormValue({...form, [e.target.name]: e.target.value});
        console.log(form);
    }

    const submitForm = () => {
        let localErrors = []
        if (form.username === '') {
            localErrors.push('Field username is empty');
        }
        if (!(form.email.includes('@') && form.email.includes('.'))) {
            localErrors.push('Field email is incorrect');
        }
        if (form.text === '') {
            localErrors.push('Field text is empty');
        }

        if (localErrors.length > 0) {
            setErrors(localErrors)
        } else {
            okModal(form);
        }
    }

    return (
        <Card className={classes.editContainer}>
            <CardHeader title={title}/>
            <CardContent>
                <form>
                    <div className={classes.inputWithIcon}>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <AccountCircle/>
                            </Grid>
                            <Grid item>
                                <TextField name="username" label="Enter user name" fullWidth={true}
                                           value={form.username} onChange={onChange} required/>
                            </Grid>
                        </Grid>
                    </div>

                    <div className={classes.inputWithIcon}>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <EmailRounded/>
                            </Grid>
                            <Grid item>
                                <TextField name="email" label="Enter email" fullWidth={true}
                                           value={form.email} onChange={onChange} type='email' required/>
                            </Grid>
                        </Grid>
                    </div>

                    <div className={classes.inputText}>
                        <TextField
                            name="text"
                            label="Task description"
                            multiline
                            rows={6}
                            variant="outlined"
                            fullWidth={true}
                            value={form.text}
                            onChange={onChange}
                            required
                        />
                    </div>

                    <div className={classes.inputChecker}>
                        <Status statusNumber={form.status} isEdit={isAuthenticated} handleChange={onChange}/>
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

export default TaskEdit;