import React from 'react'
import { Link } from 'react-router-dom'
import '../Login.scss'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loading, handleLogin } = useAuth();
    const navigate = useNavigate()


    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await handleLogin({ email, password });
            navigate('/');

        } catch (error) {
            console.error(error);
        }
    }

    if (loading) {
        return (<main><h1>Loading.......</h1></main>)
    }

    return (
        <main className="auth-page">
            <div className="auth-shell">
                <section className="auth-panel auth-panel--brand">
                    <span className="auth-badge">Interview Planner</span>
                    <h1>Step back into your interview workspace.</h1>
                    <p>
                        Pick up where you left off, review your reports, and keep building targeted preparation plans.
                    </p>

                    <div className="auth-feature-list">
                        <div className="auth-feature-card">
                            <p className="auth-feature-card__label">Focused prep</p>
                            <strong>Technical and behavioral guidance in one place.</strong>
                        </div>
                        <div className="auth-feature-card">
                            <p className="auth-feature-card__label">Saved reports</p>
                            <strong>Return to past strategies without rebuilding from scratch.</strong>
                        </div>
                    </div>
                </section>

                <section className="auth-panel auth-panel--form">
                    <div className="auth-form-card">
                        <div className="auth-form-card__header">
                            <span className="auth-form-card__eyebrow">Welcome back</span>
                            <h2>Login</h2>
                            <p>Sign in to continue creating and reviewing your custom interview plans.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="auth-input-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    type="email" id="email" name='email' placeholder='Enter email address' />
                            </div>
                            <div className="auth-input-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    type="password" id="password" name='password' placeholder='Enter password' />
                            </div>
                            <button className='auth-submit-btn'>Login</button>
                        </form>

                        <p className="auth-switch">
                            Don&apos;t have an account? <Link to={"/register"}>Register</Link>
                        </p>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Login
