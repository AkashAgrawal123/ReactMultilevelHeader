import React, { useState } from "react";
import "../Styles/Navbar.scss";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { RiWechatLine } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { SidebarMenuData } from "../Data/SidebarMenuData";
import { CgClose } from "react-icons/cg";
import { LiaExternalLinkAltSolid } from "react-icons/lia";

const Navbar = () => {
  const [isSidebarMinimised, setIsSidebarMinimised] = useState(false);
  const [activeMainMenuItem, setActiveMainMenuItem] = useState(null);
  const [activeSubmenuItem, setActiveSubmenuItem] = useState(null);
  const [activeSubmenuItemThirdLevel, setActiveSubmenuItemThirdLevel] =
    useState(null);
  const [activeSubmenuItemForthLevel, setActiveSubmenuItemForthLevel] =
    useState(null);
  const [closePanelOverlay, setClosePanelOverlay] = useState(true);
  const [curActiveArray, setCurActiveArray] = useState([]);

  const handleHumburgerClick = () => {
    setIsSidebarMinimised((prev) => !prev);
  };

  const handleMainMenuItemClick = (mainMenuItemId) => {
    setActiveMainMenuItem(mainMenuItemId);
    setActiveSubmenuItem(null);
    setActiveSubmenuItemThirdLevel(null);
    setActiveSubmenuItemForthLevel(null);
    setCurActiveArray([mainMenuItemId]);
  };

  const handleSubmenuItemClick = (subMenuItemId) => {
    setActiveSubmenuItem(subMenuItemId);
    setActiveSubmenuItemThirdLevel(null);
    setActiveSubmenuItemForthLevel(null);
    setCurActiveArray([activeMainMenuItem, subMenuItemId]);
  };

  const handleSubmenuItemThirdLevelClick = (subMenuItemThirdLevelId) => {
    setActiveSubmenuItemThirdLevel(subMenuItemThirdLevelId);
    setActiveSubmenuItemForthLevel(null);
    setCurActiveArray([
      activeMainMenuItem,
      activeSubmenuItem,
      subMenuItemThirdLevelId,
    ]);
  };

  const handleSubmenuItemForthLevelClick = (subMenuItemForthLevelId) => {
    setActiveSubmenuItemForthLevel(subMenuItemForthLevelId);
  };

  const handleCloseMenuButtonClick = (e) => {
    e.preventDefault();
    setActiveMainMenuItem(null);
    setActiveSubmenuItem(null);
    setActiveSubmenuItemThirdLevel(null);
    setActiveSubmenuItemForthLevel(null);
    setCurActiveArray([]);
  };

  const closeMenuPositionTransform = () => {
    const transformLeft = `${(curActiveArray.length + 1) * 100}`;
    return { transform: `translateX(${transformLeft}%)` };
  };

  return (
    <>
      <section className="sidebar" id="react-nav">
        <nav aria-label="Site navigation">
          <div
            className={`sidebar__inner ${
              isSidebarMinimised ? "sidebar__inner--minimised" : ""
            } ${activeMainMenuItem ? "sidebar__inner--is-visible" : ""}`}
          >
            {/* hamburger header */}
            <div className="sidebar__header">
              <div className="sidebar__min-logo">
                <i className="fa-brands fa-wordpress sidebar__logo-icon"></i>
              </div>
              <button
                className="sidebar__button sidebar__button--min-max-button"
                onClick={handleHumburgerClick}
              >
                <RxHamburgerMenu className="icon sidebar__hambuger-icon" />
              </button>
              <button className="sidebar__button sidebar__button--search">
                <IoSearchOutline className="icon sidebar__search-icon" />
              </button>
            </div>

            {/* top-level panel */}
            <div
              className="sidebar__panels"
              style={{
                transform: isSidebarMinimised
                  ? "translateX(-100%)"
                  : "translateX(0px)",
              }}
            >
              <div className="sidebar__panel sidebar__panel--top-level">
                <a
                  href="#"
                  className="sidebar__panel-header"
                  aria-label="RBNZ logo"
                >
                  <img
                    src="/images/rbnz-logo-max.svg"
                    alt="Reserve bank of New Zealand - Te Pūtea Matua"
                  />
                </a>
                <nav
                  className="sidebar__panel-content"
                  aria-label="page navigation"
                >
                  <ul
                    className="sidebar__list"
                    role="menubar"
                    aria-label="page navigation"
                  >
                    {SidebarMenuData.map((mainMenuItem) => (
                      <li
                        className="sidebar__list-item sidebar__list-item--content"
                        role="none"
                        key={mainMenuItem.id}
                      >
                        {mainMenuItem.children.length > 0 ? (
                          <button
                            role="menuitem"
                            aria-expanded={
                              activeMainMenuItem === mainMenuItem.id
                            }
                            className={`sidebar__item sidebar__item--has-icon sidebar__item--button ${
                              activeMainMenuItem === mainMenuItem.id
                                ? "sidebar__item--is-active"
                                : ""
                            }`}
                            onClick={() =>
                              handleMainMenuItemClick(mainMenuItem.id)
                            }
                          >
                            <span className="sidebar__item-text">
                              <span className="sidebar__item-subtitle">
                                {mainMenuItem.altDisplayName}
                              </span>
                              <div>
                                <span className="sidebar__item-title">
                                  {mainMenuItem.displayName}
                                </span>
                              </div>
                            </span>
                            <IoIosArrowForward className="sidebar__item-icon" />
                          </button>
                        ) : (
                          <a
                            href="#"
                            role="menuitem"
                            tabIndex="0"
                            className={`sidebar__item sidebar__item--link ${
                              mainMenuItem.isExternalLink
                                ? "sidebar__item--external-link"
                                : ""
                            }`}
                            target={
                              mainMenuItem.isExternalLink ? "_blank" : "_self"
                            }
                          >
                            <span className="sidebar__item-text">
                              <span className="sidebar__item-subtitle">
                                {mainMenuItem.altDisplayName}
                              </span>
                              <div className="sidebar__item-title--content">
                                <span className="sidebar__item-title">
                                  {mainMenuItem.displayName}
                                </span>
                              </div>
                            </span>
                            {mainMenuItem.isExternalLink && (
                              <LiaExternalLinkAltSolid
                                name="external-link"
                                className="sidebar__item-icon sidebar__item-icon--external"
                              />
                            )}
                          </a>
                        )}
                        {mainMenuItem.children.length > 0 && (
                          <div
                            className={`sidebar__panel sidebar__panel--sub ${
                              activeMainMenuItem === mainMenuItem.id
                                ? "sidebar__panel--is-active"
                                : ""
                            }`}
                          >
                            <ul className="sidebar__list" role="menu">
                              {mainMenuItem.children.map((subMenuItem) => (
                                <li
                                  className="sidebar__list-item sidebar__list-item--content"
                                  key={subMenuItem.id}
                                >
                                  {subMenuItem.children.length > 0 ? (
                                    <button
                                      role="menuitem"
                                      aria-expanded={
                                        activeSubmenuItem === subMenuItem.id
                                      }
                                      aria-haspopup="true"
                                      tabIndex="0"
                                      className={`sidebar__item sidebar__item--has-icon sidebar__item--button ${
                                        activeSubmenuItem === subMenuItem.id
                                          ? "sidebar__item--is-active"
                                          : ""
                                      }`}
                                      onClick={() =>
                                        handleSubmenuItemClick(subMenuItem.id)
                                      }
                                    >
                                      <span className="sidebar__item-text">
                                        <span
                                          className="sidebar__item-subtitle"
                                          lang="mi"
                                        >
                                          {subMenuItem.altDisplayName}
                                        </span>
                                        <div>
                                          <span className="sidebar__item-title">
                                            {subMenuItem.displayName}
                                          </span>
                                        </div>
                                      </span>
                                      <IoIosArrowForward className="icon sidebar__item-icon" />
                                    </button>
                                  ) : (
                                    <a
                                      href="#"
                                      role="menuitem"
                                      tabIndex="0"
                                      //   className="sidebar__item sidebar__item--link"
                                      className={`sidebar__item sidebar__item--link ${
                                        subMenuItem.isExternalLink
                                          ? "sidebar__item--external-link"
                                          : ""
                                      }`}
                                      target={
                                        subMenuItem.isExternalLink
                                          ? "_blank"
                                          : "_self"
                                      }
                                    >
                                      <span className="sidebar__item-text">
                                        <span className="sidebar__item-subtitle">
                                          {subMenuItem.altDisplayName}
                                        </span>
                                        <div className="sidebar__item-title--content">
                                          <span className="sidebar__item-title">
                                            {subMenuItem.displayName}
                                          </span>
                                        </div>
                                      </span>
                                      {subMenuItem.isExternalLink && (
                                        <LiaExternalLinkAltSolid
                                          name="external-link"
                                          className="sidebar__item-icon sidebar__item-icon--external"
                                        />
                                      )}
                                    </a>
                                  )}
                                  {subMenuItem.children.length > 0 && (
                                    <div
                                      className={`sidebar__panel sidebar__panel--sub ${
                                        activeSubmenuItem === subMenuItem.id
                                          ? "sidebar__panel--is-active"
                                          : ""
                                      }`}
                                    >
                                      <ul className="sidebar__list" role="menu">
                                        {subMenuItem.children.map(
                                          (subMenuItemThirdLevel) => (
                                            <li
                                              className="sidebar__list-item sidebar__list-item--content"
                                              key={subMenuItemThirdLevel.id}
                                            >
                                              {subMenuItemThirdLevel.children
                                                .length > 0 ? (
                                                <button
                                                  role="menuitem"
                                                  aria-expanded={
                                                    activeSubmenuItemThirdLevel ===
                                                    subMenuItemThirdLevel.id
                                                  }
                                                  aria-haspopup="true"
                                                  tabIndex="0"
                                                  className={`sidebar__item sidebar__item--has-icon sidebar__item--button ${
                                                    activeSubmenuItemThirdLevel ===
                                                    subMenuItemThirdLevel.id
                                                      ? "sidebar__item--is-active"
                                                      : ""
                                                  }`}
                                                  onClick={() =>
                                                    handleSubmenuItemThirdLevelClick(
                                                      subMenuItemThirdLevel.id
                                                    )
                                                  }
                                                >
                                                  <span className="sidebar__item-text">
                                                    <span
                                                      className="sidebar__item-subtitle"
                                                      lang="mi"
                                                    >
                                                      {
                                                        subMenuItemThirdLevel.altDisplayName
                                                      }
                                                    </span>
                                                    <div>
                                                      <span className="sidebar__item-title">
                                                        {
                                                          subMenuItemThirdLevel.displayName
                                                        }
                                                      </span>
                                                    </div>
                                                  </span>
                                                  <IoIosArrowForward className="icon sidebar__item-icon" />
                                                </button>
                                              ) : (
                                                <a
                                                  href="#"
                                                  role="menuitem"
                                                  tabIndex="0"
                                                  className={`sidebar__item sidebar__item--link ${
                                                    subMenuItemThirdLevel.isExternalLink
                                                      ? "sidebar__item--external-link"
                                                      : ""
                                                  }`}
                                                  target={
                                                    subMenuItemThirdLevel.isExternalLink
                                                      ? "_blank"
                                                      : "_self"
                                                  }
                                                >
                                                  <span className="sidebar__item-text">
                                                    <span className="sidebar__item-subtitle">
                                                      {
                                                        subMenuItemThirdLevel.altDisplayName
                                                      }
                                                    </span>
                                                    <div className="sidebar__item-title--content">
                                                      <span className="sidebar__item-title">
                                                        {
                                                          subMenuItemThirdLevel.displayName
                                                        }
                                                      </span>
                                                    </div>
                                                  </span>
                                                  {subMenuItemThirdLevel.isExternalLink && (
                                                    <LiaExternalLinkAltSolid
                                                      name="external-link"
                                                      className="sidebar__item-icon sidebar__item-icon--external"
                                                    />
                                                  )}
                                                </a>
                                              )}
                                              {subMenuItemThirdLevel.children
                                                .length > 0 && (
                                                <div
                                                  className={`sidebar__panel sidebar__panel--sub ${
                                                    activeSubmenuItemThirdLevel ===
                                                    subMenuItemThirdLevel.id
                                                      ? "sidebar__panel--is-active"
                                                      : ""
                                                  }`}
                                                >
                                                  <ul
                                                    className="sidebar__list"
                                                    role="menu"
                                                  >
                                                    {subMenuItemThirdLevel.children.map(
                                                      (
                                                        subMenuItemForthLevel
                                                      ) => (
                                                        <li
                                                          className="sidebar__list-item sidebar__list-item--content"
                                                          key={
                                                            subMenuItemForthLevel.id
                                                          }
                                                        >
                                                          {subMenuItemForthLevel
                                                            .children.length >
                                                          0 ? (
                                                            <button
                                                              role="menuitem"
                                                              aria-expanded={
                                                                activeSubmenuItemForthLevel ===
                                                                subMenuItemForthLevel.id
                                                              }
                                                              aria-haspopup="true"
                                                              tabIndex="0"
                                                              className={`sidebar__item sidebar__item--has-icon sidebar__item--button ${
                                                                activeSubmenuItemForthLevel ===
                                                                subMenuItemForthLevel.id
                                                                  ? "sidebar__item--is-active"
                                                                  : ""
                                                              }`}
                                                              onClick={() =>
                                                                handleSubmenuItemForthLevelClick(
                                                                  subMenuItemForthLevel.id
                                                                )
                                                              }
                                                            >
                                                              <span className="sidebar__item-text">
                                                                <span
                                                                  className="sidebar__item-subtitle"
                                                                  lang="mi"
                                                                >
                                                                  {
                                                                    subMenuItemForthLevel.altDisplayName
                                                                  }
                                                                </span>
                                                                <div>
                                                                  <span className="sidebar__item-title">
                                                                    {
                                                                      subMenuItemForthLevel.displayName
                                                                    }
                                                                  </span>
                                                                </div>
                                                              </span>
                                                              <IoIosArrowForward className="icon sidebar__item-icon" />
                                                            </button>
                                                          ) : (
                                                            <a
                                                              href="#"
                                                              role="menuitem"
                                                              tabIndex="0"
                                                              className={`sidebar__item sidebar__item--link ${
                                                                subMenuItemForthLevel.isExternalLink
                                                                  ? "sidebar__item--external-link"
                                                                  : ""
                                                              }`}
                                                              target={
                                                                subMenuItemForthLevel.isExternalLink
                                                                  ? "_blank"
                                                                  : "_self"
                                                              }
                                                            >
                                                              <span className="sidebar__item-text">
                                                                <span className="sidebar__item-subtitle">
                                                                  {
                                                                    subMenuItemForthLevel.altDisplayName
                                                                  }
                                                                </span>
                                                                <div className="sidebar__item-title--content">
                                                                  <span className="sidebar__item-title">
                                                                    {
                                                                      subMenuItemForthLevel.displayName
                                                                    }
                                                                  </span>
                                                                </div>
                                                              </span>
                                                              {subMenuItemForthLevel.isExternalLink && (
                                                                <LiaExternalLinkAltSolid
                                                                  name="external-link"
                                                                  className="sidebar__item-icon sidebar__item-icon--external"
                                                                />
                                                              )}
                                                            </a>
                                                          )}
                                                        </li>
                                                      )
                                                    )}
                                                  </ul>
                                                </div>
                                              )}
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    </div>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
                <button className="sidebar__item sidebar__item--search">
                  <IoIosSearch className="icon sidebar__footer-link-icon" />
                  <span className="sidebar__footer-link-title">Search</span>
                </button>
                <nav
                  className="sidebar__panel-footer"
                  aria-label="useful links navigation"
                >
                  <a
                    href="#"
                    className="sidebar__item sidebar__item--footer-link"
                  >
                    <RiWechatLine className="icon sidebar__footer-link-icon" />
                    <span className="sidebar__footer-link-title">
                      Contact us
                    </span>
                  </a>
                  <a
                    href="#"
                    className="sidebar__item sidebar__item--footer-link"
                    target="self"
                  >
                    <i className="fa-regular fa-paper-plane sidebar__footer-link-icon"></i>
                    <span className="sidebar__footer-link-title">
                      Sign up for updates
                    </span>
                  </a>
                </nav>
              </div>
            </div>

            {/* close icon */}
            {curActiveArray.length > 0 && (
              <div
                className="sidebar__close-menu-button-wrap"
                style={closeMenuPositionTransform()}
              >
                <button
                  className="sidebar__close-menu-button"
                  aria-label="close the menu"
                  onClick={handleCloseMenuButtonClick}
                >
                  <CgClose className="sidebar__close-icon" />
                </button>
              </div>
            )}
          </div>
        </nav>
      </section>
    </>
  );
};

export default Navbar;
