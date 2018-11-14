import { POST_LOAN, ERROR_LOAN, GET_LOANS } from './loans.actions';

const initialState = {
  loanId: '',
  loans: [],
  loanError: {}
};

const loansReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_LOAN:
      return { ...state, loanId: action.loanId };
    case ERROR_LOAN:
      return { ...state, loanError: action.loanError };
    case GET_LOANS:
      return {...state, loans: action.loans}
    default:
      return state;
  }
};

export default loansReducer;
