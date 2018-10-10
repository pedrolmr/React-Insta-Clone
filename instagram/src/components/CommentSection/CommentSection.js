import React from 'react';
import Comment from './Comment';
import PropTypes from 'prop-types';
import CommentInput from './CommentInput';

class CommentSection extends React.Component {
    constructor(props){

        super(props);
        console.log("comment section props", this.props);
        this.state = {
            comments: this.props.comments,
            comment: ''
        }
    }

    componentDidMount() {
        console.log("comment section props", this.props);
        const id = this.props.postId;
        if (localStorage.getItem(id)) {
            this.setState({
                comments: JSON.parse(localStorage.getItem(this.props.postId))
            });
        } else {
            this.addComments();
        }
    }

    componenetWillUnmount() {
        this.addComments();
    }

    addComments = () => {
        JSON.stringify(this.state.comments)
    };

    commentHandler = event => {
        this.setState({ comment: event.target.value });
    };

    submitComment = event => {
        event.preventDefault();
        const newComment = { 
            text: this.state.comment, username: 'Pedro Montesinos' 
        };
        const comments = this.state.comments.slice();
        comments.push(newComment);
        this.setState(
            { comments, comment: '' }
        );
        setTimeout(() => {
            this.addComments();
        }, 300);
    };

    render() {
        return (
            <div>
                {this.props.comments.map((comment, index) => <Comment key={index} comment={comment} />)}
                <CommentInput
                    comment={this.state.comment}
                    submitComment={this.submitComment}
                    changeComment={this.commentHandler}
                />
            </div>
        );
    }
}


CommentSection.propTypes = {
    comments: PropTypes.arrayOf(
        PropTypes.shape({ text: PropTypes.string, username: PropTypes.string })
    )
};
export default CommentSection;