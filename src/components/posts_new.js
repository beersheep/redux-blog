import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

class PostsNew extends Component {
  onSubmit = (values) => {
    console.log(values)
  }

  renderField(field) {
    const { error, touched } = field.meta

    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input 
          className="form-control"
          type='text'
          {...field.input}
        />
        {touched && error}
      </div>
    )
  }

  render() {
    const { handleSubmit } = this.props

    return (
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
      </form>
    )
  }
}

const requireValidate = (message) => (value) => {
  return value ? '' : message
}

function validate(values) { // values is an object of user inputs
  const errors = {}

  if (!values.title) {
    errors.title = "Please enter a title"
  }

  if (!values.content) {
    errors.content = "Please enter some contents"
  }

  // the validation of the field associated with the field name.
  // the object key of errors has to be identical to the field name.

  return errors
}

export default reduxForm({
  // validate, // same as validate: validate
  form: 'PostsNewForm' // name of the form, has to be uniq
})(PostsNew)

