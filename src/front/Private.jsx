import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Private = () => {
    const [message, setMessage] = useState('');
    const history = useHistory();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            history.push('/login');
        } else {
            fetch('/api/protected', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Not authorized');
                }
            })
            .then(data => setMessage(`Hello, user ${data.logged_in_as}`))
            .catch(error => history.push('/login'));
        }
    }, [history]);

    return (
        <div>
            <h1>Private Page</h1>
            <p>{message}</p>
        </div>
    );
}

export default Private;