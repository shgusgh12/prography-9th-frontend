import styles from './Category.module.scss';

export const Category = ({
  categoryNameList,
  clickCategoryName,
  selectedCategoryName,
}) => {
  return (
    <div className={styles.category_container}>
      {categoryNameList.map((item, index) => {
        return (
          <button
            key={item}
            className={`${styles.category_button} ${
              selectedCategoryName.includes(item) ? styles.isSelected : ''
            }`}
            onClick={() => clickCategoryName(item)}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
};
