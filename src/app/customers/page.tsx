'use client'

import CustomerTable from '@/features/customers/Table'
import { useSearchParams } from 'next/navigation';
import React from 'react'
import ViewCustomer from '@/features/customers/ViewCustomer/ViewCustomer';
import { SecurePageByPackage } from '@/middleware/PermissionAccess';

const page = () => {
  const searchParams = useSearchParams()
  const customerId = searchParams.get('customerId');

  return (
    <>
      <div className="min-h-screen pt-4 md:max-w-[70vw] m-auto">

        <CustomerTable />
        <ViewCustomer customerId={customerId} key={customerId} />
      </div>
    </>
  )
}

export default SecurePageByPackage(page, ["view_customers"])
