import { useEffect, useState } from "react";
// Import Temp Data 
import weatherData from '../fakeWeatherData.json'

// Import the React Components we need
import Error from './Error'
import Data from "./Data";
import Loading from "./Loading";
import NoData from "./NoData";

const MyCmp = () => {

  // Intialize the states we will use for each conditional render
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);

  // A function that simulates an API call to get Data that takes 2 seconds
  const getData = () => {
    return new Promise((resolve, reject) => {

      setTimeout(() => {

        // You can switch the argument in "resolve()" to "{}" to get the <No Data/> component  
        // You can switch the argument in "resolve()" to "null" to get the <Error/> component  
        resolve(weatherData);
      }, 2000);
    });
  };

  useEffect(() => {

    // A function that fetches data while handling the state changes
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsError(false)
        const response = await getData();

        // Reading the cod key from the weatherData sent
        setData(response.cod)
      } catch (error) {
        setIsError(true)
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false);

      }
    }
    // Running the fetchData function
    fetchData()

  }, [])


  // A function that returns a component based on each condition 
  const renderContent = () => {
    if (isLoading) return <Loading />;
    if (isError) return <Error />;
    if (data && !isLoading) return <Data data={data} />;

    // This is the default component if none of the conditions above are met
    return <NoData />;
  };

  // Here we call the function that will return the rendered component
  return <div>{renderContent()}</div>;
}

export default MyCmp