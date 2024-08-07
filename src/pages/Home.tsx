import { useEffect, useRef } from 'react';
import Categories from '../components/Categories';
import { filterList } from '../components/Sort';
import { Sort } from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaItem from '../components/PizzaItem';
import { Pagination } from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';

import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, currentPage, sort, searchValue } = useSelector((state: RootState) => state.filterSlice);
  const { items, status } = useSelector((state: RootState) => state.pizza);

  const onClickCategory = (id:number ) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage   = (num:number) => {
    dispatch(setCurrentPage(num));
  };

  const getPizzas = async () => {
    const sortBy = sort.sort;
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    dispatch(
        //@ts-ignore
      fetchPizzas({
        sortBy,
        category,
        currentPage,
      }),
    );
    window.scrollTo(0, 0);
  };

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
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, sort.sort, currentPage]);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === 'error' ? (
          <div className="content__error-info">
            <h2>Произошла ошибка</h2>
            <p>попробуйте обновить страницу</p>
          </div>
        ) : status === 'loading' ? (
          [...new Array(8)].map((_, i) => <Skeleton key={i} />)
        ) : (
          items
            .filter((value:any) => value.title.toLowerCase().includes(searchValue.toLowerCase()))
            .map((item:any) => <PizzaItem key={item.id} {...item} link={`/pizza/${item.id}`} />)
        )}
      </div>
      <Pagination onChangePage={onChangePage} />
    </>
  );
};

export default Home;
