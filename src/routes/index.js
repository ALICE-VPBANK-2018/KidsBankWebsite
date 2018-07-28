import React from 'react';
import {Route} from 'react-router';
import {AddParent, BankParentAccount, AddChildren, BankChildrenAccount, AddTransaction,
          BankTransaction, ParentChildrenAccount, AddChildrenByParent, ParentTransaction,
        ParentSendMoney } from './routes';
import Bank from '../pages/bank/Bank';
import Parent from '../pages/parent/Parent';
export default (
  <Route>
    <Route component={Bank}>
      <Route path="/admin/parent" component={BankParentAccount} />
      <Route path="/admin/parent/add" component={AddParent} />
      <Route path="/admin/children/add" component={AddChildren} />
      <Route path="/admin/children" component={BankChildrenAccount} />
      <Route path="/admin/transaction/add" component={AddTransaction} />
      <Route path="/admin/transaction" component={BankTransaction} />
    </Route>
    
    <Route component={Parent}>
      <Route path="/parent/children" component={ParentChildrenAccount} />
      <Route path="/parent/children/add" component={AddChildrenByParent} />
      <Route path="/parent/transaction" component={ParentTransaction} />
      <Route path="/parent/send" component={ParentSendMoney} />
    </Route>
  </Route>
);