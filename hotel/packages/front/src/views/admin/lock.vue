<template>
    <div class="w-screen h-screen grid justify-items-center items-center">
        <RouterLink to="/admin/locks" class="absolute left-72 top-32">
            <button class="bg-green flex gap-2 p-2 px-4 rounded-full">
                <img src="../../../public/icons/back.svg" alt="">
                <p class="font-cambria font-bold text-primary">GO BACK</p>
            </button>
        </RouterLink>
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
            <div class="min-w-96">
                <h2 class="text-darkGreen font-cambria font-normal text-4xl">{{getRoomByIdResult.room.roomName}}</h2>
                <h3 class="text-darkGreen font-cambria font-normal text-2xl mt-6">Smart lock status:</h3>
                <p v-if="getRoomByIdResult.room.isLocked" class="text-darkGreen font-cambria font-bold text-xl">LOCKED</p>
                <P v-else class="text-darkGreen font-cambria font-bold text-xl">UNLOCKED</P>
                <p class="text-darkGreen font-cambria font-normal text-2xl mt-12 ">Previous lock changes:</p>
                <div class="max-h-48 overflow-auto">
                    <div v-for="lockChange of getRoomByIdResult.room.lockHistory" class="flex justify-between border-t-2 border-darkGreen pt-2 mt-2 px-2">
                        <p class="text-darkGreen font-cambria font-normal">{{lockChange.customerId}}</p>
                        <div class="flex gap-2">
                            <p class="text-darkGreen font-cambria font-normal">{{formatDate(lockChange.time)}}</p>
                            <img v-if="lockChange.isLocked" src="../../../public/icons/locked.svg" alt="" class="h-6">
                            <img v-else src="../../../public/icons/unlocked.svg" alt="" class="h-6">
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

const {currentRoute} = useRouter()

const { result:getRoomByIdResult } = useQuery(GET_ROOM_BY_ID,{id: currentRoute.value.params.id})


const formatDate = (date:string) =>{
    const givenDate = new Date(date)
    const formattedDate = givenDate.toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    })
    return formattedDate
}

const  = (facility: string) => {
    console.log(getRoomByIdResult.value.room.facilities)
    for(const roomFacility of getRoomByIdResult.value.room.facilities) {
        console.log(roomFacility)
        if(roomFacility === facility) {
            return true
        }
    }
}

</script>