import React from "react";
import {GetOrders} from "./Orders";

export class OrdersContainer extends React.Component {
    render() {

        return (
            <>

                <div>

                    {this.props.title === 'All Customers' ?<h1>{this.props.title} <buttton className="btn btn-success sendMessageBtn" data-toggle="modal" data-target="#exampleModalCenter">Send Message
                    </buttton></h1> : <h1>{this.props.title}</h1>}

                    <table className="table">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">{ this.props.state === "customers" ? (<span>Customer ID</span>) : (<span>Order Id</span>)}</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Order Date</th>
                            <th scope="col">{ this.props.state === "customers" ? (<span>Orders Value</span>) : (<span>Status</span>)}</th>
                            <th scope="col">Detail View</th>
                        </tr>
                        </thead>
                        <tbody>
                        <GetOrders state={this.props.state}/>
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}