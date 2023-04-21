import axios from 'axios';

import './CreateTask.css';

const CreateTask = ({ callback }) => {

    const handleCreate = async () => {
        await axios.post('http://localhost:3001/api/v1/tasks/create');
        callback();
    }

    return (
        <>
            <button className='createButton' onClick={handleCreate}>+ New task</button>
        </>
    );
}

export default CreateTask;