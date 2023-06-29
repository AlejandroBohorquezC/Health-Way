import styled from 'styled-components';
import { IHeader, INavbar } from './NavBar.interface';
import { auth } from '../../../config/firebaseAuth';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = styled.header<IHeader>`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    margin: -8px;
    color: white;
    background-color: #1976d2;
`;

const NavBar = ({logout}: INavbar) => {

  const handleLogout = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    auth.signOut()
  };

  return (
    <>
        <Header>
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