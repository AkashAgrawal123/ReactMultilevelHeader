import React from "react";
import "../Styles/Homepage.scss";
import { IoSearchOutline } from "react-icons/io5";
import { CgClose } from "react-icons/cg";

const Homepage = () => {
  const handleCloseSearchButtonClick = (e) => {
    console.log("clock");
    e.preventDefault();

    const rootElement = document.querySelector("#root");

    rootElement.classList.toggle("main-search-is-open");
  };

  return (
    <>
      <section className="container">
        <nav className="main-search" aria-label="Site search">
          <div className="main-search__panel">
            <h4 className="main-search__heading">Search</h4>
            <div
              id="global-search"
              className="search-box"
              style={{ display: "block" }}
            >
              <div className="search-box__wrapper">
                <div className="search-box__interface">
                  <div className="search-box__input magic-box">
                    <div className="magic-box-input">
                      <input
                        autoComplete="off"
                        type="text"
                        placeholder="Start typing to search"
                      />
                    </div>
                    <div className="search-box__button" aria-label="Search">
                      <IoSearchOutline className="coveo-search-button-svg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-search__close-wrap">
            <button
              className="main-search__close-button"
              onClick={handleCloseSearchButtonClick}
            >
              <CgClose className="main-search__close-icon" />
            </button>
          </div>
        </nav>
      </section>
    </>
  );
};

export default Homepage;
