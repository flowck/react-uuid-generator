import React, { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./Base.css";

const App = () => {
  const [uuid, setUuid] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [uuids, setUuids] = useState([]);
  // const [hadErrorRequesting, setHadErrorRequesting] = useState(false);

  /*
   * This method will request a single uuid from the api
   */
  const getSingleUUID = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://uuid-api.herokuapp.com/api/uuids");
      const data = await response.json();

      setUuid(data.uuid);
    } catch (err) {
      // setHadErrorRequesting(true);
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <main className="application">
      <Header />

      <section className="generator-control">
        <button
          type="button"
          className="generator-control__button"
          onClick={() => {
            getSingleUUID();
          }}
          disabled={isLoading}
        >
          Generate UUID
        </button>
      </section>

      <section className="results">
        <article className="uuid">{uuid}</article>
      </section>

      <Footer />
    </main>
  );
};

export default App;
