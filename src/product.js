class Product {
  constructor(code, description, value, principal="") {
    this.code = code;
    this.description = description;
    this.value = value;
    this.principal = principal;
  }

  getValue() {
    const itemValue = this.value.split(" ")[1];
    const decimalValue = parseFloat(itemValue.replace(",", ".")).toFixed(2);
    return decimalValue;
  }
}

export { Product };
