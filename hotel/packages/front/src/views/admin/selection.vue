<template>
  <div class="w-screen h-screen grid justify-items-center">
    <div class="mt-40 flex gap-16">
      <VueDatePicker v-model="date" range model-type="MM.dd.yyyy" :clearable=true />
      <input v-model.number="amountOfPeople" type="number" class="h-9 p-2" placeholder="Number of people" />
      <button @click="findRoom(new Date(date[0]), new Date(date[1]), amountOfPeople)" class="bg-accent rounded-3xl px-8 py-1.5 w-96 h-12 -mt-1">
        <p class="font-cambria font-bold text-primary text-2xl">Find a room</p>
      </button>
    </div>
    <div v-if="rooms.length > 0" v-for="room in rooms" :key="room.id" class="w-full grid justify-items-center gap-6 mt-8">
      <RouterLink :to="{name: 'detail', params: {roomId: room.id, checkInDate: date[0], checkOutDate: date[1]}}" class=" w-4/5 grid justify-self-center">
        <button class="grid grid-cols-3 h-56 bg-secondary rounded-3xl gap-0 justify-between justify-self-center">
          <img src="/images/hotelRoomDeluxe.jpg" alt="" class="rounded-s-2xl h-full" />
          <div class="grid justify-items-start my-2 ml-6 w-96">
            <h2 class="text-3xl font-bold font-cambria text-darkGreen">{{ room.roomName }}</h2>
            <div class="flex gap-32 mt-5">
              <div class="flex flex-col gap-4">
                <div class="flex items-center gap-3">
                  <img src="/icons/surface.svg" alt="" class="h-8" />
                  <p class="text-xl font-cambria text-darkGreen">{{ room.size }} m²</p>
                </div>
                <div v-if="checkFacilities('Flatscreen-tv', room.id)" class="flex items-center gap-3 w-40">
                  <img src="/icons/tv.svg" alt="" class="h-8" />
                  <p class="text-xl font-cambria text-darkGreen">Flatscreen-tv</p>
                </div>
                <div v-if="checkFacilities('Smoke free', room.id)" class="flex items-center gap-3">
                  <img src="/icons/smoking.svg" alt="" class="h-8" />
                  <p class="text-xl font-cambria text-darkGreen">Smoke free</p>
                </div>
              </div>
              <div class="flex flex-col gap-4">
                <div v-if="checkFacilities('Free wifi', room.id)" class="flex items-center gap-3 -ml-2">
                  <img src="/icons/wifi.svg" alt="" class="h-8" />
                  <p class="text-xl font-cambria text-darkGreen">Free wifi</p>
                </div>
                <div v-if="checkFacilities('Free parking', room.id)" class="flex items-center gap-3 w-40">
                  <img src="/icons/parking.svg" alt="" class="h-8" />
                  <p class="text-xl font-cambria text-darkGreen">Free parking</p>
                </div>
                <div v-if="checkFacilities('Balcony', room.id)" class="flex items-center gap-3">
                  <img src="/icons/balcony.svg" alt="" class="h-9" />
                  <p class="text-xl font-cambria text-darkGreen">Balcony</p>
                </div>
              </div>
            </div>
          </div>
          <div class="ml-40 mt-16 flex flex-col items-center text-center">
            <p class="text-xl font-cambria text-darkGreen">Price per night</p>
            <h3 class="text-7xl font-cambria font-bold text-darkGreen">€ {{ room.price }}</h3>
          </div>
        </button>
      </RouterLink>
    </div>
    <p v-else class="text-2xl text-darkGreen font-cambria">There are no rooms available for your search</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { GET_ALL_ROOMS } from '@/graphql/room.query';
import { useQuery } from '@vue/apollo-composable';
import { GET_ALL_RESERVATIONS } from '@/graphql/reservation.query';
import type { CustomRoom } from '@/interfaces/custom.room.interface';

const date = ref([]);
const amountOfPeople = ref(1); // Default to 1 person
const rooms = ref<Array<CustomRoom>>([]);

const { result: getAllRoomsResult } = useQuery(GET_ALL_ROOMS);
const { result: getAllReservationsResult } = useQuery(GET_ALL_RESERVATIONS);

const checkFacilities = (facility: string, roomId: string) => {
  for (const room of getAllRoomsResult.value.rooms) {
    if (room.id === roomId) {
      return room.facilities.includes(facility);
    }
  }
  return false;
};

const findRoom = (startDate: Date, endDate: Date, amountOfPeople: number) => {
  let availableRooms = getAllRoomsResult.value.rooms.filter((room: CustomRoom) => {
  return room.maxOccupation != null && room.maxOccupation != undefined && room.maxOccupation >= amountOfPeople;
});

  for (const reservation of getAllReservationsResult.value.reservations) {
    availableRooms = availableRooms.filter((room:CustomRoom) => {
      if (reservation.roomId === room.id) {
        return !(
          (startDate >= new Date(reservation.checkInDate) && startDate < new Date(reservation.checkOutDate)) ||
          (endDate > new Date(reservation.checkInDate) && endDate <= new Date(reservation.checkOutDate)) ||
          (startDate <= new Date(reservation.checkInDate) && endDate >= new Date(reservation.checkOutDate))
        );
      }
      return true;
    });
  }
  
  rooms.value = availableRooms;
};
</script>
