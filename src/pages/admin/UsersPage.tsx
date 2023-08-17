import { DeleteForever, Mode } from "@mui/icons-material";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Modal from "@src/components/Modal";
import ModalUserForm from "@src/components/ModalUserForm";

import SkeletonTable from "@src/components/SkeletonTable";
import { deleteUser, getAllUsers } from "@src/services/users";
import { UserType } from "@src/types/user.type";
import { useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

const BITCHEST = "customColors.bitchest.main";

const UsersPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [userModification, setUserModification] = useState<null | UserType>(
    null
  );
  const {
    data: users,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
    staleTime: 60_000,
  });

  function openConfirmationDeleteModal(user: UserType) {
    setUserModification(user);
    setOpenConfirmationModal(true);
  }

  async function handleDeleteUser(id: number) {
    const res = await deleteUser(id);
    refetch();
    setOpenConfirmationModal(false);
    enqueueSnackbar("L'utilisateur à bien été supprimé", {
      variant: "success",
    });
  }

  function openModalEditUser(user: UserType) {
    setUserModification(user);
    setOpenFormModal(true);
  }

  useEffect(() => {
    if (!openFormModal && userModification) setUserModification(null);
  }, [openFormModal, userModification]);

  return (
    <>
      <h1>USERS LIST</h1>

      {isLoading && <SkeletonTable nbRows={10} />}
      {users && (
        <Box>
          <Button
            size="large"
            variant="outlined"
            onClick={() => setOpenFormModal(true)}
            sx={{
              display: "block",
              marginInline: "auto 0",
              my: 4,
              "&:hover": {
                borderColor: BITCHEST,
                color: BITCHEST,
              },
            }}
          >
            Créer un nouvel utilisateur
          </Button>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="right">Rôle</TableCell>
                  <TableCell align="right">Prénom</TableCell>
                  <TableCell align="right">Nom</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Mettre à jour</TableCell>
                  <TableCell align="right">Supprimer</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={user.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {user.id}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        color:
                          user.role === "admin"
                            ? "customColors.bitchest.dark"
                            : "",
                      }}
                    >
                      {user.role}
                    </TableCell>
                    <TableCell align="right">{user.firstname}</TableCell>
                    <TableCell align="right">{user.lastname}</TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="info"
                        onClick={() => openModalEditUser(user)}
                      >
                        <Mode color="info" />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="error"
                        onClick={() => openConfirmationDeleteModal(user)}
                      >
                        <DeleteForever color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      {userModification && openConfirmationModal && (
        <Modal
          open={openConfirmationModal}
          setOpen={setOpenConfirmationModal}
          title="Suppression de l'utilisateur"
        >
          <DialogContent>
            <Box>
              <Typography>
                Attention vous êtes sur le point de supprimer :<br />
              </Typography>
              <Typography
                color="customColors.bitchest.main"
                fontSize={18}
                fontStyle="italic"
              >
                {userModification.firstname} {userModification.lastname}
              </Typography>
              <Typography>Voulez-vous continuer ?</Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpenConfirmationModal(false)}
              variant="outlined"
            >
              Annuler
            </Button>
            <Button
              onClick={() => handleDeleteUser(userModification.id)}
              variant="outlined"
              color="error"
            >
              Supprimer
            </Button>
          </DialogActions>
        </Modal>
      )}
      {openFormModal && (
        <ModalUserForm
          open={openFormModal}
          setOpen={setOpenFormModal}
          userEdit={userModification}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default UsersPage;
