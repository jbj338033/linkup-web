import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

export const Container = styled.div`
    width: 100%;
    height: 4rem;
    background-color: #333;
    justify-content: space-around;
    display: flex;
    align-items: center;
    position: fixed;
`

export const Nav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`

export const NavItem = styled(NavLink)`
    color: #fff;
    text-decoration: none;
    margin: 0 1rem;
    font-size: 1.2rem;

    &.active {
        font-weight: bold;
    }
`

export const Login = styled(NavLink)`
    color: #fff;
    text-decoration: none;
    margin: 0 1rem;
    font-size: 1.2rem;
    margin-left: auto;
`

export const SignUp = styled(NavLink)`
    color: #fff;
    text-decoration: none;
    margin: 0 1rem;
    font-size: 1.2rem;
`