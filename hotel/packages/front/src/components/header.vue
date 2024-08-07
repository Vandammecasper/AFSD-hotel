<template>
    <div class="w-screen border-b-2 border-darkGreen items-center px-12 h-24 absolute z-20 flex justify-between">
        <RouterLink to="/">
            <h2 class="text-darkGreen text-xl font-cambria font-bold my-6">THE CONTINENTAL</h2>
        </RouterLink>
        <div class="flex gap-12">
            <RouterLink v-if="firebaseUser && getUserByUidResult.userByUid.role == 'ADMIN'" to="/admin/locks">
                <h2 class="my-6 text-xl text-darkGreen font-cambria font-normal">SMART LOCKS</h2>
            </RouterLink>
            <RouterLink v-if="firebaseUser && getUserByUidResult.userByUid.role == 'ADMIN'" to="/admin/overview">
                <h2 class="my-6 text-xl text-darkGreen font-cambria font-normal">ROOM OVERVIEW</h2>
            </RouterLink>
            <RouterLink to="/user/reservations">
                <h2 class="my-6 text-xl text-darkGreen font-cambria font-normal">MY RESERVATIONS</h2>
            </RouterLink>
            <div class="border-l-2 border-darkGreen py-6 pl-12">
                <button v-if="firebaseUser" @click="logout()" class="text-xl text-darkGreen font-cambria font-normal">LOGOUT</button>
                <RouterLink v-else to="/auth/login">
                    <h2 class="text-xl text-darkGreen font-cambria font-normal">LOGIN</h2>
                </RouterLink>
            </div>
        </div>
    </div>
    <RouterView/>
</template>

<script setup lang="ts">
import useFirebase from '@/composables/useFirebase';
import { useQuery } from '@vue/apollo-composable';
import { GET_USER_BY_UID } from '@/graphql/user.query';

const {firebaseUser, logout} = useFirebase()

const { result: getUserByUidResult } = useQuery(GET_USER_BY_UID, {
    uid: firebaseUser.value.uid
})

</script>