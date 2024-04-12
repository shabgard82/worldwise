import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "./context/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export default function CityItem({ city }) {
  const { currentCity } = useCities();
  const { cityName, emoji, date, id, position } = city;
  return (
    <li>
      <Link
        className={`${styles.CityItem} ${
          id === currentCity.id ? styles["CityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "10px",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span className={styles.emoji}>{emoji}</span>
          <h3 className={styles.name}>{cityName}</h3>
        </div>
        <div>
          <time className={styles.date}>({formatDate(date)})</time>
          <button className={styles.deleteBtn}>&times;</button>
        </div>
      </Link>
    </li>
  );
}
