import React, { useState } from "react";
import { Button } from "@mui/material";
import { ConnectingAirports, AddTask, GitHub } from "@mui/icons-material";
import { LinkHome, LinkProjects, LinkCV, LinkContact } from "./Links";
import data from "../data/projects.json";

export const Projects = () => {
  const [isActiveTodo, setIsActiveTodo] = useState(false);
  const [isActiveCDApp, setIsActiveCDApp] = useState(false);
  const [isActiveGitHub, setIsActiveGitHub] = useState(false);

  return (
    <div className="Projects">
      <nav className="nav">
        <LinkHome />
        <LinkProjects />
        <LinkCV />
        <LinkContact />
      </nav>
      <div className="container_button">
        <Button
          onMouseOver={() => setIsActiveTodo(true)}
          onMouseOut={() => setIsActiveTodo(false)}
          variant={isActiveTodo ? "contained" : "outlined"}
          size="large"
          color="primary"
          startIcon={<AddTask />}
          endIcon={<AddTask />}
          target="_blank"
          href={data.projects.todoApp.url}
        >
          {data.projects.todoApp.name}
        </Button>
        <Button
          onMouseOver={() => setIsActiveCDApp(true)}
          onMouseOut={() => setIsActiveCDApp(false)}
          variant={isActiveCDApp ? "contained" : "outlined"}
          size="large"
          color="primary"
          startIcon={<ConnectingAirports />}
          endIcon={<ConnectingAirports />}
          target="_blank"
          href={data.projects.CDApp.url}
        >
          {data.projects.CDApp.name}
        </Button>
        <Button
          onMouseOver={() => setIsActiveGitHub(true)}
          onMouseOut={() => setIsActiveGitHub(false)}
          variant={isActiveGitHub ? "contained" : "outlined"}
          size="large"
          color="primary"
          startIcon={<GitHub />}
          endIcon={<GitHub />}
          target="_blank"
          href={data.accounts.github.url}
        >
          {data.accounts.github.name}
        </Button>
      </div>
    </div>
  );
};
