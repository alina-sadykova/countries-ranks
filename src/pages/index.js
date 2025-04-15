import Image from "next/image";
import Layout from "@/components/Layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput";
import styles from "../styles/Home.module.css";
export default function Home({ countries }) {
  console.log(countries);
  return (
    <Layout>
      <div className={styles.counts}>Found {countries.length} countries</div>
      <SearchInput />
    </Layout>
  );
}
export const getStaticProps = async () => {
  let countries = [];
  try {
    const response = await fetch("https://api.first.org/data/v1/countries");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    countries = Object.entries(data.data).map(([code, info]) => ({
      code,
      ...info,
    }));
  } catch (error) {
    console.error("Failed to fetch countries:", error);
  }

  return {
    props: {
      countries,
    },
  };
};

/*
Get countries from https://api.first.org/v1/get-countries
*/
