<template>
    <div class="w-screen h-screen grid justify-items-center items-center">
        <RouterLink to="/admin/overview" class="absolute left-72 top-32">
            <button class="bg-green flex gap-2 p-2 px-4 rounded-full">
                <img src="/icons/back.svg" alt="">
                <p class="font-cambria font-bold text-primary">GO BACK</p>
            </button>
        </RouterLink>
        <h1 v-if="getRoomByIdResult?.room.roomNumber < 10" class="text-5xl text-darkGreen text-center font-cambria font-normal mt-12">UPDATE ROOM 00{{getRoomByIdResult.room.roomNumber}}</h1>
        <h1 v-if="getRoomByIdResult?.room.roomNumber > 10 && getRoomByIdResult.room.roomNumber < 100" class="text-5xl text-darkGreen text-center font-cambria font-normal mt-12">UPDATE ROOM 0{{getRoomByIdResult.room.roomNumber}}</h1>
        <h1 v-if="getRoomByIdResult?.room.roomNumber > 10" class="text-5xl text-darkGreen text-center font-cambria font-normal mt-12">UPDATE ROOM {{getRoomByIdResult.room.roomNumber}}</h1>
        <div class="flex gap-12 border-4 rounded-3xl bg-secondary p-6 border-darkGreen -mt-24">
            <div>
                <div class="flex gap-12">
                    <div class="">
                        <div class="">
                            <label
                                for="roomTitle"
                                class="text-md block font-bold tracking-wider text-darkGreen font-cambria"
                            >
                                Room title
                            </label>
                            <input
                                type="text"
                                name="roomTitle"
                                id="roomTitle"
                                placeholder="New room title"
                                class="font-cambria text-darkGreen rounded-2xl mt-1 block border-2 bg-secondary border-darkGreen p-2 "
                                :value="getRoomByIdResult?.room.roomName"
                            />
                        </div>
                        <div class="mt-4">
                            <label
                                for="pricePerNight"
                                class="text-md block font-bold tracking-wider text-darkGreen font-cambria"
                            >
                                Price per night (€)
                            </label>
                            <input
                                type="number"
                                name="pricePerNight"
                                id="pricePerNight"
                                placeholder="00.00"
                                class="font-cambria text-darkGreen rounded-2xl mt-1 block border-2 bg-secondary border-darkGreen p-2 "
                                :value="getRoomByIdResult?.room.price"
                            />
                        </div>
                        <div class="mt-4">
                            <label
                                for="size"
                                class="text-md block font-bold tracking-wider text-darkGreen font-cambria"
                            >
                                Size (m²)
                            </label>
                            <input
                                type="number"
                                name="size"
                                id="size"
                                placeholder="0"
                                class="font-cambria text-darkGreen rounded-2xl mt-1 block border-2 bg-secondary border-darkGreen p-2 "
                                :value="getRoomByIdResult?.room.size"
                            />
                        </div>
                    </div>
                    <div>
                        <div class="">
                            <label
                                for="roomNumber"
                                class="text-md block font-bold tracking-wider text-darkGreen font-cambria"
                            >
                                Room number
                            </label>
                            <input
                                type="number"
                                name="roomNumber"
                                id="roomNumber"
                                placeholder="0"
                                class="font-cambria text-darkGreen rounded-2xl mt-1 block border-2 bg-secondary border-darkGreen p-2 "
                                :value="getRoomByIdResult?.room.roomNumber"
                            />
                        </div>
                        <div class="mt-4">
                            <label
                                for="maxOccupancy"
                                class="text-md block font-bold tracking-wider text-darkGreen font-cambria"
                            >
                                Maximum occupancy
                            </label>
                            <input
                                type="number"
                                name="maxOccupancy"
                                id="maxOccupancy"
                                placeholder="1"
                                class="font-cambria text-darkGreen rounded-2xl mt-1 block border-2 bg-secondary border-darkGreen p-2 "
                                :value="getRoomByIdResult?.room.maxOccupation"
                            />
                        </div>
                        <div class="mt-4">
                            <label
                                class="text-md block font-bold tracking-wider text-darkGreen font-cambria"
                            >
                                Select room facilities
                            </label>
                            <div class="flex gap-1">
                                <div class="flex gap-1" v-if="checkFacilities('Flatscreen-tv')">
                                    <input checked type="checkbox" name="flatscreenTv" id="flatscreenTv" class="" v-model="flatscreenTv"/>
                                    <label for="flatscreenTv">Flatscreen-tv</label>
                                </div>
                                <div class="flex gap-1" v-else>
                                    <input type="checkbox" name="flatscreenTv" id="flatscreenTv" class="" v-model="flatscreenTv"/>
                                    <label for="flatscreenTv">Flatscreen-tv</label>
                                </div>
                                <div class="flex gap-1" v-if="checkFacilities('Balcony')" >
                                    <input checked class="ml-2" type="checkbox" name="balcony" id="balcony" v-model="balcony"/>
                                    <label for="balcony">Balcony</label>
                                </div>
                                <div class="flex gap-1" v-else>
                                    <input class="ml-2" type="checkbox" name="balcony" id="balcony" v-model="balcony"/>
                                    <label for="balcony">Balcony</label>
                                </div>
                                <div class="flex gap-1" v-if="checkFacilities('Free wifi') === true">
                                    <input checked class="ml-2" type="checkbox" name="freeWifi" id="freeWifi" v-model="freeWifi"/>
                                    <label for="freeWifi">Free wifi</label>
                                </div>
                                <div class="flex gap-1" v-else>
                                    <input checked class="ml-2" type="checkbox" name="freeWifi" id="freeWifi" v-model="freeWifi"/>
                                    <label for="freeWifi">Free wifi</label>
                                </div>
                            </div>
                            <div class="flex gap-1">
                                <div class="flex gap-1" v-if="checkFacilities('Free parking')">
                                    <input checked type="checkbox" name="freeParking" id="freeParking" class="" v-model="freeParking"/>
                                    <label for="freeParking">Free parking</label>
                                </div>
                                <div class="flex gap-1" v-else>
                                    <input type="checkbox" name="freeParking" id="freeParking" class="" v-model="freeParking"/>
                                    <label for="freeParking">Free parking</label>
                                </div>
                                <div class="flex gap-1" v-if="checkFacilities('Smoke free')">
                                    <input checked type="checkbox" name="smokeFree" id="smokeFree" class="ml-2" v-model="smokeFree"/>
                                    <label for="smokeFree">Smoke free</label>
                                </div>
                                <div class="flex gap-1" v-else>
                                    <input type="checkbox" name="smokeFree" id="smokeFree" class="ml-2" v-model="smokeFree"/>
                                    <label for="smokeFree">Smoke free</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-4">
                    <label
                        for="roomDescription"
                        class="text-md block font-bold tracking-wider text-darkGreen font-cambria"
                    >
                        Room description
                    </label>
                    <input
                        type="textarea"
                        name="description"
                        id="description"
                        placeholder="information about the room"
                        class="font-cambria text-darkGreen rounded-2xl mt-1 border-2 bg-secondary border-darkGreen p-2 w-96 "
                        :value="getRoomByIdResult?.room.description"
                    />
                </div>
            </div>
            <div class="grid justify-items-center">
                <img src="/images/hotelRoomDeluxe.jpg" alt="" class="rounded-xl h-56">
                <button @click="handleRoomUpdate(flatscreenTv, balcony, freeWifi, freeParking, smokeFree)" class="bg-accent rounded-3xl w-96 px-8 py-1.5 mt-16 text-secondary font-cambria font-bold text-2xl">Update room</button>
            </div>
        </div>
        
    </div>
