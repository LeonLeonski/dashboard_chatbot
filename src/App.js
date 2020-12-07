import logo from './logo.svg';
import './App.css';

import React from "react";
import { GetOrders } from "./orders";



function App() {

  return (
    <div className="App">
        <div class="heading">

        </div>
        <div class="tables">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" id="pending-tab" data-toggle="tab" href="#pending" role="tab"
                       aria-controls="pending" aria-selected="true">Pending</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="sent-tab" data-toggle="tab" href="#sent" role="tab"
                       aria-controls="sent" aria-selected="false">sent</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="history-tab" data-toggle="tab" href="#history" role="tab"
                       aria-controls="history" aria-selected="false">History</a>
                </li>
            </ul>

            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade in active" id="pending" role="tabpanel" aria-labelledby="pending-tab">
                    <OrdersContainer state={"pending"} title={"New Orders"}/>
                </div>
                <div className="tab-pane fade" id="sent" role="tabpanel" aria-labelledby="sent-tab">
                    <OrdersContainer state={"sent"} title={"Sent Orders"}/>
                </div>
                <div className="tab-pane fade" id="history" role="tabpanel" aria-labelledby="history-tab">
                    <OrdersContainer state={"all"} title={"All Orders"}/>
                </div>
            </div>
        </div>
    </div>
  );
}


export default App;

class OrdersContainer extends React.Component {

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">Order ID</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Order Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Detail View</th>
                    </tr>
                    </thead>
                    <tbody>
                        <GetOrders state={this.props.state}/>
                    </tbody>
                </table>
            </div>
        );
    }
}
