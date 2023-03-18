import React from "react";
import Pagination from "react-bootstrap/Pagination";

const BasicPagination = ({
  elementsPerPage,
  totalElements,
  paginate,
  active,
}) => {
  const pageNumbers = [];
  const items = [];

  for (let i = 1; i <= Math.ceil(totalElements / elementsPerPage); i++) {
    pageNumbers.push(i);
  }

  for (let number = 1; number <= pageNumbers.length; number++) {
    items.push(
      <Pagination.Item
        onClick={() => paginate(number)}
        key={number}
        active={number == active}
      >
        {number}
      </Pagination.Item>
    );
  }

  return <Pagination>{items}</Pagination>;
};

export default BasicPagination;
