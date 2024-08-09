<template>
    <div class="w-screen h-screen grid justify-items-center">
        <RouterLink to="/admin/room/new" class="bg-green rounded-xl p-3 absolute mt-40 right-80">
            <img src="/icons/add.svg" alt="" class="h-10">
        </RouterLink>
        <h1 class="text-5xl text-darkGreen text-center font-cambria font-normal mt-40">ROOM OVERVIEW</h1>
        <div v-if="getAllRoomsResult" v-for="room of getAllRoomsResult.rooms" :key="room.id" class="w-full grid justify-items-center gap-6 mt-12">
            <div class="flex h-48 w-3/5 bg-secondary rounded-3xl justify-between">
                <RouterLink :to="{name: 'room', params: {id:room.id}}" class="flex gap-6">
                    <img src="/images/hotelRoomDeluxe.jpg" alt="" class="rounded-s-2xl h-48">
                    <div class="grid justify-items-start my-2 w-96">
                        <h2 class="text-3xl font-bold font-cambria text-darkGreen">{{room.roomName}}</h2>
                        <p v-if="room.roomNumber < 10" class="text-xl text-darkGreen font-cambria">(Room number: 00{{room.roomNumber}})</p>
                        <p v-if="room.roomNumber > 10 && room.roomNumber < 100" class="text-xl text-darkGreen font-cambria">(Room number: 0{{room.roomNumber}})</p>
                        <p v-if="room.roomNumber > 10" class="text-xl text-darkGreen font-cambria">(Room number: {{room.roomNumber}})</p>
                        <p class="text-2xl text-darkGreen font-cambria mt-6">Occupation:</p>
                        <p class="text-xl text-darkGreen font-cambria -mt-4">{{isRoomOccupied(room)}}</p>
                    </div>
                </RouterLink>
                <div class="flex pt-3 h-16 gap-4 mr-4">
                    <RouterLink :to="{name: 'editRoom', params: {id:room.id}}">
                        <button class="bg-green p-2 rounded-xl">
                            <img src="/icons/edit.svg" alt="">
                        </button>
                    </RouterLink>
                    <button @click="handleRemoveRoom(room.id)" class="bg-green p-2 rounded-xl">
                        <img src="/icons/delete.svg" alt="">
                    </button>
                </div>
                <div class="absolute mt-36 grid w-3/5">
                    <p v-if="findNextReservation(room) !== 'No reservations'" class="justify-self-end font-cambria text-lg">Next reservation: {{findNextReservation(room)}}</p>
                </div>
            </div>
        </div>
        <RouterLink to="/admin/room/new" class="bg-green rounded-xl p-4 mt-12">
            <img src="/icons/add.svg" alt="">
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { useMutation } from '@vue/apollo-composable';
import { GET_ALL_ROOMS } from '../../graphql/room.query'
import { GET_ALL_RESERVATIONS } from '../../graphql/reservation.query'
import type { CustomRoom } from '@/interfaces/custom.room.interface';
import { DELETE_ROOM } from '../../graphql/room.mutation'

const { result:getAllRoomsResult } = useQuery(GET_ALL_ROOMS)
const { result:getAllReservationsResult } = useQuery(GET_ALL_RESERVATIONS)
const { mutate: deleteRoom } = useMutation(DELETE_ROOM)
// console.log(getAllReservationsResult.value.reservations)

const isRoomOccupied = (room: CustomRoom) => {
    if(getAllReservationsResult.value)
    if(getAllReservationsResult.value.reservations.length !== 0) {
        for(const reservation of getAllReservationsResult.value.reservations) {
            if(reservation.roomId === room.id) {
                const today = new Date()
                const checkInDate = new Date(reservation.checkInDate)
                const checkOutDate = new Date(reservation.checkOutDate)
                if(today >= checkInDate && today <= checkOutDate && reservation.checkedIn === true) {
                    return 'Occupied'
                } else if (today >= checkInDate && today <= checkOutDate && reservation.checkedIn === false) {
                    return 'Check-in today'
                } else {
                    return 'Not occupied'
                }
            }
        }
        return 'Not occupied'
    } else {
        return 'Not occupied'
    }
}


const findNextReservation = (room: CustomRoom) => {
    let nextReservation
    if(getAllReservationsResult.value)
    if(getAllReservationsResult.value.reservations.length !== 0) {
        for(const reservation of getAllReservationsResult.value.reservations) {
            if(reservation.roomId === room.id) {
                const today = new Date()
                const checkInDate = new Date(reservation.checkInDate)
                if(today < checkInDate) {
                    if(nextReservation === undefined) {
                        nextReservation = new Date(reservation.checkInDate)
                        const formattedDate = nextReservation.toLocaleDateString('en-GB', {
                            day: 'numeric', month: 'short', year: 'numeric'
                        })
                        return formattedDate
                    } else {
                        if(nextReservation && new Date(reservation.checkInDate) < new Date(nextReservation)) {
                            nextReservation = new Date(reservation.checkInDate)
                            const formattedDate = nextReservation.toLocaleDateString('en-GB', {
                                day: 'numeric', month: 'short', year: 'numeric'
                            })
                            return formattedDate
                        } else if(nextReservation) {
                            nextReservation = new Date(nextReservation)
                            const formattedDate = nextReservation.toLocaleDateString('en-GB', {
                                day: 'numeric', month: 'short', year: 'numeric'
                            })
                            return formattedDate
                        }
                    }
                }
            }
        }
        if (nextReservation === undefined) {
            return 'No reservations'
        }
    } else {
        return 'No reservations'
    }
}

const handleRemoveRoom = (roomId:string) => {
    deleteRoom({id: roomId})
    .then(() => {location.reload()})
    .catch(() => location.reload())
}
</script>