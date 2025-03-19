import { useContext } from 'react'
import { ToastContext } from '../contexts/toastProvider'


const useToast = () => {
  return useContext(ToastContext)
}

export default useToast