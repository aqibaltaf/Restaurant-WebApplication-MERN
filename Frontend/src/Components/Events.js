import React, { Component } from 'react'

export default class Events extends Component {
    constructor() {
        super()
        this.state = {
            events: null

        }
    }

    componentDidMount() {
        fetch('http://localhost:8000/Events').then((result) => {
            result.json().then((data) => {
                console.log("data", data)
                this.setState({ events: data })
            })
        })
    }
    render() {
        return (
            <div>
                {
                    this.state.events ?
                        this.state.events.map((event) =>
                            
                            event.Feature == "0" ?
                            <div>
                                <img src={event.Banner}  class = "banner"></img>
                                <h3 class="first-txt">{event.Title}</h3>
                                <p class="second-txt">{event.Subtext}</p>
                                
                            </div>
                            :
                            <div id="wrapper">
                                <div class="twoColumn">
                                    <img src={event.Thumb} class="thumb"></img>
                                    <h3>{event.Title}</h3>
                                    <p>{event.Subtext}</p>
                                    <h4>PROGRAMME FEE</h4>
                                    <h5>{event.Fee}</h5>
                                    <button id="applybutton" ><a id="ap" href={event.New_url}>APPLY NOW</a></button>
                                    <button id="readdetails"><a id="rd" href={event}>READ DETAILS</a></button>
    
                                   
                                </div>
                            </div>
                         

                        )
                        :
                        null
                }
                <Footer />
            </div>
            
        )
    }
}

