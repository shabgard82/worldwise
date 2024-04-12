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

  async function createCity(newCity) {
    try {
      SetLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setCurrentCity(data);
    } catch (error) {
      alert("there was an error fetching data ...");
    } finally {
      SetLoading(false);
    }
  }
  return (
    <CitiesContext.Provider
      value={{ cities, loading, currentCity, getCity, createCity }}
    >
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
