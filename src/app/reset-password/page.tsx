"use client";

import * as React from "react";

import ChangePassword from "@/features/ChangePassword";
import { useSearchParams } from "next/navigation";
import { useSnackbar } from "@/context/GlobalContext";

export default function Login() {
  const searchParams = useSearchParams();
  let alert = useSnackbar();
  const token = searchParams.get("token");

  React.useEffect(() => {
    if (!token) {
      // If token is not present in the query parameters, show an alert to the user
      alert.SnackbarHandler(
        true,
        "error",
        "Token not found in URL. Please provide the token to reset your password."
      );
      return;
    }
  }, [token]);

  return (
    <div className="">
      <ChangePassword token={token} />
    </div>
  );
}
