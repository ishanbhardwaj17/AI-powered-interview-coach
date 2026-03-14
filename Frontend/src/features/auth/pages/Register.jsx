import React from 'react'
import { Link } from 'react-router-dom'
import '../Register.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { loading, handleRegister } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await handleRegister({username, email, password});
            navigate('/')

        } catch (error) {
            console.log(error)
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
                    <h1>Create an account and build your first strategy.</h1>
                    <p>
                        Turn a job description and your profile into a sharper, more structured interview plan.
                    </p>

                    <div className="auth-feature-list">
                        <div className="auth-feature-card">
                            <p className="auth-feature-card__label">Personalized output</p>
                            <strong>Generate role-specific questions, gaps, and roadmaps.</strong>
                        </div>
                        <div className="auth-feature-card">
                            <p className="auth-feature-card__label">Fast setup</p>
                            <strong>Start with a resume upload or a quick self-description.</strong>
                        </div>
                    </div>
                </section>

                <section className="auth-panel auth-panel--form">
                    <div className="auth-form-card">
                        <div className="auth-form-card__header">
                            <span className="auth-form-card__eyebrow">Get started</span>
                            <h2>Register</h2>
                            <p>Create your account to save reports and track interview preparation over time.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="auth-form">

                            <div className="auth-input-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    onChange={(e) => { setUsername(e.target.value) }}
                                    type="text" id="username" name='username' placeholder='Enter username' />
                            </div>
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

                            <button className='auth-submit-btn'>Register</button>

                        </form>

                        <p className="auth-switch">
                            Already have an account? <Link to={"/login"}>Login</Link>
                        </p>
                    </div>
                </section>
            </div>
        </main>
    )
}


export default Register;
