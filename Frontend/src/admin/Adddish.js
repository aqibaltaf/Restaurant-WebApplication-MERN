import React, { Component } from 'react'
import axios from 'axios';
import Navbar from './AdminNavbar';


 class AddDish extends Component {
    constructor(props) {
		super(props)

		this.state = {
			Dish_Name: '',
			Price: '',
			Category: '',
            Serving: '',
            Description: '',
            img_url: ''
		}
	}

	

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	submitHandler = e => {
		e.preventDefault()
		console.log(this.state)
		axios.post('http://localhost:8000/Menu/Add', this.state)
			.then(response => {
				console.log(response)
				alert("Dish Has been added Successfully");
			})
			.catch(error => {
				console.log(error)
			})
	}

	render() {
		const { Dish_Name, Price, Category,Serving,Description,img_url } = this.state
		return (
			<>
			<Navbar/>
			<div className="register-photo">
            <div className="form-container">
                 <div className="image-holder-dish">
                    </div>
				<form onSubmit={this.submitHandler}>
				<h2 className="text-center"><strong>Add Dish</strong></h2>
					<div className="form-group">
						
						<input 
						    placeholder="Dish Name"
							type="text"
							name="Dish_Name"
							value={Dish_Name}
							onChange={this.changeHandler}
						/>
						<br/>
                        <br/>
					</div>

					<div className="form-group">
						<input
						    placeholder="Price"
							type="number"
							name="Price"
							value={Price}
							onChange={this.changeHandler}
						/>
						<br/>
                        <br/>
					</div>

					<div className="form-group">
						<input
						    placeholder="Category"
							type="text"
							name="Category"
							value={Category}
							onChange={this.changeHandler}
						/>
						<br/>
                        <br/>
					</div>

                    <div className="form-group">
						<input
						    placeholder="Serving"
							type="text"
							name="Serving"
							value={Serving}
							onChange={this.changeHandler}
						/>
						<br/>
                        <br/>
					</div>

                    <div className="form-group">
						<input
						    placeholder="Dish Description"
							type="text"
							name="Description"
							value={Description}
							onChange={this.changeHandler}
						/>
						<br/>
                        <br/>
					</div>

                    <div className="form-group">
						<input
						    placeholder="Dish image Url"
							type="text"
							name="img_url"
							value={img_url}
							onChange={this.changeHandler}
						/>
						<br/>
                        <br/>
					</div>
					<div className="form-group"><button className="btn btn-primary btn-block" type="submit">ADD</button></div>
					
					<br/>
                    <br/>
				</form>
			</div>
		</div>
	</>
		)
	}
   
}

export default AddDish;