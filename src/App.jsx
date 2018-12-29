import React, { Component } from "react";
import "./Base.css";

// Components
const Header = () => {
  return (
    <header className="header">
      <img
        className="header__logo"
        src="/images/uuid-generator-logo.svg"
        alt="UUID Generator"
      />
      <h1 className="header__title">UUID generator</h1>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <span>React UUID generator - {new Date().getFullYear()}</span>
      <span>Built by Firmino Changani</span>
    </footer>
  );
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: "",
      uuids: []
    };
  }

  /*
   * This method will request a single uuid from the api
   */
  getSingleUUID() {
    fetch("https://uuid-api.herokuapp.com/api")
      .then(res => res.json())
      .then(uuid => this.setState({ uuid: uuid.uuid }))
      .catch(err => console.log("Error: ", err));
  }

  render() {
    return (
      <main className="application">
        <Header />
        <section className="generator-control">
          <button
            type="button"
            class="generator-control__button"
            onClick={() => {
              this.getSingleUUID();
            }}
          >
            Generate UUID
          </button>
        </section>
        <section className="results">
          <article className="uuid">{this.state.uuid}</article>
        </section>
        <Footer />
      </main>
    );
  }
}
