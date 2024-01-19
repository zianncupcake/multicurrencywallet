
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import NavComponent from "../components/NavComponent";
import ProfileComponent from "../components/ProfileComponent";
import axios from "axios"


const ProfilePage = () => {

    const getUser = async (userid) => {
        const { data } = await axios.get(`http://localhost:8000/Users/${userid}`);
        return data;
      };
    
      const editUser = async (userid, formInputs) => {
        const { data } = await axios.put(`http://localhost:8000/Users/${userid}`, {...formInputs});
        return data;
      };    
  
    const { id } = useParams();
  
    return (
      <Row style={{ height: "900px" }}>
        <Col md={2} style={{paddingLeft:"40px", paddingRight:"0px"}} >
          <Row className="h-100" >
          <NavComponent userid={id}  />
          </Row>
        </Col>
  
        <Col md={10} className="px-5">
            <Row className="h-100" >
                <ProfileComponent getUser={getUser} editUser={editUser} userid={id} />
            </Row>
        </Col>
      </Row>
    );
  };
  
  export default ProfilePage;
  