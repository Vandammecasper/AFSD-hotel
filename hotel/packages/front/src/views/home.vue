<template>
    <div class="w-screen border-b-2 border-primary items-center max-sm:px-4 px-4 lg:px-8 xl:px-12 h-24 fixed z-20 flex justify-between">
        <RouterLink to="/">
            <h2 class="text-primary text-sm lg:text-lg xl:text-xl font-cambria font-bold my-6">THE CONTINENTAL</h2>
        </RouterLink>
        <div class="flex gap-2 sm:gap-5 lg:gap-6 xl:gap-10">
            <RouterLink v-if="firebaseUser && getUserByUidResult?.userByUid.role == 'ADMIN'" to="/admin/locks">
                <h2 class="max-md:hidden my-6 text-sm lg:text-lg xl:text-xl text-primary font-cambria font-normal">{{$t('header.smartLocks')}}</h2>
            </RouterLink>
            <RouterLink v-if="firebaseUser && getUserByUidResult?.userByUid.role == 'ADMIN'" to="/admin/overview">
                <h2 class="max-md:hidden my-6 text-sm lg:text-lg xl:text-xl text-primary font-cambria font-normal">{{$t('header.roomOverview')}}</h2>
            </RouterLink>
            <RouterLink v-if="firebaseUser" to="/user/reservations">
                <h2 class="max-md:hidden my-6 text-sm lg:text-lg xl:text-xl text-primary font-cambria font-normal">{{$t('header.myReservations')}}</h2>
            </RouterLink>
            <button @click="switchLang()" class="border-2 rounded-xl border-primary -ml-2 my-4">
                <h2 class="px-2 text-sm lg:text-lg xl:text-xl text-primary font-cambria font-normal">{{ $t('header.switch') }}</h2>
            </button>
            <div class="border-l-2 border-primary py-6 pl-5 lg:pl-6 xl:pl-12 max-sm:pl-2 max-lg:-mt-1">
                <button v-if="firebaseUser" @click="logout()" class="max-sm:text-lg text-sm lg:text-lg xl:text-xl text-primary font-cambria font-normal">{{$t('header.logout')}}</button>
                <RouterLink v-else to="/auth/login">
                    <h2 class="max-sm:text-lg text-sm lg:text-lg xl:text-xl text-primary font-cambria font-normal">{{$t('header.login')}}</h2>
                </RouterLink>
            </div>
        </div>
    </div>
    <div class="w-screen h-screen items-center flex flex-col">
        <h1 class="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-secondary text-center z-20 font-cambria font-normal mt-72">THE CONTINENTAL HOTEL</h1>
        <div class="max-sm:flex-col flex max-sm:gap-6 gap-4 md:gap-16 lg:gap-28">
            <RouterLink v-if="firebaseUser && getUserByUidResult?.userByUid.role == 'ADMIN'" to="/admin/today" class="z-20">
                <button class="border-2 border-primary rounded-full flex justify-center mt-10 p-3 px-4">
                    <h2 class="text-primary sm:text-xl md:text-2xl lg:text-3xl font-cambria font-normal">{{$t('home.todaysReservations')}}</h2>
                </button>
            </RouterLink>
            <RouterLink to="/admin/selection" class="z-20">
                <button class="border-2 border-primary rounded-full flex justify-center sm:mt-10 p-3 px-4">
                    <h2 class="text-primary sm:text-xl md:text-2xl lg:text-3xl font-cambria font-normal">{{$t('home.makeAReservation')}}</h2>
                </button>
            </RouterLink>
        </div>
        <div class="h-screen w-screen fixed bg-green"></div>
    </div>
    <div v-if="firebaseUser" class="md:hidden w-screen border-t-2 bg-green border-primary max-sm:px-10 px-24 py-6 gap-8 h-24 fixed justify-between z-20 flex bottom-0">
        <RouterLink v-if="getUserByUidResult?.userByUid.role == 'ADMIN'" to="/admin/locks" class="grid justify-items-center gap-2">
            <img src="/icons/locksWhite.svg" alt="" class="h-6">
            <p class="text-primary text-center text-xs font-cambria font-bold" >{{$t('header.smartLocks')}}</p>
        </RouterLink>
        <RouterLink v-if="getUserByUidResult?.userByUid.role == 'ADMIN'" to="/admin/overview" class="grid justify-items-center gap-2">
            <img src="/icons/overviewWhite.svg" alt="" class="h-6">
            <p class="text-primary text-center text-xs font-cambria font-bold">{{$t('header.roomOverview')}}</p>
        </RouterLink>
        <RouterLink to="/user/reservations" class="grid justify-items-center gap-2">
            <img src="/icons/reservationWhite.svg" alt="" class="h-6">
            <p class="text-primary text-center text-xs font-cambria font-bold">{{$t('header.myReservations')}}</p>
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
import useFirebase from '@/composables/useFirebase';
import { useQuery } from '@vue/apollo-composable';
import { GET_USER_BY_UID } from '@/graphql/user.query';
import useLanguage from '@/composables/useLanguage';
import { useI18n } from 'vue-i18n';

const {firebaseUser, logout} = useFirebase()
const { setLocale } = useLanguage()
const { locale } = useI18n()

const { result: getUserByUidResult } = useQuery(GET_USER_BY_UID, {
    uid: firebaseUser.value?.uid
})

const switchLang = () => {
    if(locale.value == 'en') {
        setLocale('nl')
    } else {
        setLocale('en')
    }
}

</script>