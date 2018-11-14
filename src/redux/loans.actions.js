export const POST_LOAN = 'POST_LOAN';
const loanAdded = data => (
  {
    type: POST_LOAN,
    loanId: data
  }
);

export const ERROR_LOAN = 'ERROR_LOAN';
const loanError = data => (
  {
    type: ERROR_LOAN,
    loanError: data
  }
);

export const GET_LOANS = 'GET_LOANS';
const loans = data => (
  {
    type: GET_LOANS,
    loans: data
  }
);

export const getLoans = (transaction) => (
  dispatch => (
    transaction.then(querySnapShot => {
      const docs = []
      querySnapShot.forEach(doc => {
        docs.push({...doc.data(), id: doc.id})
      })
      dispatch(loans(docs))
    })
  )
)

export const postLoan = (postTransaction, getTransaction) => (
  dispatch => (
    postTransaction.then((docRef) => {
      dispatch(loanAdded(docRef.id));
      dispatch(getLoans(getTransaction));
    }).catch((error) => {
      dispatch(loanError(error));
    })
  )
);