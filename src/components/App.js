import React, { Component } from "react";
import TopNavbar from "./TopNavbar";
import Main from "./Main";
import { GUARDIAN } from "../Constants";
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceType: localStorage.getItem('sourceType') || GUARDIAN,
    };
  }

  componentDidMount() {
    document.title = "CSCI 571 NewsApp"
  }

  handleChangeSourceType = (val) => {
    this.setState({sourceType: val});
  };

  render() {
    return (
      <div className="App">
        <TopNavbar
            handleChangeSourceType={this.handleChangeSourceType}
            sourceType={this.state.sourceType}
        />
        <Main sourceType={this.state.sourceType}/>
      </div>
    );
  }
}

export default App;
