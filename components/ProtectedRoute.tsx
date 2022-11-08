import React, {useEffect, useLayoutEffect} from "react";
import {AuthContext} from "../context/auth-context";
import {useRouter} from "next/router";

export const ProtectedRoute = ({ children } : { children: JSX.Element}) => {
  const authContext = React.useContext(AuthContext);
  const [done, setDone] = React.useState(false);
  const router = useRouter();

  useEffect(() => {
    authContext?.setAuthState();
    setDone(true);
  }, [])

  useEffect(() => {
    if(done) {
      if(!authContext?.isUserAuthenticated()) {
        router.push('/');
      }
    }
  }, [done])

  if(authContext?.isUserAuthenticated()) {
    return (
      <>
        {children}
      </>
    )
  } else {
    return (
      <p>Unauthorized.</p>
    )
  }
}