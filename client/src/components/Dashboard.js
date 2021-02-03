import React from 'react';
import "../styles/Dashboard.css"
import {Button, FormControl, InputGroup} from "react-bootstrap";
import SingleProjectBox from "./SingleProjectBox";

const Dashboard = () => {
  return (
      <div className={"dashboardWrapper"}>
        <div className="topBar">
          <div className="searchBox">
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <svg width="1em" height="1em" viewBox="0 0 24 24" role="img" aria-hidden="true"
                       className="css-4e2775">
                    <path clipRule="evenodd"
                          d="M14.605 13.194l7 6.998a1 1 0 01-1.414 1.414h-.001l-6.997-7a7 7 0 111.412-1.412zM9 14A5 5 0 109 4a5 5 0 000 10z"/>
                  </svg>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                  placeholder="Enter project name"
                  aria-label="Project One"
              />
            </InputGroup>
          </div>
          <div className="newProjectBtn" style={{textAlign: "center"}}>
            <Button variant={"outline-secondary"}>
              New Project
            </Button>
          </div>
        </div>

        <div className="projectsWrapper">
          {
            sampleProjects.map((project) => (<SingleProjectBox project={project}/>))
          }
        </div>

      </div>
  );
};

export default Dashboard;

const sampleProjects = [{
  name: "Project 1"
}, {
  name: "Project 2"
}, {
  name: "Project HelloWorld"
}, {
  name: "GME 🚀"
}]
