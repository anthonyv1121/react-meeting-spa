import React, { Component } from "react";
import FormError from "./FormError";
import firebase from "../Firebase";
import { withRouter } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      email: "",
      passOne: "",
      passTwo: "",
      errors: { name: "", email: "", password: "", firebase: "" },
      formValid: false,
      nameValid: false,
      passwordValid: false,
      emailValid: false
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    this.sendToFirebase({
      email: this.state.email,
      password: this.state.passOne
    });
    console.log("Sending to FB: ", this.state);
  };
  sendToFirebase = registrationInfo => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        registrationInfo.email,
        registrationInfo.password
      )
      .then(() => {
        this.postUserName(this.state.displayName);
      })
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
  };

  postUserName(displayName) {
    firebase.auth().onAuthStateChanged(FBUser => {
      if (!FBUser) {
        return;
      }
      FBUser.updateProfile({ displayName })
        .then(() => {
          this.props.onUserRegistered(FBUser);
        })
        .then(() => {
          this.props.history.push({
            pathname: "/meetings" // redirect after submisson complete
          });
        });
    });
  }
  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  validate = e => {
    let { emailValid, passwordValid, nameValid, errors } = this.state;

    switch (e.target.name) {
      case "displayName":
        nameValid = this.state.displayName.length >= 3;
        errors.name = nameValid ? "" : "Name should be at least 3 characters.";
        break;
      case "email":
        emailValid = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(
          this.state.email
        );
        console.log({ emailValid });
        errors.email = emailValid ? "" : "Email is in an invalid format.";
        break;
      case "passTwo":
        passwordValid =
          this.state.passOne === this.state.passTwo &&
          this.state.passOne.length >= 6;
        errors.password = passwordValid ? "" : "Passwords must match.";
        break;

      default:
        break;
    }
    this.setState({ errors, emailValid, passwordValid, nameValid }, () => {
      this.setState({
        formValid:
          this.state.emailValid &&
          this.state.passwordValid &&
          this.state.nameValid
      });
    });
  };

  // setError = error => this.setState({ error });

  render() {
    const errorMessages = Object.keys(this.state.errors).map(
      key => this.state.errors[key]
    );
    const errors = errorMessages.filter(msg => msg !== "");

    return (
      <form className="mt-3" onSubmit={this.handleSubmit}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card bg-light">
                <div className="card-body">
                  <h3 className="font-weight-light mb-3">Register</h3>
                  <div className="form-row">
                    {errors.length > 0 ? <FormError errors={errors} /> : null}
                    <section className="col-sm-12 form-group">
                      <label
                        className="form-control-label sr-only"
                        htmlFor="displayName"
                      >
                        Display Name
                      </label>
                      <input
                        className="form-control"
                        onChange={this.handleChange}
                        onBlur={this.validate}
                        value={this.state.displayName}
                        type="text"
                        id="displayName"
                        placeholder="Display Name"
                        name="displayName"
                        required
                      />
                    </section>
                  </div>
                  <section className="form-group">
                    <label
                      className="form-control-label sr-only"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="form-control"
                      onChange={this.handleChange}
                      onBlur={this.validate}
                      value={this.state.email}
                      type="email"
                      id="email"
                      placeholder="Email Address"
                      required
                      name="email"
                    />
                  </section>
                  <div className="form-row">
                    <section className="col-sm-6 form-group">
                      <input
                        className="form-control"
                        onChange={this.handleChange}
                        value={this.state.passOne}
                        type="password"
                        name="passOne"
                        placeholder="Password"
                      />
                    </section>
                    <section className="col-sm-6 form-group">
                      <input
                        className="form-control"
                        onChange={e => {
                          this.handleChange(e);
                          this.validate(e);
                        }}
                        value={this.state.passTwo}
                        type="password"
                        required
                        name="passTwo"
                        placeholder="Repeat Password"
                      />
                    </section>
                  </div>
                  <div className="form-group text-right mb-0">
                    <button
                      className="btn btn-primary"
                      type="submit"
                      disabled={!this.state.formValid}
                    >
                      Register
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

export default withRouter(Register);
