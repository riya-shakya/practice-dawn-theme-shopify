class CustomHeader extends HTMLElement {
  constructor() {
    super();
    this.linksContainer = this.querySelector(".menu__links-container");
    this.resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const newHeight = entry.borderBoxSize[0].blockSize + "px";
        this.linksContainer.style.marginTop = newHeight;
        this.linksContainer.style.height = calc(100 % -newHeight);
      }
    });
  }

  connectedCallback() {
    this.resizeObserver.observe(this);

    this.linksContainer.addEventListener("beforetoggle", (event) => {
      if (event.newState === "open") {
        document.documentElement.classList.add('overflow-hidden');
      } else {
        document.documentElement.classList.remove('overflow-hidden');
      }
    });
  }

  disconnectedCallback() {
    this.resizeObserver.disconnect();
  }
}

customElements.define("custom-header", CustomHeader);
