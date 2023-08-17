import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Zoom,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

type OpenType = boolean;
type Title = string;
type Icon = React.ReactElement;

type LinkProps = {
  open: OpenType;
  title: Title;
  path: string;
  icon: Icon;
};
type ButtonProps = {
  open: OpenType;
  title: Title;
  icon: Icon;
  onClick: () => void;
};

const colorBitchest = "customColors.bitchest.main";

const stylesContainer = (open: OpenType) => ({
  justifyContent: open ? "initial" : "center",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  width: "100%",
});
const stylesIcon = (open: OpenType) => ({
  minWidth: 0,
  mr: open ? 3 : "auto",
  justifyContent: "center",
});

export const ListItemLinkComponents = ({
  open,
  title,
  path,
  icon,
}: LinkProps) => {
  return (
    <Tooltip
      title={title}
      placement="right"
      TransitionComponent={Zoom}
      arrow
      enterDelay={open ? 120_000 : 100}
    >
      <ListItemButton
        sx={{
          "&:hover span": {
            color: colorBitchest,
          },
        }}
      >
        <Link
          style={{
            ...stylesContainer(open),
          }}
          to={path}
        >
          <ListItemIcon sx={{ ...stylesIcon(open) }}>{icon}</ListItemIcon>
          <ListItemText
            primary={title}
            sx={{
              opacity: open ? 1 : 0,
              color: "white",
            }}
          />
        </Link>
      </ListItemButton>
    </Tooltip>
  );
};

export const ListItemButtonComponents = ({
  open,
  title,
  icon,
  onClick,
}: ButtonProps) => {
  return (
    <Tooltip
      title={title}
      placement="right"
      TransitionComponent={Zoom}
      arrow
      enterDelay={open ? 120_000 : 100}
    >
      <ListItemButton
        sx={{
          ...stylesContainer(open),
          "&:hover": {
            color: colorBitchest,
          },
        }}
        onClick={onClick}
      >
        <ListItemIcon sx={{ ...stylesIcon(open) }}>{icon}</ListItemIcon>
        <ListItemText primary={title} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </Tooltip>
  );
};
