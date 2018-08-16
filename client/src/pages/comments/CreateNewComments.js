import React, {Component} from 'react'
import axios from 'axios';

class CreateNewComments extends Component {

    handleSubmit = event => {
        event.preventDefault();
        axios.post(`http://localhost:9000/comment`,{
            uid : this.state.uid,
            message: this.state.message,
            workshift: this.state.workshift
        })
    };

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            workshift: '',
        };
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleWorkshiftChange = this.handleWorkshiftChange.bind(this);
    }

    handleMessageChange(event) {
        event.preventDefault();
        this.setState({message: event.target.value});
    }

    handleWorkshiftChange(event) {
        event.preventDefault();
        this.setState({workshift: event.target.value});
    }

    render() {
        return (
            <div className="container">
                <h3>Добавить комментарий по смене</h3><br/>
                <form onSubmit={this.handleSubmit}>

                    <p><textarea placeholder={'Введите Ваш коментарий'} name={"message"} value={this.state.message} onChange={this.handleMessageChange}/></p>
                    <p><select name={"workshift"} value={this.state.workshift} onChange={this.handleWorkshiftChange}>
                        <option>Смена 1</option>
                        <option>Смена 2</option>
                        <option>Смена 3</option>
                        <option>Смена 4</option>
                        <option>Смена 5</option>
                        <option>Смена 6</option>
                        <option>Смена 7</option>
                    </select></p>
                    <br/>
                    <p><input type="submit" value=" Добавить комментарий "/></p>

                </form>
            </div>
        )
    }
}
export default CreateNewComments
