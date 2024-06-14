import logo from './logo.svg';
import logo2 from './logo192.svg';
import { Component } from 'react';
import { Link, Route, Router, Routes, BrowserRouter } from 'react-router-dom';
import Cybers from './Components/Cybers'
import Customers from './Components/Customers'
import Staff from './Components/Staff'
import AddCyberForm from './Components/AddCyberForm';
import './App.css';
import './Components/Cybers.css';
import './Components/Customers.css'
import './Components/Staff.css'
import './Components/AddCyberForm.css';

// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {cybers:[]};
    this.state = {newcybers:[]};
    this.state = {customers: []};
    this.state = {staff: []};
    this.handleCybersChange = this.handleCybersChange.bind(this);
    this.handleCustomersChange = this.handleCustomersChange.bind(this);
    this.handleStaffChange = this.handleStaffChange.bind(this);
    // this.handleCyberFormData = this.handleCyberFormData.bind(this)
  }

  handleCybersChange(cybers){
    this.setState({cybers: cybers})
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
                <Route path='/cybers' element={<Cybers cybers={this.state.cybers} handleCybersChange={this.handleCybersChange}/>}></Route>
                <Route path='/cybers/add' element={<AddCyberForm />}></Route>
                <Route path='/customers' element={<Customers customers={this.state.customers} handleCustomersChange={this.handleCustomersChange}/>}></Route>
                <Route path='/staff' element={<Staff staff={this.state.staff} handleStaffChange={this.handleStaffChange}/>}></Route>
              </Routes>
            </div>

          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
