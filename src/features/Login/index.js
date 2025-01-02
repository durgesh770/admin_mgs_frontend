'use client'

import React, { useState } from 'react';
import Image from 'next/image';

//services
import { AuthService } from "@/services"

//context
import { useSnackbar } from '@/context/GlobalContext';
import logo from "../../assets/images/logo.svg"
import Button from '@/components/ui/Button';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  let alert = useSnackbar()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    // You can perform your login logic here, e.g., sending a request to an API

    const data = await AuthService.login(email, password).catch((err) => {
      alert.SnackbarHandler(true, "error", err.response?.data?.message || "An error occurred");
    }).finally(() => {
      setIsLoading(false)
    })

    if (data?.success) {
      alert.SnackbarHandler(true, "success", "Login Successful");
      localStorage.setItem("token", JSON.stringify(data.jwt))

      window.location.href = "/";
    }
  };

  return (
    <section className="container-pages">
      <div class="flex min-h-screen">
        <div class="half-circle hidden-sm hidden-xs"></div>
      </div>

      <div className='brand-logo py-7 pl-4 m-4 bg-white rounded-full' >
        <a href="#">
          <Image
            src={logo}
            alt='logo' width={100}
            height={100}
          />
        </a>
      </div>
      <div className='mt-[300px] ml-20 text-7xl font-extrabold text-white absolute xl:block hidden'>Welcome </div>
      <div className='mt-[380px] ml-20 text-7xl font-extrabold text-white absolute xl:block hidden '> Back !</div>

      <div class="small-circle top-[500px] right-[200px] xl:block hidden"></div>
      <div className=" relative z-50 flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0 ">
        <div className='mb-[20px] text-2xl font-extrabold text-[--brand-black-color]  block md:hidden'>Welcome Back ! </div>

        <div className=" fullWidth bg-white rounded-lg shadow dark:border  xl:p-0 dark:bg-gray-800">
          <div className="logged space-y-4 md:space-y-6 p-8 sm:w-[400px]  h-[400px] ">

            <div className=" font-bold leading-tight tracking-tight text-gray-900  text-center">
              <span className=' text-3xl text-[--brand-color]' >Login</span>
              <div className=' text-sm mb-8' >Login to your account</div>
            </div>

            <form className="space-y-4 md:space-y-6 " onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className='pb-2'>Your email</label>
                <input
                  type='email'
                  className="font-mulish text-base flex-shrink-0 font-normal leading-normal tracking-wider flex w-full h-10 flex-row justify-center  rounded-md"
                  name="email"
                  id="email"
                  placeholder="Enter your email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2">Password</label>
                <div className="relative">
                  <input
                    className="font-mulish text-base flex-shrink-0 font-normal leading-normal tracking-wider flex w-full h-10 flex-row justify-center rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500"
                    type={passwordVisible ? 'text' : 'password'}
                    name="password"
                    id="password"
                    placeholder="*******"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                    onClick={togglePasswordVisibility}
                  >
                    {!passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>


              <div className="flex items-center justify-between ">
                <div className="flex items-start">
                </div>
                <a href="/forget-password" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot password?</a>
              </div>
              <Button
                type="submit"
                btnType='secondary'
                loading={isLoading}
              >
                Sign in
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;