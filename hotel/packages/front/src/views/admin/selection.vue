<template>
    <div class="w-screen h-screen grid justify-items-center">
        <div class="mt-40 flex gap-16">
            <VueDatePicker v-model="date" range model-type="dd.MM.yyyy" clearable="true"></VueDatePicker>
            <input type="number" class="h-9 p-2"/>
            <button class="bg-accent rounded-3xl px-8 py-1.5 w-96 -mt-1">
                <p class="font-cambria font-bold text-primary text-2xl">Find a room</p>
            </button>
        </div>
        <div class="w-full grid justify-items-center gap-6 mt-8">
            <RouterLink to="/admin/selection/001" class=" w-4/5 grid justify-self-center">
                <button class="grid grid-cols-3 h-56 bg-secondary rounded-3xl gap-0 justify-between justify-self-center">
                    <img src="../../../public/images/hotelRoomDeluxe.jpg" alt="" class="rounded-s-2xl h-full">
                    <div class="grid justify-items-start my-2 ml-4 w-96">
                        <h2 class="text-3xl font-bold font-cambria text-darkGreen">2 person bedroom deluxe</h2>
                        <div class="flex gap-32 mt-2">
                            <div class="flex flex-col gap-4">
                                <div class="flex items-center gap-3">
                                    <img src="../../../public/icons/surface.svg" alt="" class="h-8">
                                    <p class="text-xl font-cambria">30 m²</p>
                                </div>
                                <div class="flex items-center gap-3 w-40">
                                    <img src="../../../public/icons/tv.svg" alt="" class="h-8">
                                    <p class="text-xl font-cambria">Flatscreen-tv</p>
                                </div>
                                <div class="flex items-center gap-3">
                                    <img src="../../../public/icons/smoking.svg" alt="" class="h-8">
                                    <p class="text-xl font-cambria">Smoke free</p>
                                </div>
                            </div>
                            <div class="flex flex-col gap-4">
                                <div class="flex items-center gap-3 -ml-2">
                                    <img src="../../../public/icons/wifi.svg" alt="" class="h-8">
                                    <p class="text-xl font-cambria">Free wifi</p>
                                </div>
                                <div class="flex items-center gap-3 w-40">
                                    <img src="../../../public/icons/parking.svg" alt="" class="h-8">
                                    <p class="text-xl font-cambria">Free parking</p>
                                </div>
                                <div class="flex items-center gap-3">
                                    <img src="../../../public/icons/balcony.svg" alt="" class="h-9">
                                    <p class="text-xl font-cambria">Balcony</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ml-40 mt-16 flex flex-col items-center text-center">
                        <p class=" text-xl font-cambria">Price per night</p>
                        <h3 class="text-7xl font-cambria font-bold">€ 95</h3>
                    </div>
                </button>
            </RouterLink>
            <button class="grid grid-cols-3 h-56 w-4/5 bg-secondary rounded-3xl gap-0 justify-between">
                <img src="../../../public/images/hotelRoomDeluxe.jpg" alt="" class="rounded-s-2xl h-full">
                <div class="grid justify-items-start my-2 ml-4 w-96">
                    <h2 class="text-3xl font-bold font-cambria text-darkGreen">2 person bedroom</h2>
                    <div class="flex gap-32 mt-2">
                        <div class="flex flex-col gap-4">
                            <div class="flex items-center gap-3">
                                <img src="../../../public/icons/surface.svg" alt="" class="h-8">
                                <p class="text-xl font-cambria">25 m²</p>
                            </div>
                            <div class="flex items-center gap-3 w-40">
                                <img src="../../../public/icons/tv.svg" alt="" class="h-8">
                                <p class="text-xl font-cambria">Flatscreen-tv</p>
                            </div>
                            <div class="flex items-center gap-3">
                                <img src="../../../public/icons/smoking.svg" alt="" class="h-8">
                                <p class="text-xl font-cambria">Smoke free</p>
                            </div>
                        </div>
                        <div class="flex flex-col gap-4">
                            <div class="flex items-center gap-3 -ml-2">
                                <img src="../../../public/icons/wifi.svg" alt="" class="h-8">
                                <p class="text-xl font-cambria">Free wifi</p>
                            </div>
                            <div class="flex items-center gap-3 w-40">
                                <img src="../../../public/icons/parking.svg" alt="" class="h-8">
                                <p class="text-xl font-cambria">Free parking</p>
                            </div>
                            <div class="flex items-center gap-3 hidden">
                                <img src="../../../public/icons/balcony.svg" alt="" class="h-9">
                                <p class="text-xl font-cambria">Balcony</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ml-40 mt-16 flex flex-col items-center text-center">
                    <p class=" text-xl font-cambria">Price per night</p>
                    <h3 class="text-7xl font-cambria font-bold">€ 80</h3>
                </div>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const date = ref();


</script>