import {
  Card,
  Box,
  Typography,
  CardContent,
  CardActions,
  Button,
  useTheme,
} from "@mui/material";
import { UserType } from "@src/types/user.type";
import { Dispatch, SetStateAction } from "react";
import Logo from "@src/assets/text_150.png";

type Props = {
  user: UserType;
  setOpenFormModal: Dispatch<SetStateAction<boolean>>;
};

const UserCard = ({ user, setOpenFormModal }: Props) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        minHeight: 500,
        minWidth: 288,
        maxWidth: 345,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          height: "200px",
          boxShadow: "inset 0 200px 0 blue",
          m: 2,
          mb: "60px",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            borderRadius: 2,

            flex: 1,
            backgroundImage: `url(${Logo})`,
            backgroundSize: "40%",
            // backgroundPosition: "-50% -10%",
            "::after": {
              position: "absolute",
              content: '""',
              inset: 0,
              background:
                "radial-gradient(circle, rgba(0,0,0,0) 0%, #121212 80%, #121212 100%)",
              borderRadius: 2,
            },
            "::before": {
              position: "absolute",
              content: '""',
              inset: 0,
              opacity: "1",
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) -10%, #121212 100%)",
              borderRadius: 2,
            },
          }}
        ></Box>
        <Typography
          variant="caption"
          sx={{ position: "absolute", bottom: 10, right: 15 }}
        >
          {user.email}
        </Typography>
      </Box>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 2,
            mb: 2,
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {user.firstname} {user.lastname}
          </Typography>
          <Typography
            gutterBottom
            fontSize={12}
            sx={{ color: "customColors.bitchest.dark" }}
          >
            {user.role}
          </Typography>
        </Box>
        <Typography
          gutterBottom
          variant="body2"
          color="text.secondary"
          component="div"
          minHeight={100}
        >
          {user.presentation ??
            "Cliquer sur le bouton modifier juste en dessous pour ajouter une présentation."}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => setOpenFormModal(true)}
          size="small"
          variant="outlined"
          sx={{
            marginInline: "auto 0",
            "&:hover": {
              color: "customColors.bitchest.main",
              borderColor: "customColors.bitchest.main",
            },
          }}
        >
          Modifier
        </Button>
      </CardActions>
    </Card>
  );
};

export default UserCard;
