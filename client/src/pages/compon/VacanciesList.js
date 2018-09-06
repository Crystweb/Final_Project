import React, {Component} from 'react'
import axios from 'axios';

class VacanciesList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            date: []
        }
    }

    componentWillMount () {
        axios.get('/position')
            .then(response => this.setState({date: response.data}))
    }

    render() {
        const {date} = this.state;

        return (
            <div>
                {date.map(user =>
                    <p>{user.title}</p>
                )}
            </div>
           )
    }
}

export default VacanciesList