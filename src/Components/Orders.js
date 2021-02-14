import React from "react";
import "../App.css";
import { data } from "../data.js";


export const GetUsers = ({state}) => {



    function onCheck(){
        console.log("test");
    }
    return (
        <>
            {data.map((data, key) => {

                if(data.state === state) {
                    const prefix = "sorted";
                    return (
                        <>
                            <tr>

                                <th scope="row">{data.oID}</th>
                                <td>{data.pNumber}</td>
                                <td>{data.orderDate}</td>
                                <td>@{data.state}</td>
                                <td>
                                    <a className="btn btn-primary" data-toggle="collapse" href={'#order'+ prefix + data.oID} aria-expanded="false" aria-controls={'order'+ prefix + data.oID}>View
                                    </a>
                                </td>

                            </tr>

                            <DetailView data={data} prefix={prefix}/>


                            </>

                    );
                }else if(state === "all"){
                    const prefix = "all";
                    return (
                        <>
                        <tr>
                            <th scope="row">{data.oID}</th>
                            <td>{data.pNumber}</td>
                            <td>{data.orderDate}</td>
                            <td>@{data.state}</td>
                            <td>
                                <a className="btn btn-primary" data-toggle="collapse" href={'#order'+ prefix + data.oID} aria-expanded="false" aria-controls={'order'+ prefix  + data.oID}>View
                                </a>
                            </td>
                        </tr>
                        <DetailView data={data} prefix={prefix}/>
                        </>
                    );
                }else if(state === "customers"){

                    return(
                        <>
                        <tr>

                            <th scope="row">{data.cID}</th>
                            <td>{data.pNumber}</td>
                            <td>{data.orderDate}</td>
                            <td>@{data.ordersValue}</td>
                            <td>
                                <a className="btn btn-primary" data-toggle="collapse" href={'#order'+ state + data.oID} aria-expanded="false" aria-controls={'order'+ state + data.oID}>View
                                </a>
                                <input class="checkbox" value={data.pNumber} type="checkbox" aria-label="Checkbox for following text input"/>
                            </td>

                        </tr>

                        <DetailView data={data} prefix={state}/>


                        </>
                    )
                }
            })}
        </>
    );
};

export const GetProducts = ({oData, sort}) => {
    return (
        <tbody>
                {getProducts(oData.products, sort)}
        </tbody>
    );
};

export const GetCustomerData = ({oData}) => {
    return (
        <tbody>
        {<tr><td>Phone Number: <b>{oData.pNumber}</b></td></tr>}
            {<tr><td>Order Date: <b>{oData.orderDate}</b></td></tr>}
            {<tr><td>Status: <b>{oData.state}</b></td></tr>}
            {<tr><td>Location: <b>{oData.location}</b></td></tr>}
            {<tr><td>DeliveryDate: <b>{oData.deliveryDate}</b></td></tr>}
        </tbody>
    );
};

function getProducts(products, sort){
    const pizzas = [];
    const drinks = []
    products.forEach(product=>{
        pizzas.push(<tr><td>{product.pizza}</td></tr>);
        drinks.push(<tr><td>{product.drink}</td></tr>);
    })
    if(sort === "pizzas"){
        return pizzas;
    }else{
        return drinks;
    }
}

class DetailView extends React.Component {

    render() {
        return (
            <tr>
                <td colSpan="5">
                    <div className="collapse" id={'order'+ this.props.prefix + this.props.data.oID}>
                        <div className="row">
                            <div className="col-md-4">
                                <table>
                                    <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Pizzas</th>
                                    </tr>
                                    </thead>
                                    <GetProducts oData={this.props.data} sort={"pizzas"}/>
                                </table>
                            </div>
                            <div className="col-md-4">
                                <table>
                                    <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Drinks</th>
                                    </tr>
                                    </thead>
                                    <GetProducts oData={this.props.data} sort={"drinks"}/>
                                </table>
                            </div>
                            <div className="col-md-4">
                                <table>
                                    <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Customer</th>
                                    </tr>
                                    </thead>
                                    <GetCustomerData oData={this.props.data}/>
                                </table>
                            </div>
                        </div>
                        <br/>
                        <br/>
                        <div className="row">
                            <div className="col-md-4">
                                <table>
                                    <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Comment</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            {this.props.data.comment}
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        );
    }
}
