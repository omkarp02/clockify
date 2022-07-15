import axios from "axios";
import React, { Component } from "react";
import { io, Socket } from "socket.io-client";
import { Utilities } from "../component/utilites";

interface ServerToClientEvents {
  recieved: (userTask: any) => void;
  databaseDisconnected: () => void;
}

interface ClientToServerEvents {
  hello: () => void;
  setup: (userTask: any) => void;
  task: (userTask: any) => void;
  check: ()=>void;

}

var socket: Socket<ServerToClientEvents, ClientToServerEvents>;
socket = io("http://localhost:4000");

type Appstate = {
  user: any;
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  utils:  Utilities
};

let defaultValue: Appstate = {
  user: {},
  socket: socket,
  utils: new Utilities()
};

export type contextType = Appstate

const TaskContext = React.createContext<contextType>(defaultValue);

type props = {
  children: React.ReactNode;
};

type state = {
  user: any;
  person: any;
};

export class TaskProvider extends Component<props, state> {

  utils = new Utilities()
  
  state: state = {
    user: {},
    person: {},
  };


   value = async ()=>{
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let { data } = await axios.get("/api/user/me", config);
    this.setState({user: data})
  } catch (error) {
      this.setState({user:error})
  }
  }

  

  render() {

    // this.value()
    
    
    const { user, person } = this.state;
    const { children } = this.props;
    const {utils} = this

    return (
      <TaskContext.Provider value={{ user, socket, utils }}>
        {children}
      </TaskContext.Provider>
    );
  }
}

export default TaskContext;
