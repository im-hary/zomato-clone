import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './home.jsx';
import Filter from './filter.jsx';
import Details from './details.jsx';


function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/filter' element={<Filter />} />
                <Route path='/details/:id' element={<Details />} />
                <Route path='/details' element={<Details />} />
               
                
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
