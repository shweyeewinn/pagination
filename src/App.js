import React, { Component } from 'react';

import styles from './App.module.css';

class App extends Component {
  state = {
    users: null,
    total: null,
    per_page: null,
    current_page: null
  };

  componentDidMount() {
    this.makeHttpRequestWithPage(1);
  }

  makeHttpRequestWithPage = async pageNumber => {
    let response = await fetch(
      `https://reqres.in/api/users?page=${pageNumber}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );

    const data = await response.json();

    this.setState({
      users: data.data,
      total: data.total,
      per_page: data.per_page,
      current_page: data.page
    });
  };

  render() {
    console.log(this.state.users);
    // console.log(this.state.total);
    // console.log(this.state.per_page);

    let users, renderPageNumbers;

    if (this.state.users !== null) {
      users = this.state.users.map(user => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.first_name}</td>
          <td>{user.last_name}</td>
        </tr>
      ));
    }

    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(this.state.total / this.state.per_page);
      i++
    ) {
      pageNumbers.push(i);
    }

    const lastItemArray = pageNumbers[pageNumbers.length - 1];

    renderPageNumbers = pageNumbers.map(number => {
      let classes = this.state.current_page === number ? styles.active : '';

      return (
        <span
          key={number}
          className={classes}
          onClick={() => this.makeHttpRequestWithPage(number)}
        >
          {number}
        </span>
      );
    });

    return (
      <div className={styles.app}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>S/N</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>{users}</tbody>
        </table>

        <div className={styles.pagination}>
          <span onClick={() => this.makeHttpRequestWithPage(1)}>&laquo;</span>
          {renderPageNumbers}
          <span onClick={() => this.makeHttpRequestWithPage(lastItemArray)}>
            &raquo;
          </span>
        </div>
      </div>
    );
  }
}

export default App;
