import RequireAuth from "@src/auth/RequireAuth";
import { getUserCookies } from "@src/utils/cookiesUser";

const ClientLayout = () => {
  const userCookie = getUserCookies();

  return (
    <RequireAuth>
      {userCookie && (
        <div>
          <h1>H311 0 CLIENT</h1>
        </div>
      )}
    </RequireAuth>
  );
};

export default ClientLayout;
