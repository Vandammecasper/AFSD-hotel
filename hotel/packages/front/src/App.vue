<script setup lang="ts">
import { DefaultApolloClient } from '@vue/apollo-composable';
import { provide } from 'vue';
import { RouterView } from 'vue-router'
import useGraphql from './composables/useGraphql';

const { apolloClient } = useGraphql()
provide(DefaultApolloClient, apolloClient)
</script>

<template>
  <RouterView />
</template>

