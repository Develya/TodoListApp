import { useState, useEffect } from 'react';
import axios from 'axios';

import './UpdateTask.css'


const UpdateTask = ({_id, completed, title, description}) => {

    const [stateCompleted, setCompleted] = useState(completed);
    const [stateTitle, setTitle] = useState(title);
    const [stateDescription, setDescription] = useState(description);
    const [taskChanged, setTaskChanged] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
            updateTask('COMPLETION');
        }, [stateCompleted]
    );

    useEffect(() => setFirstLoad(false), []);

    const updateTask = async (target) => {
        if (firstLoad) return;
        switch (target) {
            case 'COMPLETION':
                await axios.put(`http://localhost:3001/api/v1/tasks/updateState/${_id}`, {data: {completed: stateCompleted}});
                break;
            case 'CONTENT':
                await axios.put(`http://localhost:3001/api/v1/tasks/updateContent/${_id}`, {data: {title: stateTitle, description: stateDescription}});
                setTaskChanged(false);
                break;
            default:
                break;
        }
    }

    const handleCheck = (currentState) => {
        switch (currentState) {
            case true:
                setCompleted(false);
                break;
            case false:
                setCompleted(true);
                break;
            default:
                break;
        }
    }

    const handleChange = (event, target) => {
        switch (target) {
            case 'TITLE':
                setTitle(event.target.value);
                break;
            case 'DESCRIPTION':
                setDescription(event.target.value);
                break;
            default:
                break;
        }
        setTaskChanged(true);
    }

    return (
        <>
            {stateCompleted ? <button className='checkButton' onClick={() => handleCheck(stateCompleted)}>✅</button> : <button className='checkButton' onClick={() => handleCheck(stateCompleted)}>🟩</button>}
            <br/>
            <textarea className='title' rows={1} value={stateTitle} onChange={(event) => handleChange(event, 'TITLE')}/>
            <br/>
            <textarea className='description' value={stateDescription} onChange={(event) => handleChange(event, 'DESCRIPTION')}/>
            {taskChanged ? <button className='saveButton' onClick={() => updateTask('CONTENT')}>Save changes</button> : ''}
        </>
    );
}

export default UpdateTask;