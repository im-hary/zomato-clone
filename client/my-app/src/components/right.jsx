import { useState, useEffect } from 'react';
import img from '../assets/idly.webp';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:8080';
const ITEMS_PER_PAGE = 2 ;

function Right({ selectedLocation, selectedCuisines, selectedCost, sortOrder }) {
    const [location, setLocation] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(3);

    useEffect(() => {
        const fetchLocations = () => {
            axios.get(`${API_URL}/location`, {
                params: {
                    location: selectedLocation,
                    cuisines: selectedCuisines,
                    cost: selectedCost,
                    sort: sortOrder
                }
            })
            .then((res) => {
                console.log('API response:', res.data);
                const data = res.data;
                if (Array.isArray(data)) {
                    let sortedData = data;
                    if (sortOrder === 'lowToHigh') {
                        sortedData = data.sort((a, b) => a.min_price - b.min_price);
                    } else if (sortOrder === 'highToLow') {
                        sortedData = data.sort((a, b) => b.min_price - a.min_price);
                    }
                    setLocation(sortedData);
                    setTotalPages(Math.ceil(sortedData.length / ITEMS_PER_PAGE));
                } else {
                    console.error('Unexpected API response structure:', res.data);
                    setLocation([]);
                    setTotalPages(1);
                }
            })
            .catch(err => {
                console.error('API error:', err);
                setLocation([]);
                setTotalPages(1);
            });
        };

        fetchLocations();
    }, [selectedLocation, selectedCuisines, selectedCost, sortOrder]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const paginatedLocations = location.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    return (
       <div className='col-lg-8'>
            {paginatedLocations.length > 0 ? (
                paginatedLocations.map((item, index) => (
                    <Link to='/details'><div className="shadow-lg rounded my-3 p-3 text-dark" key={index}>
                        <div className="d-flex">
                            <div className='p-3'>
                                <img src={img} className='rounded' height='100' width='100' alt='' />
                            </div>
                            <div className='ms-5'>
                                <h4 className=''>{item.name}</h4>
                                <p className='text-muted'>{item.locality}</p>
                                <p className='text-muted'>{item.city}</p>
                            </div>
                        </div>
                        <hr />
                        <div className='d-flex'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            <p className='text-muted'>Cuisines:</p>
                                        </th>
                                        <th>
                                            <p>{item.cuisine.map(c => c.name).join(', ')}</p>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Cost For Two:</td>
                                        <td><span>&#8193;</span><span>&#8377;</span>{item.min_price}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div></Link>
                ))
            ) : (
                <p>No locations available</p>
            )}
            <div className='d-flex justify-content-center align-items-center'>
                <button 
                    className='btn border p-2 m-2 border-danger rounded' 
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    &laquo;
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((value) => (
                    <button 
                        key={value}
                        className={`btn border p-2 m-2 border-danger rounded ${currentPage === value ? 'btn-danger' : ''}`}
                        onClick={() => handlePageChange(value)}
                    >
                        {value}
                    </button>
                ))}
                <button 
                    className='btn border p-2 m-2 border-danger rounded' 
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    &raquo;
                </button>
            </div>
        </div>
    );
}

export default Right;
