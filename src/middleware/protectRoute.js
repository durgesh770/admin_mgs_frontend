'use client';

import { useEffect } from "react"; // Import useEffect hook
import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";

let withoutAuthAccessURL = [
  "login",
  "signup",
  "reset-password",
  "verify-email",
  "verify",
  "reset",
  "forget-password"
];

const ProtectRoute = ({ children }) => {
  let router = useRouter();
  let pathname = usePathname();
  //context
  const { user, loader } = useAuth();

  let authURL = withoutAuthAccessURL.find((url) =>
    String(pathname).includes(url)
  );

  useEffect(() => {
    if (loader) return; // Prevent any actions when loader is true

    if (user) {
      if (authURL) {
        router.push("/");
      }
    } else {
      if (!authURL) {
        router.push("/login");
      }
    }
  }, [user, loader]);

  if (loader) return <div className="w-full h-screen"><h1 className=" text-center pt-[22%]">Loading . . .</h1></div>;
  return children;
};

export default ProtectRoute;