'use client'

import EditPermission from '@/features/Permissions/edit-permission'
import { SecurePageByPackage } from '@/middleware/PermissionAccess'
import React from 'react'

const page = () => {
  return (
    <>
        <EditPermission/>
    </>
  )
}

export default SecurePageByPackage(page,["edit_permission"])
