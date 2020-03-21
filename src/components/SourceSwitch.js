import React, { Component } from "react";
import Switch from "react-switch";
import { Nav, Navbar} from "react-bootstrap";
import '../styles/SourceSwitch.css';
import { GUARDIAN, NYT } from "../Constants";

export default class SourceSwitch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.sourceType !== NYT,
            sourceType: this.props.sourceType
        };
    }

    handleChange = (checked) => {
        this.setState({ checked });
        const source = checked ? GUARDIAN : NYT;
        this.props.handleChangeSourceType(source);
        localStorage.setItem('sourceType', source);
    };

    render() {
        return (
            <div className="SourceSwitch">
                <Nav>
                    <Navbar.Brand>NYTimes</Navbar.Brand>
                    <Switch
                        onChange={this.handleChange}
                        checked={this.state.checked}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        onColor="#5796E5"
                        offColor="#DDDDDD"
                        className="topSwitch"
                        height={25}
                        width={50}
                    />
                    <Navbar.Brand>Guardian</Navbar.Brand>
                </Nav>
            </div>
        );
    }
}
