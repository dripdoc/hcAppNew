import React, { Component } from 'react';

export class AddPerson extends Component {
    displayName = AddPerson.name

  constructor(props) {
    super(props);
      this.state = {
           personData: {
              firstName: "",
              lastName: "",
              streetAddress: "",
              age: "",
              interests: "",
              pictureUrl: "",
          },
          response: ""
         };
      this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
      this.handleLastNameChange = this.handleLastNameChange.bind(this);
      this.handleAgeChange = this.handleAgeChange.bind(this);
      this.handleInterestsChange = this.handleInterestsChange.bind(this);
      this.handlePictureURLChange = this.handlePictureURLChange.bind(this);
      this.handleStreetAddressChange = this.handleStreetAddressChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      
  }
      
    handleAgeChange(event) {
        let value = event.target.value;
        this.setState(
            prevState => ({
                personData: {
                    ...prevState.personData,
                    age : value
                }
            }),
            () => console.log(this.state.personData)
        );
    }

    handleStreetAddressChange(event) {
        let value = event.target.value;
        this.setState(
            prevState => ({
                personData: {
                    ...prevState.personData,
                    streetAddress: value
                }
            }),
            () => console.log(this.state.personData)
        );
    }

    handleLastNameChange(event) {
        let value = event.target.value;
        this.setState(
            prevState => ({
                personData: {
                    ...prevState.personData,
                    lastName: value
                }
            }),
            () => console.log(this.state.personData)
        );
    }

    handleFirstNameChange(event) {
        let value = event.target.value;
        this.setState(
            prevState => ({
                personData: {
                    ...prevState.personData,
                    firstName: value
                }
            }),
            () => console.log(this.state.personData)
        );
    }

    handleInterestsChange(event) {
        let value = event.target.value;
        this.setState(
            prevState => ({
                personData: {
                    ...prevState.personData,
                    interests: value
                }
            }),
            () => console.log(this.state.personData)
        );
    }

    handlePictureURLChange(event) {
        let value = event.target.value;
        this.setState(
            prevState => ({
                personData: {
                    ...prevState.personData,
                    pictureURL: value
                }
            }),
            () => console.log(this.state.personData)
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        let personData = this.state.personData;
        let bodyText = JSON.stringify(personData)

        fetch("/api/persons", {
            method: "POST",
            body: bodyText,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }).then(response => {
            response.json().then(data => {
                console.log("Successful" + data);
            });
        });

    }


    
  render() {


      return (
          <div>

              <h1>Persons</h1>
              <p>Add A person</p>
              <form
                  onSubmit={this.handleSubmit}
                  className="container-fluid"
                   >
                  <div>
                      <label for="firstName" className="form-label">First Name</label>
                      <textarea
                        name="firstName"
                        className="form-control"
                        placeholder="Enter first name here"
                        required="true"
                        className="form-control"
                        value={this.state.firstName}
                          onChange={this.handleFirstNameChange} />
                  </div>
                  <div>
                      <label for="lastName" className="form-label">Last Name</label>
                      <textarea
                          name="lastName"
                          className="form-control"
                          placeholder="Enter last name here"
                          required="true"
                          className="form-control"
                          value={this.state.lastName}
                          onChange={this.handleLastNameChange} />
                  </div>
                  <div>
                      <label for="age" className="form-label">Age</label>
                      <input
                          name="age"
                          className="form-control"
                          type='number'
                          required="true"
                          className="form-control"
                          value={this.state.age}
                          onChange={this.handleAgeChange} />
                   </div>
                   <div>
                      <label for="streetAddress" className="form-label">Street Address</label>
                      <textarea
                          name="streetAddress"
                          className="form-control"
                          placeholder="Enter street Address here"
                          required="true"
                          className="form-control"
                          value={this.state.streetAddress}
                          onChange={this.handleStreetAddressChange} />
                  </div>
                  <div>
                      <label for="interests" className="form-label">Interests</label>
                      <textarea
                          name="interests"
                          className="form-control"
                          placeholder="Add Interests name here"
                          required="true"
                          className="form-control"
                          value={this.state.interests}
                          onChange={this.handleInterestsChange} />
                  </div>
                  <div>
                      <label for="pictureUrl" className="form-label">PictureURL</label>
                      <textarea
                          name="pictureUrl"
                          className="form-control"
                          placeholder="Enter url for person picture"
                          required="false"
                          className="form-control"
                          value={this.state.pictureUrl}
                          onChange={this.handlePictureURLChange} />
                  </div>
                  <button
                      action={this.handleSubmit}
                      className="btn btn-primary btn-margin">
               
                      Submit
                      </button>
                  
              </form>
             
          </div>
      );
  }
}
