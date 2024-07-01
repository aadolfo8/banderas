import { FC, useEffect, useState } from 'react';
import { ICountryData } from '../../interfaces';
import axios from 'axios';
import { Grid } from '@mui/material';
import MapComponent from '../../components/MapComponent';
import moment from 'moment-timezone';
import Clock from '../../components/Clock';

interface Props {
  ccn3: string;
}
const CountryPage: FC<Props> = ({ ccn3 }) => {
  const [country, setCountry] = useState<ICountryData>();
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get<ICountryData[]>(`https://restcountries.com/v3.1/alpha/${ccn3}`);
      setCountry(data[0]);
      console.log(data[0]);


    };


    fetchData();
  }, []);

  return (
    <Grid container display={'flex'}>
      <img
        src={country?.flags?.png || ''}
        alt={country?.name?.common || 'bandera'}
        style={{ width: '400px', height: '200px', objectFit: 'cover', borderRadius: 15 }}
      />
      {
        country?.timezones?.map((timezone) => ( 

          <Clock timezone={timezone || 'UTC'} key={timezone}/>
        ))
      }
      <div>{country?.translations?.spa?.common || ''}</div>
      <MapComponent
        lat={country?.latlng?.[0] || 0}
        lng={country?.latlng?.[1] || 0}
        name={country?.translations?.spa?.common || ''}
      ></MapComponent>
    </Grid>
  );
};

export default CountryPage;
