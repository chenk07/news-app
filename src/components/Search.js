import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import SmallContentCard from "./SmallContentCard";
import { Container, Row } from "react-bootstrap";
import LoadingSpinner from "./LoadingSpinner";
import { BACKEND_ROOT, GUARDIAN, NYT } from "../Constants";


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            guardianData: [],
            nytData: [],
            keyword: ""
        };
    }

    fetchData = async (keyword) => {
        try {
            console.log(keyword);
            this.setState({isLoading: true});
            const nytUrl = BACKEND_ROOT + NYT + "/search/" + keyword;
            const guardianUrl = BACKEND_ROOT + GUARDIAN + "/search/" + keyword;
            const guardianRes = await fetch(guardianUrl);
            const nytRes = await fetch(nytUrl);
            const guardianJson = await guardianRes.json();
            const nytJson = await nytRes.json();

            const guardianJsonLen = guardianJson["response"].length;
            this.setState({
                guardianData: guardianJson["response"].slice(0, 5),
                nytData: nytJson["response"].slice(0, 10 - Math.min(guardianJsonLen, 5)),
                keyword: keyword,
                isLoading: false,
            });

            console.log(guardianJson);
            console.log(nytJson);
        } catch (error) {
            console.error(`Error fetching search ${keyword}`);
        }
    };

    componentDidMount() {
        if (!this.props.location.search.startsWith("?q=")) {
            alert("Invalid search keyword!");
        } else {
            this.fetchData(this.props.location.search.slice(3));
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.location.search.startsWith("?q=")) {
            alert("Invalid search keyword!");
        } else {
            const keyword = nextProps.location.search.slice(3);
            if (keyword !== this.state.keyword) {
                this.fetchData(keyword);
            } else {
                return null;
            }
        }
    }

    render() {
        const withSearchResult = (this.state.guardianData.length + this.state.nytData.length) > 0;
        return (
            <div className="SearchDisplay">
                {this.state.isLoading ? null : (
                    withSearchResult ? (
                        <h4 className="SearchDisplayTitleWithResults">
                            Results
                        </h4>
                    ) : (
                        <h4 className="SearchDisplayTitleWithNoResults">
                            No Results
                        </h4>
                    )
                )}
                <div>
                    {this.state.isLoading ?
                        (<LoadingSpinner isLoading={this.state.isLoading}/>
                        ) : (
                            <Container fluid>
                                <Row>
                                    {this.state.guardianData.map((obj, i) => {
                                        return <SmallContentCard data={obj}
                                                                 key={obj.id}
                                                                 sourceType={GUARDIAN}
                                                                 isFavorPage={false}
                                        />
                                    })}
                                    {this.state.nytData.map((obj, i) => {
                                        return <SmallContentCard data={obj}
                                                                 key={obj.id}
                                                                 sourceType={NYT}
                                                                 isFavorPage={false}
                                        />
                                    })}
                                </Row>
                            </Container>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(Search);
