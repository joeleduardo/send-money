import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as LOANS_ACTIONS from './loans.actions';

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

test('Post and get loans', () => {
  const store = mockStore({});

  const params = {
    id: 'rFj2aAOIsILzHmP29VHo',
    name: 'Joel Ortiz',
    email: 'joeleduardo@hotmail.com',
    amount: '1000.00'
  };

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

  return store.dispatch(LOANS_ACTIONS.postLoan(postTransaction, getTransaction)).then(() => {
    expect(store.getActions()).toEqual(expectedAction)
  });
})

test('Get loans', () => {
  const store = mockStore({});

  const expectedAction = [{
    type: "GET_LOANS",
    loans: []
  }];

  firebase.firestore.collection.docs = [];
  const getTransaction = firebase.firestore.collection.get();

  return store.dispatch(LOANS_ACTIONS.getLoans(getTransaction)).then(() => {
    expect(store.getActions()[0]).toEqual(expectedAction[0])
  });
})

test('Error post loan', () => {
  const store = mockStore({});

  const expectedAction = [{
    type: 'ERROR_LOAN',
    loanError: 'error'
  }];

  firebase.firestore.collection.docs = [];
  const postTransaction = firebase.firestore.collection.add();
  return store.dispatch(LOANS_ACTIONS.postLoan(postTransaction)).then(() => {
    expect(store.getActions()[0]).toEqual(expectedAction[0])
  });
})
