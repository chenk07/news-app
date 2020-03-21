import React, { Component } from "react";
import BounceLoader from "react-spinners/BounceLoader";
import {css} from "@emotion/core";

const override = css`
  border-color: red;
`;

class LoadingSpinner extends Component {
    render() {
        return (
            <div className="LoadingSpinner">
                <BounceLoader
                    css={override}
                    size={40}
                    color={"#123abc"}
                    loading={this.props.isLoading}
                />
                <h5>Loading</h5>
            </div>
        );
    }
}

export default LoadingSpinner;
