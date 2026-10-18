class CustomVariantSelector extends HTMLElement {
  constructor() {
    super();
    this.DOMParser = new DOMParser();
    this.customProduct = this.closest(".custom-product");
  }

  async renderSection(event) {
    event.preventDefault();

    const btnsAndInputs = this.customProduct.querySelectorAll(
      ".shopify-product-form input, .shopify-product-form button",
    );
    for (const el of btnsAndInputs) {
      el.disabled = true;
      el.style.opacity = 0.5;
    }

    const href = event.target.value;
    const url = new URL(href, location.origin);
    const sectionId = this.dataset.sectionId;
    url.searchParams.append("section_id", sectionId);

    if (!sessionStorage.getItem(url.toString())) {
      let res = await fetch(url);
      let html = await res.text();
      let parsedHTML = this.DOMParser.parseFromString(html, "text/html");
      let innerHTML = parsedHTML.querySelector(
        ".product__information",
      ).innerHTML;

      sessionStorage.setItem(url.toString(), innerHTML);
    }

    this.customProduct.querySelector(".product__information").innerHTML =
      sessionStorage.getItem(url.toString());
  }

  connectedCallback() {
    this.addEventListener("change", this.renderSection);
  }

  disconnectedCallback() {
    this.addEventListener("change", this.renderSection);
  }
}

customElements.define("custom-variant-selector", CustomVariantSelector);
