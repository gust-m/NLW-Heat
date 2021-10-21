import { VscGithubInverted } from 'react-icons/vsc';
import { useAuth } from '../../context/auth';

import styles from './styles.module.scss';

export const LoginBox = () => {
  const { user, signInUrl } = useAuth();

  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href={signInUrl} className={styles.signInWithGithub}>
        <VscGithubInverted size={24} />
        Entrar com Github
      </a>
    </div>
  );
};
