// utils/auth.ts
import Cookies from "js-cookie";
import { NextRouter } from "next/router";

export const checkAuth = (router: NextRouter) => {
  const authenticated = Cookies.get("authenticated");
  if (!authenticated) {
    router.push("/login");
  }
};