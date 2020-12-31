import React from "react";
import {State} from "react-powerplug";

export class SendPushMessageModal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {phonenumbers: [], value:''};


        this.handleOnCheck = this.handleOnCheck.bind(this);
        this.addPhoneNumber = this.addPhoneNumber.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOnCheck();
    }

    handleOnCheck() {
        let checkboxes = document.getElementsByClassName("checkbox");
        let selectedNumbers = this.state.phonenumbers
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked && !selectedNumbers.includes(checkboxes[i].value)) {
                console.log("test " + checkboxes[i].value)
                selectedNumbers.push(checkboxes[i].value)

            }
        }
        this.setState({phonenumbers: selectedNumbers});
        console.log(this.state.phonenumbers)

    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    addPhoneNumber(){
        let selectedNumbers = this.state.phonenumbers;
        let newNumber = this.state.value;
        selectedNumbers.push(newNumber);
        this.setState({phonenumbers: selectedNumbers});
    }

    render() {
        return (
            <State initial={{ }}>
                {({ state, setState }) => (
                    <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog"
                         aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered push-message-modal" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    <h5 className="modal-title" id="exampleModalLongTitle"><h3>Push Message</h3></h5>
                                </div>
                                <div className="modal-body">
                                    <form className="modal-form">
                                        <div className="input-group modal-input-group mb-3">
                                            <div className="input-group-prepend">
                                                <label className="input-group-text text-left"
                                                       htmlFor="inputGroupSelect01">Choose
                                                    your Message</label>
                                            </div>
                                            <select className="custom-select custom-select-lg mb-3">
                                                <option selected>Open this select menu</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                        </div>
                                    </form>
                                    <form className="modal-form add-phone-number">
                                        <div className="input-group modal-input-group mb-3">
                                            <div className="input-group-prepend">
                                                <label className="input-group-text text-left">Add a Phone number</label>
                                            </div>
                                            <input type="text" className="form-control" placeholder="+00 12 345 67 89" value={this.state.value} onChange={this.handleChange}/>
                                        </div>

                                        <button onClick={this.addPhoneNumber} type="button" className="btn add-phone-number btn-primary">
                                            Add phone number
                                        </button>
                                    </form>
                                    <div className="modal-txt">
                                        <p>Are you Sure to send the Message to the <a onClick={this.handleOnCheck}
                                                                                      data-toggle="collapse"
                                                                                      href={'#customer-to-send-list'}
                                                                                      aria-expanded="false"
                                                                                      aria-controls={'customer-to-send-list'}>list</a> of
                                            following Customers?</p>
                                        <div className="" id="customer-to-send-list">
                                            <table className={'table'}>
                                                <thead className={'thead-dark'}>
                                                    <tr>
                                                        <td>
                                                            Phone number
                                                        </td>
                                                        <td></td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        {this.state.phonenumbers.map((number) =>
                                                            <>
                                                            <td>{number}</td>
                                                            <td>CROSS</td>
                                                            </>
                                                        )}
                                                    </tr>
                                                </tbody>
                                            </table>

                                            hellooo
                                        </div>
                                        <button type="button" className="btn btn-success">Yes!</button>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </State>

        );
    }
}