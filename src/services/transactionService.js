import api from '../config/axios'

export const fetchTransactions = async () => {
  const response = await api.get('/transactions')
  return response.data
}

export const createTransaction = async (values) => {
  const response = await api.post('/transactions', values)
  return response.data
}
