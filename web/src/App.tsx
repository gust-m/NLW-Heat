import { LoginBox } from './components/LoginBox';
import { MessageList } from './components/MessageList';

import styles from './App.module.scss';
import { useAuth } from './context/auth';
import { SendMessageForm } from './components/SendMessageForm';

export const App = () => {
  const { user } = useAuth();

  return (
    <main
      className={`${styles.contentWrapper} ${
        !!user ? styles.contentSigned : ''
      }`}
    >
      <MessageList />
      {!!user ? <SendMessageForm /> : <LoginBox />}
    </main>
  );
};
