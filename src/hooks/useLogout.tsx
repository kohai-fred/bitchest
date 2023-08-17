import { useCallback } from "react";

import { redirect, useNavigate } from "react-router-dom";

import { removeUserCookies } from "../utils/cookiesUser";

export default () => {
  const navigate = useNavigate();
  const logout = useCallback(() => {
    removeUserCookies();
    navigate(0);
  }, [navigate]);
  return logout;
};
