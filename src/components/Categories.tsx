import React from 'react';

type TCategoryProps = {
    value: number,
    onClickCategory: (index: number) => void,
  };


const Categories = ({value, onClickCategory}: TCategoryProps ) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li key={i} onClick={() => onClickCategory(i)} className={value === i ? 'active' : ''} >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
