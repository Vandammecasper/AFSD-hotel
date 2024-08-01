<template>
    <div class="w-screen h-screen grid justify-items-center">
        <h1 v-if="getRoomByIdResult.room.roomNumber < 10" class="text-5xl text-darkGreen text-center font-cambria font-normal mt-40">ROOM NUMBER: 00{{ getRoomByIdResult.room.roomNumber }}</h1>
        <h1 v-if="getRoomByIdResult.room.roomNumber < 100 && getRoomByIdResult.room.roomNumber >= 10" class="text-5xl text-darkGreen text-center font-cambria font-normal mt-40">ROOM NUMBER: 0{{ getRoomByIdResult.room.roomNumber }}</h1>
        <h1 v-if="getRoomByIdResult.room.roomNumber >= 100" class="text-5xl text-darkGreen text-center font-cambria font-normal mt-40">ROOM NUMBER: {{ getRoomByIdResult.room.roomNumber }}</h1>
        <div class="flex">
            <div>
                <img src="../../../public/images/hotelRoomDeluxe.jpg" alt="">
                <div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div>
                <h2>{{getRoomByIdResult.room.roomName}}</h2>
                <h3>Smart lock status</h3>
                <p v-if="getRoomByIdResult.room.isLocked">LOCKED</p>
                <P v-else>UNLOCKED</P>
                <p>Previous lock changes:</p>
                <div v-for="lockChange of getRoomByIdResult.room.lockHistory">
                    <p>{{lockChange.customerId}}</p>
                    <div>
                        <p>{{lockChange.time}}</p>
                        <img v-if="lockChange.isLocked" src="../../../public/icons/locked.svg" alt="">
                        <img v-else src="../../../public/icons/unlocked.svg" alt="">
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

const room = getRoomByIdResult.room

</script>