import React from 'react';
import './profile.css';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.defaultUsername = 'somebody';
        this.state = {
            username: this.defaultUsername,
        }
    }

    componentDidMount() {
        const savedUsername = localStorage.getItem('savedUsername');
        if (!savedUsername) {
            localStorage.setItem('savedUsername', this.defaultUsername);
        }
        this.setState({username: savedUsername});
    }

    render() {
        const { username } = this.state;
        return (
            <main>
                <h1>Profile</h1>

                <label htmlFor='username'>User Name</label>

                <input
                    type='text'
                    id='username'
                    value={username}
                    onChange={(event) => this.setState({username: event.target.value})}
                />

                <button
                    className='save-btn'
                    onClick={() => localStorage.setItem('savedUsername', username)}
                >
                    Save
                </button>
            </main>
        );
    }
}