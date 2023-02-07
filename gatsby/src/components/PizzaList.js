import { Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';

// CSS for the list of pizzas
const PizzaGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  /* grid-auto-rows: auto auto 500px; */
`;

// CSS subgrid for the 3 pizza elements
const PizzaStyles = styled.div`
  display: grid;
  /* apply styles not from SinglePizza but from  PizzaGridStyles */
  /* grid-template-rows: subgrid;
  grid-row: span 3;
  gap: 1rem; */
  @supports not (grid-template-rows: subgrid) {
    --rows: auto auto 1fr;
  }
  grid-template-rows: var(--rows, subgrid);
  grid-row: span 3;
  grid-gap: 1rem;
  h2,
  p {
    margin: 0;
  }
`;

// Set up a link to an individual pizza page for all pizzas
function SinglePizza({ pizza }) {
  /* console.log(pizza.name, pizza.image); */
  return (
    <PizzaStyles>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
      </Link>
      <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
      <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
    </PizzaStyles>
  );
}
// List all the pizzas
export default function PizzaList({ pizzas }) {
  return (
    <PizzaGridStyles>
      {pizzas.map((pizza) => (
        <SinglePizza key={pizza.id} pizza={pizza} />
      ))}
    </PizzaGridStyles>
  );
}
