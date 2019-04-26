import React, { Component } from 'react';
import { FetchPersons } from './FetchPersons';

export class SearchNames extends Component {
  displayName = SearchNames.name

  constructor(props) {
    super(props);
      this.state = { persons: [], loading: true, filter : "" };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }
      
    handleChange(event) {
        this.setState({ filter: event.target.value, loading: true });
        if (event.target.value != "")
            this.Fetch(event.target.value);
        else
            this.setState({ persons: []});

    }

    handleSubmit(event) {
        event.preventDefault();
    }

    Fetch(name) {
        fetch('api/Persons/' + name)
            .then(response => response.json())
            .then(data => {
                this.setState({ persons: data, loading: false, NameValue: "Name" });
            });
    }
    
  render() {
      let contents = this.state.loading
              ? <p><em>FilteredNames.</em></p>
            : FetchPersons.renderPersonsTable(this.state.persons);
      return (
          <div>

              <h1>Persons</h1>
              <p>Get a filtered list of persons</p>
              <form className="container-fluid" onSubmit={this.handleSubmit} >
                  <div>
                      <label for="filter" className="form-label">Search Filter</label>
                      <textarea name="filter" className="form-control" required="true" value={this.state.filter} onChange={this.handleChange} />
                  </div>
              
              </form>

              {contents}
          </div>
      );
  }
}
