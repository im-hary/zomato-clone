import React from 'react';
import img from '../assets/lunch.jpg'
import { Link } from 'react-router-dom';

function Quickitem(props) {
    const { item } = props;
    const imgSrc = `../../assets/${item.image}`; // Hardcoded path for testing
   

    return (
        <div className='col-lg-4 col-md-6 col-sm-12 p-3' >
            <Link to ='filter'><div className='shadow-lg  d-flex' id='qs'  style={{ cursor: 'pointer' }}>
                <div>
                    <img src={img} height='130px' width='130px' alt={item.name} />
                </div>
                <div className='title p-2'>
                    <div className='breakfast text-dark'>
                        <h2>{item.name}</h2>
                    </div>
                    <div className='text-dark'><p>{item.content}</p></div>
                </div>
            </div></Link>
        </div>
    );
}

export default Quickitem;
