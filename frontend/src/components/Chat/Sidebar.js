import React, { useContext, useEffect } from 'react';
import { Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../context/appContext";
import "./Sidebar.css";

const Sidebar=()=>
{

  const { user } = useSelector((state) => state.loadUser);  

  const { socket, setMembers, members, setCurrentRoom, currentRoom } = useContext(AppContext);

  function joinRoom(room) {

    if (!user) {
        return alert("Please login");
    }
    socket.emit("join-room", room, currentRoom);
    setCurrentRoom(room);  
}

useEffect(() => {

  if (user) {     
          
      socket.emit("new-user");
  }

}, [user, socket]);

socket.off("new-user").on("new-user", (payload) => {  
  setMembers(payload);
});

function orderIds(id1, id2) {
  if (id1 > id2) {
      return id1 + "-" + id2;
  } else {
      return id2 + "-" + id1;
  }
}

function handlePrivateMemberMsg(member) {  
  const roomId = orderIds(user._id, member._id);
  joinRoom(roomId);
}

  return (<>
    <h2>Members</h2>
    <ListGroup>
    {members.map((member) => (
                <ListGroup.Item key={member.id}  style={{ cursor: "pointer" }} onClick={() => handlePrivateMemberMsg(member)} disabled={member._id === user._id} >

                    <Row>                     

                        <Col xs={9}>
                            {member.name}
                            {member._id === user?._id && " (You)"}                            
                        </Col>
                        
                    </Row>
                    
                </ListGroup.Item>
            ))}
    </ListGroup>
  </>);

}

export default Sidebar;
