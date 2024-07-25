import { useState, useEffect } from 'react';
import img from '../assets/idly.webp';
import axios from 'axios';

const API_URL = 'http://localhost:8080';
const ITEMS_PER_PAGE = 2;

function Right({ selectedLocation, selectedCuisines, selectedCost, sortOrder }) {
    const [location, setLocation] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

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
                    setLocation(data);
                    setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));
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
                    <div className="shadow-lg rounded my-3 p-3" key={index}>
                        <div className="d-flex">
                            <div className='p-3'>
                                <img src={img} alt="" height='120px' width='120px' className='rounded' />
                            </div>
                            <div className='p-4'>
                                <h2>{item.name}</h2>
                                <h5>Fort</h5>
                                <p className='text-muted'>{item.Address}</p>
                            </div>
                        </div>
                        <hr />
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            <p className='text-muted'>Cuisines:</p>
                                        </th>
                                        <th>
                                            <p>Bakery</p>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Cost For Two:</td>
                                        <td><span>&#8193;</span><span>&#8377;</span>700</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
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
