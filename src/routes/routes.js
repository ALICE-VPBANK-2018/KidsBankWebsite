import React from "react";
import Loadable from 'react-loadable';

export const Loading = () => <div></div>


export const AddParent = Loadable({
  loader: () => import("../pages/bank/BankParentAccount/AddParent"),
  loading : Loading
});

export const BankParentAccount = Loadable({
  loader: () => import("../pages/bank/BankParentAccount"),
  loading : Loading
});

export const AddChildren = Loadable({
  loader: () => import("../pages/bank/BankChildrenAccount/AddChildren"),
  loading : Loading
});

export const BankChildrenAccount = Loadable({
  loader: () => import("../pages/bank/BankChildrenAccount"),
  loading : Loading
});

export const AddTransaction = Loadable({
  loader: () => import("../pages/bank/BankTransaction/AddTransaction"),
  loading : Loading
});

export const BankTransaction = Loadable({
  loader: () => import("../pages/bank/BankTransaction"),
  loading : Loading
});

export const ParentChildrenAccount = Loadable({
  loader: () => import("../pages/parent/ParentChildrenAccount"),
  loading : Loading
});

export const AddChildrenByParent = Loadable({
  loader: () => import("../pages/parent/ParentChildrenAccount/AddChildren"),
  loading : Loading
});
export const ParentTransaction = Loadable({
  loader: () => import("../pages/parent/ParentTransaction"),
  loading : Loading
});

export const ParentSendMoney = Loadable({
  loader: () => import("../pages/parent/ParentSendMoney"),
  loading : Loading
});