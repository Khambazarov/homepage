import React, { useState } from "react";
import { LinkHome, LinkProjects, LinkCV, LinkContact } from "./Links";
import {
  Button,
  List,
  Collapse,
  Typography,
  AccordionDetails,
  AccordionSummary,
  Accordion,
} from "@mui/material";
import {
  Person,
  School,
  Language,
  WorkHistory,
  ExpandLess,
  ExpandMore,
  Mail,
  LinkedIn,
  GitHub,
  PictureAsPdf,
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
      <List style={{ paddingTop: "0" }}>
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
          <Accordion>
            <AccordionDetails>
              {data.cv.shortProfile.map((item, i) => {
                return <Typography key={i}>{item}</Typography>;
              })}
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionDetails>
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
            expanded={expanded === "panel0"}
            onChange={handleChange("panel0")}
          >
            <AccordionSummary
              aria-controls="panel0d-content"
              id="panel0d-header"
              expandIcon={<ExpandMore />}
            >
              <Typography style={{ width: "100%", textAlign: "center" }}>
                Web and software development
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {data.cv.experience.it.map((item, i) => {
                return <Typography key={i}>{item}</Typography>;
              })}
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
              expandIcon={<ExpandMore />}
            >
              <Typography style={{ width: "100%", textAlign: "center" }}>
                Certificates
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                DCI - Certificate
                <a href={data.cv.pdf.certificateDCI}>
                  <PictureAsPdf style={{ margin: "0  0 -0.4rem 0.5rem" }} />
                </a>
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
              expandIcon={<ExpandMore />}
            >
              <Typography style={{ width: "100%", textAlign: "center" }}>
                Catering expert
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {data.cv.education.map((item, i) => {
                return <Typography key={i}>{item}</Typography>;
              })}
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
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              aria-controls="panel3d-content"
              id="panel3d-header"
              expandIcon={<ExpandMore />}
            >
              <Typography style={{ width: "100%", textAlign: "center" }}>
                Web and software development
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {data.cv.experience.it.map((item, i) => {
                return <Typography key={i}>{item}</Typography>;
              })}
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
          >
            <AccordionSummary
              aria-controls="panel4d-content"
              id="panel4d-header"
              expandIcon={<ExpandMore />}
            >
              <Typography style={{ width: "100%", textAlign: "center" }}>
                McDonald's Germany LLC
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {data.cv.experience.mcd.map((item, i) => {
                return <Typography key={i}>{item}</Typography>;
              })}
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel5"}
            onChange={handleChange("panel5")}
          >
            <AccordionSummary
              aria-controls="panel5d-content"
              id="panel5d-header"
              expandIcon={<ExpandMore />}
            >
              <Typography style={{ width: "100%", textAlign: "center" }}>
                Manager | Assistant manager
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {data.cv.experience.mgr.map((item, i) => {
                return <Typography key={i}>{item}</Typography>;
              })}
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
          <Accordion>
            <AccordionDetails>
              {data.cv.languages.map((item, i) => {
                return <Typography key={i}>{item}</Typography>;
              })}
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel6"}
            onChange={handleChange("panel6")}
          >
            <AccordionSummary
              aria-controls="panel6d-content"
              id="panel6d-header"
              expandIcon={<ExpandMore />}
            >
              <Typography style={{ width: "100%", textAlign: "center" }}>
                Certificates
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {data.cv.certificates.map((item, i) => {
                return <Typography key={i}>{item}</Typography>;
              })}
            </AccordionDetails>
          </Accordion>
        </Collapse>
      </List>
    </div>
  );
};
