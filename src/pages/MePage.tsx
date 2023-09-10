import { Box, Typography } from "@mui/material";
import ModalUserForm from "@src/components/ModalUserForm";
import TitlePage from "@src/components/TitlePage";
import UserCard from "@src/components/UserCard";
import { getCurrentUser } from "@src/services/getCurrentUser";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const MePage = () => {
  const [openFormModal, setOpenFormModal] = useState(false);

  const { data: user, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    retry: false,
  });

  return (
    <>
      <TitlePage title="Ma page perso" />
      <Box
        component="article"
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" },
          gap: 5,
          mb: 5,
        }}
      >
        {user && (
          <Box component="section">
            <Typography variant="h4" mb={2} textAlign="center" fontWeight={500}>
              Mes Informations
            </Typography>
            <UserCard user={user} setOpenFormModal={setOpenFormModal} />
          </Box>
        )}
        {user?.role === "client" && (
          <Box flex={1} height="400px" component="section">
            <Typography variant="h4" mb={2} textAlign="center" fontWeight={500}>
              Le résumé de vos achats
            </Typography>
            <Box
              sx={{
                display: "grid",
                placeContent: "center",
                height: "inherit",
              }}
            >
              <Typography fontSize="4em">Arrive bientôt ....</Typography>
            </Box>
          </Box>
        )}
      </Box>

      {openFormModal && user && (
        <ModalUserForm
          open={openFormModal}
          setOpen={setOpenFormModal}
          userEdit={user}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default MePage;
