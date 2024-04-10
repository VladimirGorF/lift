<script setup>
import { ref } from "vue";

let liftsBox = ref([7, 6, 5, 4, 3, 2, 1]); //  список этажей
let gapOfFloor = ref(100 / liftsBox.value.length); // сколько процентов занимает каждый этаж
let diffGap = ref(gapOfFloor.value / 10); // пилим на 10 частей шаг лифта по 100мс
let liftLevel = ref(String(liftsBox.value[1] * gapOfFloor.value) + "%"); // начинаем с 1 этажа
let liftMemory = ref(1); //  память текущего этажа перед вызовом

let liftIsRest = ref(false);

function haveRest(){
  liftIsRest.value = true   // лифт на отдыхе
  setTimeout(() => {
    liftIsRest.value = false
  }, 3000); 
}

function liftTimer(liftCall) {
  // проверяем в какую сторону двигается лифт: вверх или вниз
  if (liftCall > liftMemory.value) {
    let counter = 1; // счетчик для интервалки 10 по 100
    let liftFlor = liftsBox.value[liftMemory.value] * gapOfFloor.value;
    const timer = setInterval(function () {
      liftLevel.value = String(liftFlor - diffGap.value) + "%";
      counter++;
      liftFlor -= diffGap.value; // уменьшаем отступ сверху на 1\10 от этажа
      if (counter === (liftCall - liftMemory.value) * 10) {
        haveRest(); // моргание лифта
        clearInterval(timer);
        // если это последний этаж
        if (liftCall === liftsBox.value.length) {
          liftLevel.value = "0%";
        } else {
          liftLevel.value =
            String(liftsBox.value[liftCall] * gapOfFloor.value) + "%"; // при заврешении инетервалки устанавливаем уровень этажа
          liftMemory.value = liftCall; // увеличиваем этаж на текущий
        }
        liftMemory.value = liftCall; // увеличиваем этаж на текущий
      }
    }, 100);
  } else if (liftCall < liftMemory.value) {
    let counter = 1; // счетчик для интервалки 10 по 100
    let liftFlor = 0;
    if (liftMemory.value === liftsBox.value.length) {
      liftFlor = 0;
    } else {
      liftFlor = liftsBox.value[liftMemory.value] * gapOfFloor.value;
    }
    const timer = setInterval(function () {
      if (counter === (liftMemory.value - liftCall) * 10) {
        haveRest(); // моргание лифта
        clearInterval(timer);
        liftLevel.value =
          String(liftsBox.value[liftCall] * gapOfFloor.value) + "%"; // при завершении инетервалки устанавливаем уровень этажа
        liftMemory.value = liftCall; // запоминаем этаж на текущий
      }
      liftLevel.value = String(liftFlor + diffGap.value) + "%";
      counter++;
      liftFlor += diffGap.value; // уменьшаем отступ сверху на 1\10 от этажа
    }, 100);
  }
}
</script>

<template>
  <div class="container">
    <div class="containerLift">
      <div v-for="liftPlace in liftsBox" :key="liftPlace" class="liftPlace">
        {{ liftPlace }}
      </div>
      <div :class="['lift', {'blink': liftIsRest}]" :style="`top: ${liftLevel};`"></div>
    </div>
    <div class="containerButtons">
      <div v-for="liftCall in liftsBox" :key="liftCall" class="buttonBox">
        <div class="button" @click="liftTimer(liftCall)">
          {{ liftCall }}
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@keyframes blink-animation {
  to {
    visibility: hidden;
  }
}
@-webkit-keyframes blink-animation {
  to {
    visibility: hidden;
  }
}

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
  border: 1px dotted blue;
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
  margin-top: 5px;
}

.blink {
  animation: blink-animation 0.3s steps(5, start) 6;
  -webkit-animation: blink-animation .5s steps(5, start) 6;
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
