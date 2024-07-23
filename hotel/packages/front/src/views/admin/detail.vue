<template>
    <div class="w-screen h-screen flex flex-col items-center justify-center">
        <RouterLink to="/admin/selection" class="absolute left-48 top-32">
            <button class="bg-green flex gap-2 p-2 px-4 rounded-full">
                <img src="../../../public/icons/back.svg" alt="">
                <p class="font-cambria font-bold text-primary">GO BACK</p>
            </button>
        </RouterLink>
        <h1 class="text-5xl text-darkGreen text-center font-cambria font-normal mt-24">ROOM NUMBER: 001</h1>
        <div class="w-3/4 bg-secondary p-6 mt-8 rounded-3xl flex gap-16">
            <div>
                <img src="../../../public/images/hotelRoomDeluxe.jpg" alt="" class="rounded-2xl h-64">
                <div class="flex gap-32 mt-6">
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
            <div class="flex flex-col">
                <h2 class="text-3xl font-bold font-cambria text-darkGreen">2 person bedroom deluxe</h2>
                <p class="font-normal font-cambria text-darkGreen mr-12 mt-4">Indulge in the epitome of luxury at our bedroom deluxe, where opulent furnishings and refined décor create an unparalleled experience; from sumptuous bedding to spa-inspired amenities, every detail is meticulously designed for your comfort and relaxation, promising a stay beyond compare, where cherished memories are made at every turn, inviting you to immerse yourself in an atmosphere of tranquility and sophistication, ensuring that every moment of your stay is nothing short of extraordinary.</p>
                <div class="flex mt-8 gap-16">
                    <div class="flex flex-col gap-2">
                        <input placeholder="Guest 1 email" type="email" class="font-cambria text-darkGreen rounded-2xl mt-1 block border-2 bg-secondary border-darkGreen p-2 ">
                        <input placeholder="Guest 2 email" type="email" class="font-cambria text-darkGreen rounded-2xl mt-1 block border-2 bg-secondary border-darkGreen p-2">
                    </div>
                    <div>
                        <p class="text-center text-2xl font-cambria font-normal">00/00 - 00/00</p>
                        <h3 class="text-center text-7xl mt-2 font-cambria font-bold">€ 285</h3>
                    </div>
                </div>
                <button class="bg-accent rounded-3xl px-8 py-1.5 w-96 mt-4 ml-12 text-secondary font-cambria font-bold text-xl">Complete reservation</button>
            </div>
        </div>
    </div>
</template>