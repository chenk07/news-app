import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import DetailedArticleCard from "./DetailedArticleCard";
import {BACKEND_ROOT, GUARDIAN, NYT} from "../Constants";
import LoadingSpinner from "./LoadingSpinner";
import CommentBox from "./CommentBox";


class DetailedArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            data: [],
            id: this.props.location.search.slice(4),
        };
    }

    fetchData = () => {
        this.setState({isLoading: true});
        let url = BACKEND_ROOT + GUARDIAN + "/article?id=" + this.state.id;
        if (this.state.id.startsWith("http")) {
            url = BACKEND_ROOT + NYT + "/article?id=" + this.state.id;
        }

        fetch(url)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    data: json["response"][0],
                    isLoading: false,
                });
                // console.log(json["response"][0]);
            });
    };

    componentDidMount() {
        // console.log(this.props.location.search.slice(4));
        this.fetchData();
    }

    render() {
        console.log(this.state.data);
        return (
            <div className="DetailedArticle">
                {this.state.isLoading ?
                    (<LoadingSpinner isLoading={this.state.isLoading} />
                    ) : (
                        <div>
                            <DetailedArticleCard data={this.state.data} />
                            <CommentBox articleId={this.state.id}/>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default withRouter(DetailedArticle);
