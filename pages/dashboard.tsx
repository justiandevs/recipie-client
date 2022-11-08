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
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full">
                      <thead className="border-b">
                        <tr>
                          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            id
                          </th>
                          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            name
                          </th>
                          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            email
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user: User) =>
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{user.name}</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{user.email}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          }
        </section>
      </>
    </ProtectedRoute>
  )
}