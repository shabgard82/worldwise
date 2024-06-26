import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "./context/CitiesContext";

export default function CityList() {
  const { cities, loading } = useCities();
  if (loading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first first cities by clicking on a city on the map" />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
