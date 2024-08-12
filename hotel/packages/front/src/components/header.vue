<template>
    <div class="w-screen border-b-2 border-darkGreen items-center max-sm:px-8 px-4 lg:px-12 h-24 fixed z-20 flex justify-between">
        <RouterLink to="/">
            <h2 class="text-darkGreen max-sm:text-lg sm:text-sm md:text-lg lg:text-xl font-cambria font-bold my-6">THE CONTINENTAL</h2>
        </RouterLink>
        <div class="flex gap-4 lg:gap-12">
            <RouterLink v-if="firebaseUser && getUserByUidResult?.userByUid.role == 'ADMIN'" to="/admin/locks">
                <h2 class="max-sm:hidden my-6 sm:text-sm md:text-lg lg:text-xl text-darkGreen font-cambria font-normal">SMART LOCKS</h2>
            </RouterLink>
            <RouterLink v-if="firebaseUser && getUserByUidResult?.userByUid.role == 'ADMIN'" to="/admin/overview">
                <h2 class="max-sm:hidden my-6 sm:text-sm md:text-lg lg:text-xl text-darkGreen font-cambria font-normal">ROOM OVERVIEW</h2>
            </RouterLink>
            <RouterLink v-if="firebaseUser" to="/user/reservations">
                <h2 class="max-sm:hidden my-6 sm:text-sm md:text-lg lg:text-xl text-darkGreen font-cambria font-normal">MY RESERVATIONS</h2>
            </RouterLink>
            <div class="border-l-2 border-darkGreen py-6 pl-4 lg:pl-12 max-sm:pl-8">
                <button v-if="firebaseUser" @click="logout()" class="max-sm:text-lg sm:text-sm md:text-lg lg:text-xl text-darkGreen font-cambria font-normal">LOGOUT</button>
                <RouterLink v-else to="/auth/login">
                    <h2 class="max-sm:text-lg sm:text-sm md:text-lg lg:text-xl text-darkGreen font-cambria font-normal">LOGIN</h2>
                </RouterLink>
            </div>
        </div>
    </div>
    <RouterView/>
    <div v-if="firebaseUser" class="sm:hidden w-screen border-t-2 bg-primary border-darkGreen max-sm:px-10 px-2 py-6 gap-8 h-24 fixed justify-between z-20 flex bottom-0">
        <RouterLink v-if="getUserByUidResult?.userByUid.role == 'ADMIN'" to="/admin/locks" class="grid justify-items-center gap-2">
            <img src="/icons/locksGreen.svg" alt="" class="h-6">
            <p class="text-darkGreen text-center text-xs font-cambria font-bold" >SMART LOCKS</p>
        </RouterLink>
        <RouterLink v-if="getUserByUidResult?.userByUid.role == 'ADMIN'" to="/admin/overview" class="grid justify-items-center gap-2">
            <img src="/icons/overviewGreen.svg" alt="" class="h-6">
            <p class="text-darkGreen text-center text-xs font-cambria font-bold">ROOM OVERVIEW</p>
        </RouterLink>
        <RouterLink to="/user/reservations" class="grid justify-items-center gap-2">
            <img src="/icons/reservationGreen.svg" alt="" class="h-6">
            <p class="text-darkGreen text-center text-xs font-cambria font-bold">MY RESERVATIONS</p>
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