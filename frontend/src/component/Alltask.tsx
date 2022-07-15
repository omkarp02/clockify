import axios from "axios";
import React, { Component, ReactElement } from "react";
import User from "./User";
import "./common.scss";
import TaskContext, { contextType } from "../context/TaskContext";
import { DateTime } from "luxon";
import { Navigate } from "react-router-dom";

type props = {};

type UserData = {
  _id: string;
  name: string;
};

type state = {
  ary: string[];
  userData: Array<UserData>;
  timeArr: number[];
  incMargin: number;
  onHover: boolean;
  displayTime: string;
};

export class AllTask extends Component<props, state> {
  static contextType = TaskContext;
  constructor(props: any) {
    super(props);
    this.state = {
      ary: [
        "",
        "10 am",
        "11 am",
        "12 am",
        "1 pm",
        "2 pm",
        "3 pm",
        "4 pm",
        "5 pm",
        "6 pm",
        "7 pm",
        "8 pm",
      ],
      timeArr: (this.context as contextType)?.utils.timeLineArray,
      userData: [],
      incMargin: 0,
      onHover: false,
      displayTime: DateTime.fromISO(new Date().toISOString()).toFormat(
        "h:mm a"
      ),
    };
  }

  async componentDidMount() {
    setInterval(() => {
      this.setState({ incMargin: this.state.incMargin + 7.5 });
    }, 600000);

    setInterval(() => {
      this.setState({displayTime: DateTime.fromISO(new Date().toISOString()).toFormat(
        "h:mm a"
      )});
    },60000);
    
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    let y = (hours % 10) * 45;
    let x = y + Math.round(minutes / 10) * 7.5;

    this.setState({ incMargin: x });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get("/api/user/getalluser", config);

    this.setState((state) => ({
      userData: data.user,
    }));
  }

  render() {
    console.log((this.context as contextType).utils.timeLineArray)
    console.log("i am at task")
    let arr: Array<ReactElement> = [];
    let arr2: Array<ReactElement> = [];
    for (let a of this.state.ary) {
      arr.push(
        <div key={a} className="text-center task-div">
          <b>{a}</b>
        </div>
      );
    }

    for (let b of this.state.userData) {
      arr2.push(
        <div key={b._id}>
          <div
            style={{ height: "45px", borderRight: "1px solid black" }}
            className="text-center"
          >
            {b.name}
          </div>
          <div className="container-div">
            <User _id={b._id} userId={(this.context as contextType).user._id} />
          </div>
        </div>
      );
    }

    return (
      (Object.keys((this.context as contextType).user).length !== 0) && <div className="container-fluid px-5" style={{ paddingTop: "50px" }}>
        <h2>Welcome, {(this.context as contextType).user.name} </h2>
        <div className="row my-5">
          <div className="col-md-1">{arr}</div>
          <div
            style={{
              marginTop: "45px",
              height: "495px",
              width: "80px",
              background: "white ",
            }}
          >
            <div
              style={{
                position: "absolute",
                height: "3px",
                width: "80vw",
                background: "#ff8c00",
                zIndex: "4000",
                marginTop: `${this.state.incMargin}px`,
              }}
            >
              <span className="timeLine">{this.state.displayTime}</span>
            </div>
          </div>
          <div className="col-md-10 d-flex">{arr2}</div>
        </div>
      </div> 
    );
  }
}

export default AllTask;
