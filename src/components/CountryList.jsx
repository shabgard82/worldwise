import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "./context/CitiesContext";

export default function CountryList() {
  const { cities, loading }=useCities()
  if (loading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first first country by clicking on a country  on the map" />
    );
  const contries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);
  return (
    <ul className={styles.countryList}>
      {contries.map((country) => (
        <CountryItem country={country} key={country.country}/>
      ))}
    </ul>
  );
}
