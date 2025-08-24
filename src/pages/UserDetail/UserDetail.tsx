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
    <div>
      <Link to="/users" className={styles.backLink}>&larr; Voltar para a lista de candidatos</Link>
      {user ? (
        <div className={styles.detailContainer}>
          <div className={styles.header}>
            <h1 className={styles.userName}>{user.name}</h1>
            <p className={styles.userEmail}>{user.email}</p>
          </div>
          <div className={styles.userInfo}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Telefone</span>
              <span className={styles.infoValue}>{user.phone || 'Não informado'}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>CPF</span>
              <span className={styles.infoValue}>{user.cpf || 'Não informado'}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Data de Nascimento</span>
              <span className={styles.infoValue}>{user.birthDate || 'Não informada'}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Endereço</span>
              <span className={styles.infoValue}>{user.address || 'Não informado'}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Gênero</span>
              <span className={styles.infoValue}>{user.gender || 'Não informado'}</span>
            </div>
          </div>
        </div>
      ) : (
        <p className={styles.message}>Usuário não encontrado.</p>
      )}
    </div>
  );
};

export default UserDetail;
