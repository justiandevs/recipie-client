import React, {useEffect, useLayoutEffect, useState} from "react";
import {ProtectedRoute} from "../components/ProtectedRoute";
import {getSpecificKeyValueResult} from "../utils/localStorage";
import {api} from "../utils/api";

interface User {
  name: string,
  id: string,
  email: string
}

export default function Dashboard() {
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if(loading) {
      executeAxiosRequest();
      setLoading(false);
    }
  }, []);

  const executeAxiosRequest = () => {
    api.get('users')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <ProtectedRoute>
      <>
        <section className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-4xl font-semibold">Dashboard</h1>
          <p className="text-lg pt-2">Welcome, {getSpecificKeyValueResult('userName')}.</p>
        </section>
        <section className="bg-white rounded-lg shadow-sm p-8 mt-8">
          <h2 className="text-2xl font-semibold">All users</h2>
          {!loading &&
            <div>
              {users.map((user: User) =>
                <div key={user.id}>
                  {user.name}
                </div>
              )}
            </div>
          }
        </section>
      </>
    </ProtectedRoute>
  )
}