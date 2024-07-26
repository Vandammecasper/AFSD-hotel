<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="w-screen h-screen grid justify-items-center">
        <div class="bg-green rounded-xl p-3 absolute mt-40 right-80">
            <img src="../../../public/icons/add.svg" alt="" class="h-10">
        </div>
        <h1 class="text-5xl text-darkGreen text-center font-cambria font-normal mt-40">ROOM OVERVIEW</h1>
        <div v-for="room of getAllRoomsResult.rooms" :key="room.id" class="w-full grid justify-items-center gap-6 mt-12">
            <div class="grid grid-cols-3 h-48 w-3/5 bg-secondary rounded-3xl gap-0 justify-between">
                <img src="../../../public/images/hotelRoomDeluxe.jpg" alt="" class="rounded-s-2xl h-full">
                <div class="grid justify-items-start my-2 ml-6 w-96">
                    <h2 class="text-3xl font-bold font-cambria text-darkGreen">{{room.roomName}}</h2>
                    <p class="text-2xl text-darkGreen font-cambria mt-6">Occupation:</p>
                    <p v-if="isTodayBetweenDates(room)" class="text-xl text-darkGreen font-cambria -mt-4">Not occupied</p>
                </div>
                <div class="flex pt-3 ml-44 h-16 gap-4">
                    <div class="bg-green p-2 rounded-xl">
                        <img src="../../../public/icons/edit.svg" alt="">
                    </div>
                    <div class="bg-green p-2 rounded-xl">
                        <img src="../../../public/icons/delete.svg" alt="">
                    </div>
                </div>
                <p class="absolute justify-self-end mr-6 mt-36 font-cambria text-lg">Next reservation: {{room.checkOutDate}}</p>
            </div>
        </div>
        <div class="bg-green rounded-xl p-4 mt-12">
            <img src="../../../public/icons/add.svg" alt="">
        </div>
    </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { GET_ALL_ROOMS } from '../../graphql/room.query'
import { GET_ALL_RESERVATIONS } from '../../graphql/reservation.query'

const { result:getAllRoomsResult } = useQuery(GET_ALL_ROOMS)
const { result:getAllReservationsResult } = useQuery(GET_ALL_RESERVATIONS)
// console.log(getAllReservationsResult._value.reservations)

const isTodayBetweenDates = (room) => {
    // let reservations = []
    
    // if(getAllReservationsResult._value.reservations.length > 0){
    //     for(const reservation of getAllReservationsResult._value.reservations){
    //         console.log(reservation)
    //         if(reservation.roomId === room.id){
    //             reservations.push(reservation)
    //         }
    //     }
    //     console.log(reservations)
    // }
    return true
}
</script>