import React, { Component } from "react";
import { FaTrash } from "react-icons/fa";
import { IconContext } from "react-icons";

export default class UnFavoriteIcon extends Component {

    handleClick = (e) => {
        e.preventDefault();
    };

    render() {
        return (
            <IconContext.Provider value={{ className: "CardShareIcon" }}>
                <FaTrash onClick={this.handleClick}/>
            </IconContext.Provider>
        );
    }
}
