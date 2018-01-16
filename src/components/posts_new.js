import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createPost } from '../actions/'

class PostsNew extends Component {
  onSubmit = (value) => {
    this.props.createPost(value, () => {
      this.props.history.push('/')
    })
  }

  renderField(field) {
    const { error, touched } = field.meta
    const errorClass = (touched && error) ? 'has-error' : ''

    return (
      <div className={`form-group ${errorClass}`}>
        <label>{field.label}</label>
        <input 
          className="form-control"
          type='text'
          {...field.input}
        />
        <div className="help-block">
          {touched && error}
        </div>
      </div>
    )
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field 
            label="Title"
            name="title"
            component={this.renderField}
            validate={requireValidate("Please provide a title")}
          />
          <Field
            label="Categories"
            name="categories"
            component={this.renderField}
          />
          <Field
            label="Post Content"
            name="content"
            component={this.renderField}
            validate={requireValidate("Please provide some contents")}
          />
          <button type="submit" className="btn btn-primary">Post</button>
          <Link to="/" className="btn btn-danger">Cancel</Link>
        </form>
      </div>
    )
  }
}

const requireValidate = (message) => (value) => {
  return value ? '' : message
}

export default reduxForm({
  // validate, // same as validate: validate
  form: 'PostsNewForm' // name of the form, has to be uniq
})(
  connect(null, { createPost })(PostsNew)
)

