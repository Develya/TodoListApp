import UpdateTask from './UpdateTask';
import DeleteTask from './DeleteTask';

import './Task.css';

const Task = ({_id, title, description, completed, callback}) => {

    return (
        <div className={completed ? 'task completed': 'task in-progress'} key={_id} id={_id}>
            <UpdateTask _id={_id} completed={completed} title={title} description={description}/>
            <DeleteTask _id={_id} callback={callback}/>
        </div>
    );
}

export default Task;