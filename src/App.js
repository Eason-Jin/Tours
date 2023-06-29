import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";

// API provided by Coding Addict
const url = "https://course-api.com/react-tours-project";
function App() {
  // By default, show the loading component
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  // Remove tour function, this function is passed as a prop
  const removeTour = (id) => {
    // Filters tours where the id does not match and put into newTours
    const newTours = tours.filter((tours) => tours.id !== id);
    setTours(newTours);
  };
  const fetchTours = async () => {
    // For sure loading is true when fetching
    setLoading(true);

    // Use try catch in case of any error
    try {
      // This segment fetches the data
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // This should only run once
  useEffect(() => {
    fetchTours();
  }, []);

  // When loading, show the loading component
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  // See if all tours are deleted
  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button className='btn' onClick={() => fetchTours()}>refresh</button>
        </div>
      </main>
    );
  }

  // When done loading, show tours component
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
