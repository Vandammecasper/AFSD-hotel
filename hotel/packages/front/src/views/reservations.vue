<template>
    <div v-if="getReservationsByCustomerIdResult" class="w-screen h-screen grid justify-items-center">
        <h1 class="text-4xl md:text-5xl text-darkGreen text-center font-cambria font-normal mt-40">YOUR RESERVARTIONS</h1>
        <div v-for="reservation of getReservationsByCustomerIdResult.reservationsByCustomerId" :key="reservation.id" class="w-full grid justify-items-center lg:-mt-0 md:-mt-24 sm:-mt-32 -mt-48">
            <div class="grid grid-cols-3 h-28 sm:h-32 md:h-40 lg:h-48 w-5/6 lg:w-4/5 xl:w-3/5 bg-secondary rounded-3xl justify-between">
                <img src="/images/hotelRoomDeluxe.jpg" alt="" class="rounded-s-2xl h-full">
                <div class="flex justify-between col-span-2">
                    <div class="grid justify-items-start my-2 ml-6 w-96">
                        <h2 class="max-sm:hidden max-sm:text-sm md:text-xl lg:text-2xl xl:text-3xl font-bold font-cambria text-darkGreen">{{getRoomName(reservation.roomId)}}</h2>
                        <h2 v-if="isTodayBetweenDates(reservation)" class="sm:hidden max-sm:text-sm md:text-xl lg:text-2xl xl:text-3xl font-bold font-cambria text-darkGreen">{{shortenText(getRoomName(reservation.roomId))}}</h2>
                        <h2 v-else class="sm:hidden max-sm:text-sm md:text-xl lg:text-2xl xl:text-3xl font-bold font-cambria text-darkGreen">{{getRoomName(reservation.roomId)}}</h2>
                        <p v-if="isTodayBetweenDates(reservation)" class="max-sm:text-sm md:text-lg lg:text-xl xl:text-2xl text-darkGreen font-cambria -mt-4">Room access until {{formatDate(reservation.checkOutDate)}}</p>
                        <div v-else>
                            <p class="max-sm:text-xs md:text-lg lg:text-xl text-darkGreen font-cambria">Reservation:</p>
                            <p class="max-sm:text-xs md:text-lg lg:text-xl text-darkGreen font-cambria">{{formatDate(reservation.checkInDate)}} - {{formatDate(reservation.checkOutDate)}}</p>
                        </div>
                        <p v-if="getLockStatus(reservation.roomId) && reservation.checkedIn" class="max-sm:text-xs md:text-lg lg:text-xl text-darkGreen font-cambria mt-1 sm:mt-4">Room status: LOCKED</p>
                        <p v-else-if="reservation.checkedIn" class="max-sm:text-xs md:text-lg lg:text-xl text-darkGreen font-cambria mt-1 sm:mt-4">Room status: UNLOCKED</p>
                    </div>
                    <button @click="() => {detection = true; roomToCheck = reservation.roomId}" v-if="reservation.checkedIn" class="self-center lg:w-44 lg:h-44 md:w-32 md:h-32 w-28 h-28 max-sm:h-24 grid bg-primary max-sm:p-1 max-sm:px-3 p-4 lg:p-8 rounded-xl sm:rounded-3xl border-solid border-4 border-darkGreen mr-2 md:mr-4 lg:mr-2">
                        <img src="/icons/camera.svg" alt="" class="place-self-center h-8 md:h-16 lg:h-20 max-sm:h-6">
                        <p v-if="getLockStatus(reservation.roomId)" class="text-center max-lg:text-xs mt-1 text-darkGreen font-cambria">Unlock your room</p>
                        <p v-else class="text-center max-lg:text-xs mt-1 text-darkGreen font-cambria">Lock your room</p>
                    </button>
                </div>
            </div>
        </div>
        <div v-if="detection" class="fixed grid w-screen h-screen z-20">
            <button @click="detection = false" class="w-screen h-screen bg-black opacity-70"></button>
            <div v-if="detected == false" class="w-2/5 h-2/3 rounded-3xl fixed self-center left-1/4 ml-20">
                <qrcode-stream @detect="onDetect"></qrcode-stream>
            </div>
            <div v-if="detected && success" class="w-2/5 h-2/3 fixed  rounded-3xl self-center left-1/4 ml-20 bg-secondary gap-8 grid content-center justify-items-center">
                <img v-if="locked" src="/icons/locked.svg" alt="" class="h-28">
                <img v-else src="/icons/unlocked.svg" alt="" class="h-28">
                <p class="text-center text-4xl font-bold text-darkGreen font-cambria leading-normal">Your room has been succesfully {{locked ? 'locked' : 'unlocked'}}</p>
            </div>
            <div v-else-if="noAccess" class="w-2/5 h-2/3 fixed p-24  rounded-3xl self-center left-1/4 ml-20 bg-secondary gap-8 grid content-center justify-items-center">
                <img src="/icons/noAccess.svg" alt="" class="h-28">
                <p class="text-center text-4xl font-bold text-darkGreen font-cambria leading-normal">You do not have access to this room!</p>
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
import { QrcodeStream } from 'vue-qrcode-reader'
import { ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { LOCK_CHANGE } from '../graphql/room.mutation'

const { firebaseUser } = useFirebase()

const detection = ref(false)

const detected = ref(false)

const locked = ref(false)

const unLocked = ref(false)

const success = ref(false)

const noAccess = ref(false)

const roomToCheck = ref('')

const { result: getReservationsByCustomerIdResult } = useQuery(GET_RESERVATIONS_BY_CUSTOMER_ID, {
    uid: firebaseUser.value?.uid
})

const { mutate: lockChange } = useMutation(LOCK_CHANGE)

const { result: getAllRoomsResult } = useQuery(GET_ALL_ROOMS)


interface DetectedCode {
    rawValue: string
}

const onDetect = (detectedCodes:Array<DetectedCode>) => {
    detected.value = true
    if(detectedCodes[0].rawValue === roomToCheck.value) {
        lockChange({
            changeLockInput: {
                roomId: roomToCheck.value,
                customerId: firebaseUser.value?.uid
            }
        }).then(() => {
            success.value = true
            if(getLockStatus(roomToCheck.value)) {
                locked.value = true
                unLocked.value = false
            } else {
                locked.value = false
                unLocked.value = true
            }
            setTimeout(() => {
                detection.value = false
                detected.value = false
                success.value = false
                locked.value = false
                unLocked.value = false
            }, 3000)
        })
        .catch((error) => {
            console.error(error.message)
        })
    } else {
        noAccess.value = true
        setTimeout(() => {
            detection.value = false
            detected.value = false
            noAccess.value = false
        }, 3000)
    }
    
}

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

const shortenText = (text: string): string => {
  if (text.length <= 13) {
    return text;
  }
  return text.slice(0, 13) + '...';
};

</script>