import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUserById } from '../../services/api';
import styles from './UserDetail.module.css';
import type { User } from '../../types'; 

const UserDetail: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      try {
        const response = await getUserById(id);
        setUser(response.data);
      } catch (err) {
        setError('Não foi possível carregar os detalhes do usuário.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <div className={styles.message}>Carregando...</div>;
  }

  if (error) {
    return <div className={`${styles.message} ${styles.error}`}>{error}</div>;
  }

  return (
    <div className={styles.detailContainer}>
      <Link to="/users" className={styles.backLink}>&larr; Voltar para a lista</Link>
      {user ? (
        <div className={styles.detailCard}>
          <h1 className={styles.userName}>{user.name}</h1>
          <div className={styles.userInfo}>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Telefone:</strong> {user.phone || 'Não informado'}</p>
            <p><strong>CPF:</strong> {user.cpf || 'Não informado'}</p>
            <p><strong>Data de Nascimento:</strong> {user.birthDate || 'Não informada'}</p>
            <p><strong>Endereço:</strong> {user.address || 'Não informado'}</p>
          </div>
        </div>
      ) : (
        <p>Usuário não encontrado.</p>
      )}
    </div>
  );
};

export default UserDetail;
