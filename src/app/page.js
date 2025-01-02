'use client'
// react 
import * as React from 'react';
import Image from 'next/image';
// global css
import "@/assets/styles/globals.css";
// immage
import logo from "@/assets/images/my-girl-souz-logo.png";
// components
import Top_5_Customers_Table from '@/features/Reports/Analytics/Top_5_Customers/Table';
import Top_3_Team_Members_Table from '@/features/Reports/Analytics/Top_3_Team_Members/Table';
import HomeCardsfeature from '@/features/Home/HomeCardsfeature';
import HomeChartfeature from '@/features/Home/HomeChartfeature';
// integration imports
import { useAuth } from '@/context/AuthContext';
import { useTopCustomer, useTopMembers } from '@/hooks/Reports';

export default function ComponentPage() {
  // integration
  const { user } = useAuth()
  const { customers } = useTopCustomer();
  const { members } = useTopMembers();
  return (
    <>
      <div className='min-h-screen p-1'>
        <div>
          <div className='h-48 bg-[--brand-color] rounded-lg shadow-lg '>
            <div className='flex md:flex-row flex-col justify-between items-center px-7 pt-1 '>
              <div>
                <span className='ost text-[--brand-white-color] font-bold text-[30px] uppercase'> HELLO {user?.name}</span>
              </div>
              <div className="">

                <Image
                  src={logo}
                  alt='logo' width={100}
                  height={100}
                  className='mt-3 mr-6'
                />
              </div>
            </div>
            <div className="lg:block hidden">
              <HomeCardsfeature />
            </div>

          </div>
        </div>
        <div className="block lg:hidden">
          <HomeCardsfeature />
        </div>

        <HomeChartfeature user={user} />

        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-10 items-start ">
          <div className='   bg-[--brand-white-color] rounded-xl shadow-xl   border border-gray-300 py-6 px-3 '>
            <h1 className='ost font-bold text-[20px] text-[--brand-color] mb-5'>  Top 5 Customers</h1>
            <Top_5_Customers_Table customers={customers} />
          </div>
          <div className='  bg-[--brand-white-color] rounded-xl shadow-xl   border border-gray-300 py-6 px-3 '>
            <h1 className='ost font-bold text-[20px] text-[--brand-color] mb-5'> Top 5 Team Members</h1>
            <Top_3_Team_Members_Table isChart={true} members={members} />
          </div>
        </div>
      </div>
    </>
  );
}