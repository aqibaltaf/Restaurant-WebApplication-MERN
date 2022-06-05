import React, { Component, Row, Col } from 'react'
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';
import '../Menu.css';
export default class Menu extends Component {
    constructor() {
        super()
        this.state = {
            dishes: null

        }
    }

    componentDidMount() {
        fetch('http://localhost:8000/Menu').then((result) => {
            result.json().then((data) => {
                console.log("data", data)
                this.setState({ dishes: data })
            })
        })
        console.warn("state", this.state);
    }

    BBQ() {
        return (
            this.state.dishes ?
                this.state.dishes.map((dish) =>


                    dish.Category === "BBQ" ?

                        <div id="wrapper">

                            <div class="BBQ-Category">
                                <img src={dish.img_url} class="thumb-n"></img>
                                <h3 class="Title">{dish.Dish_Name}</h3>
                                <p class="Description">{dish.Description}</p>
                                <h5 class="Price">{dish.Price} PKR</h5>
                                <button id="applybutton" ><a id="ap" >ORDER</a></button>
                            </div>
                        </div>
                        :
                        null

                )
                :
                null


        )
    }

    Desi() {

        return (
            this.state.dishes ?
                this.state.dishes.map((dish) =>

                    /* --Desi Category -- */
                    dish.Category === "Desi" ?
                        <div id="wrapper">
                            <div class="Desi-Category">
                                <img src={dish.img_url} class="thumb-n"></img>
                                <h3 class="Title">{dish.Dish_Name}</h3>
                                <p class="Description">{dish.Description}</p>
                                <h5 class="Price">{dish.Price} PKR</h5>
                                <button id="applybutton" ><a id="ap" >ORDER</a></button>
                            </div>
                        </div>
                        :
                        null



                )
                :
                null
        )

    }

    render() {
        return (
            <div>
                <div>
                <div id="Desi-Banner"></div>
                </div>
                {this.Desi()}

                <div>
                <div id="BBQ-Banner"></div>
            </div>
                {this.BBQ()}

                <div>
                <div id="BBQ-Banner"></div>
            </div>
                {this.BBQ()}

                

                
                


            </div>
        )
    }
}
