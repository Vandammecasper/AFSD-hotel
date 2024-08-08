<template>
    <div class="w-screen h-screen grid justify-items-center items-center">
        <RouterLink to="/admin/overview" class="absolute left-72 top-32">
            <button class="bg-green flex gap-2 p-2 px-4 rounded-full">
                <img src="../../../public/icons/back.svg" alt="">
                <p class="font-cambria font-bold text-primary">GO BACK</p>
            </button>
        </RouterLink>
        <h1 class="text-5xl text-darkGreen text-center font-cambria font-normal mt-12">NEW ROOM</h1>
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
                                v-model="roomTitle"
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
                                v-model="pricePerNight"
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
                                v-model="size"
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
                                v-model="roomNumber"
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
                                v-model="maxOccupancy"
                            />
                        </div>
                        <div class="mt-4">
                            <label
                                class="text-md block font-bold tracking-wider text-darkGreen font-cambria"
                            >
                                Select room facilities
                            </label>
                            <div class="flex gap-1">
                                <input value="false" type="checkbox" name="flatscreenTv" id="flatscreenTv" class="" v-model="flatscreenTv">Flatscreen-tv</input>
                                <input value="false" class="ml-2" type="checkbox" name="balcony" id="balcony" v-model="balcony">Balcony</input>
                                <input value="false" class="ml-2" type="checkbox" name="freeWifi" id="freeWifi" v-model="freeWifi">Free wifi</input>
                            </div>
                            <div class="flex gap-1">
                                <input value="false" type="checkbox" name="freeParking" id="freeParking" class="" v-model="freeParking">Free parking</input>
                                <input value="false" type="checkbox" name="smokeFree" id="smokeFree" class="ml-2" v-model="smokeFree">Smoke free</input>
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
                        v-model="description"
                    />
                </div>
            </div>
            <div class="grid justify-items-center">
                <img src="../../../public/images/hotelRoomDeluxe.jpg" alt="" class="rounded-xl h-56">
                <button @click="handleRoomCreation(flatscreenTv, balcony, freeWifi, freeParking, smokeFree)" class="bg-accent rounded-3xl w-96 px-8 py-1.5 mt-16 text-secondary font-cambria font-bold text-2xl">Add room</button>
            </div>
        </div>
        
    </div>
</template>

<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable';
import router from '@/bootstrap/router';
import { CREATE_ROOM } from '../../graphql/room.mutation'

const { mutate: createRoom } = useMutation(CREATE_ROOM)

const handleRoomCreation = (tv:boolean, balc:boolean, wifi:boolean, parking:boolean, smoke:boolean) =>{
    console.log('room title: ',roomTitle.value, 'price per night: ',pricePerNight.value, 'room size: ',size.value, 'room number: ',roomNumber.value, 'maximum occupation: ',maxOccupancy.value, 'tv: ',tv, 'balcony: ',balc, 'wifi: ',wifi, 'parking: ',parking, 'smoking: ',smoke, 'room description: ',description.value)
    let facilities = []
    if(tv){
        facilities.push('Flatscreen-tv')
    }
    if(balc){
        facilities.push('Balcony')
    }
    if(wifi){
        facilities.push('Free wifi')
    }
    if(parking){
        facilities.push('Free parking')
    }
    if(smoke){
        facilities.push('Smoke free')
    }
    console.log(facilities)
    // createRoom({
    //     createRoomInput:{
    //         roomName: roomTitle.value,
    //         price: parseInt(pricePerNight.value),
    //         size: parseInt(size.value),
    //         roomNumber: parseInt(roomNumber.value),
    //         maxOccupation: parseInt(maxOccupancy.value),
    //         facilities: facilities,
    //         description: description.value,
    //         roomPicture: 'picture here',
    //         isLocked: true,
    //         lockHistory: []
    //     }
    // })
    // .then(() => {
    //     router.push('/admin/overview')
    // })
    // .catch((e) => {
    //     console.error(e)
    //     console.error(e.message)
    //     console.error(e.graphqlErrors)
    // })
}

</script>