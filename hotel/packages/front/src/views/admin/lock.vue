<template>
    <div class="w-screen h-screen grid justify-items-center items-center">
        <RouterLink to="/admin/locks" class="absolute left-72 top-32">
            <button class="bg-green flex gap-2 p-2 px-4 rounded-full">
                <img src="/icons/back.svg" alt="">
                <p class="font-cambria font-bold text-primary">{{$t('lock.goBack')}}</p>
            </button>
        </RouterLink>
        <h1 v-if="getRoomByIdResult?.room.roomNumber < 10" class="text-5xl text-darkGreen text-center font-cambria font-normal mt-16">{{$t('lock.roomNumber')}}: 00{{ getRoomByIdResult?.room.roomNumber }}</h1>
        <h1 v-if="getRoomByIdResult?.room.roomNumber < 100 && getRoomByIdResult.room.roomNumber >= 10" class="text-5xl text-darkGreen text-center font-cambria font-normal mt-16">{{$t('lock.roomNumber')}}: 0{{ getRoomByIdResult?.room.roomNumber }}</h1>
        <h1 v-if="getRoomByIdResult?.room.roomNumber >= 100" class="text-5xl text-darkGreen text-center font-cambria font-normal mt-16">{{$t('lock.roomNumber')}}: {{ getRoomByIdResult?.room.roomNumber }}</h1>
        <div class="flex gap-12 border-4 rounded-3xl bg-secondary p-4 border-darkGreen -mt-24">
            <div>
                <img src="/images/hotelRoomDeluxe.jpg" alt="" class="rounded-xl h-64">
                <div class="flex justify-between mt-4 px-4">
                    <div class="grid gap-4">
                        <div class="flex gap-4 items-center">
                            <img src="/icons/surface.svg" alt="" class="h-6">
                            <p class="text-darkGreen font-cambria font-normal text-2xl">{{ getRoomByIdResult?.room.size }} m²</p>
                        </div>
                        <div v-if="checkFacilities('Flatscreen-tv')" class="flex gap-4 items-center">
                            <img src="/icons/tv.svg" alt="" class="h-6">
                            <p class="text-darkGreen font-cambria font-normal text-2xl">{{$t('lock.flatscreenTv')}}</p>
                        </div>
                        <div v-if="checkFacilities('Smoke free')" class="flex gap-4 items-center">
                            <img src="/icons/smoking.svg" alt="" class="h-6">
                            <p class="text-darkGreen font-cambria font-normal text-2xl">{{$t('lock.smokeFree')}}</p>
                        </div>
                    </div>
                    <div class="grid gap-4">
                        <div v-if="checkFacilities('Free wifi')" class="flex gap-4 items-center">
                            <img src="/icons/wifi.svg" alt="" class="h-6">
                            <p class="text-darkGreen font-cambria font-normal text-2xl">{{$t('lock.freeWifi')}}</p>
                        </div>
                        <div v-if="checkFacilities('Free parking')" class="flex gap-4 items-center">
                            <img src="/icons/parking.svg" alt="" class="h-6">
                            <p class="text-darkGreen font-cambria font-normal text-2xl">{{$t('lock.freeParking')}}</p>
                        </div>
                        <div v-if="checkFacilities('Balcony')" class="flex gap-4 items-center">
                            <img src="/icons/balcony.svg" alt="" class="h-6">
                            <p class="text-darkGreen font-cambria font-normal text-2xl">{{$t('lock.balcony')}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="min-w-96">
                <h2 class="text-darkGreen font-cambria font-normal text-4xl">{{getRoomByIdResult?.room.roomName}}</h2>
                <h3 class="text-darkGreen font-cambria font-normal text-2xl mt-6">{{$t('lock.smartLockStatus')}}:</h3>
                <p v-if="getRoomByIdResult?.room.isLocked" class="text-darkGreen font-cambria font-bold text-xl">{{$t('lock.locked')}}</p>
                <P v-else class="text-darkGreen font-cambria font-bold text-xl">{{$t('lock.unlocked')}}</P>
                <p class="text-darkGreen font-cambria font-normal text-2xl mt-12 ">{{$t('lock.previousLockChanges')}}:</p>
                <div v-if="getRoomByIdResult?.room.lockHistory.length > 0" class="max-h-48 overflow-auto">
                    <div v-for="lockChange of getRoomByIdResult.room.lockHistory" :key="lockChange.id" class="flex justify-between border-t-2 border-darkGreen pt-2 mt-2 px-2">
                        <p class="text-darkGreen font-cambria font-normal">{{findCustomerName(lockChange.customerId)}}</p>
                        <div class="flex gap-2">
                            <p class="text-darkGreen font-cambria font-normal">{{formatDate(lockChange.time)}}</p>
                            <img v-if="lockChange.isLocked" src="/icons/locked.svg" alt="" class="h-6">
                            <img v-else src="/icons/unlocked.svg" alt="" class="h-6">
                        </div>
                    </div>
                </div>
                <p v-else class="text-darkGreen text-xl font-cambria font-normal mt-2">{{$t('lock.noLockChangesYet')}}</p>
            </div>
        </div>
        
    </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { GET_ROOM_BY_ID } from '../../graphql/room.query'
import { useRouter } from 'vue-router';
import { GET_USER_BY_UID } from '@/graphql/user.query';

const {currentRoute} = useRouter()

const { result:getRoomByIdResult } = useQuery(GET_ROOM_BY_ID,{id: currentRoute.value.params.id})

const findCustomerName = (uid: string) => {
    const { result: getUserByUidResult } = useQuery(GET_USER_BY_UID, {uid: uid})
    if(getUserByUidResult.value){
        return getUserByUidResult.value.userByUid.userName
    }
}

const formatDate = (date:string) =>{
    const givenDate = new Date(date)
    const formattedDate = givenDate.toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    })
    return formattedDate
}

const checkFacilities = (facility: string) => {
    if(getRoomByIdResult.value){
        for(const roomFacility of getRoomByIdResult.value?.room.facilities) {
            console.log(roomFacility)
            if(roomFacility === facility) {
                return true
            }
        }
    }
}

</script>