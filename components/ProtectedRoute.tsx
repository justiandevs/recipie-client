import React, {useEffect} from "react";
import {AuthContext} from "../context/auth-context";
import {useRouter} from "next/router";

export const ProtectedRoute = ({ children } : { children: JSX.Element}) => {
  const authContext = React.useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if(!authContext?.isUserAuthenticated()) {
      router.push('/');
    }
  }, [])

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