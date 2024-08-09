<template>
    <div class="w-screen h-screen flex flex-col items-center justify-center">
        <RouterLink to="/admin/selection" class="absolute left-48 top-32">
            <button class="bg-green flex gap-2 p-2 px-4 rounded-full">
                <img src="/icons/back.svg" alt="">
                <p class="font-cambria font-bold text-primary">GO BACK</p>
            </button>
        </RouterLink>
        <h1 v-if="getRoomByIdResult.room.roomNumber < 10" class="text-5xl text-darkGreen text-center font-cambria font-normal mt-24">ROOM NUMBER: 00{{ getRoomByIdResult.room.roomNumber }}</h1>
        <h1 v-if="getRoomByIdResult.room.roomNumber < 100 && getRoomByIdResult.room.roomNumber >= 10" class="text-5xl text-darkGreen text-center font-cambria font-normal mt-24">ROOM NUMBER: 0{{ getRoomByIdResult.room.roomNumber }}</h1>
        <h1 v-if="getRoomByIdResult.room.roomNumber >= 100" class="text-5xl text-darkGreen text-center font-cambria font-normal mt-24">ROOM NUMBER: {{ getRoomByIdResult.room.roomNumber }}</h1>
        <div class="w-3/4 bg-secondary p-6 mt-8 rounded-3xl flex gap-16">
            <div>
                <img src="/images/hotelRoomDeluxe.jpg" alt="" class="rounded-2xl h-64">
                <div class="flex gap-32 mt-6">
                    <div class="flex flex-col gap-4">
                        <div class="flex items-center gap-3">
                            <img src="/icons/surface.svg" alt="" class="h-8">
                            <p class="text-xl font-cambria">{{getRoomByIdResult.room.size}} m²</p>
                        </div>
                        <div v-if="checkFacilities('Flatscreen-tv')" class="flex items-center gap-3 w-40">
                            <img src="/icons/tv.svg" alt="" class="h-8">
                            <p class="text-xl font-cambria">Flatscreen-tv</p>
                        </div>
                        <div v-if="checkFacilities('Smoke free')" class="flex items-center gap-3">
                            <img src="/icons/smoking.svg" alt="" class="h-8">
                            <p class="text-xl font-cambria">Smoke free</p>
                        </div>
                    </div>
                    <div class="flex flex-col gap-4">
                        <div v-if="checkFacilities('Free wifi')" class="flex items-center gap-3 -ml-2">
                            <img src="/icons/wifi.svg" alt="" class="h-8">
                            <p class="text-xl font-cambria">Free wifi</p>
                        </div>
                        <div v-if="checkFacilities('Free parking')" class="flex items-center gap-3 w-40">
                            <img src="/icons/parking.svg" alt="" class="h-8">
                            <p class="text-xl font-cambria">Free parking</p>
                        </div>
                        <div v-if="checkFacilities('Balcony')" class="flex items-center gap-3">
                            <img src="/icons/balcony.svg" alt="" class="h-9">
                            <p class="text-xl font-cambria">Balcony</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col">
                <h2 class="text-3xl font-bold font-cambria text-darkGreen">{{getRoomByIdResult.room.roomName}}</h2>
                <p class="font-normal font-cambria text-darkGreen mr-12 mt-4">{{getRoomByIdResult.room.description}}</p>
                <div class="flex mt-8 gap-8">
                    <div class="flex flex-col gap-3">
                        <input placeholder="Reservation name" v-model="reservationNameInput" type="text" class="font-cambria text-darkGreen rounded-2xl mt-1 block border-2 bg-secondary border-darkGreen p-2 ">
                        <input placeholder="Guest 1 email" v-model="guestInput1" type="email" class="font-cambria text-darkGreen rounded-2xl mt-1 block border-2 bg-secondary border-darkGreen p-2 ">
                        <input placeholder="Guest 2 email" v-model="guestInput2" type="email" class="font-cambria text-darkGreen rounded-2xl mt-1 block border-2 bg-secondary border-darkGreen p-2">
                    </div>
                    <div>
                        <p class="text-center text-2xl font-cambria font-normal">{{formatDate(checkinDate)}} - {{formatDate(checkOutDate)}}</p>
                        <h3 class="text-center text-7xl mt-2 font-cambria font-bold">€ {{calculateTotalPrice()}}</h3>
                        <button @click="createReservation(reservationNameInput, guestInput1, guestInput2)" class="bg-accent rounded-3xl px-8 py-1.5 mt-3.5 ml-12 text-secondary font-cambria font-bold text-xl">Complete reservation</button>
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
import { GET_USER_BY_EMAIL } from '../../graphql/user.query'
import { CREATE_RESERVATION } from '../../graphql/reservation.mutation'
import { useMutation } from '@vue/apollo-composable'
import type { CustomReservation } from '../../interfaces/custom.reservation.interface'
import router from '@/bootstrap/router'
import { ref } from 'vue';

