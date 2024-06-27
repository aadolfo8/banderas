import axios from "axios"
import { useEffect, useState } from "react"
import { ICountryData } from "../../interfaces"
import { Grid } from "@mui/material"
import CardComponent from "../../components/CardComponent"

const HomePage = () => {

    const [countries, setCountries] = useState<ICountryData[]>([])

    useEffect(() => {
        const fetchData = async () => {

           const { data } =  await axios.get<ICountryData[]>('https://restcountries.com/v3.1/all')
           setCountries(data)
           console.log(data);
        }

        fetchData()

    }, [])

  return (
    <>
        <h1>Home Page</h1>
        <Grid container display={'flex'} spacing={3} border={1} justifyContent={'center'}>
            {countries.map((country: ICountryData) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={country.ccn3}>
                     <CardComponent ccn3={country?.ccn3} capital={country?.capital?.[0] || ''} name={country.translations.spa.common || ''} image={country.flags.png ||''} region={country.region || ''}/>
                </Grid>
            ))}
        </Grid>
   
    </>
  )
}

export default HomePage
