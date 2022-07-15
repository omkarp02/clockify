import "./App.css";
import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Register from "./component/Register";
import Start from "./component/Start";
import AllTask from "./component/Alltask";
import TaskContext, { contextType } from "./context/TaskContext";
import axios from "axios";
import Navbar from "./component/Navbar";
import ProtectedRoutes from "./component/ProtectedRoutes";

type props = {};
type state = {
  throwError: boolean;
};
export class App extends Component<props, state> {
  static contextType = TaskContext;

  constructor(props: props) {
    super(props);

    this.state = {
      throwError: false,
    };
  }

  async componentDidMount() {
 
    (this.context as contextType).socket.on("databaseDisconnected", () => {
      console.log("i am disconnected");
      this.setState({ throwError: true });
    });
    const config = {headers: { "Content-Type": "application/json" },
    };
    let { data } = await axios.get("/api/user/me", config);

    (this.context as contextType).socket.emit("setup", data.user._id);

    (this.context as contextType).user = data.user;
  }

  render() {
    if (this.state.throwError) {
      throw new Error("database error Occured");
    }

    if (!(this.context as contextType).user) {
      (this.context as contextType).user = {};
    }

    return (
      <>
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/* <Route element={<ProtectedRoutes />}> */}
              <Route path="/start" element={<Start />} />
              <Route path="/alltask" element={<AllTask />} />
            {/* </Route> */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
