import styles from './Category.module.scss';

export const Category = () => {
  return (
    <div className={styles.category_container}>
      {[
        '123',
        '223',
        '333333',
        '41',
        '55',
        '고기',
        '생선',
        '스테이크',
        '123',
        '223',
        '333333',
        '41',
        '55',
        '고기',
        '생선',
        '스테이크',
      ].map((item, index) => {
        return <button className={styles.category_button}>{item}</button>;
      })}
    </div>
  );
};
