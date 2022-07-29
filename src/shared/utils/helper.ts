import { PAGINATION } from '@shared/common/constants';

export const paginationHelper = (query, total, url) => {
  const pagination = [];
  const paginationFull = [];
  const { PerPage, Limit, Range } = PAGINATION;
  const totalPage = Math.ceil(total / PerPage);
  const page = Number(query.page);
  let queryString = '';
  for (const key in query) {
    key !== 'page' && (queryString += `&${key}=${query[key]}`);
  }
  for (let i = 1; i <= totalPage; i++) {
    const obj = {
      active: page === i ? 'active' : '',
      page: i,
      url: `${url}/?page=${i}${queryString}`,
    };
    if (page <= Limit && i <= Limit) {
      pagination.push(obj);
    }
    if (page > Limit && i >= page - Range && i <= page + Range) {
      pagination.push(obj);
    }
    paginationFull.push(obj);
  }
  if (page > Limit && pagination.length === Limit - 1) {
    pagination.unshift(paginationFull[page - (Limit - 1)]);
  }
  if (page > Limit && pagination.length === Limit - 2) {
    pagination.unshift(paginationFull[page - (Limit - 1)]);
    pagination.unshift(paginationFull[page - Limit]);
  }
  return {
    totalPage,
    pagination,
    firstPage: paginationFull[0],
    prevPage: paginationFull[page - 2],
    nextPage: paginationFull[page],
    lastPage: paginationFull[paginationFull.length - 1],
    disabledNext: page === totalPage,
    disabledPrev: page === 1,
  };
};
