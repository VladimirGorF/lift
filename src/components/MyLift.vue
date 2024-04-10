<script setup>
import { ref, computed } from "vue";

let liftsBox = ref([7, 6, 5, 4, 3, 2, 1]); //  список этажей
let gapOfFloor = ref(100 / liftsBox.value.length); // сколько процентов занимает каждый этаж
let liftCall = ref(1); // вызванный этаж

const liftGoing = computed(() => {
  let index = liftCall.value;
  if (index === liftsBox.value.length) return "2px"; // последний этаж
  return String(liftsBox.value[index] * gapOfFloor.value) + "%";
});

function goLift(liftPlace) {
  // let counter = 1;
  // const timer = setInterval(function () {
  //   if (counter === 5) {
  //     clearInterval(timer);
  //   }
  //   console.log("ok");
  //   counter++;
  // }, 1000);

  liftCall.value = liftPlace;
}
</script>

<template>
  <div class="container">
    <div class="containerLift">
      <div v-for="liftPlace in liftsBox" :key="liftPlace" class="liftPlace">
        {{ liftPlace }}
      </div>
      <div class="lift" :style="`top: ${liftGoing};`"></div>
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
