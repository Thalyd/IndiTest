import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";


interface useAxiosProps{
    url: string,
    type?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    
}


/**
 * useApiCall is a hook that performs an API call
 * 
 * @param {{url: string, type?: 'GET' | 'POST' | 'PUT' | 'DELETE'}} props
 *    - url: the URL of the API to call
 *    - type: the method of the API call, defaults to 'GET'
 * 
 * @returns {{data: any, loading: boolean}}
 *    - data: the response of the API call, if the call is successful
 *    - error: there's no error handling because is not required
 *    - loading: a boolean indicating if the API call is in progress
 */

export default function useApiCall({url, type = 'GET'}:useAxiosProps){

    const [data, setData] = useState(null);  
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        function fetchData(){
            setLoading(true);
            switch(type){
                
                case 'GET':
                     axios.get("https://api.allorigins.win/get?url="+ encodeURIComponent(url), {
                         
                     }).then((res:AxiosResponse) => {
                         setData(JSON.parse(res.data.contents).feed.entry)                            
                         setLoading(false)
                         
                     }).catch((error:AxiosError) => {
                         console.log('error : '+url, error)
                     }).finally(() => {
                         setLoading(false)
                     })
                break;
                case 'POST': // no need to develop
                break;
                case 'PUT': // no need to develop
                break;
                case 'DELETE': // no need to develop
                break;  
            }
        }
        fetchData()
    }, [url,type]);

   
                

    return {data,  loading}
}