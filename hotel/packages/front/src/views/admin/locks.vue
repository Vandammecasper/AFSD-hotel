<template>
    <div class="w-screen h-screen grid justify-items-center">
        <h1 class="text-5xl text-darkGreen text-center font-cambria font-normal mt-40">{{$t('smartLocks.smartLocks')}}</h1>
        <div v-for="room of getAllRoomsResult.rooms" :key="room.id" class="w-full grid justify-items-center lg:gap-6 lg:mt-8 max-sm:-mt-36 max-md:-mt-12">
            <RouterLink :to="{name: 'lock', params: {id: room.id}}" class="grid grid-cols-3 h-28 sm:h-36 md:h-40 lg:h-48 w-5/6 md:w-4/5 xl:w-3/5 bg-secondary rounded-3xl gap-0 justify-between">
                    <img src="/public/images/hotelRoomDeluxe.jpg" alt="" class="rounded-s-2xl h-full">
                    <div class="flex col-span-2 justify-between">
                        <div class="grid justify-items-start my-2 ml-6">
                            <h2 class="max-sm:hidden sm:text-xl md:text-2xl lg:text-3xl font-bold font-cambria text-darkGreen">{{room.roomName}}</h2>
                            <h2 class="sm:hidden text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold font-cambria text-darkGreen">{{shortenText(room.roomName)}}</h2>
                            <p class="sm:text-xl md:text-2xl text-darkGreen font-cambria -mt-2 lg:-mt-10">{{$t('smartLocks.lastLockChange')}}:</p>
                            <p v-if="getLastLockChageTime(room.id) !== undefined || getLastLockChangePerson(room.id)" class="max-sm:hidden sm:text-xl text-darkGreen font-cambria -mt-4 lg:-mt-10">{{getLastLockChageTime(room.id)}} - {{getLastLockChangePerson(room.id)}}</p>
                            <p v-if="getLastLockChageTime(room.id) !== undefined || getLastLockChangePerson(room.id)" class="sm:hidden sm:text-xl text-darkGreen font-cambria -mt-2 lg:-mt-10">{{getLastLockChageTime(room.id)}}</p>
                            <p v-if="getLastLockChageTime(room.id) !== undefined || getLastLockChangePerson(room.id)" class="sm:hidden sm:text-xl text-darkGreen font-cambria -mt-3 lg:-mt-10">{{getLastLockChangePerson(room.id)}}</p>
                            <p v-else class="sm:text-xl text-darkGreen font-cambria -mt-4 lg:-mt-10">{{$t('smartLocks.noLockChangesYet')}}</p>
                        </div>
                        <img v-if="checkLockStatus(room.id)" src="/public/icons/locked.svg" alt="" class="h-8 sm:h-12 mt-4 mr-4">
                        <img v-else src="/public/icons/unlocked.svg" alt="" class="h-12 mt-4 mr-4">
                    </div>
            </RouterLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { GET_ALL_ROOMS } from '../../graphql/room.query'
import { GET_USER_BY_UID } from '@/graphql/user.query';

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
                const { result:getUserByUidResult } = useQuery(GET_USER_BY_UID, {uid: lockHistory[lockHistory.length - 1].customerId})
                const name = getUserByUidResult.value?.userByUid.userName
                return name
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

const shortenText = (text: string): string => {
  if (text.length <= 13) {
    return text;
  }
  return text.slice(0, 15) + '...';
};

</script>