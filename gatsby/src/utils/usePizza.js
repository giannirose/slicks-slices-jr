import { useState, useContext } from 'react';
import OrderContext from '../components/OrderContext';
import formatMoney from './formatMoney';
import calculateOrderTotal from './calculateOrderTotal';
import attachNamesAndPrices from './attachNameAndPrices';

export default function usePizza({ pizzas, values }) {
  // 1.  Create some state to hold our order
  // We got rid of this line because we moved useState up to the provider
  // const [order, setOrder] = useState([]);
  // Now we access both our state and our updater function (setOrder) via context
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // 2.Make a function to add things to our order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  // 3. Make a function to remove things from our order
  function removeFromOrder(index) {
    setOrder([
      // everything before the item we want to remove
      ...order.slice(0, index),
      // everything after the item we want to remove
      ...order.slice(index + 1),
    ]);
  }
  // Make a submitOrder function that runs when someone submits the form
  async function submitOrder(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // setMessage(null);
    // setMessage('Go Eat!');

    // gather all the data
    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
      mapleSyrup: values.mapleSyrup,
    };
    console.log(body);

    // 4. Send this data to a serverless function when they check out

    // We start out with  the line below but that hard-codes and we don't ultimately want to do that
    // const res = fetch(`./netlify/functions/placeOrder`);
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    // Comment out the following line and use console.log(some string) to test
    const text = JSON.parse(await res.text());
    // console.log(text);

    // check if everything worked
    if (res.status >= 400 && res.status < 600) {
      setLoading(false); // turn off loading
      setError(text.message);
    } else {
      // it worked!
      setLoading(false);
      setMessage('Success! Come on down for your pizza');
    }
  }

  return {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  };
}
