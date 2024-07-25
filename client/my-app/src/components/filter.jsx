import { useState } from 'react';
import Header from "./header";
import Right from "./right";

function Filter() {
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedCuisines, setSelectedCuisines] = useState([]);
    const [selectedCost, setSelectedCost] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    const handleCuisineChange = (event) => {
        const { value, checked } = event.target;
        setSelectedCuisines((prevSelected) =>
            checked ? [...prevSelected, value] : prevSelected.filter(c => c !== value)
        );
    };

    const handleCostChange = (event) => {
        setSelectedCost(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

    const style = {
        borderRadius: '5px',
        height: '35px',
        width: '250px'
    };

    return (
        <div>
            <Header />
            <div className="container" id="flex">
                <div className="row">
                    <div className="col-lg-4 mt-3">
                        <div className="p-3 shadow-lg">
                            <h3>Filters</h3>
                            <h6>Select location</h6>
                            <input list='location' placeholder='Select Location' style={style} onChange={handleLocationChange} />
                            <datalist id='location'>
                                <option value="Chennai">Chennai</option>
                                <option value="Mumbai">Mumbai</option>
                                <option value="Bangalore">Bangalore</option>
                            </datalist>

                            <div className="mt-3">
                                <p>Cuisine</p>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="North Indian" onChange={handleCuisineChange} id="northIndian" />
                                    <label className="form-check-label" htmlFor="northIndian">
                                        North Indian
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="South Indian" onChange={handleCuisineChange} id="southIndian" />
                                    <label className="form-check-label" htmlFor="southIndian">
                                        South Indian
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="Chinese" onChange={handleCuisineChange} id="chinese" />
                                    <label className="form-check-label" htmlFor="chinese">
                                        Chinese
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="Fast Food" onChange={handleCuisineChange} id="fastFood" />
                                    <label className="form-check-label" htmlFor="fastFood">
                                        Fast Food
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="Street Food" onChange={handleCuisineChange} id="streetFood" />
                                    <label className="form-check-label" htmlFor="streetFood">
                                        Street Food
                                    </label>
                                </div>
                            </div>

                            <div className="mt-3">
                                <p>Cost for Two</p>
                                <div className="form-check">
                                    <input type="radio" className="form-check-input" id="cost1" name="cost" value="500" onChange={handleCostChange} />
                                    <label className="form-check-label" htmlFor="cost1">Less than ₹500</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" className="form-check-input" id="cost2" name="cost" value="500-1000" onChange={handleCostChange} />
                                    <label className="form-check-label" htmlFor="cost2">₹500 to ₹1000</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" className="form-check-input" id="cost3" name="cost" value="1000-1500" onChange={handleCostChange} />
                                    <label className="form-check-label" htmlFor="cost3">₹1000 to ₹1500</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" className="form-check-input" id="cost4" name="cost" value="1500-2000" onChange={handleCostChange} />
                                    <label className="form-check-label" htmlFor="cost4">₹1500 to ₹2000</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" className="form-check-input" id="cost5" name="cost" value="2000+" onChange={handleCostChange} />
                                    <label className="form-check-label" htmlFor="cost5">₹2000+</label>
                                </div>
                            </div>

                            <div className="mt-3">
                                <p>Sort</p>
                                <div className="form-check">
                                    <input type="radio" className="form-check-input" id="sortLowToHigh" name="sort" value="lowToHigh" onChange={handleSortChange} />
                                    <label className="form-check-label" htmlFor="sortLowToHigh">Price low to high</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" className="form-check-input" id="sortHighToLow" name="sort" value="highToLow" onChange={handleSortChange} />
                                    <label className="form-check-label" htmlFor="sortHighToLow">Price high to low</label>
                                </div>
                            </div>

                        </div>
                    </div>
                    <Right
                        selectedLocation={selectedLocation}
                        selectedCuisines={selectedCuisines}
                        selectedCost={selectedCost}
                        sortOrder={sortOrder}
                    />
                </div>
            </div>
        </div>
    );
}

export default Filter;
