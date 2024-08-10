<template>
    <div class="w-screen border-b-2 border-primary items-center max-sm:px-8 px-4 lg:px-12 h-24 fixed z-20 flex justify-between">
        <RouterLink to="/">
            <h2 class="text-primary max-sm:text-lg sm:text-sm md:text-lg lg:text-xl font-cambria font-bold my-6">THE CONTINENTAL</h2>
        </RouterLink>
        <div class="flex gap-4 lg:gap-12">
            <RouterLink v-if="firebaseUser && getUserByUidResult?.userByUid.role == 'ADMIN'" to="/admin/locks">
                <h2 class="max-sm:hidden my-6 sm:text-sm md:text-lg lg:text-xl text-primary font-cambria font-normal">SMART LOCKS</h2>
            </RouterLink>
            <RouterLink v-if="firebaseUser && getUserByUidResult?.userByUid.role == 'ADMIN'" to="/admin/overview">
                <h2 class="max-sm:hidden my-6 sm:text-sm md:text-lg lg:text-xl text-primary font-cambria font-normal">ROOM OVERVIEW</h2>
            </RouterLink>
            <RouterLink v-if="firebaseUser" to="/user/reservations">
                <h2 class="max-sm:hidden my-6 sm:text-sm md:text-lg lg:text-xl text-primary font-cambria font-normal">MY RESERVATIONS</h2>
            </RouterLink>
            <div class="border-l-2 border-primary py-6 pl-4 lg:pl-12 max-sm:pl-8">
                <button v-if="firebaseUser" @click="logout()" class="max-sm:text-lg sm:text-sm md:text-lg lg:text-xl text-primary font-cambria font-normal">LOGOUT</button>
                <RouterLink v-else to="/auth/login">
                    <h2 class="max-sm:text-lg sm:text-sm md:text-lg lg:text-xl text-primary font-cambria font-normal">LOGIN</h2>
                </RouterLink>
            </div>
        </div>
    </div>
    <div class="w-screen h-screen items-center flex flex-col">
        <h1 class="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-secondary text-center z-20 font-cambria font-normal mt-72">THE CONTINENTAL HOTEL</h1>
        <div class="max-sm:flex-col flex max-sm:gap-6 gap-4 md:gap-16 lg:gap-28">
            <RouterLink v-if="firebaseUser && getUserByUidResult?.userByUid.role == 'ADMIN'" to="/admin/today" class="z-20">
                <button class="border-2 border-primary rounded-full flex justify-center mt-10 p-3 px-4">
                    <h2 class="text-primary sm:text-xl md:text-2xl lg:text-3xl font-cambria font-normal">Today's reservations</h2>
                </button>
            </RouterLink>
            <RouterLink to="/admin/selection" class="z-20">
                <button class="border-2 border-primary rounded-full flex justify-center sm:mt-10 p-3 px-4">
                    <h2 class="text-primary sm:text-xl md:text-2xl lg:text-3xl font-cambria font-normal">Make a reservation</h2>
                </button>
            </RouterLink>
        </div>
        <div class="h-screen w-screen fixed bg-green"></div>
    </div>
    <div v-if="firebaseUser" class="w-screen border-t-2 border-primary justify-center px-2 py-6 gap-8 h-24 fixed z-20 flex bottom-0">
        <RouterLink v-if="getUserByUidResult?.userByUid.role == 'ADMIN'" to="/admin/locks" class="grid justify-items-center gap-2">
            <img src="/icons/locksWhite.svg" alt="" class="h-6">
            <p class="text-primary text-center text-xs font-cambria font-normal" >SMART LOCKS</p>
        </RouterLink>
        <RouterLink v-if="getUserByUidResult?.userByUid.role == 'ADMIN'" to="/admin/overview" class="grid justify-items-center gap-2">
            <img src="/icons/overviewWhite.svg" alt="" class="h-6">
            <p class="text-primary text-center text-xs font-cambria font-normal">ROOM OVERVIEW</p>
        </RouterLink>
        <RouterLink to="/user/reservations" class="grid justify-items-center gap-2">
            <img src="/icons/reservationWhite.svg" alt="" class="h-6">
            <p class="text-primary text-center text-xs font-cambria font-normal">MY RESERVATIONS</p>
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
import useFirebase from '@/composables/useFirebase';
import { useQuery } from '@vue/apollo-composable';
import { GET_USER_BY_UID } from '@/graphql/user.query';

const {firebaseUser, logout} = useFirebase()

const { result: getUserByUidResult } = useQuery(GET_USER_BY_UID, {
    uid: firebaseUser.value?.uid
})

</script>