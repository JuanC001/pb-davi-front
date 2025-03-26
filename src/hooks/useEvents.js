import { useEffect, useState } from "react"

import conectateApi from "../helpers/conectateApi"

export const useEvents = (handleFetch = true) => {

    const [events, setEvents] = useState([])

    const getEvents = async () => {
        const { data } = await conectateApi.get("/events")
        setEvents(data)
    }

    const createEvent = async (data) => {
        const res = await conectateApi.post("/events", data)
        return res
    }

    const updateEvent = async (id, data) => {
        const res = await conectateApi.put(`/events/${id}`, data)
        return res
    }

    const deleteEvent = async (id) => {
        const res = await conectateApi.delete(`/events/${id}`)
        return res
    }

    useEffect(() => {
        if (handleFetch) {
            getEvents()
        }
    }, [])

    return {
        events,
        getEvents,
        createEvent,
        updateEvent,
        deleteEvent,
    }

}