'use client'

import React, { useState } from 'react';
import Image from 'next/image';

//services
import { AuthService } from "@/services"

//context
import { useSnackbar } from '@/context/GlobalContext';
import logo from "../../assets/images/Logo1.png"
import Button from '@/components/ui/Button';

const ForgetPassword = () => {
  let alert = useSnackbar()

  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can perform your login logic here, e.g., sending a request to an API

    const data = await AuthService.forgot(email).catch((err) => {
      alert.SnackbarHandler(true, "error", err.response?.data?.message || "An error occurred");
    });

    if (data?.success) {
      alert.SnackbarHandler(true, "success", "Check your mail");
    }
  };

  return (
    <section className="container-pages">
      <div class="flex min-h-screen">
        <div class="half-circle hidden-sm hidden-xs"></div>
      </div>

      <div className='brand-logo py-5 pl-4 m-4 bg-white rounded-full' >
        <a href="#">
          <Image
            src={logo}
            alt='logo' width={100}
            height={100}
          />
        </a>
      </div>

      <div class="small-circle top-[500px] right-[200px]"></div>


      <div className=" relative z-50 flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 ">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-screen-sm xl:p-0 dark:bg-gray-800 border border-gray-300">
          <div className="w-full p-6 sm:p-8 md:p-16">
            <h1 className="mb-3 text-2xl font-bold text-gray-900 lg:text-3xl dark:text-white">Forgot your password?</h1>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              Type in your email in the field below, and we will send you a verification link to reset your password.
            </p>
            <form className="mt-8" onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input
                  required
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full p-2.5"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <Button btnType='secondary' loading={false} >
                Submit
              </Button>

              <div className="flex items-start text-sm font-medium text-gray-500 pt-4">
                <a className="ml-auto text-blue-600" href="/login/">
                  Back to Login
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>

    </section>
  );
};


export default ForgetPassword;
