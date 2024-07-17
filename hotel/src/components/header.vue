<template>
    <div class="w-screen border-b-2 border-darkGreen items-center px-12 h-24 absolute z-20 flex justify-between">
        <RouterLink to="/">
            <h2 class="text-darkGreen text-xl font-cambria font-bold my-6">THE CONTINENTAL</h2>
        </RouterLink>
        <div class="flex gap-12">
            <RouterLink to="/admin/locks">
                <h2 class="my-6 text-xl text-darkGreen font-cambria font-normal">SMART LOCKS</h2>
            </RouterLink>
            <RouterLink to="/admin/overview">
                <h2 class="my-6 text-xl text-darkGreen font-cambria font-normal">ROOM OVERVIEW</h2>
            </RouterLink>
            <RouterLink to="/user/reservations">
                <h2 class="my-6 text-xl text-darkGreen font-cambria font-normal">MY RESERVATIONS</h2>
            </RouterLink>
            <div class="border-l-2 border-darkGreen py-6 pl-12">
                <RouterLink v-if="firebaseUser" to="/auth/login">
                    <h2 class="text-xl text-darkGreen font-cambria font-normal">ACCOUNT</h2>
                </RouterLink>
                <RouterLink v-else to="/auth/login">
                    <h2 class="text-xl text-darkGreen font-cambria font-normal">LOGIN</h2>
                </RouterLink>
            </div>
        </div>
    </div>
    <RouterView/>
</template>

<script lang="ts">
import useFirebase from '@/composables/useFirebase';

export default{
    setup(){
        const {firebaseUser} = useFirebase()
        return {
            firebaseUser
        }
    }
}
</script>