import React, { Component } from "react";
import { Nav, Navbar} from "react-bootstrap";
import AutoSuggest from "./AutoSuggest";
import SourceSwitch from "./SourceSwitch";
import { withRouter, Link } from 'react-router-dom';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';


class TopNavbar extends Component {
    componentWillReceiveProps(nextProps) {
        this.handleBookMark();
    }

    handleBookMark = () => {
        setTimeout(()=> {
            ReactTooltip.rebuild();
        }, 500);
    };

    render() {
        const path = this.props.location.pathname.toLowerCase();
        const showSwitch = (path !== '/favorite' && path !== '/search' && path !== '/article');
        const isFavoritePage = (path === '/favorite');

        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="custom" variant="dark" >
                    <AutoSuggest/>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto navbar-left" activeKey={path}>
                            <Nav.Link as={Link} to="/" href="/"> Home </Nav.Link>
                            <Nav.Link as={Link} to="/world" href="/world"> World </Nav.Link>
                            <Nav.Link as={Link} to="/politics" href="/politics"> Politics </Nav.Link>
                            <Nav.Link as={Link} to="/business" href="/business"> Business </Nav.Link>
                            <Nav.Link as={Link} to="/technology" href="/technology"> Technology </Nav.Link>
                            <Nav.Link as={Link} to="/sports" href="/sports"> Sports </Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link as={Link} to="/favorite" href="/favorite">
                                { isFavoritePage ?
                                    <FaBookmark className="BookMarkWhite"
                                                data-tip="Bookmark"
                                                data-for="favor"
                                    /> :
                                    <FaRegBookmark className="BookMarkWhite"
                                                   data-tip="Bookmark"
                                                   data-for="favor"
                                    />
                                }
                                <ReactTooltip id="favor" place="bottom" />
                            </Nav.Link>
                        </Nav>
                        {showSwitch ?
                            <SourceSwitch
                                handleChangeSourceType={this.props.handleChangeSourceType}
                                sourceType={this.props.sourceType}
                            /> :
                            null
                        }
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default withRouter(TopNavbar);
