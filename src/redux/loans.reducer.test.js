import reducers from './loans.reducer';
import { POST_LOAN, ERROR_LOAN, GET_LOANS } from './loans.actions'

const id = 'rFj2aAOIsILzHmP29VHo';

const doc = {
  name: 'Joel Ortiz',
  email: 'joeleduardo@hotmail.com',
  amount: '1000.00'
};

const initialState = {
  loanId: '',
  loans: [],
  loanError: {}
};

test('Init state', () => {
  expect(reducers(undefined, {})).toEqual(
    {
      ...initialState
    }
  )
});

test('Post state', () => {
  expect(
    reducers(initialState, {
      type: POST_LOAN,
      loanId: id
    })
  ).toEqual(
    {
      ...initialState,
      loanId: id
    }
  )
});

test('Post error state', () => {
  expect(
    reducers(initialState, {
      type: ERROR_LOAN,
      loanError: {}
    })
  ).toEqual(
    {
      ...initialState
    }
  )
});

test('Get state', () => {
  expect(
    reducers(initialState, {
      type: GET_LOANS,
      loans: [doc]
    })
  ).toEqual(
    {
      ...initialState,
      loans: [doc]
    }
  )
});