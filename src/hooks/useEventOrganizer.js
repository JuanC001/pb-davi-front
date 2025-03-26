import { useEffect, useState } from "react"

import conectateApi from "../helpers/conectateApi"

export const useEventsOrganizer = () => {

    const [eventsOrganizer, setEventsOrganizer] = useState([])

    const getEventOrganizerByOwner = async (owner) => {
        const { data } = await conectateApi.get(`/event-organizer/owner/${owner}`)
        const arr = []
        arr.push(data)
        setEventsOrganizer(arr)
    }

    const getEventsOrganizer = async () => {
        const { data } = await conectateApi.get("/event-organizer")
        setEventsOrganizer(data)
    }

    const createEventOrganizer = async (data) => {
        const res = await conectateApi.post("/event-organizer", data)
        return res.data
    }

    return {
        eventsOrganizer,
        getEventOrganizerByOwner,
        getEventsOrganizer,
        createEventOrganizer
    }

}