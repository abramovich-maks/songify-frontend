import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";

interface Song {
    id: number;
    name: string;
    genre: {
        id: number;
        name: string;
    };
}

function App(): JSX.Element {
    const [songs, setSongs] = useState<Song[] | null>(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/songs', {
                    withCredentials: true
                });
                setSongs(response.data);
            } catch (error) {
                console.error('Error fetching songs:', error);
            }
        };

        fetchData();
    }, []);

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await axios.post('/token', {
                username,
                password
            }, {
                withCredentials: true
            });
            window.location.reload();
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    if (songs !== null) {
        return (
            <div>
                <h1>Home</h1>
                <pre>{JSON.stringify(songs, null, 2)}</pre>
            </div>
        );
    }

    return (
        <div>
            <h1>Songify</h1>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default App;