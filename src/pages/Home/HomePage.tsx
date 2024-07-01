import axios from 'axios';
import { useEffect, useState } from 'react';
import { ICountryData } from '../../interfaces';
import { Button, Grid, TextField } from '@mui/material';
import CardComponent from '../../components/CardComponent';
import { RectangleOutlined } from '@mui/icons-material';

const HomePage = () => {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState<ICountryData[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<ICountryData[]>([]);
  const [region, setRegion] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get<ICountryData[]>('https://restcountries.com/v3.1/all');
      setCountries(data);
      const regions = data.map((obj) => obj.region);
      const uniqueregions = [...new Set(regions)];
      console.log('🚀 ~ fetchData ~ uniqueregions:', uniqueregions);
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(region);
    const filterCountries = () => {
      const filtered = countries.filter(
        (country) =>
          country.translations.spa.common
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .includes(
              search
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase()
            ) &&
          (!region || country.region === region)
      );
      setFilteredCountries(filtered);
    };

    filterCountries();
  }, [search, region, countries]);

  const handleFilterByRegion = (reg: string) => {
    if (reg === region) {
      setRegion(null);
    } else {
      setRegion(reg);
    }
  };
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

      <Grid container display={'flex'} justifyContent={'space-around'} gap={2}>
        <Button onClick={() => handleFilterByRegion('Africa')}>Africa</Button>
        <Button onClick={() => handleFilterByRegion('Oceania')}>Oceania</Button>
        <Button onClick={() => handleFilterByRegion('Europe')}>Europa</Button>
        <Button onClick={() => handleFilterByRegion('Americas')}>America</Button>
        <Button onClick={() => handleFilterByRegion('Asia')}>Asia</Button>
        <Button onClick={() => handleFilterByRegion('Antarctic')}>Antartida</Button>
      </Grid>
      <Grid container display={'flex'} spacing={3} justifyContent={'center'} alignItems={'center'}>
        {filteredCountries.map((country: ICountryData) => (
          <Grid item display={'felx'} xs={12} sm={6} md={4} lg={3} mb={6} key={country.ccn3}>
            <CardComponent
              cca3={country?.cca3}
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
