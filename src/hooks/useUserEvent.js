import { useEffect, useState } from "react"
import conectateApi from "../helpers/conectateApi"

export const useUserEvent = (handleFetch = true, defaultUserId) => {

    const [userEvents, setUserEvents] = useState([])

    const getUserEvents = async (userId) => {
        const { data } = await conectateApi.get(`/user-event/user/${userId}`)
        console.log(data)
        setUserEvents(data)
        return data
    }
    const createUserEvent = async (userId, eventId) => {
        const res = await conectateApi.post("/user-event", { userId, eventId })
        return res
    }
    const deleteUserEvent = async (userId, eventId) => {
        const res = await conectateApi.delete(`/user-event/`, {
            data: {
                userId,
                eventId
            }
        })
        return res
    }

    useEffect(() => {
        if (handleFetch) {
            getUserEvents(defaultUserId)
        }
    }, [])

    return {
        userEvents,
        getUserEvents,
        createUserEvent,
        deleteUserEvent
    }

}