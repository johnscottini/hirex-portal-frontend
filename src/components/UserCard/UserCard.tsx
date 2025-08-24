import React from 'react';
import { Link } from 'react-router-dom';
import styles from './UserCard.module.css';
import type { User } from '../../types'; 

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <Link to={`/users/${user.id}`} className={styles.cardLink}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <h3 className={styles.userName}>{user.name}</h3>
          <p className={styles.userEmail}>{user.email}</p>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
