import { useEffect, useState } from "react"

import conectateApi from "../helpers/conectateApi"

export const useEventsOrganizer = () => {

    const [eventsOrganizer, setEventsOrganizer] = useState([])

    const getEventOrganizerByOwner = async (owner) => {
        console.log(owner)
        const { data } = await conectateApi.get(`/event-organizer/owner/${owner}`)
        const arr = []
        arr.push(data)
        console.log(arr)
        setEventsOrganizer(arr)
    }

    const getEventsOrganizer = async () => {
        const { data } = await conectateApi.get("/event-organizer")
        setEventsOrganizer(data)
    }

    return {
        eventsOrganizer,
        getEventOrganizerByOwner,
        getEventsOrganizer
    }

}