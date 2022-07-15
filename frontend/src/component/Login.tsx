import axios, { AxiosResponse } from "axios";
import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import FormLayout from "./FormLayout";
import "./common.scss";
import TaskContext, { contextType } from "../context/TaskContext";
import { UserType } from "./Start";

type props = {};

type state = {
  email: string;
  password: string;
  flag: boolean;
  redirect: boolean;
};


export class Login extends Component<props, state> {
  static contextType = TaskContext;

  constructor(props: props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      flag: false,
      redirect: false,
    };
  }

  async componentDidMount() {
    console.log(" i am at login");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let { data } = await axios.get("/api/user/me", config);
    if (data) {
      this.setState({ redirect: true });
    }
  }

  onChange = (e: any) => {
    this.setState((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  onSubmitHandler = async (e: any) => {
    e.preventDefault();
    let result = {
      email: this.state.email,
      password: this.state.password,
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data }:  {data: UserType} = await axios.post("/api/user/login", result, config);
      (this.context as contextType).user = data;

      this.setState((state) => ({
        flag: true,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        {this.state.redirect && <Navigate to="/start" />}
        {this.state.flag && <Navigate to="/start" />}
        <section className="vh-100">
          <div className="container text-center">
            <h1 className="form_header">Login Form</h1>
          </div>
          <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-9 col-lg-6 col-xl-5">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                  className="img-fluid"
                  alt="Sample image"
                />
              </div>
              <FormLayout
                onChange={this.onChange}
                submitHandler={this.onSubmitHandler}
                email={this.state.email}
                password={this.state.password}
                login={true}
              />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Login;
