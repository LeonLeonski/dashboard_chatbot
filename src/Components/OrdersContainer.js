import React from "react";
import {GetUsers} from "./Users";

export class OrdersContainer extends React.Component {
    render() {

        return (
            <>

                <div>
                    <table className="table">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Phone number</th>
                            <th scope="col">Role</th>
                            <th scope="col">SO ID</th>
                        </tr>
                        </thead>
                        <tbody>
                        <GetUsers state={this.props.state}/>
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}
