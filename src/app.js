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
            loading: false,
            summonerPosition: false,
            positions: {
                'RANKED_FLEX_SR': 'Ranked FLex',
                'RANKED_SOLO_5x5': 'Ranked Solo 5x5'
            },
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({loading: true});

        const SUMMONERS_BY_NAME = 'https://br1.api.riotgames.com/lol/summoner/v3/summoners/by-name/';
        const POSITION_BY_SUMMONER = 'https://br1.api.riotgames.com/lol/league/v3/positions/by-summoner/';
        const API_KEY = 'RGAPI-087ae13e-0a64-4704-a42e-558d5df3391e';

        fetch(SUMMONERS_BY_NAME + this.state.summonerName + '/?api_key=' + API_KEY).then((res) => res.json())
        .then((data) => {
            if (data.id) {
                // using summoner id to fetch queue position data
                fetch(POSITION_BY_SUMMONER + data.id + '/?api_key=' + API_KEY).then((res) => res.json())
                .then((data) => {
                    // mapping because there may be more than one queue type
                    this.setState({
                        summonerPosition: data,
                        loading: false
                    });

                    console.log(this.state.summonerPosition);
                })
            }

            this.setState({
                summonerPosition: undefined,
                loading: false
            })
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
                    {this.state.loading && <span>loading...</span>}
                </form>
                <h1>{this.state.summonerName}</h1>
                {
                    this.state.summonerPosition ? 
                    this.state.summonerPosition.map((position) => {
                        return (
                            <div key={position.leagueId}>
                                <h2>{this.state.positions[position.queueType]}</h2>
                                <p>position: {position.tier} | {position.rank}</p>
                            </div>
                        )
                    })
                : <p>summoner not found</p>}
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