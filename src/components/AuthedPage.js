import React from "react";
import firebase from "firebase";
import { OrdersContainer} from "./OrdersContainer"
import { SendPushMessageModal} from "./SendPushMessageModal"

export class AuthedPage extends React.Component{
    render() {
        return (

            <div className="App">
                <SendPushMessageModal />
                <div className="heading">
                    <button onClick={async () => {
                        await firebase
                            .app()
                            .auth()
                            .signOut();
                    }}>
                        Sign Out
                    </button>
                </div>
                <div className="tables">
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
                        <li className="nav-item">
                            <a className="nav-link" id="customers-tab" data-toggle="tab" href="#customers" role="tab"
                               aria-controls="customers" aria-selected="false">Customers</a>
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
                        <div className="tab-pane fade" id="customers" role="tabpanel" aria-labelledby="customers-tab">
                            <OrdersContainer state={"customers"} title={"All Customers"}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}