import axios from "axios";
import React, { Component } from "react";
import "./user.css";
import "./common.scss";
import { DateTime } from "luxon";
import TaskContext, { contextType } from "../context/TaskContext";
import { Utilities } from "./utilites";

type props = {
  _id: string;
  userId: string;
};

type TaskType = {
  createdAt: "";
  end: "";
  start: "";
  task: "";
  updatedAt: "";
  user: "";
  _id: "";
};

type state = {
  ary: number[];
  task: Array<TaskType>;
  change: boolean;
  change2: boolean;
  change3: boolean;
};

class User extends Component<props, state> {
  static contextType = TaskContext;
  constructor(props: any) {
    super(props);
    let utils = new Utilities()
    this.state = {
      ary: utils.timeLineArray,
      task: [],
      change: true,
      change2: true,
      change3: true,
    };
  }

  async componentDidMount() {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `/api/task/gettaskbyuser/${this.props._id}`,
      config
    );

    this.setState((state) => ({
      task: data.task,
    }));
  }

  async componentDidUpdate(prevProps: props, prevState: state) {
    if (this.state.task !== prevState.task) {
      (this.context as contextType).socket.on("recieved", (userTask: any) => {
        if (userTask.userId === this.props._id) {
          this.setState({ task: userTask.task });
        }
      });
    }
  }

  render() {
    let arr = [];
    let flag = true;
    for (let a of this.state.ary) {
      flag = true;
      for (let b of this.state.task) {
        if (new Date(b.start).getHours() === a) flag = false;
      }
      if (flag) {
        arr.push(<div className="common_div"></div>);
      } else {
        let span = [];
        let count = 0;
        for (let b of this.state.task) {
          if (new Date(b.start).getHours() === a) {
            if (new Date(b.end).getHours() - new Date(b.start).getHours() > 0) {
              let time = `${DateTime.fromISO(b.start).toFormat("h:mm")} to ${
                b.end ? DateTime.fromISO(b.end).toFormat("h:mm") : ""
              }`;
              let num =
                new Date(b.end).getHours() - new Date(b.start).getHours() + 1;
              span.push(
                <div
                  onClick={() => {
                    this.setState((state) => ({
                      change3: !state.change3,
                    }));
                  }}
                  style={{
                    background: "#C8C8C8",
                    border: "2px solid #f9fcfd",
                    boxSizing: "border-box",
                    position: "absolute",
                    width: "132px",
                    height: `${45 * num}px`,
                    textAlign: "center",
                    padding: "10px",
                    margin: "0 10px 5px 10px",
                    borderRadius: "5%",
                  }}
                >
                  <p
                    onClick={() => {
                      this.setState((state) => ({
                        change3: !state.change3,
                      }));
                    }}
                    className={this.state.change3 ? "p-style" : "display_none "}
                  >
                    {b.task}
                  </p>
                  <p
                    onClick={() => {
                      this.setState((state) => ({
                        change3: !state.change3,
                      }));
                    }}
                    className={this.state.change3 ? "display_none" : "p-second"}
                  >
                    {time}
                    <br></br>( {b.task})
                  </p>
                </div>
              );
            } else {
              let change = true;
              let time = `${new Date(b.start).getHours()}:${new Date(
                b.start
              ).getMinutes()} to ${
                b.end ? new Date(b.end).getHours() : ""
              }:${new Date(b.end).getMinutes()}`;
              span.push(
                <div className="mx-2 text-center style-div">
                  <p
                    onClick={() => {
                      this.setState((state) => ({
                        change: !state.change,
                      }));
                    }}
                    className={this.state.change ? "p-style" : "display_none"}
                  >
                    {b.task}
                  </p>

                  <p
                    onClick={() => {
                      this.setState((state) => ({
                        change: !state.change,
                      }));
                    }}
                    className={this.state.change ? "display_none" : "p-second"}
                  >
                    {time}
                  </p>
                </div>
              );
            }
            count += 1;
          }
        }

        if (count >= 2) {
          let time = [];
          let ary = [];
          let taskLength = this.state.task.length - 1;
          // let count = new Date(this.state.task[taskLength].end).getHours() - new Date(this.state.task[0].start).getHours()

          let end: number;
          for (let t of this.state.task) {
            if (new Date(t.start).getHours() === a) {
              end = new Date(t.end).getHours();
            }
          }
          let hourCount = end! - a;

          for (let t of this.state.task) {
            if (new Date(t.start).getHours() === a) {
              time.push(
                `${DateTime.fromISO(t.start).toFormat("h:mm")} to ${
                  t.end ? DateTime.fromISO(t.end).toFormat("h:mm") : ""
                }`
              );

              ary.push({
                time: `${DateTime.fromISO(t.start).toFormat("h:mm")} to ${
                  t.end ? DateTime.fromISO(t.end).toFormat("h:mm") : ""
                }`,
                task: t.task,
              });
            }
          }

          arr.push(
            <div className="common-div">
              <div
                style={{ height: `${45 * hourCount}px` }}
                className="mx-2 text-center double-div"
              >
                <p
                  onClick={() => {
                    this.setState((state) => ({
                      change2: !state.change2,
                    }));
                  }}
                  className={this.state.change2 ? "para" : "display_none"}
                >
                  Task +{count}
                </p>
                <div
                  onClick={() => {
                    this.setState((state) => ({
                      change2: !state.change2,
                    }));
                  }}
                  className={
                    this.state.change2 ? "display_none" : "expanding-div"
                  }
                >
                  {ary.map((e: any) => {
                    return (
                      <>
                        <p style={{ marginBottom: "0px", fontSize: "15px" }}>
                          {e.time}
                        </p>
                        <p style={{ marginBottom: "0px", fontSize: "15px" }}>
                          ({e.task})
                        </p>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        }
        if (count === 1) {
          arr.push(<div className="common-div">{span}</div>);
        }
      }
    }
    return <>{arr}</>;
  }
}
export default User;
