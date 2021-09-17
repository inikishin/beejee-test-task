import React from 'react';

import {FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';

function Status({statusNumber, isEdit, handleChange}) {

    const statuses = [
        {code: 0, name: 'задача не выполнена'},
        {code: 1, name: 'задача не выполнена, отредактирована админом'},
        {code: 10, name: 'задача выполнена'},
        {code: 11, name: 'задача отредактирована админом и выполнена'},
    ]

    const status = statuses.find(item => (item.code===statusNumber));

    return (
        <>
            {isEdit ?
                <FormControl variant="outlined">
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={statusNumber}
                        onChange={handleChange}
                        label="Status"
                        name="status"
                    >
                        {
                            statuses.map(item => (
                                <MenuItem value={item.code}>{item.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                :
                <p>Status: {status.name}</p>}
        </>
    );
}

export default Status;