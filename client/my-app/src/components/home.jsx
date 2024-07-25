import React, { useState, useEffect } from "react";
import Wallpaper from "./wallpaper";
import QuickSearch from "./quicksearch";
import axios from 'axios';
import Footer from "./footer";
function Home() {
    const [mealtypes, setMealTypes] = useState([]);

    useEffect(() => {
        const fetchMealTypes = async () => {
            try {
                const response = await axios.get("http://localhost:8080/mealtype");
                setMealTypes(response.data);
            } catch (error) {
                console.error('Error fetching meal types:', error);
                // Handle error state or alert user
            }
        };

        fetchMealTypes();
    }, []);

    return (
        <div>
            <Wallpaper />
            <QuickSearch meal={mealtypes} /><br />
            <Footer/>
        </div>
    );
}

export default Home;
