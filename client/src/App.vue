<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Opinion from "./components/Opinion.vue";
import { Option } from "./constants";

const option1: Option = {
  score: 0,
  name: "bitcoin"
}

const option2: Option = {
  score: 0,
  name: "ethereum"
}

const mockedOpinions = [
  [option1, option2]
]

const opinionId = 0
</script>

<template>
  <Opinion :opinion-id="opinionId" :options="mockedOpinions[opinionId]" />
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
