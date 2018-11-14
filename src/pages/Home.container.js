import { connect } from 'react-redux';
import HomeComponent from './Home';
import * as LOANS_ACTIONS from '../redux/loans.actions';

const mapStateToProps = state => (
  {
    data: state.loansReducer
  }
);

const mapDispatchToProps = dispatch => (
  {
    getLoans: (getTransaction) => {
      dispatch(LOANS_ACTIONS.getLoans(getTransaction));
    },
    addLoan: (postTransaction, getTransaction) => {
      dispatch(LOANS_ACTIONS.postLoan(postTransaction, getTransaction));
    }
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
