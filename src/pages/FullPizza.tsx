import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type TypePizza = {
    imageUrl: string,
    title: string,
    price: number,
  }


const FullPizza = () => {

  const [pizza, setPizza] = useState<TypePizza>();
  const {id} = useParams();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://6661792b63e6a0189fea0cf0.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}₽</h4>
      <p>Some description</p>
    </div>
  );
};

export default FullPizza;
