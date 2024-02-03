import styles from './Contents.module.scss';

export const Contents = ({ mealsData, sortOption, imgOption }) => {
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
    <div
      className={`${styles.contents_container} ${
        imgOption === 0 ? styles.two : ''
      }`}
    >
      {mealsData.map((item, index) => {
        return (
          <div className={styles.card}>
            <img src={item.strMealThumb}></img>
            <p>{item.strMeal}</p>
          </div>
        );
      })}
    </div>
  );
};
