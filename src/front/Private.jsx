import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Private = () => {
    const [message, setMessage] = useState('');
    const Navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            history.push('/login');
        } else {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
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
            .catch(Error => Navigate('/login'));
        }
    }, [Navigate]);

    return (
        <div>
            <h1>Private Page</h1>
            <p>{message}</p>
        </div>
    );
}

export default Private;