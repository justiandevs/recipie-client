import React from "react";
import {ProtectedRoute} from "../components/ProtectedRoute";
import {AuthContext} from "../context/auth-context";

export default function Dashboard() {
  const authContext = React.useContext(AuthContext);

  return (
    <ProtectedRoute>
      <>
        <p>Hey</p>
        <button onClick={() => authContext?.setAuthState()}>Submit</button>
      </>
    </ProtectedRoute>
  )
}