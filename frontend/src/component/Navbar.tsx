import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import TaskContext, { contextType } from "../context/TaskContext";
import "./common.scss";

type props = {};

type state = {
  avatar: any;
  avatarPreview: any;
  userImage: any;
};

export class Navbar extends Component<props, state> {
  static contextType = TaskContext;

  constructor(props: props) {
    super(props);

    this.state = {
      avatar: "",
      avatarPreview: "",
      userImage:
        "https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=500w",
    };
  }

  logout = async () => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    await axios.get("/api/user/logout", config);

    (this.context as contextType).user = {};
  };

  onChange = (e: any) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({
          avatarPreview: reader.result,
        });
      }
    };

    reader.readAsDataURL(e.target.files[0]);
    this.setState({ avatar: e.target.files[0] });
  };

  async componentDidMount() {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    };
    let data;
    try {
      data = await axios.get("/api/user/get-image", config);
      if (data.status === 200)
        this.setState({ userImage: "/api/user/get-image" });
    } catch (error) {
      console.log(error);
    }
  }

  submitHandler = async (e: any) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("avatar", this.state.avatar);
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axios.post(
        "/api/user/user-image",
        formData,
        config
      );
      this.setState({ userImage: this.state.avatarPreview });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <>
        <nav
          className="navbar navbar-expand-lg navbar-light bg-light"
          style={{ position: "sticky", top: "0", zIndex: "40000" }}
        >
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link to="/" className="nav-link">
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/alltask" className="nav-link">
                  All Task
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/start" className="nav-link">
                  Start
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" onClick={this.logout} className="nav-link">
                  Logout
                </Link>
              </li>
            </ul>
          
            <div className="dropdown" style={{ right: "30px" }}>
              <button
                className="btn btn-light dropdown-toggle"
                type="button"
                id="dropdownMenu2"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              ></button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                <button
                  type="button"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  className="dropdown-item"
                >
                  Edit Profile
                </button>
              </div>
            </div>
            <img
              src={this.state.userImage}
              className="profileImage"
              alt=""
              style={{ position: "relative", right: "38px" }}
            />

            <div
              className="modal fade"
              id="exampleModal"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Edit or Upload Profile Image
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form
                      onSubmit={this.submitHandler}
                      encType="multipart/form-data"
                    >
                      <div className="form-outline mb-4">
                        <img
                          className="profileImage"
                          src={this.state.avatarPreview}
                        />
                        <input
                          type="file"
                          name="avatar"
                          onChange={this.onChange}
                        />
                      </div>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Save changes
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;
