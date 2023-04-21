import axios from 'axios';

import './DeleteTask.css'

const DeleteTask = ({ _id, callback }) => {

    const handleDelete = async () => {
        await axios.delete(`http://localhost:3001/api/v1/tasks/delete/${_id}`);
        callback();
    }

    return (
        <>
            <button className='deleteButton' onClick={handleDelete}>❌ Delete</button>
        </>
    );
}

export default DeleteTask;