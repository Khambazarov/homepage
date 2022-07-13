import React, { useState } from "react";
import { Button } from "@mui/material";
import { LinkedIn } from "@mui/icons-material";
import { LinkHome, LinkProjects, LinkCV, LinkContact } from "./Links";
import data from "../data/projects.json";

export const Contact = () => {
  const [isActiveLinkedIn, setIsActiveLinkedIn] = useState(false);

  return (
    <div className="Contact">
      <nav className="nav">
        <LinkHome />
        <LinkProjects />
        <LinkCV />
        <LinkContact />
      </nav>
      <div className="container_button">
        <Button
          onMouseOver={() => setIsActiveLinkedIn(true)}
          onMouseOut={() => setIsActiveLinkedIn(false)}
          variant={isActiveLinkedIn ? "contained" : "outlined"}
          size="large"
          color="primary"
          startIcon={<LinkedIn />}
          endIcon={<LinkedIn />}
          target="_blank"
          href={data.accounts.linkedin.url}
        >
          {data.accounts.linkedin.name}
        </Button>
      </div>
    </div>
  );
};
