import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>HireX</Link>
        <nav>
          <Link to="/users" className={styles.navLink}>Usuários</Link>
          <Link to="/vacancies" className={styles.navLink}>Vagas</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;