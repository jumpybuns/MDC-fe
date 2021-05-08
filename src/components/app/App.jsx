import React, { Component } from 'react';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeUserBand = this.onChangeUserBand.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      band: '',
      apiResponse: '',
      message: '',
    };
  }

  callAPI() {
    fetch('http://localhost:7890/testAPI')
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: res }));
  }

  createUser = () => {
    let userInfo = {
      Name: this.state.name,
      Band: this.state.band,
    };

    axios
      .post('http://localhost:7890/testAPI', userInfo)
      .then((response) => response.json())
      .then((res) => {
        if (res) {
          this.setState({ message: 'New User Created!' });
        }
      });
  };

  componentDidMount() {
    this.callAPI();
    this.createUser();
  }

  onChangeUserName(e) {
    this.setState({ name: e.target.value });
  }

  onChangeUserBand(e) {
    this.setState({ band: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.createUser();
  }

  render() {
    return (
      <div className="wrapper">
        <p>{this.state.message}</p>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Add User Name</label>
            <input
              type="text"
              value={this.state.name}
              onChange={this.onChangeUserName}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Add Your Band</label>
            <input
              type="text"
              value={this.state.band}
              onChange={this.onChangeUserBand}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-success btn-block"
            />
          </div>
        </form>
      </div>
    );
  }
}
