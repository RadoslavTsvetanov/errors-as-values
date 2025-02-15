import { LeftRight } from "../rust-like-pattern/leftRight";
import react, { useEffect, useState } from "react";
import {ConcreteResult, CustomError, Result} from "../rust-like-pattern/result"
import axios from "axios";
import { Optionable } from "../rust-like-pattern/option";
import { CustomUnpackable, Unpackable } from "../rust-like-pattern/unpackable";

/*

this is more of an example of how to use multiple of the types in tanthem but it still shows how to use the optional type 

*/


type WebRequest<RequestResponse> = Optionable<ConcreteResult<RequestResponse>>


function useCustomFetchHook<RequestResponseType>(fetchData: () => Promise<RequestResponseType>): WebRequest<RequestResponseType> {
    const [ data, setData ] = useState<WebRequest<RequestResponseType>>(new Optionable(new ConcreteResult<RequestResponseType>(new Optionable<RequestResponseType>(null), new Optionable(new CustomError("still loading ")))))
    useEffect(() => {
        const executeFetch = async () => { return await fetchData() }

        executeFetch()
            .then((r) => {
                setData(new Optionable(new Result(new Optionable(r), new Optionable<CustomError>(null))))
            })
            .catch((err) => {
                setData(new Optionable(new Result(new Optionable<RequestResponseType>(null), new Optionable(err))))
            })

        

    },[])

    return data
}

function ReactComponent() {
    const userData = useCustomFetchHook(() => {
        return axios.get <{user: string}>("https://api.example.com/users")
   })

    try {
        userData.unpack()
    } catch (err) {
        
   }

    return (
        <div>
            {
                userData.unpack().unpack().data.user
            }
        </div>
    )
}