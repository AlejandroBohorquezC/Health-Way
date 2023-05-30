import styled from 'styled-components';
import {BottomNavigation, BottomNavigationAction, Box} from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { IHeader } from './NavBar.interface';
import { useState } from 'react';

const Header = styled.header<IHeader>`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
    color: #e0f763;
    background-color: #88d84e;
    margin: -8px;
`;

const NavBar = () => {
  const [value, setValue] = useState(0);
  return (
    <>
        <Header>
            <h1>
                Health Way
            </h1>
        </Header>
        <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation>
    </Box>
    </>
  )
}

export default NavBar;