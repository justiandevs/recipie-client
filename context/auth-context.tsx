import React, {useEffect} from "react";

type authStateType = {
  token: string;
}

interface AuthContextInterface {
  authState: authStateType,
  setAuthState: () => void,
  isUserAuthenticated: () => boolean,
}

const AuthContext = React.createContext<AuthContextInterface | null>(null);
const { Provider } = AuthContext;

const AuthProvider = ({ children } : { children: JSX.Element }) => {
  const [authState, setAuthState] = React.useState<authStateType>({
    token: ""
  });

  const setUserAuthInfo = () => {
    const token = localStorage.getItem('accessToken');

    if(token != null) {
      setAuthState({ token });
    } else {
      setAuthState({ token: '' });
    }
  }

  const isUserAuthenticated = () => !!authState.token;

  return (
    <Provider
      value={{
        authState,
        setAuthState: () => setUserAuthInfo(),
        isUserAuthenticated,
      }}
    >
      {children}
    </Provider>
  )
}

export { AuthContext, AuthProvider };