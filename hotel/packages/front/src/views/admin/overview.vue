<template>
    <div class="w-screen h-screen grid justify-items-center overflow-x-hidden">
        <div class="w-screen flex justify-center mt-40 gap-6 sm:gap-16 xl:gap-40">
            <h1 class="text-xl sm:text-3xl md:text-5xl text-darkGreen text-center font-cambria font-normal ml-24 sm:ml-36 md:ml-40 xl:ml-64">{{$t('roomOverview.roomOverview')}}</h1>
            <RouterLink to="/admin/room/new" class="bg-green rounded-xl p-3 -mt-2 max-sm:h-12">
                <img src="/icons/add.svg" alt="" class="h-6 sm:h-7 md:h-10">
            </RouterLink>
        </div>
        <div v-if="getAllRoomsResult" v-for="room of getAllRoomsResult.rooms" :key="room.id" class="w-full grid justify-items-center sm:gap-6 -mt-40 sm:mt-12">
            <div class="flex h-24 sm:h-36 lg:h-48 w-5/6 lg:w-4/5 xl:w-3/5 bg-secondary rounded-3xl justify-between">
                <RouterLink :to="{name: 'room', params: {id:room.id}}" class="grid grid-cols-2 gap-4">
                    <img src="/images/hotelRoomDeluxe.jpg" alt="" class="rounded-s-2xl h-24 sm:h-36 lg:h-48">
                    <div class="grid justify-items-start my-2 w-96">
                        <h2 class="max-md:hidden text-xl lg:text-2xl xl:text-3xl font-bold font-cambria text-darkGreen">{{room.roomName}}</h2>
                        <h2 class="max-sm:hidden md:hidden sm:text-xl lg:text-2xl xl:text-3xl font-bold font-cambria text-darkGreen">{{shortenText(room.roomName, 18)}}</h2>
                        <h2 class="sm:hidden sm:text-xl lg:text-2xl xl:text-3xl font-bold font-cambria text-darkGreen">{{shortenText(room.roomName, 13)}}</h2>
                        <p v-if="room.roomNumber < 10" class="max-sm:text-xs lg:text-xl text-darkGreen font-cambria ">({{$t('roomOverview.roomNumber')}}: 00{{room.roomNumber}})</p>
                        <p v-if="room.roomNumber > 10 && room.roomNumber < 100" class="max-sm:text-xs lg:text-xl text-darkGreen font-cambria">({{$t('roomOverview.roomNumber')}}: 0{{room.roomNumber}})</p>
                        <p v-if="room.roomNumber > 10" class="max-sm:text-xs lg:text-xl text-darkGreen font-cambria">({{$t('roomOverview.roomNumber')}}: {{room.roomNumber}})</p>
                        <p class="sm:text-xl lg:text-2xl text-darkGreen font-cambria lg:mt-6">{{$t('roomOverview.occupation')}}:</p>
                        <p class="sm:text-xl lg:text-xl text-darkGreen font-cambria lg:-mt-4">{{isRoomOccupied(room)}}</p>
                    </div>
                </RouterLink>
                <div class="flex flex-col mr-4">
                    <div class="flex pt-3 h-16 gap-2 sm:gap-4 ml-4">
                        <RouterLink :to="{name: 'editRoom', params: {id:room.id}}">
                            <button class="bg-green lg:py-2 px-3 rounded-xl max-md:h-14 max-sm:h-8 max-sm:w-8">
                                <img src="/icons/edit.svg" alt="" class="max-sm:mt-0 sm:h-24 md:h-14 lg:h-9 max-md:-mt-5">
                            </button>
                        </RouterLink>
                        <button @click="handleRemoveRoom(room.id)" class="bg-green py-2 px-3 rounded-xl max-sm:w-8 max-sm:h-8">
                            <img src="/icons/delete.svg" alt="" class="h-16 max-sm:-mt-6 max-md:-mt-4 md:h-8">
                        </button>
                    </div>
                    <div class="sm:mt-7 lg:mt-16">
                        <p v-if="findNextReservation(room) !== 'No reservations'" class="max-sm:hidden justify-self-end font-cambria max-sm:text-xs max-lg:text-sm xl:text-lg">{{$t('roomOverview.nextReservation')}}:</p>
                        <p v-if="findNextReservation(room) !== 'No reservations'" class="sm:hidden justify-self-end font-cambria max-sm:text-xs max-lg:text-sm xl:text-lg">{{$t('roomOverview.nextRes')}}:</p>
                        <p v-if="findNextReservation(room) !== 'No reservations'" class="justify-self-end font-cambria max-sm:text-sm lg:text-lg">{{findNextReservation(room)}}</p>
                    </div>
                </div>
            </div>
        </div>
        <RouterLink to="/admin/room/new" class="bg-green rounded-xl p-4 sm:bottom-0 mt-8 max-sm:hidden">
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

const shortenText = (text: string, length:number): string => {
  if (text.length <= length) {
    return text;
  }
  return text.slice(0, length) + '...';
};
</script>