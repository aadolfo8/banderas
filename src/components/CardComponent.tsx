import { Grid, Typography } from "@mui/material"
import { FC } from "react"

import { useLocation } from "wouter";

interface Props {
    image: string
    name: string
    capital: string
    region: string
    cca3: string
}

const CardComponent: FC<Props> = ({image, capital, name, region, cca3}) => {
    const [location, setLocation] = useLocation();

  return (
    <Grid container display={'flex'} justifyContent={'center'} bgcolor={'whitesmoke'} borderRadius={7} 
    sx={{
      '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0px 0px 30px 1px rgba(0, 255, 117, 0.30)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
     },
     px: 2,
     py: 2,
     minHeight:350
    }}    
    onClick={() =>  {setLocation(`/country/${cca3}`)}}>
        <img src={image} alt={name} style={{width: '100%', height: '170px', objectFit: 'fill',borderRadius:15}} />
        <Grid padding={2}>
            <Typography color={'black'} fontWeight={700} fontSize={18} textAlign={'center'}>{name}</Typography>
            <Typography color={'black'}>Capital: {capital}</Typography>
            <Typography color={'black'}>Region: {region}</Typography>
        </Grid>
        
    </Grid>
  )
}

export default CardComponent