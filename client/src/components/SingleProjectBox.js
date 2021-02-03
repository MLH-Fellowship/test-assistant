import React from 'react';
import {Button, Card} from "react-bootstrap";

const SingleProjectBox = ({project}) => {
  return (
      <Card style={{margin:"15px 0"}} className={"projectBox"}>
        <div className="projectBoxName">
          <p style={{fontSize:"21px", margin:"10px"}}>{project.name}</p>
        </div>

        <div className="projectBoxDelBtn" style={{textAlign:"center", margin:"10px 0"}}>
          <Button variant={"outline-danger"}>Delete</Button>
        </div>

        <div className="projectBoxEditBtn" style={{textAlign:"center", margin:"10px 0"}}>
          <Button variant={"outline-dark"}>Edit</Button>
        </div>
      </Card>
  );
};

export default SingleProjectBox;
