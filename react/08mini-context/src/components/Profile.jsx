import React from 'react';
import UserContext from '../context/UserContext';
import { useContext } from 'react';


function Profile() {
    const {user} = useContext(UserContext);

    if(!user) return <h1>Not Logged In!</h1>
    return (
        <div style={styles.container}>
            <div style={styles.profileBox}>
                <h2 style={styles.title}>Profile</h2>
                <p style={styles.text}><strong>Username:</strong> {user.username}</p>
                <p style={styles.text}><strong>Password:</strong> {user.password}</p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#f3f4f6',
    },
    profileBox: {
        padding: '20px 40px',
        backgroundColor: '#fff',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        textAlign: 'center',
    },
    title: {
        fontSize: '24px',
        color: '#333',
        marginBottom: '20px',
    },
    text: {
        fontSize: '16px',
        color: '#555',
        marginBottom: '10px',
    },
};  

export default Profile;
