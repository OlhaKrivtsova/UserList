import {useEffect, useState} from 'react';
import styles from './Pagination.module.css';
import Container from './Container';

const initialPageNumber = 1;
const initialAmountOfRecordsOnPage = 3;

const Pagination = ({totalAmountOfRecords, setRangOfRecords}) => {
  const [amountOfRecordsOnPage, setAmountOfRecordsOnPage] = useState(
    initialAmountOfRecordsOnPage
  );
  const [pageNumber, setPageNumber] = useState(initialPageNumber);
  const amountOfPages = Math.ceil(totalAmountOfRecords / amountOfRecordsOnPage);
  const pages = Array.from({length: amountOfPages}, (_, ind) => ind + 1);

  amountOfPages > 0 &&
    pageNumber > amountOfPages &&
    setPageNumber(amountOfPages);

  useEffect(() => {
    const firstRecord = (pageNumber - 1) * amountOfRecordsOnPage;
    const lastRecord = firstRecord + amountOfRecordsOnPage;
    setRangOfRecords(firstRecord, lastRecord);
  }, [amountOfRecordsOnPage, pageNumber, setRangOfRecords]);

  const choosePageHandler = event => {
    setPageNumber(+event.target.textContent);
  };

  const changeInputHandler = event => {
    setAmountOfRecordsOnPage(+event.target.value || totalAmountOfRecords);
  };

  const pageElements = pages.map(item => (
    <button
      key={item}
      className={`${styles.page} ${item === pageNumber ? styles.active : ''}`}
      type='button'
      onClick={choosePageHandler}
    >
      {item}
    </button>
  ));

  return (
    <div className={styles.pagination}>
      <div>
        <label htmlFor='amount'>Кількість записів на сторінці</label>
        <input
          type='number'
          min='1'
          max='100'
          step='1'
          name='amount'
          value={amountOfRecordsOnPage}
          onChange={changeInputHandler}
        />
      </div>
      <div className={styles.pages}>{pageElements}</div>
    </div>
  );
};

export default Pagination;
