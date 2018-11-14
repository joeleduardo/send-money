import React from 'react';
import { firestore } from '../firebase'
import PropTypes  from 'prop-types';
import Input from '../components/Input';
import Button from '../components/Button';
import List from '../components/List';
import Chart from '../components/Chart';
import './Home.css';

class Home extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      amountAvailable: 5000,
      amountSent: 0,
      amountValidationMsg: '',
      formValid: false,
      validationErrors: {
        name: '',
        email: '',
        amount: ''
      }
    }
  }

  componentDidMount() {
    this.props.getLoans(firestore.collection('loans').get());
  }

  componentDidUpdate(prevProps) {
    if (this.props.data.loans !== prevProps.data.loans) {
      const totalLoans = this.props.data.loans.reduce((total, amount) => {
        total += parseFloat(amount.amount)
        return total
      }, 0);

      this.setState({
        amountAvailable: this.state.amountAvailable - totalLoans,
        amountSent: totalLoans
      }, () => this.cleanFields());
    }
  }

  cleanFields () {
    this.setState({
      name: '',
      email: '',
      amount: '',
      formValid: false,
      validationErrors: {
        name: '',
        email: '',
        amount: ''
      }
    })
  }

  validateField(field, value) {
    const validationErrors = this.state.validationErrors;
    let name;
    let email;
    let amount;

    switch (field) {
      case 'name':
        name =  value.trim().length === 0 || value.length < 3 ? 'Please enter a valid name' : '';
        validationErrors.name = name;
        break
      case 'email':
        email = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Please enter a valid email address' : '';
        validationErrors.email = email;
        break
      case 'amount':
        amount = value.trim().length === 0 || parseFloat(value) === 0 || isNaN(Number(value)) ? 'Please enter a valid amount' : '';
        validationErrors.amount = amount;
        break
      default:
        break
    }

    this.setState({
      validationErrors
    }, () => {
      const fields = !!(this.state.name && this.state.email && this.state.amount)
      const validations = (!this.state.validationErrors.name && !this.state.validationErrors.email && !this.state.validationErrors.amount)
      this.setState({
        formValid: (fields && validations)
      })
    })
  }

  inputHandler (e) {
    const {
      value,
      name
    } = e.target;

    this.setState({
      [name]: value
    }, () => this.validateField(name, value));
  }

  timer() {
    setTimeout(() => {
      this.setState({
        amountValidationMsg: ''
      })
    }, 2000)
  }

  submitForm () {
    const {
      name,
      email,
      amount,
    } = this.state;

    const amountInt = parseFloat(amount).toFixed(2);
    const amountValidation = amountInt <= this.state.amountAvailable

    if (amountValidation) {
      const postTransaction = firestore.collection('loans').add({name, email, amount: amountInt});
      const getTransaction = firestore.collection('loans').get();
      this.props.addLoan(postTransaction, getTransaction);
    } else {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      this.setState({
        amountValidationMsg: 'You don\'t have enough money to send it'
      }, () => this.timer());
    }
  }

  render() {
    const chartLabels = ['Total sent', 'Left available']
    const chartData = [this.state.amountSent.toFixed(2), this.state.amountAvailable.toFixed(2)]

    return(
      <div className='wrapper'>
        {this.state.amountValidationMsg &&
        <div className='snackbar'>
          <div>{this.state.amountValidationMsg}</div>
        </div>
        }
        <section>
          <h1>Send Money</h1>
          <div>
            <Input name='name' validation={this.state.validationErrors.name} label='Name' value={this.state.name} prompt='Friend name' onChange={e => this.inputHandler(e)} />
            <Input name='email' validation={this.state.validationErrors.email} label='Email' value={this.state.email} prompt='friend@friend.com' onChange={e => this.inputHandler(e)} />
            <Input name='amount' validation={this.state.validationErrors.amount} label='Amount' value={this.state.amount} prompt='1000.00' currency='£' onChange={e => this.inputHandler(e)} />
            <Button text='Send' onClick={e => this.submitForm(e)} enabled={this.state.formValid}/>
          </div>
        </section>
        <section>
          <h1>My Account</h1>
          <Chart chartLabels={chartLabels} chartData={chartData}/>
          <div>
            <h3>Transactions</h3>
            {this.props.data.loans.length > 0 ? (
              <List items={this.props.data.loans}/>
            ):(
              <div className='no-items'>No transaction registered!</div>
            )}
          </div>
        </section>
      </div>
    )
  }
}

Home.propTypes = {
  data: PropTypes.object,
  getLoans: PropTypes.func,
  addLoan:PropTypes.func
}

Home.defaultProps = {
  data: {},
  getLoans: () => {},
  addLoan: () => {}
}

export default Home;
