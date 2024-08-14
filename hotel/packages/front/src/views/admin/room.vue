<template>
    <div v-if="getRoomByIdResult" class="w-screen h-screen grid justify-items-center items-center px-4 md:px-8">
        <div class="flex mt-16 sm:gap-8 md:gap-16 lg:gap-40 sm:mr-32 md:mr-40 lg:mr-56">
            <RouterLink to="/admin/overview" class="mt-0.5 lg:mt-1.5 max-sm:hidden">
                <button class="bg-green flex gap-2 p-2 px-4 rounded-full">
                    <img src="/icons/back.svg" alt="">
                    <p class="font-cambria font-bold max-sm:text-sm text-primary">{{$t('room.goBack')}}</p>
                </button>
            </RouterLink>
            <h1 v-if="getRoomByIdResult.room.roomNumber < 10" class="text-2xl sm:text-4xl lg:text-5xl text-darkGreen text-center font-cambria font-normal">{{$t('room.roomNumber')}}: 00{{ getRoomByIdResult.room.roomNumber }}</h1>
            <h1 v-if="getRoomByIdResult.room.roomNumber < 100 && getRoomByIdResult.room.roomNumber >= 10" class="text-4xl lg:text-5xl text-darkGreen text-center font-cambria font-normal">{{$t('room.roomNumber')}}: 0{{ getRoomByIdResult.room.roomNumber }}</h1>
            <h1 v-if="getRoomByIdResult.room.roomNumber >= 100" class="text-4xl lg:text-5xl text-darkGreen text-center font-cambria font-normal">{{$t('room.roomNumber')}}: {{ getRoomByIdResult.room.roomNumber }}</h1>
        </div>
        <div class="sm:flex gap-4 lg:gap-12 border-4 rounded-3xl bg-secondary p-3 lg:p-4 border-darkGreen -mt-56 max-sm:h-full sm:-mt-24">
            <div>
                <img src="/images/hotelRoomDeluxe.jpg" alt="" class="rounded-xl h-32 sm:h-44 lg:h-64">
                <div class="max-sm:hidden flex justify-between mt-4 gap-2 sm:px-2 lg:px-4">
                    <div class="grid gap-4">
                        <div class="flex gap-2 sm:gap-4 items-center">
                            <img src="/icons/surface.svg" alt="" class="h-4 sm:h-6">
                            <p class="text-darkGreen font-cambria font-normal text-xs sm:text-xl lg:text-2xl">{{ getRoomByIdResult.room.size }} m²</p>
                        </div>
                        <div v-if="checkFacilities('Flatscreen-tv')" class="flex gap-2 sm:gap-4 items-center">
                            <img src="/icons/tv.svg" alt="" class="h-4 sm:h-6">
                            <p class="text-darkGreen font-cambria font-normal text-xs sm:text-xl lg:text-2xl">{{$t('room.flatscreenTv')}}</p>
                        </div>
                        <div v-if="checkFacilities('Smoke free')" class="flex gap-2 sm:gap-4 items-center">
                            <img src="/icons/smoking.svg" alt="" class="h-4 sm:h-6">
                            <p class="text-darkGreen font-cambria font-normal text-xs sm:text-xl lg:text-2xl">{{$t('room.smokeFree')}}</p>
                        </div>
                    </div>
                    <div class="grid gap-4">
                        <div v-if="checkFacilities('Free wifi')" class="flex gap-2 sm:gap-4 items-center">
                            <img src="/icons/wifi.svg" alt="" class="h-4 sm:h-6">
                            <p class="text-darkGreen font-cambria font-normal text-xs sm:text-xl lg:text-2xl">{{$t('room.freeWifi')}}</p>
                        </div>
                        <div v-if="checkFacilities('Free parking')" class="flex gap-2 sm:gap-4 items-center">
                            <img src="/icons/parking.svg" alt="" class="h-4 sm:h-6">
                            <p class="text-darkGreen font-cambria font-normal text-xs sm:text-xl lg:text-2xl">{{$t('room.freeParking')}}</p>
                        </div>
                        <div v-if="checkFacilities('Balcony')" class="flex gap-2 sm:gap-4 items-center">
                            <img src="/icons/balcony.svg" alt="" class="h-4 sm:h-6">
                            <p class="text-darkGreen font-cambria font-normal text-xs sm:text-xl lg:text-2xl">{{$t('room.balcony')}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="getReservationsByIdRoom" class="lg:min-w-96">
                <h2 class="text-darkGreen font-cambria font-bold text-xl md:text-2xl lg:text-4xl">{{getRoomByIdResult.room.roomName}}</h2>
                <div class="flex gap-4 md:gap-2 lg:gap-12">
                    <div class="mt-4 lg:mt-8">
                        <h3 class="text-darkGreen font-cambria font-normal text-lg md:text-2xl">{{$t('room.occupation')}}:</h3>
                        <p v-if="isTodayBetweenDates() && reservationCheckOutDate" class="max-md:hidden text-darkGreen font-cambria font-bold max-md:text-sm lg:text-xl">{{$t('room.occupiedUntil')}} {{ reservationCheckOutDate }}</p>
                        <p v-if="isTodayBetweenDates() && reservationCheckOutDate" class="md:hidden text-darkGreen font-cambria font-bold max-md:text-sm lg:text-xl">{{$t('room.occupiedUntil')}}</p>
                        <p v-if="isTodayBetweenDates() && reservationCheckOutDate" class="md:hidden text-darkGreen font-cambria font-bold max-md:text-sm lg:text-xl">{{ reservationCheckOutDate }}</p>
                        <P v-else class="text-darkGreen font-cambria font-bold max-md:text-sm lg:text-xl">{{$t('room.notOccupied')}}</P>
                    </div>
                    <button v-if="currentReservation && isTodayBetweenDates() && currentReservation.checkedIn" @click="removeReservation(currentReservation.id)" class="mt-8 lg:mt-14 bg-green text-primary py-2 px-2 md:px-4 rounded-xl ">
                        <p class="font-cambria font-bold max-md:text-sm">{{$t('room.removeAccess')}}</p>
                    </button>
                </div>
                <p class="text-darkGreen font-cambria font-normal text-2xl mt-4 sm:mt-8 lg:mt-12 ">{{$t('room.nextReservations')}}:</p>
                <div v-if="getNextReservationsByRoomIdResult.nextReservationsOfRoom.length !== 0" class="max-h-48 sm:max-h-48 overflow-auto">
                    <div v-for="reservation of getNextReservationsByRoomIdResult.nextReservationsOfRoom" :key="reservation.id" class="flex justify-between border-t-2 border-darkGreen pt-2 mt-2 px-2">
                        <p class="text-darkGreen font-cambria font-normal">{{reservation.reservationName}}</p>
                        <div class="flex gap-2">
                            <p class="text-darkGreen font-cambria font-normal">{{formatDate(new Date(reservation.checkInDate))}} - {{ formatDate(new Date(reservation.checkOutDate)) }}</p>
                        </div>
                    </div>
                </div>
                <p v-else class="text-darkGreen font-cambria font-normal text-xl mt-2">{{$t('room.noNextReservations')}}</p>
            </div>
        </div>
        
    </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { GET_ROOM_BY_ID } from '../../graphql/room.query'
import { useRouter } from 'vue-router';
import { GET_RESERVATIONS_BY_ROOM_ID, GET_NEXT_RESERVATIONS_OF_ROOM } from '@/graphql/reservation.query';
import { ref } from 'vue';
import type { CustomReservation } from '@/interfaces/custom.reservation.interface';
import { useMutation } from '@vue/apollo-composable';
import { REMOVE_RESERVATION } from '@/graphql/reservation.mutation';

const {currentRoute} = useRouter()

const { result:getRoomByIdResult } = useQuery(GET_ROOM_BY_ID,{id: currentRoute.value.params.id})

const { result:getReservationsByIdRoom } = useQuery(GET_RESERVATIONS_BY_ROOM_ID,{roomId: currentRoute.value.params.id})

const { result:getNextReservationsByRoomIdResult } = useQuery(GET_NEXT_RESERVATIONS_OF_ROOM, {roomId: currentRoute.value.params.id})

const { mutate:deleteReservation } = useMutation(REMOVE_RESERVATION)

const reservationsByRoomId = ref<CustomReservation[]>([])
const reservationCheckOutDate = ref<string>('')
const currentReservation = ref<CustomReservation>()

if(getReservationsByIdRoom.value) {
    for (const reservation of getReservationsByIdRoom.value.reservationsByRoomId) {
        reservationsByRoomId.value.push(reservation)
    }
}



const isTodayBetweenDates = () => {
    if(getReservationsByIdRoom.value)
    if(reservationsByRoomId.value.length !== 0) {
        for(const reservation of reservationsByRoomId.value) {
            const today = new Date()
            const checkInDate = new Date(reservation.checkInDate)
            const checkOutDate = new Date(reservation.checkOutDate)
            if(today >= checkInDate && today <= checkOutDate) {
                const formattedDate = formatDate(checkOutDate)
                currentReservation.value = reservation
                reservationCheckOutDate.value = formattedDate
                return true
            }
        }
        return false
    } else {
        return false
    }
}

const formatDate = (date:Date) =>{
    const formattedDate = date.toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short'
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

const removeReservation = (reservationId: string) => {
    console.log('remove reservation')
    deleteReservation({
        id: reservationId
    })
    .then(() => {
        location.reload()
    })
    .catch(() => {
        location.reload()
    })
}

</script>