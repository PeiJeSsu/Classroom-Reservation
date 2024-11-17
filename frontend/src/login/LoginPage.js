import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();  // Initialize navigate

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/login', { username, password });
            localStorage.setItem('isLoggedIn', 'true');
            alert(response.data);
            navigate('/');
        } catch (error) {
            const errorMessage = error.response?.data || error.message || 'Error during login';
            alert(`Error during login: ${errorMessage}`);
        }
    };

    return (
        <Container>
            <Grid container direction="column" alignItems="center" justifyContent="center" spacing={2}>
                <Grid item>
                    <h2>Login</h2>
                </Grid>
                <Grid item>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <TextField
                            required
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            sx={{ marginBottom: 2, width: '300px' }}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                        <TextField
                            required
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ marginBottom: 2, width: '300px' }}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                        <Button variant="contained" onClick={handleLogin} sx={{ marginBottom: 2 }}>
                            Login
                        </Button>
                        <Button variant="outlined" onClick={() => navigate('/register')}>
                            Go to Register
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default LoginPage;