</template>

<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable';
import router from '@/bootstrap/router';
import { UPDATE_ROOM } from '../../graphql/room.mutation'
import { useQuery } from '@vue/apollo-composable';
import { GET_ROOM_BY_ID } from '@/graphql/room.query';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const { currentRoute } = useRouter()

const { result: getRoomByIdResult } = useQuery(GET_ROOM_BY_ID, {id: currentRoute.value.params.id})

const { mutate: updateRoom } = useMutation(UPDATE_ROOM)

// const roomTitle = ref('')
// const pricePerNight = ref('')
// const size = ref('')
// const roomNumber = ref('')
// const maxOccupancy = ref('')
// const description = ref('')
const flatscreenTv = ref(false)
const balcony = ref(false)
const freeWifi = ref(false)
const freeParking = ref(false)
const smokeFree = ref(false)

// if(getRoomByIdResult.value){
//     console.log(getRoomByIdResult.value)
//     roomTitle.value = getRoomByIdResult.value?.room.roomName
//     pricePerNight.value = getRoomByIdResult.value?.room.price
//     size.value = getRoomByIdResult.value?.room.size
//     roomNumber.value = getRoomByIdResult.value?.room.roomNumber
//     maxOccupancy.value = getRoomByIdResult.value?.room.maxOccupation
//     description.value = getRoomByIdResult.value?.room.description
// }

