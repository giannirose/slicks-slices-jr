// Video 18 - PizzaList.tsx

const SinglePizza = ({ pizza }: { pizza: Pizza }) => {
  const isVegetarian = pizza.toppings?.every((topping) => topping?.vegetarian);
  return (
    <div>
      <Link to={`/pizza/${pizza.slug?.current}`}>
        <h2>
          <span className="mark">
            {pizza.name} {isVegetarian ? `🌱` : ``}
          </span>
        </h2>
        <p>{pizza.toppings?.map((topping) => topping?.name).join(`, `)}</p>
      </Link>
    </div>
  );
};

// Video 18 - PizzaList.tsx

const SinglePizza = ({ pizza }: { pizza: Pizza }) => {
    const isVegetarian = pizza.toppings?.every((topping) => topping?.vegetarian);
    return (
      <div>
        <Link to={`/pizza/${pizza.slug?.current}`}>
          <h2>
            <span className="mark">
              {pizza.name} {isVegetarian ? `🌱` : ``}
            </span>
          </h2>
          <p>{pizza.toppings?.map((topping) => topping?.name).join(`, `)}</p>
        </Link>
      </div>
    );
  };
