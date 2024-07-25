import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/wallpaper.css';
import searchIcon from '../assets/search.svg';
import locationIcon from '../assets/geo-alt-fill.svg';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './header.jsx';

const API_URL = 'http://localhost:8080';

function Wallpaper() {
    const [loc, setLocation] = useState([]);
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API_URL}/location`)
            .then((res) => {
                setLocation(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const fetchSuggestions = async (query) => {
        try {
            const response = await axios.get(`${API_URL}/searchRestaurants?q=${query}`);
            setSuggestions(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        if (value) {
            fetchSuggestions(value);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (id) => {
        console.log('Suggestion clicked:', id); // Debug log
        navigate(`/details/${id}`);
       
    };

    return (
        <div>
            <div id="bg">
                <Header />
                <div className='d-flex justify-content-center align-items-center mt-5 pt-5'>
                    <div id="icon" className='text-danger bg-light d-flex justify-content-center align-items-center p-5'>
                        <h1 className='d-flex justify-content-center align-items-center' style={{ fontSize: "60px" }}>Z</h1>
                    </div>
                </div>
                <div className='d-flex justify-content-center align-items-center col-12 text-center'>
                    <h2 className='text-light mt-3'>Find the Best Restaurants, cafes, and bars</h2>
                </div>
                <div className='container'>
                    <div className='d-flex justify-content-center align-items-center form-group row m-5'>
                        <div className='col-6 col-lg-3 col-md-6'>
                            <div className='input-group'>
                                <span className='input-group-text'><img src={locationIcon} alt="Location Icon" /></span>
                                <select className="form-select" aria-label="Default select example">
                                    {loc.map((item, index) => (
                                        <option key={index} value={item.location_id}>
                                            {item.locality}, {item.city}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='col-6 col-lg-5'>
                            <div className='input-group position-relative'>
                                <span className='input-group-text'>
                                    <img src={searchIcon} alt="Search Icon" />
                                </span>
                                <input
                                    className='form-control'
                                    id='search'
                                    placeholder='Search Restaurant'
                                    onChange={handleChange}
                                    value={query}
                                />
                                {suggestions.length > 0 && (
                                    <ul className='list-group dropdown-content position-absolute'>
                                        {suggestions.map((item, index) => (
                                            <li
                                                key={index}
                                                className='list-group-item'
                                                onClick={() => handleSuggestionClick(item._id)}
                                            >
                                                {item.name}
                                            </li>
                                        ))
                                            }
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Wallpaper;
