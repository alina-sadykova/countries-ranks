import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@mui/icons-material";

import Link from "next/link";
import styles from "./CountriesTable.module.css";
import { useState } from "react";

const orderBy = (countries, value, direction) => {
  if (!value || !direction) return countries;

  if (direction === "asc") {
    return [...countries].sort((a, b) => {
      if (a[value] < b[value]) return -1;
      if (a[value] > b[value]) return 1;
      return 0;
    });
  }
  if (direction === "desc") {
    return [...countries].sort((a, b) => {
      if (a[value] > b[value]) return -1;
      if (a[value] < b[value]) return 1;
      return 0;
    });
  }
  return countries;
};
const SortArrow = ({ direction }) => {
  if (!direction) return <></>;
  if (direction === "desc") {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    );
  }
};
const CountriesTable = ({ countries }) => {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();
  const orderedCountries = orderBy(countries, value, direction);

  const switchDirection = () => {
    if (!direction) setDirection("desc");
    if (direction === "desc") setDirection("asc");
    return setDirection(null);
  };

  const setValueandDirection = (field) => {
    if (field !== value) {
      setDirection("desc"); // reset direction if new column
    } else {
      switchDirection();
    }
    setValue(field);
  };

  return (
    <div>
      <div className={styles.heading}>
        <button
          className={styles.heading_country}
          onClick={() => setValueandDirection("name")} //??
        >
          <div>Name</div>
          {value === "name" && <SortArrow direction={direction} />}
        </button>
        <button
          className={styles.heading_region}
          onClick={() => setValueandDirection("region")}
        >
          <div>Population</div>
          {value === "region" && <SortArrow direction={direction} />}
        </button>
      </div>
      {orderedCountries.map((country) => (
        <Link href={`/country/${country.alpha3Code}`} key={country.alpha3Code}>
          <div className={styles.row}>
            <div className={styles.name}>{country.name}</div>
            <div className={styles.population}>{country.population}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};
export default CountriesTable;
