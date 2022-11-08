import React, {FormEvent, useState} from "react";
import {api} from "../utils/api";
import {useForm} from "react-hook-form";
import {generateNewDeviceIdentifier, getDeviceIdentifier} from "../utils/localStorage";
import {useRouter} from "next/router";
import {AuthContext} from "../context/auth-context";

type FormData = {
  name: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const authContext = React.useContext(AuthContext);
  const { register, handleSubmit, watch, formState: { errors} } = useForm<FormData>();
  const router = useRouter();
  const [error, setError] = useState<string>();

  const handleFormSubmit = (data: FormData) => {
    setError('');
    generateNewDeviceIdentifier();

    api.post('auth/signup', {
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
      })
  }

  return (
    <section className="bg-white shadow-sm p-8 rounded-lg">
      <h2 className="text-2xl font-semibold">Sign Up</h2>
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
          <label>Email</label>
          <input {...register('email', { required: true, minLength: 8, maxLength: 64}) } type="text" className="bg-gray-100 text-lg px-4 py-3 rounded-lg" placeholder="Your email..." />
          {errors.email && (
            <>
              {errors.email.type == 'required' && <p className="text-red-500">Email is required.</p>}
              {errors.email.type == 'minLength' && <p className="text-red-500">Email should be atleast 8 characters.</p>}
              {errors.email.type == 'maxLength' && <p className="text-red-500">Email should not be more than 64 characters long.</p>}
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
        <div className="self-end">
          <input type="submit" className="bg-indigo-600 text-white transition duration-200 hover:bg-indigo-700 px-4 py-3 font-semibold rounded-lg" />
        </div>
      </form>
    </section>
  )
}