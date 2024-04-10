<script setup>
import { ref } from "vue";

let liftsBox = ref([7, 6, 5, 4, 3, 2, 1]); //  список этажей
let gapOfFloor = ref(100 / liftsBox.value.length); // сколько процентов занимает каждый этаж
let liftLevel = ref(String(liftsBox.value[1] * gapOfFloor.value) + "%"); // начинаем с 1 этажа

let liftCall = ref(1); // вызванный этаж
let diffGap = ref(gapOfFloor.value / 10); // пилим на 10 частей шаг лифта по 100мс
console.log(diffGap.value);

function liftTimer() {
  let counter = 1; // счетчик для интервалки
  let liftFlor = liftsBox.value[1] * gapOfFloor.value ;
  const timer = setInterval(function () {
    if (counter === 10) {
      clearInterval(timer);
    }
    liftLevel.value = String(liftFlor - diffGap.value) + "%"; // уменьшаем на 1%
    counter++;
    liftFlor -= diffGap.value;
  }, 100);
}

function goLift(liftPlace) {
  liftCall.value = liftPlace;
  liftTimer();
}
</script>

<template>
  <div class="container">
    <div class="containerLift">
      <div v-for="liftPlace in liftsBox" :key="liftPlace" class="liftPlace">
        {{ liftPlace }}
      </div>
      <div class="lift" :style="`top: ${liftLevel};`"></div>
    </div>
    <div class="containerButtons">
      <div v-for="liftPlace in liftsBox" :key="liftPlace" class="buttonBox">
        <div class="button" @click="goLift(liftPlace)">
          {{ liftPlace }}
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  gap: 10px;
  margin-left: 100px;
  margin-top: 100px;
}
.containerLift {
  width: 75px;
  background-color: bisque;
  padding: 2px 2px;
  border: 1px solid black;
  position: relative;
}
.liftPlace {
  height: 80px;
  width: 98%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.lift {
  position: absolute;
  top: 80%;
  left: 4px;
  border: 1px solid red;
  height: 70px;
  width: 70px;
}
.buttonBox {
  height: 80px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  width: 20px;
  border: 1px solid black;
  border-radius: 25%;
  cursor: pointer;
}
</style>
