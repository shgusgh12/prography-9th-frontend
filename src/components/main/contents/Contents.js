import styles from './Contents.module.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LazyLoadImage } from 'react-lazy-load-image-component';
export const Contents = ({
  mealsData,
  sortOption,
  imgOption,
  currNumOfSelectedMeals,
  loadMore,
  hasMore,
}) => {
  const sortByRecent = (array) => {
    array.sort((a, b) => parseInt(b.idMeal, 10) - parseInt(a.idMeal, 10));
  };

  const asc = (array) => {
    array.sort((a, b) =>
      a.strMeal.toLowerCase().localeCompare(b.strMeal.toLowerCase())
    );
  };
  const dsc = (array) => {
    array.sort((a, b) =>
      b.strMeal.toLowerCase().localeCompare(a.strMeal.toLowerCase())
    );
  };

  if (sortOption === 0) {
    sortByRecent(mealsData);
  } else if (sortOption === 1) {
    asc(mealsData);
  } else if (sortOption === 2) {
    dsc(mealsData);
  }

  return (
    <InfiniteScroll
      dataLength={currNumOfSelectedMeals}
      next={loadMore}
      hasMore={hasMore}
    >
      <div
        className={`${styles.contents_container} ${
          imgOption === 0 ? styles.two : ''
        }`}
      >
        {mealsData.slice(0, currNumOfSelectedMeals).map((item, index) => {
          return (
            <div className={styles.card}>
              <LazyLoadImage
                src={item.strMealThumb}
                alt={item.strMeal}
              ></LazyLoadImage>
              <p>{item.strMeal}</p>
            </div>
          );
        })}
      </div>
    </InfiniteScroll>
  );
};
