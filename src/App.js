import styles from './App.module.scss';
import { NavBar } from './components/layout/NavBar';
import { Category } from './components/main/category/Category';
import { Filter } from './components/main/filter/Filter';
import { Contents } from './components/main/contents/Contents';
function App() {
  return (
    <div className={styles.wrapper}>
      <header>
        <NavBar></NavBar>
      </header>
      <main className={styles.main_section}>
        <div className={styles.category_section}>
          <Category></Category>
        </div>
        <div className={styles.filter_section}>
          <Filter></Filter>
        </div>
        <div className={styles.contents_section}>
          <Contents></Contents>
        </div>
      </main>
    </div>
  );
}

export default App;
