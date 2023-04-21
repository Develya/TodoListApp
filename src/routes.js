import { Route, Routes } from 'react-router-dom';

import App from './App';
import NotFound from './NotFound';

const RouteComponent = () => {
    return (
        <Routes>
            <Route exact path='/' element={<App/>}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
    );
};

export default RouteComponent;