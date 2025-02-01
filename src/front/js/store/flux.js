const getState = ({ getStore, getActions, setStore }) => ({
    store: {
        demo: [],
        user: null,
        message: null
    },
    actions: {
        register: async (email, password) => {
            const response = await fetch(`${process.env.BACKEND_URL}/api/register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})
            });
            return await response.json();
        },

        login: async (email, password) => {
            const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})
            });
            const data = await response.json();
            if(response.ok) sessionStorage.setItem('token', data.token);
            return data;
        },

        getProtectedData: async () => {
            const token = sessionStorage.getItem('token');
            const response = await fetch(`${process.env.BACKEND_URL}/api/protected`, {
                headers: {'Authorization': `Bearer ${token}`}
            });
            return await response.json();
        },

        getMessage: () => {
            console.log("Hello from getMessage");
        }
    }
});

export default getState;
