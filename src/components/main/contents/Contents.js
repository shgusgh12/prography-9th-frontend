import styles from './Contents.module.scss';

export const Contents = () => {
  let arr = [
    'item1',
    'item2',
    'item3',
    'item4',
    'item4',
    'item4',
    'item4',
    'item4',
    'item4',
  ];
  return (
    <div className={styles.contents_container}>
      {arr.map((item, index) => {
        return (
          <div className={styles.card}>
            <img></img>
            <p>{item}</p>
          </div>
        );
      })}
    </div>
  );
};
