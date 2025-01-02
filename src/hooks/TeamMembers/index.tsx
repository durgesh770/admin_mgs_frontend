import React, { useEffect, useState } from "react";
import { TeamMemberService } from "@/services"; // Import your service file

//interface
import { TeamMembers } from "@/interface/TeamMembers"; // Import your service file
import { useSnackbar } from "@/context/GlobalContext";
import { removeEmptyValues } from "@/utils/tools";

export const getTeamMembers = () => {
  const [res, setRes] = useState({
    results: [],
    page: 0,
    limit: 0,
    totalPages: 0,
    totalResults: 0,
  });
  const [data, setdata] = useState<TeamMembers[]>([]);

  const [params, setparams] = useState({
    page: 1,
    limit: 100,
  });
  const [loading, setLoading] = useState<boolean>(true);

  // Add a state to track a refetch counter
  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };
  const setPage = (page: number) => {
    setparams({ ...params, page: page });
  };

  useEffect(() => {
    TeamMemberService.getTeamMembers(removeEmptyValues(params))
      .then((res) => {
        setRes(res);
        setdata([...res.results]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter, params]);

  return { data, res, setPage, refetch, loading };
};

export const getSingleMember = (memberId: string) => {
  const [data, setdata] = useState<null>(null);

  const [params, setparams] = useState({
    title: "",
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
    if (!memberId) {
      return;
    }
    TeamMemberService.getMemberById(memberId)
      .then((res) => {
        setdata(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter, params]);

  return { data, refetch, setparams, loading };
};

export const updateMember = (memberId: string) => {
  let alert = useSnackbar();

  const [loading, setLoading] = useState<boolean>(false);

  // Define a function to trigger a re-fetch
  const submit = (body = {}) => {
    setLoading(true);

    TeamMemberService.updateMemberById(memberId, body)
      .catch((err) => {
        alert.SnackbarHandler(
          true,
          "error",
          err.response?.data?.message || "An error occurred"
        );
      })
      .then((res) => {
        if (res?.success) {
          setLoading(false);
          alert.SnackbarHandler(true, "success", "Member updated successfully");
          window.location.reload();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { submit, loading };
};

export const createMember = () => {
  let alert = useSnackbar();

  const [loading, setLoading] = useState<boolean>(false);

  // Define a function to trigger a re-fetch
  const submit = (body = {}) => {
    setLoading(true);

    TeamMemberService.createMember(body)
      .catch((err) => {
        setLoading(false);
        alert.SnackbarHandler(
          true,
          "error",
          err.response?.data?.message || "An error occurred"
        );
      })
      .then((res) => {
        if (res?.success) {
          setLoading(false);
          alert.SnackbarHandler(true, "success", "Member created successfully");
          window.location.href = "/team-members";
        }
      });
  };

  return { submit, loading };
};

export const setTeamMemberColors = () => {
  React.useEffect(() => {
    TeamMemberService.getColorOfTeamMembers().then((res) => {
      localStorage.setItem("members-color", JSON.stringify(res.colors));
    });
  }, []);
};

export const useDeleteCard = (body: any) => {
  let alert = useSnackbar();

  const handleDeleteCard = () => {
    TeamMemberService.deleteCard(body).then((res: any) => {
      if (res.success) {
        alert.SnackbarHandler(true, "success", "Card Deleted successfully");
        window.location.reload();
      }
    });
  };

  return { handleDeleteCard };
};

export const useUpdateActiveStatus = () => {
  let alert = useSnackbar();
  const [loading, setLoading] = useState<boolean>(true);

  const handleStatus = (id: string, active: boolean) => {
    setLoading(false);
    TeamMemberService.UpdateActiveStatus(id, !active).then((res: any) => {
      if (res.success) {
        setLoading(true);
        alert.SnackbarHandler(true, "success", "Card Deleted successfully");
        window.location.reload();
      }
    });
  };

  return { handleStatus, loading };
};

export const useDeleteTeamMember = () => {
  let alert = useSnackbar();
  const [isLoading, setIsLoading] = useState(true);

  const handleDeleteTeamMember = (id: string) => {
    setIsLoading(false);
    TeamMemberService.deleteTeamMember(id)
      .then((res) => {
        if (res.success) {
          alert.SnackbarHandler(true, "success", "Deleted successfully");
          window.location.reload();
        }
      })
      .catch((err) => {
        alert.SnackbarHandler(true, "error", err?.response?.data?.data || err?.response?.data?.message);
      })
      .finally(() => {
        setIsLoading(true);
      });
  };

  return { handleDeleteTeamMember, setIsLoading, isLoading };
};
