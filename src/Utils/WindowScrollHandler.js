class windowScrollHandler {
  constructor() {
    this.rootElement = document.querySelector("#root");
    this.pageOffsetTop = 0;
  }

  disableScroll() {
    const scrollIsDisabled = document.body.classList.contains("disable-scroll");

    if (scrollIsDisabled) {
      return;
    }

    this.pageOffsetTop = window.scrollY;
    this.rootElement.style.top = `-${window.scrollY}px`;
    document.body.classList.add("disable-scroll");
  }

  enableScroll() {
    const scrollIsEnabled = document.body.classList.contains("disable-scroll");

    if (!scrollIsEnabled) {
      return;
    }

    this.rootElement.style.top = "0px";
    document.body.classList.remove("disable-scroll");
    window.scroll(0, this.pageOffsetTop);
  }
}

const windowScrollHandlerInstance = new windowScrollHandler();

export { windowScrollHandlerInstance };
