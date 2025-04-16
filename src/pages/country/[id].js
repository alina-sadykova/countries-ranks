import Layout from "@/components/Layout/Layout";
import styles from "./country.module.css";

const getCountry = async (id) => {
  const res = await fetch(`https://www.apicountries.com/countries/${id}`);
  //   const country = await res.json();
  return res.json();
};

const Country = ({ country }) => {
  console.log(country);
  return (
    <Layout title={country}>
      <div>
        <div className={styles.overview_panel}>
          <h1>{country}</h1>
          <div>{country}</div>
          <div>
            <div className={styles.overview_code}>{country}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Country;

export const generateStaticParams = async () => {
  try {
    const response = await fetch("https://www.apicountries.com/countries");
    if (!response.ok) {
      throw new Error("Failed to fetch countries list");
    }
    const countries = await response.json();

    return countries.map((country) => ({
      id: country.alpha3Code,
    }));
  } catch (error) {
    console.error("Error fetching country:", error);
  }
};
