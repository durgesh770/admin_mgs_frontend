'use client'

import React, { useState } from 'react';

//services
import { AuthService } from "@/services"

//context
import { useSnackbar } from '@/context/GlobalContext';

import Image from 'next/image';
import logo from "../../assets/images/Logo1.png"

const ChangePassword = ({ token }) => {
  let alert = useSnackbar()


  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can add your change password logic here.

    if (password != confirmPassword) {
      return alert.SnackbarHandler(true, "error", "Password not match!");
    }


    const data = await AuthService.reset(password, token).catch((err) => {
      alert.SnackbarHandler(true, "error", err.response?.data?.message || "An error occurred");
    });

    if (data?.success) {
      alert.SnackbarHandler(true, "success", "Password Reset Successfully");

      window.location.href = "/login";
    }
  };

  return (
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <Image
            src={logo}
            alt='logo' width={100}
            height={100}
          />
        </a>
        <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
          </h1>
          <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">

            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}

                type="password" name="password" id="password" placeholder="**************"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
            </div>
            <div>
              <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}

                type="confirm-password" name="confirm-password" id="confirm-password" placeholder="**************" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
            </div>

            <button onClick={handleSubmit} type="submit"
              className="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-800 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >Reset passwod</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
