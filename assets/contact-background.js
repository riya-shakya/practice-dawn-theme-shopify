if (!customElements.get("contact-background")) {
  class ContactBackground extends HTMLElement {
    connectedCallback() {
      const needsFallback =
        !CSS.supports("background-attachment", "fixed") ||
        CSS.supports("-webkit-touch-callout", "none");

      if (!needsFallback) return;

      this.mobile = matchMedia(
        "(max-width: 749px) and (prefers-reduced-motion: no-preference)",
      );
      this.update = () => {
        this.classList.toggle(
          "contact-page__background--fallback",
          this.mobile.matches,
        );
      };
      this.mobile.addEventListener("change", this.update);
      this.update();
    }

    disconnectedCallback() {
      this.mobile?.removeEventListener("change", this.update);
      this.classList.remove("contact-page__background--fallback");
    }
  }

  customElements.define("contact-background", ContactBackground);
}
