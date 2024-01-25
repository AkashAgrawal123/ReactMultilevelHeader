import React, { useEffect, useState, useRef } from "react";
import "../Styles/Navbar.scss";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { RiWechatLine } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { SidebarMenuData } from "../Data/SidebarMenuData";
import { CgClose } from "react-icons/cg";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import axios from "axios";
import Headroom from "react-headroom";
import { windowScrollHandlerInstance } from "../Utils/WindowScrollHandler";
import { FaArrowLeft } from "react-icons/fa6";

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
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [navData, setNavData] = useState(null);
  const [curPageIndex, setCurPageIndex] = useState(null);
  const [activePageData, setActivePageData] = useState(null);

  const sidebarRef = useRef(null);
  const navPanelRef = useRef(null);
  const componentRef = useRef(null);

  const isDesktopDesign = 992;
  const safePanelHeight = (window.innerHeight = 71);

  console.log(safePanelHeight, "safePanelHeight");

  const handleHumburgerClick = () => {
    setIsSidebarMinimised((prev) => !prev);
  };

  const handleSearchClick = (e) => {
    e.preventDefault();

    if (getIsSearchOpen) {
      closeSearch();
    } else {
      openSearch();
    }
  };

  const handleSubMenuButtonClick = (e) => {
    e.preventDefault();

    if (curActiveArray.length > 0) {
      setCurActiveArray([]);
      return;
    }
  };

  const getIsSearchOpen = () => {
    const rootElement = document.querySelector("#root");
    const searchCurrentlyOpen = rootElement.classList.contains(
      "main-search-is-open"
    );
    return searchCurrentlyOpen;
  };

  const closeSearch = () => {
    const rootElement = document.querySelector("#root");
    if (!rootElement) {
      return;
    }
    rootElement.classList.remove("main-search-is-open");
  };

  const openSearch = () => {
    const rootElement = document.querySelector("#root");
    if (!rootElement) {
      return;
    }
    rootElement.classList.add("main-search-is-open");

    setCurActiveArray([]);
    setClosePanelOverlay(true);
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

  const mobileNavPositionTransform = () => {
    const transformLeft = `${curActiveArray.length * -100}`;
    return { transform: `translateX(${transformLeft}%)` };
  };

  const desktopNavPositionTransform = () => {
    if (!isSidebarMinimised) {
      return { transform: `translateX(0)` };
    }

    const leftFactor = curActiveArray.length + 1;

    const transformLeft = `${leftFactor * -100}`;
    return { transform: `translateX(${transformLeft}%)` };
  };

  const handleOverlayClick = (e) => {
    const clickOutsideSidebar =
      sidebarRef &&
      sidebarRef.current &&
      !sidebarRef.current.contains(e.target);
    const clickOutsideNavPanels =
      navPanelRef &&
      navPanelRef.current &&
      !navPanelRef.current.contains(e.target);

    if (clickOutsideSidebar && clickOutsideNavPanels) {
      setClosePanelOverlay(true);
    }
  };

  const handleNavKeyDown = (e) => {
    if (e.code === "Escape") {
      setClosePanelOverlay(true);
    }
  };

  const closeOverlay = () => {
    setCurActiveArray([]);
    setShowMobileNav(false);
    setClosePanelOverlay(false);
  };

  const mobileNavUnpinned = () => {
    document.body.classList.add("nav--un-pinned");
    document.body.classList.remove("nav--pinned");
  };

  const mobileNavPinned = () => {
    document.body.classList.add("nav--pinned");
    document.body.classList.remove("nav--un-pinned");
  };

  useEffect(() => {
    if (!showMobileNav) {
      setCurActiveArray([]);
    }
  }, [showMobileNav]);

  useEffect(() => {
    if (showMobileNav) {
      windowScrollHandlerInstance.disableScroll();
      return;
    }

    if (curActiveArray.length) {
      windowScrollHandlerInstance.disableScroll();
      return;
    }

    if (curActiveArray.length <= 0 && !showMobileNav) {
      windowScrollHandlerInstance.enableScroll();
    }
  }, [curActiveArray, showMobileNav]);

  useEffect(() => {
    document.addEventListener("mousedown", (e) => handleOverlayClick(e));
    document.addEventListener("keydown", (e) => handleNavKeyDown(e));

    return () => {
      document.addEventListener("mousedown", (e) => handleOverlayClick(e));
      document.addEventListener("keydown", (e) => handleNavKeyDown(e));
    };
  }, []);

  useEffect(() => {
    if (closePanelOverlay) {
      closeOverlay();
    }
  }, [closePanelOverlay]);

  useEffect(() => {
    const rootElement = document.querySelector("#root");

    if (isSidebarMinimised) {
      rootElement.classList.add("sidebar-is-minimised");
    } else {
      rootElement.classList.remove("sidebar-is-minimised");
    }
  }, [isSidebarMinimised]);

  const sidebarHTML = isDesktopDesign ? (
    <div className="sidebar__header" ref={sidebarRef}>
      <div className="sidebar__min-logo">
        <i
          name="logo-min"
          className="fa-brands fa-wordpress sidebar__logo-icon"
        ></i>
      </div>
      <button
        className="sidebar__button sidebar__button--min-max-button"
        onClick={handleHumburgerClick}
      >
        <RxHamburgerMenu name="menu" className="icon sidebar__hambuger-icon" />
      </button>
      <button
        className="sidebar__button sidebar__button--search"
        aria-label="Open search"
        onClick={handleSearchClick}
      >
        <IoSearchOutline
          name={showMobileNav ? "close" : "search"}
          className="icon sidebar__search-icon"
        />
      </button>
    </div>
  ) : (
    <Headroom
      disableInlineStyles
      pinStart={71}
      onUnpin={() => mobileNavUnpinned()}
      onPin={() => mobileNavPinned()}
    >
      <div className="sidebar__header" ref={sidebarRef}>
        <button className="sidebar__hamburger" onClick={handleHumburgerClick}>
          <RxHamburgerMenu
            name={showMobileNav ? "close" : "menu"}
            className="icon sidebar__hambuger-icon"
          />
        </button>
        <a href="#" className="sidebar__mobile-logo">
          <img
            src="/images/rbnz-logo-max.svg"
            className="sidebar__mobile-logo-img"
            alt=""
          />
        </a>
        <button className="sidebar__mobile-search" onClick={handleSearchClick}>
          <IoSearchOutline
            name={isSearchPanelOpen ? "close" : "search"}
            className="icon sidebar__mobile-search-icon"
          />
        </button>
      </div>
    </Headroom>
  );

  return (
    <>
      <section className="sidebar" id="react-nav">
        <nav aria-label="Site navigation" ref={componentRef}>
          <div
            className={`sidebar__inner ${
              isSidebarMinimised ? "sidebar__inner--minimised" : ""
            } ${activeMainMenuItem ? "sidebar__inner--is-visible" : ""}`}
          >
            {sidebarHTML}
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
                  {true && (
                    <button
                      className="sidebar__item sidebar__item--menu"
                      onClick={(e) => handleSubMenuButtonClick(e)}
                    >
                      <FaArrowLeft
                        name="arrow"
                        className="sidebar__item-icon sidebar__item-icon--back"
                      />
                      {!isDesktopDesign && <span>Back</span>}
                    </button>
                  )}
                  <ul
                    className="sidebar__list"
                    role="menubar"
                    aria-label="page navigation"
                  >
                    {SidebarMenuData.map((level1Item) => (
                      <li
                        className="sidebar__list-item sidebar__list-item--content"
                        role="none"
                        key={level1Item.id}
                      >
                        {level1Item.children.length > 0 ? (
                          <button
                            role="menuitem"
                            aria-expanded={activeMainMenuItem === level1Item.id}
                            className={`sidebar__item sidebar__item--has-icon sidebar__item--button ${
                              activeMainMenuItem === level1Item.id
                                ? "sidebar__item--is-active"
                                : ""
                            }`}
                            onClick={() =>
                              handleMainMenuItemClick(level1Item.id)
                            }
                          >
                            <span className="sidebar__item-text">
                              <span className="sidebar__item-subtitle">
                                {level1Item.altDisplayName}
                              </span>
                              <div>
                                <span className="sidebar__item-title">
                                  {level1Item.displayName}
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
                              level1Item.isExternalLink
                                ? "sidebar__item--external-link"
                                : ""
                            }`}
                            target={
                              level1Item.isExternalLink ? "_blank" : "_self"
                            }
                          >
                            <span className="sidebar__item-text">
                              <span className="sidebar__item-subtitle">
                                {level1Item.altDisplayName}
                              </span>
                              <div className="sidebar__item-title--content">
                                <span className="sidebar__item-title">
                                  {level1Item.displayName}
                                </span>
                              </div>
                            </span>
                            {level1Item.isExternalLink && (
                              <LiaExternalLinkAltSolid
                                name="external-link"
                                className="sidebar__item-icon sidebar__item-icon--external"
                              />
                            )}
                          </a>
                        )}
                        {level1Item.children.length > 0 && (
                          <div
                            className={`sidebar__panel sidebar__panel--sub ${
                              activeMainMenuItem === level1Item.id
                                ? "sidebar__panel--is-active"
                                : ""
                            }`}
                          >
                            <ul className="sidebar__list" role="menu">
                              {level1Item.children.map((level2Item) => (
                                <li
                                  className="sidebar__list-item sidebar__list-item--content"
                                  key={level2Item.id}
                                >
                                  {level2Item.children.length > 0 ? (
                                    <button
                                      role="menuitem"
                                      aria-expanded={
                                        activeSubmenuItem === level2Item.id
                                      }
                                      aria-haspopup="true"
                                      tabIndex="0"
                                      className={`sidebar__item sidebar__item--has-icon sidebar__item--button ${
                                        activeSubmenuItem === level2Item.id
                                          ? "sidebar__item--is-active"
                                          : ""
                                      }`}
                                      onClick={() =>
                                        handleSubmenuItemClick(level2Item.id)
                                      }
                                    >
                                      <span className="sidebar__item-text">
                                        <span
                                          className="sidebar__item-subtitle"
                                          lang="mi"
                                        >
                                          {level2Item.altDisplayName}
                                        </span>
                                        <div>
                                          <span className="sidebar__item-title">
                                            {level2Item.displayName}
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
                                        level2Item.isExternalLink
                                          ? "sidebar__item--external-link"
                                          : ""
                                      }`}
                                      target={
                                        level2Item.isExternalLink
                                          ? "_blank"
                                          : "_self"
                                      }
                                    >
                                      <span className="sidebar__item-text">
                                        <span className="sidebar__item-subtitle">
                                          {level2Item.altDisplayName}
                                        </span>
                                        <div className="sidebar__item-title--content">
                                          <span className="sidebar__item-title">
                                            {level2Item.displayName}
                                          </span>
                                        </div>
                                      </span>
                                      {level2Item.isExternalLink && (
                                        <LiaExternalLinkAltSolid
                                          name="external-link"
                                          className="sidebar__item-icon sidebar__item-icon--external"
                                        />
                                      )}
                                    </a>
                                  )}
                                  {level2Item.children.length > 0 && (
                                    <div
                                      className={`sidebar__panel sidebar__panel--sub ${
                                        activeSubmenuItem === level2Item.id
                                          ? "sidebar__panel--is-active"
                                          : ""
                                      }`}
                                    >
                                      <ul className="sidebar__list" role="menu">
                                        {level2Item.children.map(
                                          (level3Item) => (
                                            <li
                                              className="sidebar__list-item sidebar__list-item--content"
                                              key={level3Item.id}
                                            >
                                              {level3Item.children.length >
                                              0 ? (
                                                <button
                                                  role="menuitem"
                                                  aria-expanded={
                                                    activeSubmenuItemThirdLevel ===
                                                    level3Item.id
                                                  }
                                                  aria-haspopup="true"
                                                  tabIndex="0"
                                                  className={`sidebar__item sidebar__item--has-icon sidebar__item--button ${
                                                    activeSubmenuItemThirdLevel ===
                                                    level3Item.id
                                                      ? "sidebar__item--is-active"
                                                      : ""
                                                  }`}
                                                  onClick={() =>
                                                    handleSubmenuItemThirdLevelClick(
                                                      level3Item.id
                                                    )
                                                  }
                                                >
                                                  <span className="sidebar__item-text">
                                                    <span
                                                      className="sidebar__item-subtitle"
                                                      lang="mi"
                                                    >
                                                      {
                                                        level3Item.altDisplayName
                                                      }
                                                    </span>
                                                    <div>
                                                      <span className="sidebar__item-title">
                                                        {level3Item.displayName}
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
                                                    level3Item.isExternalLink
                                                      ? "sidebar__item--external-link"
                                                      : ""
                                                  }`}
                                                  target={
                                                    level3Item.isExternalLink
                                                      ? "_blank"
                                                      : "_self"
                                                  }
                                                >
                                                  <span className="sidebar__item-text">
                                                    <span className="sidebar__item-subtitle">
                                                      {
                                                        level3Item.altDisplayName
                                                      }
                                                    </span>
                                                    <div className="sidebar__item-title--content">
                                                      <span className="sidebar__item-title">
                                                        {level3Item.displayName}
                                                      </span>
                                                    </div>
                                                  </span>
                                                  {level3Item.isExternalLink && (
                                                    <LiaExternalLinkAltSolid
                                                      name="external-link"
                                                      className="sidebar__item-icon sidebar__item-icon--external"
                                                    />
                                                  )}
                                                </a>
                                              )}
                                              {level3Item.children.length >
                                                0 && (
                                                <div
                                                  className={`sidebar__panel sidebar__panel--sub ${
                                                    activeSubmenuItemThirdLevel ===
                                                    level3Item.id
                                                      ? "sidebar__panel--is-active"
                                                      : ""
                                                  }`}
                                                >
                                                  <ul
                                                    className="sidebar__list"
                                                    role="menu"
                                                  >
                                                    {level3Item.children.map(
                                                      (level4Item) => (
                                                        <li
                                                          className="sidebar__list-item sidebar__list-item--content"
                                                          key={level4Item.id}
                                                        >
                                                          {level4Item.children
                                                            .length > 0 ? (
                                                            <button
                                                              role="menuitem"
                                                              aria-expanded={
                                                                activeSubmenuItemForthLevel ===
                                                                level4Item.id
                                                              }
                                                              aria-haspopup="true"
                                                              tabIndex="0"
                                                              className={`sidebar__item sidebar__item--has-icon sidebar__item--button ${
                                                                activeSubmenuItemForthLevel ===
                                                                level4Item.id
                                                                  ? "sidebar__item--is-active"
                                                                  : ""
                                                              }`}
                                                              onClick={() =>
                                                                handleSubmenuItemForthLevelClick(
                                                                  level4Item.id
                                                                )
                                                              }
                                                            >
                                                              <span className="sidebar__item-text">
                                                                <span
                                                                  className="sidebar__item-subtitle"
                                                                  lang="mi"
                                                                >
                                                                  {
                                                                    level4Item.altDisplayName
                                                                  }
                                                                </span>
                                                                <div>
                                                                  <span className="sidebar__item-title">
                                                                    {
                                                                      level4Item.displayName
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
                                                                level4Item.isExternalLink
                                                                  ? "sidebar__item--external-link"
                                                                  : ""
                                                              }`}
                                                              target={
                                                                level4Item.isExternalLink
                                                                  ? "_blank"
                                                                  : "_self"
                                                              }
                                                            >
                                                              <span className="sidebar__item-text">
                                                                <span className="sidebar__item-subtitle">
                                                                  {
                                                                    level4Item.altDisplayName
                                                                  }
                                                                </span>
                                                                <div className="sidebar__item-title--content">
                                                                  <span className="sidebar__item-title">
                                                                    {
                                                                      level4Item.displayName
                                                                    }
                                                                  </span>
                                                                </div>
                                                              </span>
                                                              {level4Item.isExternalLink && (
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
                <button
                  className="sidebar__item sidebar__item--search"
                  onClick={handleSearchClick}
                >
                  <IoIosSearch
                    name="search"
                    className="icon sidebar__footer-link-icon"
                  />
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
