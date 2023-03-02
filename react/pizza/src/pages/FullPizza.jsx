import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
const FullPizza = () => {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://63a4a60f821953d4f2ba37f7.mockapi.io/item/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Помилка при отриманні піц");
      }
    }
    fetchPizza();
  }, []);
  if (!pizza) {
    return "Завантаження!";
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>

      <h4>{pizza.price}</h4>
    </div>
  );
};
export default FullPizza;
