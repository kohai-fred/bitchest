import RequireAuth from "@src/auth/RequireAuth";
import { getUserCookies } from "@src/utils/cookiesUser";

const AdminLayout = () => {
  const userCookie = getUserCookies();
  return (
    <RequireAuth>
      {userCookie && (
        <div>
          <h1>HELL O ADMIN</h1>
        </div>
      )}
    </RequireAuth>
  );
};

export default AdminLayout;
