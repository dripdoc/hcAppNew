import React, { Component } from 'react';


export class FetchPersons extends Component {
    displayName = FetchPersons.name

  constructor(props) {
    super(props);
    this.state = { persons: [], loading: true, };

    fetch('api/Persons/')
      .then(response => response.json())
      .then(data => {
        this.setState({ persons: data, loading: false, NameValue:"Name" });
      });
    }
   static renderPersonsTable(persons) {
    return (
            <table className='table'>
            <thead>
              <tr>
               <th>First Name</th>
               <th>Last Name</th>
               <th>Age</th>
                <th>StreetAddress</th>
                <th>Interests</th>
                <th>Picture</th>
              </tr>
            </thead>
            <tbody>
                    {persons.map(person =>
                        <tr key={person.id}>
                  <td>{person.firstName}</td>
                  <td>{person.lastName}</td>
                  <td>{person.age}</td>
                  <td>{person.streetAddress}</td>
                        <td>{person.interests}</td>
                        <img className='person-pic' src={person.pictureURL}></img>
                </tr>
              )}
            </tbody>
            </table>
       
    );
  }

    handleSaveName = event => {
        if (event.target.name === 'NameText') {
            this.setState({ NameValue: event.target.value })
        }
    }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchPersons.renderPersonsTable(this.state.persons);
    return (
        <div>

            <h1>Persons</h1>
            <p>All Persons contained in the sample database.</p>

            {contents}
        </div>
    );
  }
}

class Button extends React.Component {
    render() {
        return (
            <button className="square" onClick={() => alert('click')}>
                {this.props.value}
            </button>
        );
    }
}
