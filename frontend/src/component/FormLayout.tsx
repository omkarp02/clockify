import React, { Component } from "react";
import { Link } from "react-router-dom";
import './common.scss'

type props = {
  submitHandler: (e: any) => void;
  onChange: (a: any) => void;
  //   logMessage: (message: string) => void;

  email: string;
  name?: string;
  password: string;
  login?: boolean;
  cpassword?:string;
};

type state = {};

class FormLayout extends Component<props, state> {
  render() {
    return (
      <>
        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 ">
          <form onSubmit={this.props.submitHandler} style={{width:"335px"}}>
            {/* ----------------------------------------common form ------------------------------------------------------- */}
            {/* <!-- Email input --> */}
            <div className="form-outline mb-4">
              <input
                type="email"
                id="form3Example3"
                className="form-control form-control-lg"
                placeholder="Enter a valid email address"
                onChange={this.props.onChange}
                name="email"
                value={this.props.email}
              />
              <label className="form-label" htmlFor="form3Example3">
                Email address
              </label>
            </div>

            {/* <!-- Password input --> */}
            <div className="form-outline mb-3">
              <input
                type="password"
                id="form3Example4"
                className="form-control form-control-lg"
                placeholder="Enter password"
                onChange={this.props.onChange}
                name="password"
                value={this.props.password}
              />
              <label className="form-label" htmlFor="form3Example4">
                Password
              </label>
            </div>
            {/* ----------------------------------------common form ends here ------------------------------------------------------- */}
            {/* --------------------------------------------------regiter extra component--------------------------------------- */}
            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
              <div className="form-outline flex-fill mb-0">
                <input
                  type="text"
                  id="form3Example1c"
                  className={this.props.login ? "d-none" : "form-control"}
                  onChange={this.props.onChange}
                  name="name"
                  value={this.props.name}
                />
                <label
                  className={this.props.login ? "d-none" : "form-label"}
                  htmlFor="form3Example1c"
                >
                  Your Name
                </label>
              </div>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fas fa-key fa-lg me-3 fa-fw"></i>
              <div className="form-outline flex-fill mb-0">
                <input
                  type="password"
                  id="form3Example4cd"
                  className={this.props.login ? "d-none" : "form-control"}
                  onChange={this.props.onChange}
                  name="cpassword"
                  value={this.props.cpassword}
                />
                <label
                  className={this.props.login ? "d-none" : "form-label"}
                  htmlFor="form3Example4cd"
                >
                  Repeat your password
                </label>
              </div>
            </div>

            {/* --------------------------------------------------regiter extra component ends here--------------------------------------- */}

            {/* -----------------------------------------------------common button -------------------------------------------- */}
            <div className="text-center text-lg-start mt-4 pt-2">
              <button
                type="submit"
                className="btn btn-primary btn-lg btn_padding"
                
              >
                {this.props.login ? "Login" : "Register"}
              </button>
              {/* -----------------------------------------------------common button -------------------------------------------- */}

              <p
                className={
                    this.props.login ? "small fw-bold mt-2 pt-1 mb-0" : "d-none"
                }
              >
                Don't have an account?{" "}
                <Link to="/register" className="link-danger">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default FormLayout;
