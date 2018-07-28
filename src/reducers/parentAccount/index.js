import { types } from "./constants";

const initialState = {
  accounts : [],
  account : null,
};

const parentAccount = (state = initialState, action) => {
  // handle action type
  switch (action.type) {
    case types.SET_PARENT_ACCOUNTS_SUCCESS:
      // set status from action and return it
      return { ...state, accounts: action.payload.accounts};
    case types.ADD_PARENT_ACCOUNT_SUCCESS:
      const { name, address, cartID, username, password } =  action.payload.account;
      let newAccounts = state.accounts
      newAccounts.push({ name, address, cartID, username, password});
      return { ...state, accounts: newAccounts };
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

export default parentAccount;

