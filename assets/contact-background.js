if (!customElements.get("contact-background")) {
  class ContactBackground extends HTMLElement {
    connectedCallback() {
      this.background = this.closest(".contact-page__background");
      const needsFallback =
        !CSS.supports("background-attachment", "fixed") ||
        CSS.supports("-webkit-touch-callout", "none");

      if (!this.background || !needsFallback) return;

      this.mobile = matchMedia(
        "(max-width: 749px) and (prefers-reduced-motion: no-preference)",
      );
      this.update = () => {
        this.background.classList.toggle(
          "contact-page__background--fallback",
          this.mobile.matches,
        );
      };
      this.mobile.addEventListener("change", this.update);
      this.update();
    }

    disconnectedCallback() {
      this.mobile?.removeEventListener("change", this.update);
      const remainingBanner = this.background?.querySelector("contact-background");
      if (!remainingBanner?.isConnected) {
        this.background?.classList.remove("contact-page__background--fallback");
      }
    }
  }

  customElements.define("contact-background", ContactBackground);
}
