import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';



export const Pagination = ({ onChangePage }: any) => {
  return (
    <div className={styles.root}>
      <ReactPaginate
        className="styles.root"
        breakLabel="..."
        nextLabel=">"
        onPageChange={e => onChangePage(++e.selected)}
        pageRangeDisplayed={4}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
      /> 
    </div>
  );
};


