import Select from 'react-select';
import styles from './Filter.module.scss';
import { ImgFilter, SortFilter } from '../../../constants/Constants';

export const Filter = ({
  numOfSelectedMeals,
  currNumOfSelectedMeals,
  handleImgChange,
  handleSortChange,
}) => {
  return (
    <div className={styles.filter_container}>
      <p>
        {currNumOfSelectedMeals}/{numOfSelectedMeals}개 조회
      </p>

      <div className={styles.select_container}>
        <Select
          className={styles.select}
          options={SortFilter}
          placeholder='정렬 방법을 선택하세요'
          onChange={handleSortChange}
        ></Select>
        <Select
          className={styles.select}
          options={ImgFilter}
          placeholder='이미지 개수를 선택하세요'
          onChange={handleImgChange}
        ></Select>
      </div>
    </div>
  );
};
