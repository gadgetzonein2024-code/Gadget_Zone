import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEYS = {
  customerToken: 'gz_token',
  adminToken: 'gz_admin_token',
}

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [customerToken, setCustomerToken] = useState(() => localStorage.getItem(STORAGE_KEYS.customerToken))
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem(STORAGE_KEYS.adminToken))
  const [customer, setCustomer] = useState(() => null)
  const [admin, setAdmin] = useState(() => null)

  useEffect(() => {
    if (customerToken) {
      localStorage.setItem(STORAGE_KEYS.customerToken, customerToken)
    } else {
      localStorage.removeItem(STORAGE_KEYS.customerToken)
    }
  }, [customerToken])

  useEffect(() => {
    if (adminToken) {
      localStorage.setItem(STORAGE_KEYS.adminToken, adminToken)
    } else {
      localStorage.removeItem(STORAGE_KEYS.adminToken)
    }
  }, [adminToken])

  const setCustomerSession = ({ token, user }) => {
    setCustomerToken(token)
    setCustomer(user)
  }

  const clearCustomerSession = () => {
    setCustomerToken(null)
    setCustomer(null)
  }

  const setAdminSession = ({ token, user }) => {
    setAdminToken(token)
    setAdmin(user)
  }

  const clearAdminSession = () => {
    setAdminToken(null)
    setAdmin(null)
  }

  const value = useMemo(
    () => ({
      customerToken,
      adminToken,
      customer,
      admin,
      setCustomerSession,
      clearCustomerSession,
      setAdminSession,
      clearAdminSession,
    }),
    [customerToken, adminToken, customer, admin]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
