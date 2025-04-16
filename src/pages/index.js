import CountriesTable from "@/components/CountryTable/CountriesTable";
import Image from "next/image";
import Layout from "@/components/Layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput";
import styles from "../styles/Home.module.css";
import { useState } from "react";

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("");
  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword)
  );
  const onInputChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };
  return (
    <Layout>
      <div className={styles.counts}>Found {countries.length} countries</div>
      <SearchInput
        placeholder="Filter by Name, Region, or Country Code"
        onChange={onInputChange}
      />
      <CountriesTable countries={filteredCountries} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const response = await fetch("https://www.apicountries.com/countries");
  const countries = await response.json();

  return {
    props: {
      countries,
    },
  };
};

// export const getStaticProps = async () => {
//   let countries = [];
//   try {
//     const response = await fetch("https://api.first.org/data/v1/countries");

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const data = await response.json();

//     countries = Object.entries(data.data).map(([code, info]) => ({
//       code,
//       ...info,
//     }));
//   } catch (error) {
//     console.error("Failed to fetch countries:", error);
//   }

//   return {
//     props: {
//       countries,
//     },
//   };
// };

/*
Get countries from https://api.first.org/v1/get-countries
*/
