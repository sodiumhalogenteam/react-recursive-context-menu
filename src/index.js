import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

import Button from "./Button";
import ContextMenu from "./ContextMenu";

const options = [
  {
    id: 1,
    text: "option 1",
    func: () => {
      console.log("option 1 chosen");
    }
  },
  {
    id: 2,
    text: "option 2",
    func: () => {
      console.log("option 2 chosen");
    }
  },
  {
    id: 3,
    text: "option 3",
    func: () => null,
    options: [
      {
        id: 4,
        text: "suboption 1",
        func: () => {
          console.log("suboption 1 chosen");
        }
      }
    ]
  }
];

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Context Menu</h1>
        <ContextMenu options={options} position="bottom">
          <Button text="Open Menu" />
        </ContextMenu>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
