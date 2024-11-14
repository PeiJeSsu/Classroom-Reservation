import React, { useState } from 'react';
import { TextField, Button, Container, FormControlLabel, Checkbox, Grid, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/register', {
                username: username.trim(),
                password: password.trim(),
                admin: isAdmin
            });
            alert(response.data);
            navigate('/login');
        } catch (error) {
            const errorMessage = error.response?.data || error.message || 'Registration failed';
            console.log(errorMessage);
            alert(`Registration failed: ${errorMessage}`);
        }
    };


    return (
        <Container>
            <Grid container direction="column" alignItems="center" justifyContent="center" spacing={2}>
                <Grid item>
                    <h2>Register</h2>
                </Grid>
                <Grid item>
                    <form onSubmit={handleRegister}>
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
                            <FormControlLabel
                                control={<Checkbox checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />}
                                label="Register as Admin"
                                sx={{ marginBottom: 2 }}
                            />
                            <Button type="submit" variant="contained" sx={{ marginBottom: 1 }}>
                                Register
                            </Button>
                            <Button variant="outlined" onClick={() => navigate('/login')}>
                                Go to Login
                            </Button>
                        </Box>
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
}

export default RegisterPage;
