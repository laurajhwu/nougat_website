function handleQuantityChange(event) {
  const cartItems = [
    {
      image:
        "https://files.meilleurduchef.com/mdc/photo/recipe/nougat/nougat-1200.jpg",
      name: "綜合堅果",
      qty: 2,
      price: 300,
      id: "SWMaWhi55Pho0Vdcm5El",
      stock: 10,
    },
    {
      image:
        "https://files.meilleurduchef.com/mdc/photo/recipe/nougat/nougat-1200.jpg",
      name: "綜合堅果",
      qty: 2,
      price: 300,
      id: "SWMaWhi55Pho0Vdcm5El",
      stock: 10,
    },
  ];
  const product = cartItems.find(
    (cartItem) => cartItem.id === event.target.getAttribute("name")
  );
  product.qty = Number(event.target.value);
}

export default handleQuantityChange;
