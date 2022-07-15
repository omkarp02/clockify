import React, { Component } from "react";
import { DateTime } from "luxon";

type props = {
  time: string;
  task: string;
  end: string;
};

export class TimeDisplay extends Component<props> {

//   const date1 = luxon.DateTime.fromISO("2020-09-06T12:00")
// const date2 = luxon.DateTime.fromISO("2019-06-10T14:00")

// const diff = date1.diff(date2, ["years", "months", "days", "hours"])
  render() {
   let start = DateTime.fromISO(this.props.time)
   let end = DateTime.fromISO(this.props.end)

   let diff = end.diff(start,["minutes"]).toFormat("h:mm")


   

    return (
      <>
        <p style={{ marginBottom: "0", marginTop: "10px", color: "rgb(0, 150, 255)" }}>
          {start.toFormat("h:mm")} to{" "}
          {this.props.end && (
            <>{end.toFormat("h:mm")}</>
          )}
          {this.props.end &&
            ` ( ${diff} )`}
        </p>
        <p
          style={{ marginBottom: "10px", fontSize: "17px", fontWeight: "500" }}
        >
          {this.props.task}
        </p>
      </>
    );
  }
}

export default TimeDisplay;
