import styles from './App.module.scss';
import { NavBar } from './components/layout/NavBar';
import { Category } from './components/main/category/Category';
import { Filter } from './components/main/filter/Filter';
import { Contents } from './components/main/contents/Contents';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentQuery = queryString.parse(location.search);
  const [categoryNameList, setCategoryNameList] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState([]);
  const [numOfSelectedMeals, setNumOfSelectedMeals] = useState(0);
  const [currNumOfSelectedMeals, setCurrNumOfSelectedMeals] = useState(0);
  const [mealsData, setMealsData] = useState([]);

  const [sortOption, setSortOption] = useState(3);
  const [imgOption, setImgOption] = useState(1);

  const updateQueryString = (update) => {
    const isEmpty = Object.values(update).every((value) => !value);

    navigate({
      pathname: location.pathname,
      search: isEmpty ? '' : queryString.stringify(update),
    });
  };

  const clickCategoryName = (categoryName) => {
    let newList = [];
    if (!selectedCategoryName.includes(categoryName)) {
      newList = [...selectedCategoryName, categoryName];
    } else {
      newList = selectedCategoryName.filter((item) => item !== categoryName);
    }
    setSelectedCategoryName(newList);
    const updatedQuery = {
      ...currentQuery,
      category: newList.join(','),
    };
    updateQueryString(updatedQuery);
  };

  const handleSortChange = (selectedOption) => {
    console.log(`Selected: ${selectedOption.value}`);
    setSortOption(selectedOption.value);
  };

  const handleImgChange = (selectedOption) => {
    console.log(`Selected: ${selectedOption.value}`);
    setImgOption(selectedOption.value);
  };
  useEffect(() => {
    async function getCategoryName() {
      try {
        const response = await axios.get(
          'https://www.themealdb.com/api/json/v1/1/categories.php'
        );
        let name = [];
        response.data.categories.map((item, index) => {
          name.push(item.strCategory);
        });
        setCategoryNameList(name);
      } catch (e) {
        // 실패 시 처리
        console.error(e);
      }
    }
    getCategoryName();
  }, []);

  useEffect(() => {
    if (selectedCategoryName.length !== 0) {
      const fetchData = async () => {
        try {
          let mealArray = [];

          for (const strCategory of selectedCategoryName) {
            const response = await axios.get(
              `https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`
            );
            const data = response.data.meals;
            mealArray.push(...data);
          }

          setMealsData(mealArray);
          setCurrNumOfSelectedMeals(
            mealArray.length >= 20 ? 20 : mealArray.length
          );
          setNumOfSelectedMeals(mealArray.length);

          console.log(mealArray[0].idMeal, typeof mealArray[1].idMeal);
        } catch (e) {
          console.log(e);
        }
      };
      fetchData();
    } else {
      setMealsData([]);
      setNumOfSelectedMeals(0);
      setCurrNumOfSelectedMeals(0);
    }
  }, [selectedCategoryName]);

  useEffect(() => {
    let filterValue;
    switch (sortOption) {
      case 0:
        filterValue = 'new';
        break;
      case 1:
        filterValue = 'asc';
        break;
      case 2:
        filterValue = 'desc';
        break;
      case 3:
        filterValue = '';
        break;
    }

    const updatedQuery = {
      ...currentQuery,
      filter: filterValue,
    };

    updateQueryString(updatedQuery);
  }, [sortOption]);

  return (
    <div className={styles.wrapper}>
      <header>
        <NavBar></NavBar>
      </header>
      <main className={styles.main_section}>
        <div className={styles.category_section}>
          <Category
            categoryNameList={categoryNameList}
            clickCategoryName={clickCategoryName}
            selectedCategoryName={selectedCategoryName}
          ></Category>
        </div>
        <div className={styles.filter_section}>
          <Filter
            numOfSelectedMeals={numOfSelectedMeals}
            currNumOfSelectedMeals={currNumOfSelectedMeals}
            handleImgChange={handleImgChange}
            handleSortChange={handleSortChange}
          ></Filter>
        </div>
        <div className={styles.contents_section}>
          <Contents
            mealsData={mealsData}
            sortOption={sortOption}
            imgOption={imgOption}
          ></Contents>
        </div>
      </main>
    </div>
  );
}

export default App;
