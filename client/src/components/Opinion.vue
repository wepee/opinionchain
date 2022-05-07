<script setup lang="ts">
import { onMounted, toRefs } from 'vue';
import { Option } from '../constants';
import { metamaskInitialize, voteOnChain } from '../services/ethers-service';

interface Props {
  opinionId: number
  options: Option[]
}

const props = defineProps<Props>();

const { options, opinionId } = toRefs(props);

onMounted(async () => metamaskInitialize());

const vote = async (index: number) => {
  try {
    await voteOnChain(opinionId.value, index);
  } catch (e: any) {
    console.log(e);
    alert(e?.data?.message || e.message);
  }
};
</script>

<template>
<div class="option-slide">
  <div class="option-card" v-for="(option, index) in options" :key="index">
    <h1>{{ option.name }}</h1>
    <h2>{{ option.score }}</h2>
    <button @click="vote(index)" class="vote-btn">Vote</button>
  </div>
</div>
</template>

<style scoped>
.option-card {
  border: 1px solid #2c3e50;
  border-radius: 20px;
  margin: 5px;
  padding: 15px;
  width: 100%;
}

.option-slide {
  display: flex;
  flex: 1;
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
