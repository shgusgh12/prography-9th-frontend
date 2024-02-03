import styles from './Contents.module.scss';

export const Contents = ({ mealsData }) => {
  return (
    <div className={styles.contents_container}>
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
