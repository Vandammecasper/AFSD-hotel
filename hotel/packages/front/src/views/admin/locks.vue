<template>
    <div class="w-screen h-screen grid justify-items-center">
        <h1 class="text-5xl text-darkGreen text-center font-cambria font-normal mt-40">SMART LOCKS</h1>
        <div v-for="room of getAllRoomsResult.rooms" class="w-full grid justify-items-center gap-6 mt-8">
            <div class="grid grid-cols-3 h-48 w-3/5 bg-secondary rounded-3xl gap-0 justify-between">
                <img src="../../../public/images/hotelRoomDeluxe.jpg" alt="" class="rounded-s-2xl h-full">
                <div class="grid justify-items-start my-2 ml-6 w-96">
                    <h2 class="text-3xl font-bold font-cambria text-darkGreen">{{room.roomName}}</h2>
                    <p class="text-2xl text-darkGreen font-cambria -mt-10">Last lock change:</p>
                    <p v-if="getLastLockChageTime(room.id) !== undefined || getLastLockChangePerson(room.id)" class="text-xl text-darkGreen font-cambria -mt-10">{{getLastLockChageTime(room.id)}} - {{getLastLockChangePerson(room.id)}}</p>
                    <p v-else class="text-xl text-darkGreen font-cambria -mt-10">No lock changes yet</p>
                </div>
                <img v-if="checkLockStatus(room.id)" src="../../../public/icons/locked.svg" alt="" class="h-12 mt-4 ml-60">
                <img v-else src="../../../public/icons/unlocked.svg" alt="" class="h-12 mt-4 ml-60">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { GET_ALL_ROOMS } from '../../graphql/room.query'

const { result:getAllRoomsResult } = useQuery(GET_ALL_ROOMS)

const getLastLockChageTime = (roomId: string) => {
    const allRooms = getAllRoomsResult.value.rooms
    for (const room of allRooms) {
        if (room.id === roomId) {
            const lockHistory = room.lockHistory
            if (lockHistory.length > 0) {
                const date = new Date(lockHistory[lockHistory.length - 1].time)
                const formattedDate = date.toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                })
                return formattedDate
            } else {
                return undefined
            }
        }
    }
}

const getLastLockChangePerson = (roomId: string) => {
    const allRooms = getAllRoomsResult.value.rooms
    for (const room of allRooms) {
        if (room.id === roomId) {
            const lockHistory = room.lockHistory
            if (lockHistory.length > 0) {
                return lockHistory[lockHistory.length - 1].customerId
            } else {
                return undefined
            }
        }
    }
}

const checkLockStatus = (roomId: string) => {
    const allRooms = getAllRoomsResult.value.rooms
    for (const room of allRooms) {
        if (room.id === roomId) {
            return room.isLocked
        }
    }
}

</script>