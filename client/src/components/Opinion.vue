<script setup lang="ts">
import { Option } from '../constants';

defineProps<{ options: Option[]; }>()
</script>

<template>
  <div class="option-card" v-for="option in options">
    <h1>{{ option.name }}</h1>
    <h2>{{ option.score }}</h2>
    <button class="vote-btn">Vote</button>
  </div>
</template>

<style scoped>
.option-card {
  border: 1px solid #2c3e50;
  border-radius: 20px;
  margin: 5px;
  padding: 15px;
  width: 300px;
}

.vote-btn {
  padding: 10px 50px;
  border-radius: 10px;
  border: none;
  background-color: #B4BEC9A0
}

.vote-btn:active {
  background-color: #B4BEC9DA;
}
</style>