const {currentRoute} = useRouter()

const { result:getRoomByIdResult } = useQuery(GET_ROOM_BY_ID,{id: currentRoute.value.params.roomId})

const { mutate: createReservationMutation } = useMutation<CustomReservation>(CREATE_RESERVATION)

const checkinDate = ref<string>('')
const checkOutDate = ref<string>('')

if (Array.isArray(currentRoute.value.params.checkInDate)) {
    checkinDate.value = currentRoute.value.params.checkInDate[0]
} else{
    checkinDate.value = currentRoute.value.params.checkInDate
}

if (Array.isArray(currentRoute.value.params.checkOutDate)) {
    checkOutDate.value = currentRoute.value.params.checkOutDate[0]
} else{
    checkOutDate.value = currentRoute.value.params.checkOutDate
}

const reservationNameInput = ref('')
const guestInput1 = ref('')
const guestInput2 = ref('')

const formatDate = (date:string) =>{
    const givenDate = new Date(date)
    const formattedDate = givenDate.toLocaleDateString('en-GB', {
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

const calculateTotalPrice = () => {
    const checkIn = new Date(checkinDate.value)
    const checkOut = new Date(checkOutDate.value)
    const differenceInDays = checkOut.getDate() - checkIn.getDate()
    return differenceInDays * getRoomByIdResult.value.room.price
}

const createReservation = (reservationName:string, guestEmail1:string, guestEmail2:string) => {
    const {result: guest1} = useQuery(GET_USER_BY_EMAIL, {email: guestEmail1})
    const {result: guest2} = useQuery(GET_USER_BY_EMAIL, {email: guestEmail2})
    if(guest1.value && guest2.value){
        console.log(guest1.value.userByEmail.id)
        createReservationMutation({
            createReservationInput: {
                roomId: currentRoute.value.params.roomId,
                checkInDate: new Date(checkinDate.value),
                checkOutDate: new Date(checkOutDate.value),
                reservationName: reservationName,
                customerIds: [guest1.value.userByEmail.uid, guest2.value.userByEmail.uid]
            }
        })
        .then(() => {
            router.push('/')
        })
        .catch((e) => {
            console.error('ApolloError:', e);
            console.error('GraphQL Errors:', e.graphQLErrors);
            console.error('Network Error:', e.networkError);
            console.error('Error Message:', e.message);
        })
    } else if (guest1.value && !guest2.value){
        createReservationMutation({
            createReservationInput: {
                roomId: currentRoute.value.params.roomId,
                checkInDate: new Date(checkinDate.value),
                checkOutDate: new Date(checkOutDate.value),
                reservationName: reservationName,
                customerIds: [guest1.value.userByEmail.uid]
            }
        })
        .then(() => {
            router.push('/')
        })
        .catch((e) => {
            console.error('ApolloError:', e);
            console.error('GraphQL Errors:', e.graphQLErrors);
            console.error('Network Error:', e.networkError);
            console.error('Error Message:', e.message);
        })
    }
}

</script>