import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const Header = () => {
    return (
        <div>
            <h1>This is the header</h1>
            <ul>
                <li>option 1</li>
                <li>option 2</li>
            </ul>
        </div>
    )
}

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            summonerName: undefined,
            summoner: []
        }
    }

    onSubmit = (e) => {
        const URL_TO_FETCH = 'https://br1.api.riotgames.com/lol/summoner/v3/summoners/by-name/';
        const API_KEY = 'RGAPI-087ae13e-0a64-4704-a42e-558d5df3391e';
        e.preventDefault();


        console.log('submitted ' + this.state.summonerName);

        fetch(URL_TO_FETCH + this.state.summonerName + '/?api_key=' + API_KEY).then((res) => {
            return res.json();
        }).then((data) => {
            this.setState({
                summoner: data
            })
            console.log(data);
        })

    }

    onNameChange = (e) => {
        const summonerName = e.target.value;
        this.setState(() => ({ summonerName }))
    }

    render() {
        return (
            <div>
                <p>enter summoner name</p>
                <form onSubmit={this.onSubmit}>
                    <input type="text" onChange={this.onNameChange} />
                    <button type="submit">search</button>
                </form>
            </div>
        )
    }
}

const App = () => {
    return (
        <div>
            <Header />
            <Search />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('app'));