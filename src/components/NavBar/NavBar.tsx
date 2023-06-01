import styled from 'styled-components';
import { IHeader } from './NavBar.interface';

const Header = styled.header<IHeader>`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
    margin: -8px;
`;

const NavBar = () => {
  return (
    <>
        <Header>
            <h1>
                Health Way
            </h1>
        </Header>
    </>
  )
}

export default NavBar;