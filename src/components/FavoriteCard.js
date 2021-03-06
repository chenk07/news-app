import React, { Component } from "react";
import {Card, Image, Col } from "react-bootstrap";
import CardShareIcon from "./CardShareIcon";
import nytLogo from "../assets/img/nytLogo.jpg";
import guardianLogo from "../assets/img/guardianLogo.png";
import { NYT, FAVORITE_ARTICLES } from "../Constants";
import Badge from "./Badge";


class FavoriteCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageSrc: this.props.data.image
        };
    }

    componentWillReceiveProps(nextProps) {
        const src = nextProps.data.image;
        if (src !== this.state.imageSrc) {
            this.setState({imageSrc: src});
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
        return (
            <Col xs={12} sm={6} md={4} lg={4} xl={3}>
                <Card className="SmallContentCard">
                    <a className="text-decoration-none" href={detailedArticleUri}>
                        <div className="SmallContentBody">
                            <h6 className="SmallContentCardTitle font-weight-bold font-italic">
                                {this.props.data.title + " "}
                                <CardShareIcon data={this.props.data}/>
                            </h6>
                            <Image
                                src={this.state.imageSrc}
                                alt=""
                                onError={this.handleImgLoadError}
                                key={this.state.imageSrc}
                                thumbnail
                            />
                            <div className="SmallContentCardDate">
                                <p className="card-text font-italic">
                                    {this.props.data.date}
                                    <Badge section={this.props.data.section} />
                                </p>
                            </div>
                        </div>
                    </a>
                </Card>
            </Col>
        );
    }
}

export default FavoriteCard;
