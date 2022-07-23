import React, { Component } from "react";
import { Transition } from "react-transition-group";

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

class App extends Component {
  state = { modalOpen: false, blockShow: false };

  modalShow = () => {
    this.setState({ modalOpen: true });
  };
  modalClose = () => {
    this.setState({ modalOpen: false });
  };
  render() {
    return (
      <div className="App">
        <h1>React Animations</h1>
        <button
          onClick={() =>
            this.setState((prevState) => ({
              blockShow: !prevState.blockShow,
            }))
          }
          className="Button"
        >
          Toggle
        </button>
        <br />
        <br />
        <Transition
          in={this.state.blockShow}
          timeout={700}
          mountOnEnter
          unmountOnExit
          onEnter={() => console.log("do this")}
          onEntered={() => console.log("do this ed")}
          onEntering={() => console.log("do this ing")}
          onExit={() => console.log("left the building")}
          onExited={() => console.log("do after left the building")}
          onExiting={() => console.log("did during exit")}
        >
          {(state) => (
            <div
              style={{
                backgroundColor: "red",
                width: 100,
                height: 100,
                margin: "auto",
                transition: "opacity 1s ease-out",
                opacity: state === "exiting" ? 0 : 1,
              }}
            ></div>
          )}
        </Transition>

        <Modal show={this.state.modalOpen} closed={this.modalClose} />

        {this.state.modalOpen ? (
          <Backdrop show closed={this.modalClose} />
        ) : null}
        <button className="Button" onClick={this.modalShow}>
          Open Modal
        </button>
        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

export default App;
