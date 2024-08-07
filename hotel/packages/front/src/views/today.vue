<template>
  <div class="w-screen h-screen grid justify-items-center">
    <div v-if="notCheckedInReservationsOfToday.length > 0" v-for="reservation in notCheckedInReservationsOfToday" :key="reservation.id" class="w-full grid justify-items-center gap-6  mt-40">
      <div class=" w-4/6 grid justify-self-center">
        <div class="grid grid-cols-3 h-56 bg-secondary rounded-3xl gap-0 justify-between justify-self-center">
          <img src="../../../public/images/hotelRoomDeluxe.jpg" alt="" class="rounded-s-2xl h-full" />
          <div class="grid justify-items-start my-2 ml-6 w-96">
            <h2 class="text-3xl font-bold font-cambria text-darkGreen">{{ findRoomName(reservation.roomId) }}</h2>
            <div class="flex gap-8">
                <div>
                    <h3 class="text-darkGreen font-cambria font-normal text-2xl">Reservation name:</h3>
                    <p class="text-darkGreen font-cambria font-bold text-xl">{{ reservation.reservationName }}</p>
                    <h3 class="text-darkGreen font-cambria font-normal text-2xl mt-4">Customers:</h3>
                    <p class="text-darkGreen font-cambria font-bold text-xl">{{ reservation.customerIds.length }}</p>
                </div>
                <div>
                    <h3 class="text-darkGreen font-cambria font-normal text-2xl">Check-in date:</h3>
                    <p class="text-darkGreen font-cambria font-bold text-xl">{{ formatDate(reservation.checkInDate) }}</p>
                    <h3 class="text-darkGreen font-cambria font-normal text-2xl mt-4">Check-out date:</h3>
                    <p class="text-darkGreen font-cambria font-bold text-xl">{{ formatDate(reservation.checkOutDate) }}</p>
                </div>
            </div>
        </div>
        <div class=" flex flex-col items-center text-center ml-16 mt-14">
            <p class="text-xl font-cambria text-darkGreen">Total price</p>
            <h3 class="text-6xl font-cambria font-bold text-darkGreen">€ {{ reservation.price }}</h3>
            <button @click="completeCheckIn(reservation.id)" class="bg-accent rounded-3xl w-44 px-8 py-1.5 mt-4 ml-3 text-secondary font-cambria font-bold text-xl">check-in</button>
        </div>
        </div>
      </div>
    </div>
    <p v-else class="text-2xl text-darkGreen font-cambria mt-48">No check-ins today</p>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { useMutation } from '@vue/apollo-composable';
import { GET_NOT_CHECKED_IN_RESERVATIONS_OF_TODAY } from '@/graphql/reservation.query';
import { GET_ROOM_BY_ID } from '@/graphql/room.query';
import { CHECK_IN_RESERVATION } from '@/graphql/reservation.mutation';
import router from '@/bootstrap/router'
import { ref } from 'vue'

const { result: getNotCheckedInReservationsOfToday, onResult: checkReservations } = useQuery(GET_NOT_CHECKED_IN_RESERVATIONS_OF_TODAY);

const { mutate: checkInReservation } = useMutation(CHECK_IN_RESERVATION);

const notCheckedInReservationsOfToday = ref([])

checkReservations(() => {
    if(getNotCheckedInReservationsOfToday.value){
        notCheckedInReservationsOfToday.value = getNotCheckedInReservationsOfToday.value.notCheckedInReservationsOfToday
    }
})

const findRoomName = (roomId:string) => {
    const { result:getRoomByIdResult } = useQuery(GET_ROOM_BY_ID,{id: roomId})
    if(getRoomByIdResult.value){
        return getRoomByIdResult.value.room.roomName
    } else {
        return 'Room not found'
    }
}

const formatDate = (date:string) =>{
    const givenDate = new Date(date)
    const formattedDate = givenDate.toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric'
    })
    return formattedDate
}

const completeCheckIn = (reservationId:string) => {
    console.log(reservationId)
    checkInReservation({id: reservationId})
    .then(() => {
        console.log('checked in')
        router.push('/')
    })
}

</script>
