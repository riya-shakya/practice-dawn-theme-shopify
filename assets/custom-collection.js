class CustomCollection extends HTMLElement {
  constructor() {
    super();
    this.DOMParser = new DOMParser();
  }

  async renderNewSection(event) {
    const target = event.target;

    if (target.closest("fieldset") && event.type == "click") return;

    const href =
      target.dataset.href ?? target.closest("[data-href]")?.dataset.href;

    if (!href) return;
    event.preventDefault();
    this.querySelector(".collection__product-grid").classList.add("skeleton");

    let url = new URL(href, location.origin);
    history.pushState(null, "", url);
    let getSectionURL = this.dataset.sectionId;
    url.searchParams.append("section_id", getSectionURL);
    let sessionGetItem = sessionStorage.getItem(url.toString());

    if (!sessionGetItem) {
      let res = await fetch(url);
      let html = await res.text();
      let parsedHTML = this.DOMParser.parseFromString(html, "text/html");
      sessionGetItem = parsedHTML.querySelector("custom-collection").innerHTML;

      sessionStorage.setItem(url.toString(), sessionGetItem);
    }

    this.innerHTML = sessionGetItem;
  }

  connectedCallback() {
    this.addEventListener("click", this.renderNewSection);
    this.addEventListener("change", this.renderNewSection);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.renderNewSection);
    this.removeEventListener("change", this.renderNewSection);
  }
}

customElements.define("custom-collection", CustomCollection);
