if (!customElements.get('sticky-evening-header')) {
  class StickyEveningHeader extends HTMLElement {
    updateHeader = () => {
      const sticky =
        window.scrollY > (this.sticky ? this.scrollBuffer / 2 : this.scrollBuffer);
      if (this.sticky === sticky) return;
      this.sticky = sticky;

      this.classList.toggle('evening-header--scrolled', sticky);
    };

    connectedCallback() {
      this.scrollBuffer = this.offsetHeight;
      this.updateHeader();
      window.addEventListener('scroll', this.updateHeader, { passive: true });
    }

    disconnectedCallback() {
      window.removeEventListener('scroll', this.updateHeader);
    }
  }

  customElements.define('sticky-evening-header', StickyEveningHeader);
}
