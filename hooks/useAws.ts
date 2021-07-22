import { useState, useEffect } from 'react'

const useAws: Function = () => {
    const [status, setStatus] = useState<boolean>()

    useEffect(() => {
       const get: Function = async (): Promise<void> => {
           const response = await fetch('/api/get-keys')
           setStatus(response.status == 200 ? true : false);
       }

       get();
    }, [])

    return status
}

export default useAws
