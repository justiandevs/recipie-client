import Link from "next/link";
import React, {useEffect} from "react";
import {AuthContext} from "../../context/auth-context";
import {useRouter} from "next/router";
import {api} from "../../utils/api";

export default function Navigation() {
  const authContext = React.useContext(AuthContext);
  const router = useRouter();

  const logout = () => {
    api.get('auth/logout')
      .then((res) => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        authContext?.setAuthState();
        router.push('/');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-0 text-lg flex justify-between flex-row items-center">
        <div className="flex flex-row gap-8 items-center ">
          <Link href={"/"} className="text-indigo-600 text-xl font-semibold py-8 border-b-2 border-white">Recip.ie</Link>
          {authContext?.authState.token != '' &&
            <Link href={"/dashboard"} className={`${router.asPath === '/dashboard' ? 'border-indigo-600 text-indigo-600' : 'border-white'} border-b-4 py-8`}>Dashboard</Link>
          }
        </div>
        <div>
          {authContext?.authState.token === '' ?
            <Link href={"/sign-in"} className="px-4 font-semibold py-3 text-white bg-indigo-600 text-md rounded-lg transition duration-200 hover:bg-indigo-700">
              Sign-in
            </Link>
            :
            <a onClick={() => logout()} className="cursor-pointer px-4 font-semibold py-3 text-white bg-indigo-600 text-md rounded-lg transition duration-200 hover:bg-indigo-700">
              Sign-out
            </a>
          }
        </div>
      </div>
    </nav>
  )
}