import React, { useState, useEffect } from 'react';
import { getUsers } from '../../services/api';
import styles from './UserList.module.css';
import type { User } from '../../types';
import UserCard from '../../components/UserCard/UserCard';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (err) {
        setError('Não foi possível carregar os usuários. Verifique se o backend está rodando.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className={styles.message}>Carregando usuários...</div>;
  }

  if (error) {
    return <div className={`${styles.message} ${styles.error}`}>{error}</div>;
  }

  if (users.length === 0) {
    return <div className={styles.message}>Nenhum usuário cadastrado.</div>;
  }

  return (
    <div>
      <h1 className={styles.title}>Painel de Usuarios</h1>
      <div className={styles.userGrid}>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
