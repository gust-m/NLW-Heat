import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { api } from '../services/api';

type User = {
  id: string;
  login: string;
  name: string;
  avatar_url: string;
};

type AuthContextData = {
  user: User | null;
  signInUrl: string;
  signOut: () => void;
};

const AuthContext = createContext({} as AuthContextData);

type AuthProviderProps = {
  children: ReactNode;
};

type AuthResponse = {
  token: string;
  user: {
    id: string;
    login: string;
    avatar_url: string;
    name: string;
  };
};

export const AuthProvider = (props: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=dc14f5f6bb22b76fa471`;

  const signIn = async (githubCode: string) => {
    const response = await api.post<AuthResponse>('authenticate', {
      code: githubCode,
    });

    const { token, user } = response.data;

    setUser(user);

    localStorage.setItem('@doWhile:token', token);
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('@doWhile:token');
  };

  useEffect(() => {
    const token = localStorage.getItem('@doWhile:token');

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<User>('/profile').then((response) => {
        setUser(response.data);
      });
    }
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes('?code=');

    if (hasGithubCode) {
      const [urlWithoutCode, gitHubCode] = url.split('?code=');

      window.history.pushState({}, '', urlWithoutCode);

      signIn(gitHubCode);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, signInUrl, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
