import axios from 'axios';
import { useEffect, useState } from 'react';
import { ICountryData } from '../../interfaces';
import { Grid, TextField } from '@mui/material';
import CardComponent from '../../components/CardComponent';

const HomePage = () => {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState<ICountryData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get<ICountryData[]>('https://restcountries.com/v3.1/all');
      setCountries(data);
    };

    fetchData();
  }, []);

  return (
    <Grid container>
      <Grid container display={'flex'}>
        <h1>Home Page</h1>
        <TextField
          id="outlined-required"
          label="Nombre del pais"
          placeholder="Busca un pais..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          sx={{
            mb: 3,
            borderRadius: 25,
          }}
        />
      </Grid>

      <Grid
        container
        display={'flex'}
        spacing={3}
        justifyContent={'center'}
        alignItems={'center'}
        width={'100%'}
        height={'100%'}
      >
        {countries
          .filter((country) => country.translations.spa.common.toLowerCase().includes(search.toLowerCase()))
          .map((country: ICountryData) => (
            <Grid item display={'felx'} xs={12} sm={6} md={4} lg={3} mb={6} key={country.ccn3}>
              <CardComponent
                ccn3={country?.ccn3}
                capital={country?.capital?.[0] || ''}
                name={country.translations.spa.common || ''}
                image={country.flags.png || ''}
                region={country.region || ''}
              />
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
};

export default HomePage;
