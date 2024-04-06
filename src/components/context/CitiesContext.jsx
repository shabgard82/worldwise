import { createContext, useContext } from "react";
import { useEffect, useState } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:9000";

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [loading, SetLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        SetLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("there was an error loading data ...");
      } finally {
        SetLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      SetLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (error) {
      alert("there was an error fetching data ...");
    } finally {
      SetLoading(false);
    }
  }
  return (
    <CitiesContext.Provider value={{ cities, loading, getCity, currentCity }}>
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("cities was used outside the cities provider");
  return context;
}
export { CitiesProvider, useCities };
