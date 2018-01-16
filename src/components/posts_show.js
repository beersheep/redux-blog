import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPost, deletePost } from '../actions/'
import { Link } from 'react-router-dom'

const mapStateToProps = ({posts}, ownProps) => {
  return { post: posts[ownProps.match.params.id] }
}

class PostsShow extends Component {
  componentDidMount() {
    if (!this.props.post) {
      const { id } = this.props.match.params
      this.props.fetchPost(id)
    }
  }

  handlePostDelete = (e) => {
    e.preventDefault()

    this.props.deletePost(this.props.match.params.id, () => {
      this.props.history.push('/')
    })
  }

  render() {
    const { post } = this.props

    if (!this.props.post) { 
      return <div> Loading...</div> 
    }

    return (
      <div>
        <Link to="/">Back to Index</Link>
        <button 
          className="btn btn-danger pull-right"
          onClick={this.handlePostDelete}
        >
          Delete
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    )
  }
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow)
