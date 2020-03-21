import React, { Component } from "react";
import { Switch, Route, withRouter } from 'react-router-dom';
import Favorite from "./Favorite";
import Search from "./Search";
import DetailedArticle from "./DetailedArticle";
import Headline from "./Headline";

class Main extends Component {
    render() {
        return (
            <div className="Main">
                <Switch>
                    <Route exact path="/"
                           render={()=> <Headline sourceType={this.props.sourceType} /> }
                    />
                    <Route path={["/politics", "/world", "/business", "/technology", "/sports"]}
                           render={()=> <Headline sourceType={this.props.sourceType} /> }
                    />
                    <Route path="/favorite" component={Favorite} />
                    <Route path="/search" component={Search} />
                    <Route path="/article" component={DetailedArticle} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(Main);
