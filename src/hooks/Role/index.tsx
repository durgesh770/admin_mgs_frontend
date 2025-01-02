// @ts-nocheck

import { useEffect, useState } from 'react';
import { RoleService } from '@/services'; // Import your service file

//interface
import { ApiResponse, DataResult, GetSingleRole } from '@/interface/Role'; // Import your service file
import { removeEmptyValues } from '@/utils/tools';

interface DefaultParams {
  defaultParams?: any
}

export const getRoles = ({ defaultParams }: DefaultParams) => {
  const [res, setRes] = useState({
    results: [],
    page: 0,
    limit: 0,
    totalPages: 0,
    totalResults: 0
  })
  const [data, setdata] = useState<DataResult[]>([]);

  const [params, setparams] = useState<any>(defaultParams || {
    title: ""
  });

  // Add a state to track a refetch counter
  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };
  const setPage = (page: number) => {
    setparams({ ...params, page: page });
  }

  useEffect(() => {
    RoleService.getAllRole(removeEmptyValues(params)).then((res: ApiResponse) => {
      setRes(res.data);
      setdata([...res.data.results]);
    });
  }, [refetchCounter, params]);

  return { data, res, setPage, refetch, params, setparams };
};


export const getSingleRole = (roleId: string) => {
  const [data, setdata] = useState<GetSingleRole | null>(null);

  const [params, setparams] = useState({
    title: ""
  });


  const [loading, setLoading] = useState<boolean>(true);

  // Add a state to track a refetch counter
  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };

  useEffect(() => {
    RoleService.getSingleRole(roleId).then((res) => {
      setdata(res.data)
    }).finally(() => {
      setLoading(false)
    })
  }, [refetchCounter, params]);

  return { data, refetch, setparams, loading };
};



export const getRoleInfo = (roleId: string) => {
  const [data, setdata] = useState<GetSingleRole | null>(null);

  const [params, setparams] = useState({
    title: ""
  });


  const [loading, setLoading] = useState<boolean>(true);

  // Add a state to track a refetch counter
  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };

  useEffect(() => {
    RoleService.getRoleInfo({ roleId }).then((res) => {
      setdata(res.data)
    }).finally(() => {
      setLoading(false)
    })
  }, [refetchCounter, params]);

  return { data, refetch, setparams, loading };
};