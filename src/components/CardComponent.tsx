import { Grid } from "@mui/material"
import { FC } from "react"

import { useLocation } from "wouter";

interface Props {
    image: string
    name: string
    capital: string
    region: string
    ccn3: string
}

const CardComponent: FC<Props> = ({image, capital, name, region, ccn3}) => {
    const [location, setLocation] = useLocation();

  return (
    <Grid container display={'flex'} bgcolor={'whitesmoke'} borderRadius={7}  onClick={() =>  {setLocation(`/country/${ccn3}`)}}>
        <img src={image} alt={name} style={{width: '100%', height: '200px', objectFit: 'cover', borderTopLeftRadius: 15, borderTopRightRadius: 15}} />
        <Grid padding={2}>
            <h3>{name}</h3>
            <p>Capital: {capital}</p>
            <p>Region: {region}</p>
        </Grid>
        
    </Grid>
  )
}

export default CardComponent