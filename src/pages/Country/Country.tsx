import { FC, useEffect, useState } from "react";
import { ICountryData } from "../../interfaces";
import axios from "axios";

interface Props {
  ccn3: string;
}
const CountryPage: FC<Props> = ({ ccn3 }) => {
    console.log(ccn3);
  const [country, setCountry] = useState<ICountryData>();
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get<ICountryData[]>(
        `https://restcountries.com/v3.1/alpha/${ccn3}`
      );
      setCountry(data[0]);
    };

    fetchData();
  }, []);

  return (
    <>
      <div>Country {ccn3}</div>
      <div>{country?.translations?.spa?.common}</div>
    </>
  );
};

export default CountryPage;
