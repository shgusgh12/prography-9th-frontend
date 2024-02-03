import Select from 'react-select';
import styles from './Filter.module.scss';
import { ImgFilter, SortFilter } from '../../../constants/Constants';

export const Filter = ({
  numOfSelectedMeals,
  currNumOfSelectedMeals,
  handleImgChange,
  handleSortChange,
}) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? '#ff7f7f' : provided.borderColor,
      boxShadow: state.isFocused ? '0 0 0 1px #ff7f7f' : null,
      '&:hover': {
        borderColor: '#ff7f7f',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#ff7f7f' : 'white',
      '&:hover': {
        backgroundColor: '#ff7f7f',
      },
    }),
  };
  return (
    <div className={styles.filter_container}>
      <p>
        {currNumOfSelectedMeals}/{numOfSelectedMeals}개 조회
      </p>

      <div className={styles.select_container}>
        <Select
          styles={customStyles}
          className={styles.select}
          options={SortFilter}
          placeholder='정렬 방법을 선택하세요'
          onChange={handleSortChange}
        ></Select>
        <Select
          styles={customStyles}
          className={styles.select}
          options={ImgFilter}
          placeholder='이미지 개수를 선택하세요'
          onChange={handleImgChange}
        ></Select>
      </div>
    </div>
  );
};
