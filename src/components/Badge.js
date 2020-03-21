import React, { Component } from "react";

class Badge extends Component {
    render() {
        return (
            <span className="badge-container text-uppercase">
            {(() => {
                switch (this.props.section.toLowerCase()) {
                    case 'world':
                        return (
                            <span className="badge badge-world">
                                {this.props.section}
                            </span>
                        );
                    case 'business':
                        return (
                            <span className="badge badge-business">
                                {this.props.section}
                            </span>
                        );
                    case 'technology':
                        return (
                            <span className="badge badge-technology">
                                {this.props.section}
                            </span>
                        );
                    case 'sports':
                    case 'sport':
                        return (
                            <span className="badge badge-sports">
                                {this.props.section}
                            </span>
                        );
                    case 'guardian':
                        return (
                            <span className="badge badge-guardian">
                                {this.props.section}
                            </span>
                        );
                    case 'nyt':
                        return (
                            <span className="badge badge-nyt">
                                NYTIMES
                            </span>
                        );
                    default:
                        return (
                            <span className="badge badge-other">
                                {this.props.section}
                            </span>
                        );
                }
            })()}
            </span>
        );
    }
}

export default Badge;
