import Link from "next/link";
import React, {useState} from "react";
import {AuthContext} from "../context/auth-context";
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";
import {generateNewDeviceIdentifier, getDeviceIdentifier} from "../utils/localStorage";
import {api} from "../utils/api";

type FormData = {
  name: string;
  password: string;
}

export default function SignIn() {
  const authContext = React.useContext(AuthContext);
  const { register, handleSubmit, watch, formState: { errors} } = useForm<FormData>();
  const router = useRouter();
  const [error, setError] = useState<string>();

  const handleFormSubmit = (data: FormData) => {
    setError('');
    generateNewDeviceIdentifier();

    api.post('auth/signin', {
      ...data,
      identifier: getDeviceIdentifier()
    })
      .then((res) => {
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        localStorage.setItem('userId', res.data.id);
        localStorage.setItem('userName', res.data.name);
        authContext?.setAuthState();
        router.push('/dashboard');
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }

  return (
    <section className="bg-white shadow-sm p-8 rounded-lg">
      <h2 className="text-2xl font-semibold">Sign in</h2>
      {error != '' && <p className="text-red-500">{error}</p> }
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4 pt-4">
        <div className="flex flex-col gap-2 text-lg">
          <label>Username</label>
          <input {...register('name', { required: true, minLength: 8, maxLength: 64}) } type="text" className="bg-gray-100 text-lg px-4 py-3 rounded-lg" placeholder="Your username..." />
          {errors.name && (
            <>
              {errors.name.type == 'required' && <p className="text-red-500">Name is required.</p>}
              {errors.name.type == 'minLength' && <p className="text-red-500">Name should be atleast 8 characters.</p>}
              {errors.name.type == 'maxLength' && <p className="text-red-500">Name should not be more than 64 characters long.</p>}
            </>
          )}
        </div>
        <div className="flex flex-col gap-2 text-lg">
          <label>Password</label>
          <input {...register('password', { required: true, minLength: 8, maxLength: 64 }) } type="password" className="bg-gray-100 text-lg px-4 py-3 rounded-lg" placeholder="Your password..." />
          {errors.password && (
            <>
              {errors.password.type == 'required' && <p className="text-red-500">Password is required.</p>}
              {errors.password.type == 'minLength' && <p className="text-red-500">Password should be atleast 8 characters.</p>}
              {errors.password.type == 'maxLength' && <p className="text-red-500">Password should not be more than 64 characters long.</p>}
            </>
          )}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>No account? No problem, just <Link href={'/sign-up'} className="text-indigo-700">create an account.</Link></p>
          <input type="submit" className="bg-indigo-600 text-white transition duration-200 hover:bg-indigo-700 px-4 py-3 font-semibold rounded-lg" />
        </div>
      </form>
    </section>
  )
}