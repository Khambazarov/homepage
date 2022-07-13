import React, { useState } from "react";
import { LinkHome, LinkProjects, LinkCV, LinkContact } from "./Links";
import {
  Button,
  List,
  // ListItemText,
  Collapse,
  // Divider,
  // Link,
  Typography,
  AccordionDetails,
  AccordionSummary,
  Accordion,
} from "@mui/material";
import {
  Person,
  School,
  // Code,
  Language,
  WorkHistory,
  ExpandLess,
  ExpandMore,
  Mail,
  LinkedIn,
  GitHub,
  // ArrowForwardIosSharp,
} from "@mui/icons-material";
import data from "../data/projects.json";

export const CV = () => {
  const [profile, setProfile] = useState(false);
  const [education, setEducation] = useState(false);
  const [experience, setExperience] = useState(false);
  const [languages, setLanguages] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className="CV">
      <nav className="nav">
        <LinkHome />
        <LinkProjects />
        <LinkCV />
        <LinkContact />
      </nav>
      <div className="img"></div>
      <List>
        <Button
          onClick={() => setProfile(!profile)}
          variant={profile ? "contained" : "outlined"}
          size="large"
          color="primary"
          startIcon={<Person />}
          endIcon={profile ? <ExpandLess /> : <ExpandMore />}
        >
          profile
        </Button>
        <Collapse in={profile}>
          <Accordion
            expanded={expanded === "panel5"}
            onChange={handleChange("panel5")}
          >
            <AccordionDetails
              aria-controls="panel5d-content"
              id="panel5d-header"
            >
              <Typography>
                <ul>
                  {data.cv.shortProfile.map((item, i) => {
                    return <li key={i}>{item}</li>;
                  })}
                </ul>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel6"}
            onChange={handleChange("panel6")}
          >
            <AccordionDetails>
              <Typography>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  startIcon={<GitHub />}
                  endIcon={<GitHub />}
                  target="_blank"
                  href={data.accounts.github.url}
                >
                  github
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  startIcon={<Mail />}
                  endIcon={<Mail />}
                  target="_blank"
                  href={data.accounts.mail.url}
                >
                  gmail
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  startIcon={<LinkedIn />}
                  endIcon={<LinkedIn />}
                  target="_blank"
                  href={data.accounts.linkedin.url}
                >
                  linkedin
                </Button>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Collapse>
        <Button
          onClick={() => setEducation(!education)}
          variant={education ? "contained" : "outlined"}
          size="large"
          color="primary"
          startIcon={<School />}
          endIcon={education ? <ExpandLess /> : <ExpandMore />}
        >
          education
        </Button>
        <Collapse in={education}>
          <Accordion
            expanded={expanded === "panel7"}
            onChange={handleChange("panel7")}
          >
            <AccordionSummary
              aria-controls="panel7d-content"
              id="panel7d-header"
            >
              <Typography style={{ width: "100%", textAlign: "center" }}>
                Web and software development
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              aria-controls="panel7d-content"
              id="panel7d-header"
            >
              <Typography>
                <ul>
                  {data.cv.experience.it.map((item, i) => {
                    return <li key={i}>{item}</li>;
                  })}
                </ul>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel8"}
            onChange={handleChange("panel8")}
          >
            <AccordionSummary
              aria-controls="panel8d-content"
              id="panel8d-header"
            >
              <Typography style={{ width: "100%", textAlign: "center" }}>
                Catering expert
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              aria-controls="panel8d-content"
              id="panel8d-header"
            >
              <Typography>
                <ul>
                  {data.cv.education.map((item, i) => {
                    return <li key={i}>{item}</li>;
                  })}
                </ul>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Collapse>
        <Button
          onClick={() => setExperience(!experience)}
          variant={experience ? "contained" : "outlined"}
          size="large"
          color="primary"
          startIcon={<WorkHistory />}
          endIcon={experience ? <ExpandLess /> : <ExpandMore />}
        >
          experiences
        </Button>
        <Collapse in={experience}>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography style={{ width: "100%", textAlign: "center" }}>
                Web and software development
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <ul>
                  {data.cv.experience.it.map((item, i) => {
                    return <li key={i}>{item}</li>;
                  })}
                </ul>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              aria-controls="panel2d-content"
              id="panel2d-header"
            >
              <Typography style={{ width: "100%", textAlign: "center" }}>
                McDonald's Germany LLC
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <ul>
                  {data.cv.experience.mcd.map((item, i) => {
                    return <li key={i}>{item}</li>;
                  })}
                </ul>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
          >
            <AccordionSummary
              aria-controls="panel3d-content"
              id="panel3d-header"
            >
              <Typography style={{ width: "100%", textAlign: "center" }}>
                Manager | Assistant manager
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <ul>
                  {data.cv.experience.mgr.map((item, i) => {
                    return <li key={i}>{item}</li>;
                  })}
                </ul>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Collapse>
        <Button
          onClick={() => setLanguages(!languages)}
          variant={languages ? "contained" : "outlined"}
          size="large"
          color="primary"
          startIcon={<Language />}
          endIcon={languages ? <ExpandLess /> : <ExpandMore />}
        >
          languages
        </Button>
        <Collapse in={languages}>
          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
          >
            <AccordionDetails
              aria-controls="panel4d-content"
              id="panel4d-header"
            >
              <Typography>
                <ul>
                  {data.cv.languages.map((item, i) => {
                    return <li key={i}>{item}</li>;
                  })}
                </ul>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
          >
            <AccordionSummary
              aria-controls="panel8d-content"
              id="panel8d-header"
            >
              <Typography style={{ width: "100%", textAlign: "center" }}>
                Certificate
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              aria-controls="panel4d-content"
              id="panel4d-header"
            >
              <Typography>
                <ul>
                  {data.cv.certificates.map((item, i) => {
                    return <li key={i}>{item}</li>;
                  })}
                </ul>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Collapse>
      </List>
    </div>
  );
};
