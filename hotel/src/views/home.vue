<template>
    <div class="w-screen border-b-2 border-primary items-center px-12 h-24 absolute z-20 flex justify-between">
        <RouterLink to="/">
            <h2 class="text-primary text-xl font-cambria font-bold my-6">THE CONTINENTAL</h2>
        </RouterLink>
        <div class="flex gap-12">
            <RouterLink to="/admin/locks">
                <h2 class="my-6 text-xl text-primary font-cambria font-normal">SMART LOCKS</h2>
            </RouterLink>
            <RouterLink to="/admin/overview">
                <h2 class="my-6 text-xl text-primary font-cambria font-normal">ROOM OVERVIEW</h2>
            </RouterLink>
            <RouterLink to="/user/reservations">
                <h2 class="my-6 text-xl text-primary font-cambria font-normal">MY RESERVATIONS</h2>
            </RouterLink>
            <div class="border-l-2 border-primary py-6 pl-12">
                <RouterLink to="/auth/login">
                    <h2 class="text-xl text-primary font-cambria font-normal">LOGIN</h2>
                </RouterLink>
            </div>
        </div>
    </div>
    <div class="h-screen items-center flex flex-col">
        <h1 class="text-6xl text-secondary text-center z-20 font-cambria font-normal mt-72">THE CONTINENTAL HOTEL</h1>
        <RouterLink to="/admin/selection" class="z-20">
            <button class="border-2 border-primary rounded-full flex justify-center mt-10 p-3 px-4">
                <h2 class="text-primary text-3xl font-cambria font-normal">Make a reservation</h2>
            </button>
        </RouterLink>
        <div class="bg-black w-screen h-screen fixed z-10 opacity-60"></div>
        <img src="/images/hotelLobby.jpg" alt="hotel lobby picture" class="h-screen w-screen fixed">
    </div>
</template>