import products from "./products";

describe("products", () => {
  const init = [
    {
      id: "1",
      name: "nuts",
      price: 100,
      stock: 2,
      unit: "kg",
      ingredients: [
        { id: "1", amount: 10 },
        { id: "2", amount: 30 },
      ],
    },
    {
      id: "2",
      name: "peanut",
      price: 150,
      stock: 10,
      unit: "kg",
      ingredients: [
        { id: "1", amount: 10 },
        { id: "3", amount: 24 },
      ],
    },
  ];
  it("should get all products if action.type === 'GET_PRODUCTS'", () => {
    const state = [];
    const action = {
      type: "GET_PRODUCTS",
      payload: [
        {
          id: "1",
          name: "nuts",
          price: 100,
          stock: 2,
          unit: "kg",
          ingredients: [
            { id: "1", amount: 10 },
            { id: "2", amount: 30 },
          ],
        },
        {
          id: "2",
          name: "peanut",
          price: 150,
          stock: 10,
          unit: "kg",
          ingredients: [
            { id: "1", amount: 10 },
            { id: "3", amount: 24 },
          ],
        },
      ],
    };
    const nextState = products(state, action);
    expect(nextState).toStrictEqual(action.payload);
  });

  it("should modify product if action.type === 'MODIFY_PRODUCT'", () => {
    const state = [...init];
    const action = {
      type: "MODIFY_PRODUCT",
      payload: {
        id: "1",
        name: "nutz",
        price: 20,
        stock: 10,
        unit: "kg",
        ingredients: [
          { id: "4", amount: 5 },
          { id: "2", amount: 30 },
        ],
      },
    };
    const nextState = products(state, action);
    expect(nextState).toStrictEqual([
      {
        id: "1",
        name: "nutz",
        price: 20,
        stock: 10,
        unit: "kg",
        ingredients: [
          { id: "4", amount: 5 },
          { id: "2", amount: 30 },
        ],
      },
      {
        id: "2",
        name: "peanut",
        price: 150,
        stock: 10,
        unit: "kg",
        ingredients: [
          { id: "1", amount: 10 },
          { id: "3", amount: 24 },
        ],
      },
    ]);
  });

  it("should add product if action.type === 'ADD_PRODUCT'", () => {
    const state = [...init];
    const action = {
      type: "ADD_PRODUCT",
      payload: {
        id: "3",
        name: "special",
        price: 1000,
        stock: 5,
        unit: "kg",
        ingredients: [
          { id: "4", amount: 5 },
          { id: "2", amount: 30 },
          { id: "5", amount: 50 },
        ],
      },
    };
    const nextState = products(state, action);
    expect(nextState).toStrictEqual([
      ...init,
      {
        id: "3",
        name: "special",
        price: 1000,
        stock: 5,
        unit: "kg",
        ingredients: [
          { id: "4", amount: 5 },
          { id: "2", amount: 30 },
          { id: "5", amount: 50 },
        ],
      },
    ]);
  });

  it("should remove product if action.type === 'REMOVE_PRODUCT'", () => {
    const state = [...init];
    const action = {
      type: "REMOVE_PRODUCT",
      payload: {
        id: "1",
        name: "nuts",
        price: 100,
        stock: 2,
        unit: "kg",
        ingredients: [
          { id: "1", amount: 10 },
          { id: "2", amount: 30 },
        ],
      },
    };
    const nextState = products(state, action);
    expect(nextState).toStrictEqual([
      {
        id: "2",
        name: "peanut",
        price: 150,
        stock: 10,
        unit: "kg",
        ingredients: [
          { id: "1", amount: 10 },
          { id: "3", amount: 24 },
        ],
      },
    ]);
  });
});
