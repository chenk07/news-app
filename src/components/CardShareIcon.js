import React, { Component } from "react";
import { MdShare } from "react-icons/md";
import { Modal } from 'react-bootstrap';
import { IconContext } from "react-icons";
import {
    EmailIcon,
    FacebookIcon,
    TwitterIcon,
    EmailShareButton,
    FacebookShareButton,
    TwitterShareButton
} from "react-share";
import { TWITTER_HASH_TAG, FB_HASH_TAG } from "../Constants";

export default class CardShareIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
    }

    handleClose = () => {
        this.setState({show: false});
    };
    handleShow = (e) => {
        e.preventDefault();
        this.setState({show: true});
    };

    render() {
        return (
            <IconContext.Provider value={{ className: "CardShareIcon" }}>
                <MdShare onClick={this.handleShow}/>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <h5> {this.props.data.title} </h5>
                    </Modal.Header>
                    <div className="ShareIconBody">
                        <Modal.Body>
                            <h5> Share via </h5>
                            <div className="row">
                                <div className="col">
                                    <FacebookShareButton
                                        url = {this.props.data.url}
                                        hashtag = {FB_HASH_TAG}
                                    >
                                        <FacebookIcon round/>
                                    </FacebookShareButton>
                                </div>
                                <div className="col">
                                    <TwitterShareButton
                                        url = {this.props.data.url}
                                        hashtags = {TWITTER_HASH_TAG}
                                    >
                                        <TwitterIcon round/>
                                    </TwitterShareButton>
                                </div>
                                <div className="col">
                                    <EmailShareButton
                                        url = {this.props.data.url}
                                        subject = {FB_HASH_TAG}
                                    >
                                        <EmailIcon round/>
                                    </EmailShareButton>
                                </div>
                            </div>
                        </Modal.Body>
                    </div>
                </Modal>
            </IconContext.Provider>
        );
    }
}
