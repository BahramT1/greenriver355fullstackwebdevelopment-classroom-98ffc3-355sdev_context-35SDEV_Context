import { useEffect, useState } from "react";
import { RestaurantContext } from "./context/RestaurantContext";
import Main from "./components/Main";
import AddRestaurant from "./components/AddRestaurant";
import RestaurantsContainer from "./components/RestaurantsContainer";

import "./App.css";

function App() {
  const [restaurantState, setRestaurants] = useState([]);

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const response = await fetch("http://localhost:3000/restaurants");
        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      }
    }

    fetchRestaurants();
  }, []);

  const updateRestaurants = (newRestaurant) => {
    setRestaurants((prev) => [...prev, newRestaurant]);
  };

  return (
    <RestaurantContext.Provider
      value={{ restaurants: restaurantState, updateRestaurants }}
    >
      <div className="App">
        <Main />
        <AddRestaurant />
        <RestaurantsContainer />
      </div>
    </RestaurantContext.Provider>
  );
}

export default App;