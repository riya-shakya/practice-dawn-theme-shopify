class CustomHeader extends HTMLElement {
  constructor() {
    super();

    this.linksContainer = this.querySelector(".menu__links-container");
    this.resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const newHeight = entry.borderBoxSize[0].blockSize + "px";
        this.linksContainer.style.marginTop = newHeight;
      }
    });
  }

  toggleOverflow(event) {
    if (event.newState === "open") {
      document.documentElement.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
    }
  }

  connectedCallback() {
    this.resizeObserver.observe(this);
    this.linksContainer.addEventListener("beforetoggle", this.toggleOverflow);
  }

  disconnectedCallback() {
    this.resizeObserver.disconnect();
    this.linksContainer.removeEventListener(
      "beforetoggle",
      this.toggleOverflow,
    );
    document.documentElement.classList.remove('overflow-hidden');
  }
}

if (!customElements.get("custom-header"))
  customElements.define("custom-header", CustomHeader);
