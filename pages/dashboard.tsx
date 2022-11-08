import React, {useEffect, useLayoutEffect} from "react";
import {ProtectedRoute} from "../components/ProtectedRoute";
import {getSpecificKeyValueResult} from "../utils/localStorage";
import {api} from "../utils/api";

export default function Dashboard() {
  useEffect(() => {
    api.get('users')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  return (
    <ProtectedRoute>
      <>
        <section className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-4xl font-semibold">Dashboard</h1>
          <p className="text-lg pt-2">Welcome, {getSpecificKeyValueResult('userName')}.</p>
        </section>
        <section className="bg-white rounded-lg shadow-sm p-8 mt-8">
          <h2 className="text-2xl font-semibold">All users</h2>
        </section>
      </>
    </ProtectedRoute>
  )
}