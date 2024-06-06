import React from 'react';
import PizzaBlock from './PizzaBlock';

const PizzaItem = (props) => {
    return (
        <div>
            <PizzaBlock key={props.id} {...props} />
        </div>
    );
};

export default PizzaItem;