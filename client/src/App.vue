<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Opinion from "./components/Opinion.vue";
import { Option } from "./constants";
import { onMounted, ref } from "vue";
import { getOpinionsOnChain } from "./services/ethers-service";

const opinions = ref<Option[]>();

onMounted(async () => opinions.value = await getOpinionsOnChain());

const opinionId = 0
</script>

<template>
  <Opinion v-if="opinions" :opinion-id="opinionId" :options="opinions[opinionId]" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
