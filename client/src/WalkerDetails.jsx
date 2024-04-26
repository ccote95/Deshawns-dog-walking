import { useEffect, useState } from "react"
import { getWalkerById } from "./apiManager.js"
import { useParams } from "react-router-dom"

export const WalkerDetails =() => {
  const [walker, setWalker] = useState({})
  const {walkerId} = useParams()

  useEffect(() => {
    getWalkerById(walkerId).then(setWalker)
  },[])

}