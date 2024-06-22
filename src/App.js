import logo from './logo.svg';
import logo2 from './logo192.svg';
import { Component } from 'react';
import { Link, Route, Router, Routes, BrowserRouter, useParams } from 'react-router-dom';
import Home from './Components/Home';
import Cybers from './Components/Cybers/Cybers'
import Customers from './Components/Customers/Customers'
import Staff from './Components/Staff/Staff'
import Policies from './Components/Policies/Policies';
import AddCyberForm from './Components/Cybers/AddCyberForm';
import AddCustomerForm from './Components/Customers/AddCustomerForm';
import AddStaffForm from './Components/Staff/AddStaffForm';
import AddPolicyForm from './Components/Policies/AddPolicyForm';
import './App.css';
import './Components/Cybers/Cybers.css';
import './Components/Cybers/AddCyberForm.css';
import './Components/Customers/Customers.css'
import './Components/Customers/AddCustomerForm.css';
import './Components/Customers/CustomerView.css'
import './Components/Staff/Staff.css'
import './Components/Staff/AddStaffForm.css'
import './Components/Policies/Policies.css'
import './Components/Policies/AddPolicyForm.css'
import CustomerView from './Components/Customers/CustomerView';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cybers:[],
      newcybers:[],
      customers:[],
      staff: [],
      isLoadingData: false,
      policies: [],
      newpolicy:{
        policy_number: "",
        type: "",
        issued_at:"",
        expires_at:"",
        owner_id: "",
        item_identifier: ""
      },         
};
    
    this.handleCybersChange = this.handleCybersChange.bind(this);
    this.setLoadingState = this.setLoadingState.bind(this);
    this.handleCustomersChange = this.handleCustomersChange.bind(this);
    this.handlePoliciesChange = this.handlePoliciesChange.bind(this);
    this.handlePolicyFormData = this.handlePolicyFormData.bind(this)
    this.handleStaffChange = this.handleStaffChange.bind(this);
    this.handleNewPolicyState = this.handleNewPolicyState.bind(this);
    // this.handleCyberFormData = this.handleCyberFormData.bind(this)
  }

  handleCybersChange(cybers){
    this.setState({
        cybers: cybers,
      }
    )
  }

  setLoadingState(value){
    this.setState({
      isLoadingData: value,
    },
    () => console.log("Loading = ", this.state.policies)
  )
  }

  // handleCyberFormData(newcybersdata) {
  //   this.setState(newcybers => [...newcybers, newcybersdata])
  // }

  handleCustomersChange(customers){
    this.setState({customers: customers})
  }

  handlePoliciesChange(policies){
    this.setState({policies: policies})
  }


  // Retreives values from form entries
  // as they are types and updates new policy state  
  handlePolicyFormData(formEntry) {
    const addedpolicy = {...this.state.newpolicy}
    addedpolicy[formEntry.target.id] = formEntry.target.value
    this.handleNewPolicyState(addedpolicy);
  }

  // Sets state of newpolicy in parent from a passed policy object
  handleNewPolicyState(addedpolicy){
    this.setState({newpolicy: addedpolicy});
  }

  handleStaffChange(staff){
    this.setState({staff: staff})
  }


  render() {
    const CustomerWrapperWithRouter = (props) => {
      const params = useParams();
      return (<CustomerView 
          {...{...props, match: {params}} }
        />)
    }
    return (
      <BrowserRouter>
        <div className='container'>

          <div className='row mt-3' id='header-row'>
            <Link to={"/"}>
            <div className='Name-Col ms-3'>
              <img src={logo2} className='App-Logo' alt='logo'/>
              <h1>Geotech</h1>            
            </div>
            </Link>
            <div className='Search-Col ms-3'>
              <div className='Search-Bar'>
                <input type='text' placeholder='Search..'></input>
              </div>
            </div>
            <div className='Profile-Col ms-3'>
              <h3 >Profile</h3>
            </div>
          </div>

          <div className='row mt-5' id='body-row'>
            
            <div className='nav-col'>
              <nav>
                <div className='list-group'>
                  <div className='list-group-item'>
                    <Link to={"/customers"}>
                      <div>Customers</div>
                    </Link>
                  </div>               
                  <div className='list-group-item'>
                    <Link to={"/cybers"}>
                      <div>Cybers</div>
                    </Link>
                  </div>
                  <div className='list-group-item'>
                    <Link to={"/staff"}>
                      <div>Staff</div>
                    </Link>
                  </div>
                  <div className='list-group-item'>
                    <Link to={"/policies"}>
                      <div>Policies</div>
                    </Link>
                  </div>
                </div>
              </nav>
            </div>

            <div className='content-col'>
              <Routes>

                <Route path='/' element={<Home />}>
                </Route>

                <Route 
                  path='/cybers' 
                  element={<Cybers cybers={this.state.cybers}
                  isLoadingData={this.state.isLoadingData} 
                  handleCybersChange={this.handleCybersChange} 
                  setLoadingState={this.setLoadingState} />}>
                </Route>

                <Route 
                  path='/cybers/add' 
                  element={<AddCyberForm />}>                  
                </Route>

                <Route 
                  path='/customers' 
                  element={<Customers 
                    customers={this.state.customers}
                    isLoadingData={this.state.isLoadingData} 
                    handleCustomersChange={this.handleCustomersChange} 
                    setLoadingState={this.setLoadingState} />}
                  >
                </Route>

                <Route 
                  path='/customers/add'
                  element={<AddCustomerForm
                    newpolicy={this.state.newpolicy}
                    handleNewPolicyState={this.handleNewPolicyState}
                    handlePolicyFormData={this.handlePolicyFormData} />}
                  >
                </Route>

                {/* Route to view one customer */}
                <Route
                  path='/customers/:id'
                  element={<CustomerWrapperWithRouter />}
                >

                </Route>

                <Route
                  path='/staff'
                  element={<Staff staff={this.state.staff}
                  handleStaffChange={this.handleStaffChange}/>}>
                </Route>

                <Route
                  path='/staff/add'
                  element={<AddStaffForm />}>
                </Route>

                <Route
                  path='/policies'
                  element={<Policies
                  policies={this.state.policies}
                  isLoadingData={this.state.isLoadingData}
                  handlePoliciesChange={this.handlePoliciesChange}
                  setLoadingState={this.setLoadingState} />}>
                </Route>

                <Route
                  path='/policies/add'
                  element={<AddPolicyForm
                  newpolicy={this.state.newpolicy}
                  handleNewPolicyState={this.handleNewPolicyState}
                  handlePolicyFormData={this.handlePolicyFormData} /> }
                  >
                </Route>
                
              </Routes>
            </div>

          </div>
          <div className='row mt-3' id='footer-row'>
              <p>&copy;Geotech2024 </p>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
