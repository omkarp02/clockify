import axios, { AxiosResponse, AxiosResponseHeaders } from "axios";
import React, { Component } from "react";
import TimeDisplay from "./TimeDisplay";
import "./common.scss";
import TaskContext, { contextType } from "../context/TaskContext";
import { Navigate } from "react-router-dom";

type props = {};

export type UserType = {
  createdAt?: string;
  email?: string;
  name?: string;
  password?: string;
  updatedAt?: string;
  _id?: string;
};

const user: UserType = {
  createdAt: "",
  email: "",
  name: "",
  password: "",
  updatedAt: "",
  _id: "",
};

type state = {
  user: UserType;
  time: string;
  flag: boolean;
  text: string;
  task: any;
  updatedData: any;
  end: boolean;
};

export class Start extends Component<props, state> {
  static contextType = TaskContext;

  constructor(props: any) {
    super(props);

    var today = new Date();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var date =
      today.getFullYear() +
      " " +
      monthNames[today.getMonth() + 1] +
      " " +
      today.getDate();
    var d = date.toString();

    this.state = {
      user: {},
      time: d,
      flag: false,
      text: "",
      task: [],
      updatedData: {},
      end: false,
    };
  }

  async componentDidMount() {
    console.log("i am at start");
    
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let { data } = await axios.get("/api/user/me", config);
    (this.context as contextType).user = data.user;

    try {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      };
      let data: AxiosResponse<{ success: boolean; user: UserType }>;
      if (Object.keys(this.state.user).length === 0) {
        data = await axios.get("/api/user/me", config);

        const data3 = await axios.get(
          `/api/task/gettaskbyuser/${data?.data.user._id}`,
          config
        );

        this.setState((state) => ({
          user: data.data.user,
          task: data3.data.task,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  }

  onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let result = {
      task: this.state.text,
      start: new Date(),
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let data: any;
      if (!this.state.flag) {
        data = await axios.post("/api/task/add", result, config);
        this.setState((state) => ({
          updatedData: data,
          flag: !state.flag,
        }));
      } else {
        let updateresult = {
          _id: this.state.updatedData.data.task._id,
          end: new Date(),
        };
        data = await axios.put("/api/task/update", updateresult, config);
        data = await axios.post("/api/task/add", result, config);
        this.setState((state) => ({
          updatedData: data,
        }));
      }

      const id = (this.context as contextType).user._id;
      const data3 = await axios.get(`/api/task/gettaskbyuser/${id}`, config);

      (this.context as contextType).socket.emit("task", {
        task: data3.data.task,
        userId: id,
      });

      this.setState((state) => ({
        text: "",
        task: data3.data.task,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  endHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    this.setState((state) => ({
      end: true,
    }));
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let length = this.state.task.length - 1;
    let updateresult = {
      _id: this.state.task[length]._id,
      end: new Date(),
    };
    let data = await axios.put("/api/task/update", updateresult, config);
    const id = (this.context as contextType).user._id;

    const data3 = await axios.get(`/api/task/gettaskbyuser/${id}`, config);

    this.setState((state) => ({
      text: "",
      task: data3.data.task,
    }));
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState((state) => ({ text: e.target.value }));
  };

  render() {
    let arr = [];
    for (let a of this.state.task) {
      arr.push(
        <TimeDisplay key={a._id} time={a.start} task={a.task} end={a.end} />
      );
    }
    return (
      // 
     (Object.keys((this.context as contextType).user).length !== 0) ?
      <div className="container m-4">
      <h2 className="py-2">
        Welcome, {(this.context as contextType).user.name}{" "}
       
      </h2>
      <div className="start_div">
        <h5>
          <b>Today, {this.state.time} </b>
        </h5>
      </div>
      <div className="content-div">{arr}</div>
      <div>
        <form onSubmit={this.onSubmitHandler}>
          {/* <!-- Email input --> */}
          <div className="form-div">
            <input
              type="text"
              id="form3Example3"
              className=""
              required
              placeholder="What are you working on?"
              onChange={this.onChange}
              value={this.state.text}
            />
            <button type="submit" disabled={this.state.end}>
              Save
            </button>
            <button
              type="button"
              onClick={this.endHandler}
              style={{
                color: "red",
                marginLeft: "10px",
              }}
            >
              End
            </button>
          </div>
        </form>
      </div>
    </div>:<Navigate to="/" />
     
    );
  }
}

export default Start;
