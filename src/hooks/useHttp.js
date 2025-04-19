import { useCallback, useEffect, useState } from "react"

async function sendHttpRequest (url,config){
   const resp = await fetch(url,config)
   const resData = await resp.json()
    if(!resp.ok){
        throw new Error(resData.message || 'Something Went Wrong')
    }

    return resData
}

export default function useHttp(url,config, initialData){
    const [data,setData] = useState(initialData)
    const [error,setError]= useState()
    const [isLoading,setIsLoading] = useState(false)
    function clearData(){
        setData(initialData)
    }
    const sendRequest= useCallback( async function sendRequest(data){
       setIsLoading(true) 
       try { const resData = await sendHttpRequest(url,{...config, body: data})
        setData(resData)
       } catch (error){
            setError(error.message || 'Something Went Wrong')
       } 
       setIsLoading(false)
    },[url, config])

    useEffect(()=>{
        if ( config && (config.methodd === 'GET' || !config.method) || !config){
            sendRequest()
        }
    },[sendRequest, config])

    return{
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    }
}