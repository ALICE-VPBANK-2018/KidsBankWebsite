import { types } from "./constants";

const initialState = {
  transactions : [],
  transaction : null,
};

const transaction = (state = initialState, action) => {
  // handle action type
  switch (action.type) {
    case types.SET_TRANSACTIONS_SUCCESS:
      // set status from action and return it
      return { ...state, transactions: action.payload.transactions};
    case types.ADD_TRANSACTION_SUCCESS:
      console.log(action.payload.transaction);
      const { username, type, amount, date, content, target} =  action.payload.transaction;
      let newTransactions = state.transactions;
      newTransactions.push({ username, type, amount, date, content, target});
      console.log(newTransactions);
      return { ...state, transactions: newTransactions };
    // case types.UPDATE_PRODUCT:
    //   // set status from action and return it
    //   for (let product in state.products) {
    //     if (state.products[product].productID === action.payload.product.productID) {
    //       state.products[product] = action.payload.product;
    //       break;
    //     }
    //   }
    //   return { ...state, products: state.product }; 
    // case types.DELETE_PRODUCT:
    //   // set status from action and return it
    //   let newProducts = [];
    //   for (let product in state.products) {
    //     let isFind = false;
    //     if (state.products[product].productID === action.payload.product.productID) {
    //       isFind = true;
    //     }
    //     if (!isFind) newProducts[Object.keys(newProducts).length] = state.products[product]; 
    //   }
    //   state.products = newProducts;
    //   return { ...state, products: state.products} ;               
    // case types.SET_PRODUCT:
    //   // set status from action and return it
    //   return { ...state, product: Object.assign({}, action.payload.product)[0] };   
    default:
      // return state
      return { ...state };
  }
};

export default transaction;
