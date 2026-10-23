if (!customElements.get("contact-background")) {
  class ContactBackground extends HTMLElement {
    connectedCallback() {
      const supportsFixedBackground = CSS.supports("background-attachment", "fixed");
      const isIOSBrowser = CSS.supports("-webkit-touch-callout", "none");
      const needsFallback = !supportsFixedBackground || isIOSBrowser;

      this.classList.toggle("contact-page__background--fallback", needsFallback);
    }
  }

  customElements.define("contact-background", ContactBackground);
}
