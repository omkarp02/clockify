import axios from "axios";
import React, { Component } from "react";
import FormLayout from "./FormLayout";

type props = {};

type state = {
  name: string;
  email: string;
  password: string;
  cpassword: string;
};

export class Register extends Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      cpassword: "",
    };
  }

  onChange = (e: any) => {
    this.setState((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  onSubmitHandler = async (e: any) => {
    e.preventDefault();

    try {
      let result = {
        email: this.state.email,
        name: this.state.name,
        password: this.state.password
      };
      console.log(result);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post("/api/user/register", result, config);
      this.setState({
        name: "",
        email: "",
        password: "",
        cpassword: "",
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <section className="vh-100" style={{ backgroundColor: " #eee" }}>
          <div className=" h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div
                  className="card text-black"
                  style={{ borderRadius: "25px" }}
                >
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                          Sign up
                        </p>

                        <FormLayout
                          onChange={this.onChange}
                          submitHandler={this.onSubmitHandler}
                          email={this.state.email}
                          password={this.state.password}
                          name={this.state.name}
                          cpassword={this.state.cpassword}
                        />
                      </div>
                      <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                          className="img-fluid"
                          alt="Sample image"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Register;


