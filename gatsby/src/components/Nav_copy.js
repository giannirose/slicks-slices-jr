import React from 'react';
import { Link, navigate } from 'gatsby';

// import styled from styled components
import styled from 'styled-components';

import Logo from './Logo';

// making a styled component, capitalize the first letter for react names, add all CSS for the nav,
// elements can be styled within NavStyles to affect only those items, or...see below
const NavStyles = styled.nav`
  margin-bottom: 3rem;
  .logo {
    transform: translateY(-25%);
  }
  ul {
    margin: 0;
    padding: 0;
    text-align: center;
    display: grid;
    grid-template-columns: 1fr 1fr auto 1fr 1fr;
    gap: 2rem;
    align-items: center;
  }
  // Use css variables and over-write these, for instance, for an nth-child so other tags will apply only to element with original declared variable
  // change the css variable rotate within the li tag
  li {
    --rotate: -2deg;
    transform: rotate(var(--rotate));
    order: 1;
    &:nth-child(1) {
      --rotate: 1deg;
    }
    &:nth-child(2) {
      --rotate: -2.5deg;
    }
    &:nth-child(4) {
      --rotate: 2.5deg;
    }
    &:hover {
      --rotate: 3deg;
    }
    list-style: none;
  }

  a {
    font-size: 3rem;
    text-decoration: none;
    &:hover {
      color: var(--red);
    }
  }
`;

// ...see below section: Styles can be made outside of the const NavStyles as their own constants and can then be reused when within the Ulstyles tag

// const LiStyles = styled.li`
//   list-style: none;
// `;

// Define go to slicemasters, which may be commented out
function goToSlicemasters() {
  // wait for 2 seconds
  setTimeout(() => {
    console.log('go to slicers!!!!!');
    // There is the option of replace: true which will add to browser history; back button effective
    navigate('/slicemasters', { replace: true });
  }, 2000);
  // go to page
}

// In src>components; may have something to do with the capital letters
// What to use in place of href
// The <nav> element needs to be changed to <NavStyles> to import the styled component
export default function Nav() {
  return (
    <NavStyles>
      <ul>
        <li>
          <Link to="/">Hot Now</Link>
        </li>
        <li>
          <Link to="/pizzas">Pizza Menu</Link>
        </li>
        <li>
          <Link to="/">
            <Logo />
          </Link>
        </li>
        {/* }
        <li>
          <button type="button" onClick={goToSlicemasters}>
            Click me to see slicemasters after 2 seconds
          </button>
        </li>
  */}
        <li>
          <Link to="/slicemasters">Slicemasters</Link>
        </li>
        <li>
          <Link to="/order">Order Ahead!</Link>
        </li>
      </ul>
    </NavStyles>
  );
  // the <Link> method is declarative, the other is imperative
  // buttons need a type
}
