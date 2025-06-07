import styled from 'styled-components';
import { IHeader, INavbar } from './NavBar.interface';
import { auth } from '../../../config/firebaseAuth';
import { useAuthState } from 'react-firebase-hooks/auth'; // Import useAuthState
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button'; // Import Button
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite'; // For "My Favorites" button icon
import Link from 'next/link'; // Import Next.js Link
import { useRouter } from 'next/router';

const Header = styled.header<IHeader>`
    display: flex;
    justify-content: space-between; // Changed for better spacing with more items
    align-items: center;
    height: 100px;
    margin: -8px;
    padding: 0 20px; // Add some padding
    color: white;
    background-color: #1976d2;
`;

const NavLeft = styled.div`
    display: flex;
    align-items: center;
`;

const NavCenter = styled.div`
    flex-grow: 1;
    text-align: center;
`;

const NavRight = styled.div`
    display: flex;
    align-items: center;
`;


const NavBar = ({logout, arrowBack}: INavbar) => {
  const router = useRouter();
  const [user, loadingAuthState] = useAuthState(auth); // Get user state

  const handleLogout = () => { // Removed e argument as it's not used
    auth.signOut();
    router.push('/'); // Redirect to home/login after logout
  };

  const handleArrowBack = () => {
    router.push('/recipes');
  };

  return (
    <>
        <Header>
            <NavLeft>
                {arrowBack &&
                <IconButton onClick={handleArrowBack} sx={{ color: 'white'}} aria-label="arrow back">
                  <ArrowBackIcon />
                </IconButton>
                }
            </NavLeft>
            <NavCenter>
                <Link href="/recipes" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h1>Health Way</h1>
                </Link>
            </NavCenter>
            <NavRight>
                {!loadingAuthState && user && (
                    <Link href="/my-favorites" passHref>
                        <Button
                            color="inherit"
                            startIcon={<FavoriteIcon />}
                            sx={{ marginRight: 1, color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
                        >
                            My Favorites
                        </Button>
                    </Link>
                )}
                {logout && user && // Only show logout if user is logged in
                <IconButton onClick={handleLogout} sx={{ color: 'white'}} aria-label="logout">
                  <LogoutIcon />
                </IconButton>
                }
            </NavRight>
        </Header>
    </>
  )
}

export default NavBar;