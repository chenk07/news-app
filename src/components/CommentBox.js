import React, { Component } from "react";
import commentBox from 'commentbox.io';
import { COMMENT_BOX_PROJECT_ID } from "../Constants";

class CommentBox extends Component {
    componentDidMount() {
        this.removeCommentBox = commentBox(COMMENT_BOX_PROJECT_ID, { defaultBoxId: this.props.articleId });
    }

    componentWillUnmount() {
        this.removeCommentBox();
    }

    render() {
        return (
            <div className="commentbox" />
        );
    }
}

export default CommentBox;
