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
  const updateQueryString = (update) => {
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(update),
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

          console.log(mealArray, numOfSelectedMeals);
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
          ></Filter>
        </div>
        <div className={styles.contents_section}>
          <Contents mealsData={mealsData}></Contents>
        </div>
      </main>
    </div>
  );
}

export default App;
