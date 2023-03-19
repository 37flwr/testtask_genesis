import React from "react";
import Pagination from "react-bootstrap/Pagination";

const BasicPagination = ({
  elementsPerPage,
  totalElements,
  paginate,
  active,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalElements / elementsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination>
      {pageNumbers.map((number) => (
        <Pagination.Item
          onClick={() => paginate(number)}
          key={number}
          active={parseInt(number) === parseInt(active)}
        >
          {number}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default BasicPagination;
