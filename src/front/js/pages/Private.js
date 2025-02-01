import React from 'react';
import { useNavigate } from 'react-router-dom';

const Private = () => {
    const [message, setMessage] = useState('');
    const Navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            Navigate('/login');
        } else {
            actions.getProtectedData()
                .then(data => setMessage(`Hello, user ${data.logged_in_as}`))
                .catch(() => navigate('/login'));
        }
    }, [Navigate, actions]);

    return (
        <div>
            <h1>Private Page</h1>
            <p>{message}</p>
        </div>
    );
}

export default Private;