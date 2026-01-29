'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { login, isAuthenticated } from '@/utils/auth'
import styles from './login.module.css'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/admin')
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (login(username, password)) {
      router.push('/admin')
    } else {
      setError('Invalid username or password')
      setLoading(false)
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div className={styles.loginHeader}>
          <h1 className={styles.loginTitle}>Admin Login</h1>
          <p className={styles.loginSubtitle}>PT MARVEL INDONESIA TEKNOLOGI</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          {error && <div className={styles.errorMessage}>{error}</div>}
          
          <div className={styles.formGroup}>
            <label htmlFor="username">Username / Email</label>
            <input
              id="username"
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.formInput}
              placeholder="Enter your email"
              required
              autoComplete="username"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.formInput}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
          </div>

          <button 
            type="submit" 
            className={styles.loginButton}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className={styles.loginFooter}>
          <a href="/" className={styles.backLink}>← Back to Home</a>
        </div>
      </div>
    </div>
  )
}
