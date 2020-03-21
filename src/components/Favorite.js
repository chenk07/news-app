import React, { Component } from "react";
import { FAVORITE_ARTICLES } from "../Constants";
import {Container, Row} from "react-bootstrap";
import SmallContentCard from "./SmallContentCard";
import {toast, ToastContainer, Zoom} from "react-toastify";

class Favorite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favoriteData: {},
        };
    }

    componentDidMount() {
        console.log(JSON.parse(localStorage.getItem(FAVORITE_ARTICLES)));
        this.getFavoriteArticle();
    }

    getFavoriteArticle = () => {
        this.setState({
            favoriteData: JSON.parse(localStorage.getItem(FAVORITE_ARTICLES)) || {},
        });
    };

    handleUnFavorite = (event, data) => {
        event.preventDefault();
        toast(`Removing ${data.title}`);
        let obj = JSON.parse(localStorage.getItem(FAVORITE_ARTICLES));
        delete obj[data.id];
        localStorage.setItem(FAVORITE_ARTICLES, JSON.stringify(obj));
        this.getFavoriteArticle();
    };

    render() {
        const data = this.state.favoriteData;

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

                <div className="FavoriteDisplay">
                    { Object.keys(data).length > 0 ? (
                        <div>
                            <h4 className="FavoriteDisplayTitleWithResults">
                                Favorites
                            </h4>
                            <Container fluid>
                                <Row>
                                    { Object.keys(data).map((key, i) => {
                                        return <SmallContentCard data={data[key]}
                                                                 key={data[key].id}
                                                                 sourceType={data[key].sourceType}
                                                                 isFavorPage={true}
                                                                 handleUnFavorite={this.handleUnFavorite}
                                        />
                                    })}
                                </Row>
                            </Container>
                        </div>
                    ) : (
                        <h4 className="FavoriteDisplayTitleWithNoResults">
                            You have no saved articles
                        </h4>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default Favorite;
