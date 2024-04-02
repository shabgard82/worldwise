import styles from "./CityItem.module.css";

export default function CityItem({ city }) {
  return <li className={styles.CityItem}>{city}</li>;
}
