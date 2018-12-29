import React, { Component } from "react";
import Clipboard from "react-clipboard.js";
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
      <span>
        <a href="https://github.com/flowck/react-uuid-generator">
          React UUID generator
        </a>{" "}
        - {new Date().getFullYear()}
      </span>
      <span>
        Built by <a href="https://github.com/flowck">Firmino Changani</a>
      </span>
    </footer>
  );
};

const CopyConfirmation = props => {
  if (props.status) {
    return <div className="copy-confirmation">UUID successfully copied.</div>;
  }

  return "";
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: "",
      uuids: [],
      isLoading: false,
      hadErrorRequesting: false,
      copyStatus: false
    };

    // this.onSuccess = this.onSuccess.bind(this);
  }

  /*
   * This method will be called after a uuid is copied by the user
   */
  onSuccess() {
    // Set copy status to true
    this.setState({ copyStatus: true });
    setTimeout(() => {
      this.setState({ copyStatus: false });
    }, 1000);
  }

  /*
   * This method will request a single uuid from the api
   */
  getSingleUUID() {
    // Enable the visua effect
    this.setState({ isLoading: true });
    // request uuid
    fetch("https://uuid-api.herokuapp.com/api")
      .then(res => res.json())
      .then(uuid => {
        this.setState({ uuid: uuid.uuid, isLoading: false });
      })
      .catch(() => {
        this.setState({ hadErrorRequesting: true, isLoading: false });
      });
  }

  render() {
    return (
      <main className="application">
        <CopyConfirmation status={this.state.copyStatus} />
        <Header />
        <section className="generator-control">
          <button
            type="button"
            className="generator-control__button"
            onClick={() => {
              this.getSingleUUID();
            }}
            disabled={this.state.isLoading}
          >
            Generate UUID
          </button>
        </section>
        <section className="results">
          <article className="uuid">
            <Clipboard
              component="span"
              data-clipboard-text={this.state.uuid}
              onSuccess={() => {
                this.onSuccess();
              }}
            >
              {this.state.uuid}
            </Clipboard>
          </article>
        </section>
        <Footer />
      </main>
    );
  }
}
