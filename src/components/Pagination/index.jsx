import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

const Pagination = ({ onChangePage }) => {
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

export default Pagination;
