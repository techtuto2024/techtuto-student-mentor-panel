import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { getCookie } from '@/utils/cookies' 

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    // const getCookie = (name: string): string | null => {
    //   const value = `; ${document.cookie}`;
    //   const parts = value.split(`; ${name}=`);
    //   if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    //   return null;
    // }

    
    const verifyToken = async () => {
      try {
        // Get the token from the cookies
        const token = getCookie('token');
        if (!token) {
          throw new Error('No token found');
        }

        // Make the request with the token in the Authorization header
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/verifytoken`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setIsAuthenticated(true)
      } catch (error) {
        
        setIsAuthenticated(false)
        router.push('/')
      } finally {
        setIsLoading(false)
      }
    }

    verifyToken()
  }, [router])

  return { isAuthenticated, isLoading }
}
