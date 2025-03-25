import { useEffect, useState } from "react"

import conectateApi from "../helpers/conectateApi"

export const useEvents = (handleFetch = true) => {

    const [events, setEvents] = useState([])

    const getEvents = async () => {
        const { data } = await conectateApi.get("/events")
        setEvents(data)
    }

    useEffect(() => {
        console.log("useEffect")
        if (handleFetch) {
            getEvents()
        }
    }, [])

    return {
        events,
        getEvents
    }

}