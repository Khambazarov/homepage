import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export const LinkHome = () => {
  const [isActiveHome, setIsActiveHome] = useState(false);

  return (
    <div>
      <Link to="/">
        <Button
          onMouseOver={() => setIsActiveHome(true)}
          onMouseOut={() => setIsActiveHome(false)}
          variant={isActiveHome ? "contained" : "outlined"}
          color="error"
          size="large"
        >
          Home
        </Button>
      </Link>
    </div>
  );
};

export const LinkProjects = () => {
  const [isActiveProject, setIsActiveProject] = useState(false);

  return (
    <div>
      <Link to="/projects">
        <Button
          onMouseOver={() => setIsActiveProject(true)}
          onMouseOut={() => setIsActiveProject(false)}
          variant={isActiveProject ? "contained" : "outlined"}
          color="error"
          size="large"
        >
          Projects
        </Button>
      </Link>
    </div>
  );
};

export const LinkCV = () => {
  const [isActiveCV, setIsActiveCV] = useState(false);

  return (
    <div>
      <Link to="/cv">
        <Button
          onMouseOver={() => setIsActiveCV(true)}
          onMouseOut={() => setIsActiveCV(false)}
          variant={isActiveCV ? "contained" : "outlined"}
          color="error"
          size="large"
        >
          CV
        </Button>
      </Link>
    </div>
  );
};

export const LinkContact = () => {
  const [isActiveContact, setIsActiveContact] = useState(false);

  return (
    <div>
      <Link to="/contact">
        <Button
          onMouseOver={() => setIsActiveContact(true)}
          onMouseOut={() => setIsActiveContact(false)}
          variant={isActiveContact ? "contained" : "outlined"}
          color="error"
          size="large"
        >
          Contact
        </Button>
      </Link>
    </div>
  );
};
