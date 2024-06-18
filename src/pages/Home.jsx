import React, { useContext, useEffect, useRef, useState } from 'react';
import Categories from '../components/Categories';
import { filterList } from '../components/Sort';
import { Sort } from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaItem from '../components/PizzaItem';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { setItems } from '../redux/slices/pizzasSlice';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { categoryId, currentPage, sort } = useSelector((state) => state.filterSlice);
  const items = useSelector((state) => state.pizza.items);

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (num) => {
    dispatch(setCurrentPage(num));
  };

  const fetchPizzas = async () => {
    setIsLoading(true);
    const sortBy = sort.sort;
    const category = categoryId > 0 ? `&category=${categoryId}` : '';

    try {
      const { data } = await axios.get(
        `https://6661792b63e6a0189fea0cf0.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=desc`,
      );
      dispatch(setItems(data));
    } catch (error) {
      console.error('jopa', error);
    } finally {
      setIsLoading(false);
    }

    window.scrollTo(0, 0);
  };

  const { searchInput } = useContext(SearchContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sortOption = filterList.find((item) => item.sort === params.sort);

      dispatch(
        setFilters({
          currentPage: params.currentPage || 1,
          categoryId: params.categoryId || 0,
          sort: sortOption || { name: 'популярности', sort: 'rating' },
        }),
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sort, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: sort.sort,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sort, currentPage]);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, i) => <Skeleton key={i} />)
          : items
              .filter((value) => value.title.toLowerCase().includes(searchInput.toLowerCase()))
              .map((item) => <PizzaItem key={item.id} {...item} />)}
      </div>
      <Pagination onChangePage={onChangePage} />
    </>
  );
};

export default Home;
