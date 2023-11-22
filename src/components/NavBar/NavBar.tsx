import styled from 'styled-components';
import { IHeader, INavbar } from './NavBar.interface';
import { auth } from '../../../config/firebaseAuth';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';

const Header = styled.header<IHeader>`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    margin: -8px;
    color: white;
    background-color: #1976d2;
`;

const NavBar = ({logout, arrowBack}: INavbar) => {

  const router = useRouter();

  const handleLogout = (e: { preventDefault: () => void; }) => {
    auth.signOut()
  };

  const handleArrowBack = () => {
    router.push('/recipes');
  };

  return (
    <>
        <Header>
            {arrowBack && 
            <IconButton onClick={handleArrowBack} sx={{ color: 'white'}} aria-label="arrow back">
              <ArrowBackIcon />
            </IconButton>
            }
            <h1>
                Health Way
            </h1>
            {logout && 
            <IconButton onClick={handleLogout} sx={{marginLeft: '50px', color: 'white'}} aria-label="logout">
              <LogoutIcon />
            </IconButton>
            }
        </Header>
    </>
  )
}

export default NavBar;