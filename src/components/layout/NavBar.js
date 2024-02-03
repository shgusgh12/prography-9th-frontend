import logo from '../../assets/logo.png';
import styles from './NavBar.module.scss';
export const NavBar = () => {
  return (
    <div className={styles.navContainer}>
      <img src={logo} className={styles.logo} />
    </div>
  );
};
