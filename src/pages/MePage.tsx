import { getCurrentUser } from "@src/services/getCurrentUser";
import { useQuery } from "@tanstack/react-query";

const MePage = () => {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    retry: false,
  });

  return <div>{user && <p>{user.firstname}</p>}</div>;
};

export default MePage;
