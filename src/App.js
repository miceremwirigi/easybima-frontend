import logo from './logo.svg';
import logo2 from './logo192.svg';
import { Component } from 'react';
import { Link, Route, Router, Routes, BrowserRouter } from 'react-router-dom';
import Cybers from './Components/Cybers'
import Customers from './Components/Customers'
import Staff from './Components/Staff'
import AddCyberForm from './Components/AddCyberForm';
import AddCustomerForm from './Components/AddCustomerForm';
import AddStaffForm from './Components/AddStaffForm';
import './App.css';
import './Components/Cybers.css';
import './Components/Customers.css'
import './Components/Staff.css'
import './Components/AddCyberForm.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cybers:[],
      isLoadingData: false,
      newcybers:[],
      customers: [],
      staff: [],
      backendUrl:process.env.REACT_APP_BACKEND_URL
    };
    this.handleCybersChange = this.handleCybersChange.bind(this);
    this.handleCustomersChange = this.handleCustomersChange.bind(this);
    this.handleStaffChange = this.handleStaffChange.bind(this);
    // this.handleCyberFormData = this.handleCyberFormData.bind(this)
  }


  // if (process.env.REACT_APP_ENVIRONMENT == "PROCUVTION"){
  //    this.setState({backendUrl:""}))
  // }

  handleCybersChange(cybers, isLoadingData){
    this.setState({
        cybers: cybers,
      }
    )
    this.setState({
        isLoadingData: isLoadingData,
      },
      () => console.log("Loading = ", this.isLoadingData)
    )
  }

  // handleCyberFormData(newcybersdata) {
  //   this.setState(newcybers => [...newcybers, newcybersdata])
  // }

  handleCustomersChange(customers){
    this.setState({customers: customers})
  }

  handleStaffChange(staff){
    this.setState({staff: staff})
  }


  render() {
    return (
      <BrowserRouter>
        <div className='container'>
          <div className='row mt-3' id='header-row'>
            <div className='col Name-Col ms-3'>
              <img src={logo2} className='App-Logo' alt='logo'/>
              <h1>Geotech</h1>            
            </div>
            <div className='col Search-Col ms-3'>
              <div className='Search-Bar'>
                <input type='text' placeholder='Search..'></input>
              </div>
            </div>
            <div className='col Profile-Col ms-3'>
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
                    <Link to={"/staff"}>
                      <div>Staff</div>
                    </Link>
                  </div>
                </div>
              </nav>
            </div>

            <div className='content-col'>
              <Routes>
              {/* <Route path='/cybers' element={this.state.isLoadingData ? <Loader /> : <Cybers cybers={this.state.cybers} isLoadingData={this.props.isLoadingData} handleCybersChange={this.handleCybersChange}/>}></Route> */}
              <Route path='/cybers' element={<Cybers cybers={this.state.cybers} isLoadingData={this.state.isLoadingData} backendUrl={this.state.backendUrl} handleCybersChange={this.handleCybersChange}/>}></Route>
                <Route path='/cybers/add' element={<AddCyberForm backendUrl={this.state.backendUrl} />}></Route>
                <Route path='/customers' element={<Customers customers={this.state.customers} backendUrl={this.state.backendUrl} handleCustomersChange={this.handleCustomersChange}/>}></Route>
                <Route path='/customers/add' element={<AddCustomerForm backendUrl={this.state.backendUrl} />}></Route>
                <Route path='/staff' element={<Staff staff={this.state.staff} backendUrl={this.state.backendUrl}  handleStaffChange={this.handleStaffChange}/>}></Route>
                <Route path='/staff/add' element={<AddStaffForm backendUrl={this.state.backendUrl}  />}></Route>
              </Routes>
            </div>

          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
