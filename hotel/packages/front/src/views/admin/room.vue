<template>
    <div v-if="getRoomByIdResult" class="w-screen h-screen grid justify-items-center items-center">
        <h1 v-if="getRoomByIdResult.room.roomNumber < 10" class="text-5xl text-darkGreen text-center font-cambria font-normal mt-16">ROOM NUMBER: 00{{ getRoomByIdResult.room.roomNumber }}</h1>
        <h1 v-if="getRoomByIdResult.room.roomNumber < 100 && getRoomByIdResult.room.roomNumber >= 10" class="text-5xl text-darkGreen text-center font-cambria font-normal mt-16">ROOM NUMBER: 0{{ getRoomByIdResult.room.roomNumber }}</h1>
        <h1 v-if="getRoomByIdResult.room.roomNumber >= 100" class="text-5xl text-darkGreen text-center font-cambria font-normal mt-16">ROOM NUMBER: {{ getRoomByIdResult.room.roomNumber }}</h1>
        <div class="flex gap-12 border-4 rounded-3xl bg-secondary p-4 border-darkGreen -mt-24">
            <div>
                <img src="../../../public/images/hotelRoomDeluxe.jpg" alt="" class="rounded-xl h-64">
                <div class="flex justify-between mt-4 px-4">
                    <div class="grid gap-4">
                        <div class="flex gap-4 items-center">
                            <img src="../../../public/icons/surface.svg" alt="" class="h-6">
                            <p class="text-darkGreen font-cambria font-normal text-2xl">{{ getRoomByIdResult.room.size }} m²</p>
                        </div>
                        <div v-if="checkFacilities('Flatscreen-tv')" class="flex gap-4 items-center">
                            <img src="../../../public/icons/tv.svg" alt="" class="h-6">
                            <p class="text-darkGreen font-cambria font-normal text-2xl">Flatscreen-tv</p>
                        </div>
                        <div v-if="checkFacilities('Smoke free')" class="flex gap-4 items-center">
                            <img src="../../../public/icons/smoking.svg" alt="" class="h-6">
                            <p class="text-darkGreen font-cambria font-normal text-2xl">Smoke free</p>
                        </div>
                    </div>
                    <div class="grid gap-4">
                        <div v-if="checkFacilities('Free wifi')" class="flex gap-4 items-center">
                            <img src="../../../public/icons/wifi.svg" alt="" class="h-6">
                            <p class="text-darkGreen font-cambria font-normal text-2xl">Free wifi</p>
                        </div>
                        <div v-if="checkFacilities('Free parking')" class="flex gap-4 items-center">
                            <img src="../../../public/icons/parking.svg" alt="" class="h-6">
                            <p class="text-darkGreen font-cambria font-normal text-2xl">Free parking</p>
                        </div>
                        <div v-if="checkFacilities('Balcony')" class="flex gap-4 items-center">
                            <img src="../../../public/icons/balcony.svg" alt="" class="h-6">
                            <p class="text-darkGreen font-cambria font-normal text-2xl">Balcony</p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="getReservationsByIdRoom" class="min-w-96">
                <h2 class="text-darkGreen font-cambria font-normal text-4xl">{{getRoomByIdResult.room.roomName}}</h2>
                <h3 class="text-darkGreen font-cambria font-normal text-2xl mt-6">Occupation:</h3>
                <p v-if="isTodayBetweenDates() && reservationCheckOutDate" class="text-darkGreen font-cambria font-bold text-xl">Occupied until {{ reservationCheckOutDate }}</p>
                <P v-else class="text-darkGreen font-cambria font-bold text-xl">Not occupied</P>
                <p class="text-darkGreen font-cambria font-normal text-2xl mt-12 ">Next reservations:</p>
                <p v-if="findNextReservations() === 'no next reservations'" class="text-darkGreen font-cambria font-normal text-xl mt-2">No next reservations</p>
                <div v-else class="max-h-48 overflow-auto">
                    <div v-for="reservation of findNextReservations()" class="flex justify-between border-t-2 border-darkGreen pt-2 mt-2 px-2">
                        <p class="text-darkGreen font-cambria font-normal">{{reservation.reservationName}}</p>
                        <div class="flex gap-2">
                            <p class="text-darkGreen font-cambria font-normal">{{formatDate(new Date(reservation.checkInDate))}} - {{ formatDate(new Date(reservation.checkOutDate)) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { GET_ROOM_BY_ID } from '../../graphql/room.query'
import { useRouter } from 'vue-router';
import { GET_RESERVATIONS_BY_ROOM_ID } from '@/graphql/reservation.query';
import { ref } from 'vue';
import type { CustomReservation } from '@/interfaces/custom.reservation.interface';

const {currentRoute} = useRouter()

const { result:getRoomByIdResult } = useQuery(GET_ROOM_BY_ID,{id: currentRoute.value.params.id})
const { result:getReservationsByIdRoom } = useQuery(GET_RESERVATIONS_BY_ROOM_ID,{roomId: currentRoute.value.params.id})


const reservationCheckOutDate = ref<string>()
const nextReservations = ref<Array<CustomReservation>>()

const isTodayBetweenDates = () => {
    if(getReservationsByIdRoom.value)
    if(getReservationsByIdRoom.value.reservationsByRoomId.length !== 0) {
        for(const reservation of getReservationsByIdRoom.value.reservationsByRoomId) {
            const today = new Date()
            const checkInDate = new Date(reservation.checkInDate)
            const checkOutDate = new Date(reservation.checkOutDate)
            if(today >= checkInDate && today <= checkOutDate) {
                const formattedDate = formatDate(checkOutDate)
                reservationCheckOutDate.value = formattedDate
                return true
            }
        }
        return false
    } else {
        return false
    }
}

const findNextReservations = () => {
    let next: Array<CustomReservation> = []
    if(getReservationsByIdRoom.value)
    if(getReservationsByIdRoom.value.reservationsByRoomId.length !== 0) {
        for(const reservation of getReservationsByIdRoom.value.reservationsByRoomId) {
            const today = new Date()
            const checkInDate = new Date(reservation.checkInDate)
            if(today < checkInDate) {
                next.push(reservation)
            }
        }
        if(next.length === 0) {
            return 'no next reservations'
        }
    }
    nextReservations.value = next
    return nextReservations.value
}

const formatDate = (date:Date) =>{
    const formattedDate = date.toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric'
    })
    return formattedDate
}

const checkFacilities = (facility: string) => {
    for(const roomFacility of getRoomByIdResult.value.room.facilities) {
        if(roomFacility === facility) {
            return true
        }
    }
}

</script>