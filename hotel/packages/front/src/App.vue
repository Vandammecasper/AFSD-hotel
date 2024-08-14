<script setup lang="ts">
import { DefaultApolloClient, useQuery } from '@vue/apollo-composable';
import { provide, ref } from 'vue';
import { RouterView } from 'vue-router'
import useGraphql from './composables/useGraphql';
import useRealtime from './composables/useRealtime';
import { GET_USER_BY_UID } from './graphql/user.query';
import { GET_RESERVATIONS_BY_ROOM_ID } from './graphql/reservation.query';

const { apolloClient } = useGraphql()
provide(DefaultApolloClient, apolloClient)

const { on } = useRealtime()
const newLockChange = ref(false)
const isLocked = ref(false)
const roomNumber = ref('')
const customerUid = ref('')
const customerName = ref('')

on('connect', () => {
  console.log('connected to websocket')
})

on ('newLockChange', (data) => {
  // console.log('new lock change', data)
  // const { result:getReservationsByRoomIdResult } = useQuery(GET_RESERVATIONS_BY_ROOM_ID, { roomId: data.id })
  customerUid.value = data.lockHistory[data.lockHistory.length - 1].customerId
  roomNumber.value = data.roomNumber
  const { result:getUserByUidResult } = useQuery(GET_USER_BY_UID, { uid: customerUid.value })
  customerName.value = getUserByUidResult.value.userByUid.userName
  isLocked.value = data.isLocked
  // if(getReservationsByRoomIdResult?.value){
  //   for(const reservation of getReservationsByRoomIdResult?.value.reservationsByRoomId) {
  //     for(const customerId of reservation.customerIds){
  //       if(customerId === customerUid.value){
  //          newLockChange.value = true
  //       }
  //     }
  //   }
  // }
  newLockChange.value = true
  setTimeout(() => {
    newLockChange.value = false
    customerName.value = ''
    customerUid.value = ''
  }, 7000)
})

</script>

<template>
  <div class="w-screen h-screen">
    <div v-if="newLockChange && isLocked" class="fixed z-10 right-0 top-32 bg-accent p-3 px-5 font-cambria font-bold text-primary text-xl rounded-s-full">
      {{$t('app.room')}} {{roomNumber}} {{$t('app.hasBeenLockedBy')}} {{customerName}}
    </div>
    <div v-else-if="newLockChange && isLocked === false" class="fixed z-10 right-0 top-32 bg-accent p-3 px-5 font-cambria font-bold text-primary text-xl rounded-s-full">
      {{$t('app.room')}} {{roomNumber}} {{$t('app.hasBeenUnlockedBy')}} {{customerName}}
    </div>
    <RouterView />
  </div>
</template>

