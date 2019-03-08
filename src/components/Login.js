import React, { Component } from "react";
import firebase from "../Firebase";
import FormError from "./FormError";
import { withRouter } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: { email: "", password: "", firebase: "" },
      emailValid: false,
      passwordValid: false,
      formValid: false
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.history.push({ pathname: "/meetings" }))
      .catch(error => {
        console.log(error);
        this.setState(prevState => {
          return {
            errors: {
              ...prevState.errors,
              firebase: error.message !== null ? error.message : ""
            }
          };
        });
      });
    console.log("Logging in to FB: ", this.state);
  };

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  validate = e => {
    let { emailValid, passwordValid, errors } = this.state;
    let { name, value } = e.target;

    switch (name) {
      case "email":
        emailValid = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(value);
        errors.email = emailValid ? "" : "Email is in an invalid format.";
        break;
      case "password":
        passwordValid = value.length >= 6;
        errors.password = passwordValid ? "" : "Passwords must too short";
        break;
      default:
        break;
    }
    this.setState(
      { emailValid: emailValid, passwordValid: passwordValid, errors },
      () => {
        this.setState({
          formValid: this.state.emailValid && this.state.passwordValid
        });
      }
    );
  };

  render() {
    console.log(this.props);
    const errorMessages = Object.keys(this.state.errors).map(
      key => this.state.errors[key]
    );
    const errors = errorMessages.filter(msg => msg !== "");

    return (
      <form className="mt-3" onSubmit={this.handleSubmit}>
        <div className="container">
          <div className="row justify-content-center">
            {errors.length > 0 ? <FormError errors={errors} /> : null}
            <div className="col-lg-6">
              <div className="card bg-light">
                <div className="card-body">
                  <h3 className="font-weight-light mb-3">Log in</h3>
                  <section className="form-group">
                    <label
                      className="form-control-label sr-only"
                      htmlFor="Email"
                    >
                      Email
                    </label>
                    <input
                      required
                      className="form-control"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      onBlur={this.validate}
                    />
                  </section>
                  <section className="form-group">
                    <input
                      required
                      className="form-control"
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={e => {
                        this.handleChange(e);
                        this.validate(e);
                      }}
                    />
                  </section>
                  <div className="form-group text-right mb-0">
                    <button
                      className="btn btn-primary"
                      type="submit"
                      disabled={!this.state.formValid}
                    >
                      Log in
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default withRouter(Login);