const checkFacilities = (facility: string) => {
    if(getRoomByIdResult.value){
        for(const roomFacility of getRoomByIdResult.value.room.facilities) {
            if(roomFacility === facility) {
                return true
            }
        }
        return false
    } else {
        return false
    }
}

const handleRoomUpdate = (tv:boolean, balc:boolean, wifi:boolean, parking:boolean, smoke:boolean) =>{
    let facilities:Array<string> = []
        for(const roomFacility of getRoomByIdResult.value.room.facilities) {
            facilities.push(roomFacility)
        }
        if(tv){
            //check if the facility is already in the array
            if(facilities.includes('Flatscreen-tv')){
                //do nothing
            }
            else{
                facilities.push('Flatscreen-tv')
            }
        }
        else if(tv === false){
            //remove the facility
        facilities = facilities.filter(facility => facility !== 'Flatscreen-tv')
    }
    if(balc){
        if(facilities.includes('Balcony')){
            //do nothing
        }
        else{
            facilities.push('Balcony')
        }
    }
    else if(balc === false){
        //remove the facility
        facilities = facilities.filter(facility => facility !== 'Balcony')
    }
    if(wifi){
        if(facilities.includes('Free wifi')){
            //do nothing
        }
        else{
            facilities.push('Free wifi')
        }
    }
    else if(wifi === false){
        //remove the facility
        facilities = facilities.filter(facility => facility !== 'Free wifi')
    }
    if(parking){
        if(facilities.includes('Free parking')){
            //do nothing
        }
        else{
            facilities.push('Free parking')
        }
    }
    else if(parking === false){
        //remove the facility
        facilities = facilities.filter(facility => facility !== 'Free parking')
    }
    if(smoke){
        if(facilities.includes('Smoke free')){
            //do nothing
        }
        else{
            facilities.push('Smoke free')
        }
    }
    else if(smoke === false){
        //remove the facility
        facilities = facilities.filter(facility => facility !== 'Smoke free')
    }
    console.log(facilities)
    console.log('room title: ',roomTitle.value, 'price per night: ',pricePerNight.value, 'room size: ',size.value, 'room number: ',roomNumber.value, 'maximum occupation: ',maxOccupancy.value, 'tv: ',tv, 'balcony: ',balc, 'wifi: ',wifi, 'parking: ',parking, 'smoking: ',smoke, 'room description: ',description.value)
    updateRoom({
        updateRoomInput:{
            id: getRoomByIdResult.value.room.id,
            roomName: roomTitle.value,
            price: parseInt(pricePerNight.value),
            size: parseInt(size.value),
            roomNumber: parseInt(roomNumber.value),
            maxOccupation: parseInt(maxOccupancy.value),
            facilities: facilities,
            description: description.value,
            roomPicture: 'picture here',
        }
    })
    .then(() => {
        router.push('/admin/overview')
    })
    .catch((e) => {
        console.error(e)
        console.error(e.message)
    })
}

</script>