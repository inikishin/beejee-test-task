const getUrl = (command) => {
    return `https://uxcandy.com/~shapoval/test-task-backend/v2${command}?developer=inikishin`
}

export const getTasksListRequest = async (page, sortBy, directionBy) => {
    let sort = '';
    if (sortBy !== 'None') {
        sort = `&sort_field=${sortBy}`
    }

    return await fetch(getUrl('/') + `&page=${page}` + sort + `&sort_direction=${directionBy}`);
}

export const createTaskRequest = async (data) => {
    const options = {
        method: 'POST',
        body: data
    }

    return await fetch(getUrl('/create'), options);
}

export const editTaskRequest = async (id, data) => {
    const options = {
        method: 'POST',
        body: data
    }

    return await fetch(getUrl(`/edit/${id}`), options);
}

export const loginRequest = async (data) => {
    const options = {
        method: 'POST',
        body: data
    }

    return await fetch(getUrl('/login'), options);
}

