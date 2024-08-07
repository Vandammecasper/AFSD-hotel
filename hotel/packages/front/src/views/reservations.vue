<template>
    <div v-if="getReservationsByCustomerIdResult" class="w-screen h-screen grid justify-items-center">
        <h1 class="text-5xl text-darkGreen text-center font-cambria font-normal mt-40">YOUR RESERVARTIONS</h1>
        <div v-for="reservation of getReservationsByCustomerIdResult.reservationsByCustomerId" class="w-full grid justify-items-center gap-6 mt-8">
            <div class="grid grid-cols-3 h-48 w-3/5 bg-secondary rounded-3xl gap-0 justify-between">
                <img src="../../../public/images/hotelRoomDeluxe.jpg" alt="" class="rounded-s-2xl h-full">
                <div class="grid justify-items-start my-2 ml-6 w-96">
                    <h2 class="text-3xl font-bold font-cambria text-darkGreen">{{getRoomName(reservation.roomId)}}</h2>
                    <p v-if="isTodayBetweenDates(reservation)" class="text-2xl text-darkGreen font-cambria -mt-4">Room access until {{formatDate(reservation.checkOutDate)}}</p>
                    <div v-else>
                        <p class="text-xl text-darkGreen font-cambria">Reservation:</p>
                        <p class="text-xl text-darkGreen font-cambria">{{formatDate(reservation.checkInDate)}} - {{formatDate(reservation.checkOutDate)}}</p>
                    </div>
                    <p v-if="getLockStatus(reservation.roomId) && reservation.checkedIn" class="text-xl text-darkGreen font-cambria mt-4">Room status: LOCKED</p>
                    <p v-else-if="reservation.checkedIn" class="text-xl text-darkGreen font-cambria mt-4">Room status: UNLOCKED</p>
                </div>
                <div v-if="reservation.checkedIn" class="self-center w-44 h-44 grid bg-primary p-8 rounded-3xl border-solid border-4 border-darkGreen ml-28">
                    <img src="../../public/icons/camera.svg" alt="" class="place-self-center">
                    <p v-if="getLockStatus(reservation.roomId)" class="text-center mt-1 font-cambria">Unlock your room</p>
                    <p v-else class="text-center mt-1 font-cambria">Lock your room</p>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { GET_RESERVATIONS_BY_CUSTOMER_ID } from '../graphql/reservation.query'
import { GET_ALL_ROOMS } from '../graphql/room.query'
import useFirebase from '@/composables/useFirebase';
import type { CustomReservation } from '@/interfaces/custom.reservation.interface';

const { firebaseUser } = useFirebase()

const { result: getReservationsByCustomerIdResult } = useQuery(GET_RESERVATIONS_BY_CUSTOMER_ID, {
    uid: firebaseUser.value.uid
})

const { result: getAllRoomsResult } = useQuery(GET_ALL_ROOMS)

console.log(firebaseUser.value.uid)

console.log(getReservationsByCustomerIdResult)

const formatDate = (date:string) =>{
    const givenDate = new Date(date)
    const formattedDate = givenDate.toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric'
    })
    return formattedDate
}

const getRoomName = (roomId: string) => {
    for (const room of getAllRoomsResult.value.rooms) {
        if (room.id === roomId) {
            return room.roomName
        }
    }
}

const getLockStatus = (roomId: string) => {
    for (const room of getAllRoomsResult.value.rooms) {
        if (room.id === roomId) {
            return room.isLocked
        }
    }
}

const isTodayBetweenDates = (reservation: CustomReservation) => {
    const today = new Date()
    const checkInDate = new Date(reservation.checkInDate)
    const checkOutDate = new Date(reservation.checkOutDate)
    if(today >= checkInDate && today <= checkOutDate) {
        return true
    }
}


</script>