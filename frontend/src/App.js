import { useEffect, useState } from "react";
import Navigation from "./components/Layout/Navigation/Navigation";
import { useSelector } from "react-redux";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Chat from "./components/Chat/Chat";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import { AppContext, socket } from "./context/appContext";
import store from "./store";
import { loadUser } from "./actions/authAction";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {

  const { isAuthenticated, user } = useSelector((state) => state.loadUser);  
    
    const [currentRoom, setCurrentRoom] = useState([]);
    const [members, setMembers] = useState([]);
    const [messages, setMessages] = useState([]);  


    useEffect(() => {   

      store.dispatch(loadUser());      
      
    }, []);

  return (
    <>
    <AppContext.Provider value={{ socket, currentRoom, setCurrentRoom, members, setMembers, messages, setMessages }}>

        
    <Router>      
      <Navigation isAuthenticated = {isAuthenticated} user={user} />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={ Register} />
        <ProtectedRoute exact path="/chat" component={Chat} />      




        

             

         

         


          
          
  



    

    </Switch>
      
      </Router>


      </AppContext.Provider>
      

    </>
  );
}

export default App;
