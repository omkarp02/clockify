import React, { Component, ContextType } from "react";
import { Navigate, Outlet } from "react-router-dom";
import TaskContext, { contextType } from "../context/TaskContext";



export class ProtectedRoutes extends Component {



  static contextType = TaskContext;



  isAuth =  () => {
    console.log((this.context as contextType).user)
   if (Object.keys((this.context as contextType).user).length !== 0) {
      console.log("true --------", (this.context as contextType).user);

      return true;
    } else {
      console.log("false --------", (this.context as contextType).user);
      return false;
    }

  };

  render() {
    return this.isAuth() ? <Outlet /> : <Navigate to="/" />;
  }
}

export default ProtectedRoutes;
