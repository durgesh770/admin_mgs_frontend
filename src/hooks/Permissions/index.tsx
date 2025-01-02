import { useEffect, useState } from 'react';
import { PermissionService } from '@/services'; // Import your service file

//interface
import { PermissionGroup, SimplifiedApiResponse } from '@/interface/Permission'; // Import your service file

export const getPermissions = () => {
  const [data, setdata] = useState<PermissionGroup[]>([]);

  // Add a state to track a refetch counter
  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };

  useEffect(() => {
    PermissionService.getAllPermission().then((res: SimplifiedApiResponse) => {
      setdata([...res.data.results])
    });
  }, [refetchCounter]);

  return { data, refetch };
};