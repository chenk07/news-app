import React, { Component } from "react";
import { Card, Image, Row, Col, Accordion, Button } from "react-bootstrap";
import nytLogo from "../assets/img/nytLogo.jpg";
import guardianLogo from "../assets/img/guardianLogo.png";
import { NYT, FAVORITE_ARTICLES } from "../Constants";
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    TwitterIcon,
    TwitterShareButton
} from "react-share";
import { FaRegBookmark, FaBookmark, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';
import scrollToComponent from 'react-scroll-to-component';
import { TWITTER_HASH_TAG, FB_HASH_TAG } from "../Constants";
import {ToastContainer, toast, Zoom} from 'react-toastify';


class DetailedArticleCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageSrc: "",
            isCollapse: true,
            fullSummary: "",
            isFavorite: false,
        };
    }

    componentDidMount() {
        const localStorageData = JSON.parse(localStorage.getItem(FAVORITE_ARTICLES));
        const isFavorite = localStorageData &&
                            localStorageData.hasOwnProperty(this.props.data.id);
        console.log(this.props.data);
        this.setState({
            imageSrc: this.props.data.image,
            fullSummary: this.props.data.description,
            isFavorite: isFavorite,
        });
    }

    handleImgLoadError = () => {
        const defaultSrc = this.props.data.source === NYT ? nytLogo : guardianLogo;
        this.setState({
            imageSrc: defaultSrc
        });
    };

    handleToggle = () => {
        this.setState({
            isCollapse: !this.state.isCollapse,
        });
        if (this.state.isCollapse) {
            setTimeout(()=> {
                scrollToComponent(this.Start, { offset: -100, align: 'top', duration: 1000});
            }, 200);
        } else {
            setTimeout(()=> {
                scrollToComponent(this.Top, { offset: -100, align: 'top', duration: 200});
            }, 150);
        }
    };

    handleBookmark = () => {
        this.state.isFavorite ?
            this.removeFavorite() :
            this.saveFavorite();
        this.setState({
            isFavorite: !this.state.isFavorite
        });
        setTimeout(()=> {
            ReactTooltip.rebuild();
        }, 500);
    };

    removeFavorite = () => {
        let obj = JSON.parse(localStorage.getItem(FAVORITE_ARTICLES));
        delete obj[this.props.data.id];
        localStorage.setItem(FAVORITE_ARTICLES, JSON.stringify(obj));
        toast(`Removing ${this.props.data.title}`);
    };

    saveFavorite = () => {
        let obj = JSON.parse(localStorage.getItem(FAVORITE_ARTICLES)) || {};
        obj[this.props.data.id] = this.props.data;
        localStorage.setItem(FAVORITE_ARTICLES, JSON.stringify(obj));
        toast(`Saving ${this.props.data.title}`);
    };

    getFirst4SentenceIndex = (desc) => {
        let cnt = 0;
        let i;
        for (i = 0; i < desc.length - 1 && cnt < 4; i++) {
            if ( desc.charAt(i).match(/[.?!]/) && desc.charAt(i + 1).match(/[\s"\u201d]/)) {
                console.log(desc.substring(i - 7, i + 1));
                cnt++;
                console.log(cnt);
                console.log(i);
            }
        }
        return i + 1;
    };

    render() {
        const index = this.getFirst4SentenceIndex(this.state.fullSummary);
        const isMoreDescToShow = (index < this.state.fullSummary.length);

        return (
            <div>
                <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={true}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                    transition={Zoom}
                    toastClassName='BookMarkNotify'
                />
            <Card className="DetailedArticleCard">
                <div className="DetailedArticleCardBody">
                    {/*<section className='top' ref={(section) => { this.Top = section; }}>*/}
                        <h3 className="DetailedArticleCardTitle font-italic" >
                            {this.props.data.title + " "}
                        </h3>
                    {/*</section>*/}

                    <div className="DetailedArticleCardDate">
                        <Row noGutters>
                            <Col xs={5} md={8}>
                                <p className="card-text font-italic">
                                    {this.props.data.date}
                                </p>
                            </Col>
                            <Col xs={4} md={3}>
                                <Row className="DetailedArticleCardShare" noGutters>
                                    <FacebookShareButton
                                        url = {this.props.data.url}
                                        hashtag = {FB_HASH_TAG}
                                    >
                                        <FacebookIcon size={26} round data-tip="Facebook" data-for="fb"/>
                                        <ReactTooltip id="fb"/>
                                    </FacebookShareButton>
                                    <TwitterShareButton
                                        url = {this.props.data.url}
                                        hashtags = {TWITTER_HASH_TAG}
                                    >
                                        <TwitterIcon size={26} round data-tip="Twitter" data-for="twt"/>
                                        <ReactTooltip id="twt"/>
                                    </TwitterShareButton>
                                    <EmailShareButton
                                        url = {this.props.data.url}
                                        subject = {FB_HASH_TAG}
                                    >
                                        <EmailIcon size={26} round data-tip="Email" data-for="email"/>
                                        <ReactTooltip id="email"/>
                                    </EmailShareButton>
                                </Row>
                            </Col>
                            <Col xs={3}  md={1} className="DetailedArticleCardShare">
                                { this.state.isFavorite ? (
                                    <FaBookmark className="BookMarkRed"
                                                data-tip="Bookmark"
                                                data-for="bookmark"
                                                onClick={this.handleBookmark}
                                    />
                                ) : (
                                    <FaRegBookmark className="BookMarkRed"
                                                data-tip="Bookmark"
                                                data-for="bookmark"
                                                onClick={this.handleBookmark}
                                    />
                                    )
                                }
                                <ReactTooltip id="bookmark"/>
                            </Col>
                        </Row>
                    </div>

                    <Image
                        src={this.state.imageSrc}
                        alt=""
                        onError={this.handleImgLoadError}
                        key={this.state.imageSrc}
                    />

                    <Accordion>
                        <section className='top' ref={(section) => { this.Top = section; }}>
                            <p>
                                {this.state.fullSummary.substring(0, index)}
                            </p>
                        </section>

                        <Accordion.Collapse eventKey="0" >
                            <section className='start' ref={(section) => { this.Start = section; }}>
                                {this.state.fullSummary.substring(index)}
                            </section>
                        </Accordion.Collapse>

                        {isMoreDescToShow ? (
                            <Accordion.Toggle as={Button}
                                              variant="link"
                                              eventKey="0"
                                              className="DetailedArticleCardToggle"
                                              onClick={this.handleToggle}
                            >
                                {this.state.isCollapse ? <FaChevronDown /> : <FaChevronUp />}
                            </Accordion.Toggle>
                        ) : null
                        }
                    </Accordion>
                </div>
            </Card>
            </div>
        );
    }
}

export default DetailedArticleCard;
