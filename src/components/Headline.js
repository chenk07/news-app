import React, { Component } from "react";
import ContentCard from "./ContentCard";
import { withRouter } from 'react-router-dom';
import LoadingSpinner from "./LoadingSpinner";
import { BACKEND_ROOT, GUARDIAN } from "../Constants";

class Headline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            data: [],
            section: "",
            sourceType: localStorage.getItem('sourceType') || GUARDIAN,
        };
    }

    fetchData = (section, sourceType) => {
        this.setState({isLoading: true});
        let url = BACKEND_ROOT + sourceType + "/section" + section;
        if (section === "/") {
            url = BACKEND_ROOT + sourceType;
        }
        fetch(url)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    data: json["response"],
                    section: section,
                    sourceType: sourceType,
                    isLoading: false,
                });
                console.log(json);
            });
    };

    componentDidMount() {
        this.fetchData(this.props.location.pathname.toLowerCase(), this.props.sourceType.toLowerCase());
    }

    componentWillReceiveProps(nextProps) {
        const section = nextProps.location.pathname.toLowerCase();
        const sourceType = nextProps.sourceType.toLowerCase();
        if (section !== this.state.section || sourceType !== this.state.sourceType) {
            this.fetchData(section, sourceType);
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className="ContentContainer">
                {this.state.isLoading ?
                    (<LoadingSpinner isLoading={this.state.isLoading} />
                    ) : (
                        this.state.data.map((obj, i) => {
                            return (<ContentCard data={obj} key={obj.id} />);
                        })
                    )
                }
            </div>
        );
    }
}

export default withRouter(Headline);
