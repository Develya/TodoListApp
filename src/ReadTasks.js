import { useEffect, useState } from 'react';
import axios from 'axios';

import Task from './Task';
import CreateTask from './CreateTask';

const ReadTasks = () => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    },[]);

    const fetchTasks = async () => {
        await axios.get('http://localhost:3001/api/v1/tasks/get').then((response) => setTasks(response.data));
    }

    return (    
        <div>
            {tasks.map(task => (
                <Task _id={task._id} title={task.title} description={task.description} completed={task.completed} callback={fetchTasks}/>
            ))}
            <CreateTask callback={fetchTasks}/>
        </div>
    );
}

export default ReadTasks;
