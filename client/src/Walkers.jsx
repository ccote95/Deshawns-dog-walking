import { useEffect, useState } from "react"
import { getWalkers } from "./apiManager.js"

export const Walkers = () => {
    const [walkers, setWalkers] = useState([])


    useEffect(() => {
        getWalkers().then(setWalkers)
    },[])


    return(
        <div>
            <div>
                {walkers.map((walkers) => 
                <p>{walkers.name}</p>

            )}
            </div>
        </div>
    )
}