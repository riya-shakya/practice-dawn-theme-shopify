class AddToCart extends HTMLElement {
  constructor() {
    super();
    this.quantMinus = this.querySelector(".quantity--minus");
    this.quantPlus = this.querySelector(".quantity--plus");
    this.inputNumber = this.querySelector(".quantity__number");
  }

  addQuantity() {
    this.inputNumber.value++;
  }
  reduceQuantity() {
    if (this.inputNumber.value > 1) this.inputNumber.value--;
  }

  connectedCallback() {
    this.addQuantityBound = this.addQuantity.bind(this);
    this.reduceQuantityBound = this.reduceQuantity.bind(this);
    this.quantPlus.addEventListener("click", this.addQuantityBound);
    this.quantMinus.addEventListener("click", this.reduceQuantityBound);
  }

  disconnectedCallback() {
    this.quantPlus.removeEventListener("click", this.addQuantityBound);
    this.quantMinus.removeEventListener("click", this.reduceQuantityBound);
  }
}

customElements.define("add-to-cart", AddToCart);
