import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import HomeContainer from './Home.container';

const mockStore = configureMockStore([thunk]);
jest.mock('../firebase');
const firebase = require('../firebase');

firebase.firestore.collection.add = (data) => {
  return new Promise((resolve, reject) => {
    if (data) {
      firebase.firestore.collection.docs.push({
        id: data.id,
        data: () => {
          return data
        }
      });
    }

    const docsCount = firebase.firestore.collection.docs.length;
    const docRef = firebase.firestore.collection.docs[docsCount-1];
    return docsCount > 0  ? resolve(docRef) : reject('error')
  })
};

firebase.firestore.collection.get = () => {
  return new Promise(resolve => {
    const docs = firebase.firestore.collection.docs;
    return resolve(docs);
  })
}

test('Home page container and addLoan function', () => {
  const store = mockStore({
    loanId: '',
    loans: [],
    loanError: {}
  });

  const params = {
    id: 'rFj2aAOIsILzHmP29VHo',
    name: 'Joel Ortiz',
    email: 'joeleduardo@hotmail.com',
    amount: '1000.00'
  };

  const cHomeContainer = shallow(<HomeContainer store={store}/>);

  const expectedAction = [{
    type: 'POST_LOAN',
    loanId: 'rFj2aAOIsILzHmP29VHo'
  },{
    type: "GET_LOANS",
    loans: [params]
  }];

  firebase.firestore.collection.docs = [];
  const postTransaction = firebase.firestore.collection.add(params);
  const getTransaction = firebase.firestore.collection.get();
  cHomeContainer.props().addLoan(postTransaction, getTransaction);

  setImmediate(() => {
    expect(cHomeContainer.update()).toMatchSnapshot();
    expect(store.getActions()).toEqual(expectedAction)
  });

});


test('Home page container and getLoans function', () => {
  const store = mockStore({
    loanId: '',
    loans: [],
    loanError: {}
  });

  const cHomeContainer = shallow(<HomeContainer store={store}/>);

  const expectedAction = [{
    type: "GET_LOANS",
    loans: []
  }];

  firebase.firestore.collection.docs = [];
  const getTransaction = firebase.firestore.collection.get();
  cHomeContainer.props().getLoans(getTransaction);

  setImmediate(() => {
    cHomeContainer.update();
    expect(store.getActions()).toEqual(expectedAction)
  });

  expect(cHomeContainer).toMatchSnapshot();
});