import React from 'react';
import img from '../assets/img/empty-cart.png'
import { Link } from 'react-router-dom';
const CartEmpty = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>Корзина пуста</h2>
        <p>Для того, чтобы добавить пиццу в корзину, перейдите на главную страницу</p>
        <img src={img} alt="" />
        <Link to="/" className="button button--outline button--add go-back-btn">
          <span>Вернуться назад</span>
        </Link>
      </div>
    </>
  );
};

export default CartEmpty;
