import React, { Component } from "react";
import {Card, Image, Row, Col } from "react-bootstrap";
import CardShareIcon from "./CardShareIcon";
import nytLogo from "../assets/img/nytLogo.jpg";
import guardianLogo from "../assets/img/guardianLogo.png";
import { NYT } from "../Constants";
import Badge from "./Badge";


export default class ContentCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageSrc: this.props.data.image
        };
    }

    componentWillReceiveProps(nextProps) {
        const src = nextProps.data.image;
        if (src !== this.state.imageSrc) {
            this.setState({
                imageSrc: src
            });
        } else {
            return null;
        }
    }

    handleImgLoadError = () => {
        const defaultSrc = this.props.data.source === NYT ? nytLogo : guardianLogo;
        this.setState({
            imageSrc: defaultSrc
        });
    };

    render() {
        const detailedArticleUri = "/article?id=" + this.props.data.id;
        console.log(detailedArticleUri);

        return (
            <Card className="ContentCard">
                <a className="text-decoration-none" href={detailedArticleUri}>
                    <div className="row no-gutters ContentBody">
                        <Row>
                            <Col md={4}>
                                <Image src={this.state.imageSrc}
                                       alt=""
                                       onError={this.handleImgLoadError}
                                       key={this.state.imageSrc}
                                       thumbnail
                                />
                            </Col>
                            <Col md={8}>
                                <h5 className="card-title font-weight-bold font-italic">
                                    {this.props.data.title + " "}
                                    <CardShareIcon data={this.props.data} />
                                </h5>
                                <p className="card-text line-clamp-3">
                                    {this.props.data.description}
                                </p>
                                <p className="card-text font-italic">
                                    {this.props.data.date}
                                    <span className="float-right">
                                        <Badge section={this.props.data.section} />
                                    </span>
                                </p>
                            </Col>
                        </Row>
                    </div>
                </a>
            </Card>
        );
    }
}
