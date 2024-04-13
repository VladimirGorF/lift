<script setup>
import { ref, computed, onMounted } from "vue";
import { liftBox, stepFrequency, restTiming } from "../constants/index.js";

const liftsBox = ref(liftBox);
let gapOfFloor = ref(100 / liftsBox.value.length); // сколько процентов шахты занимает каждый этаж
let diffGap = gapOfFloor.value / stepFrequency; // пилим на 100 частей шаг лифта по 100мс
let liftLevel = ref(String(liftsBox.value[1] * gapOfFloor.value) + "%"); // начинаем с 1 этажа
let liftMemory = ref(1); //  память текущего этажа перед вызовом
let liftIsWorking = ref(false); // лифт в работе
let liftIsRest = ref(false); // лифт на отдыхе 3 с
const queue = ref([]); // очередь вызовов

onMounted(loadingStorage);

function loadingStorage() {
  if (localStorage.getItem("queue")) {
    queue.value = localStorage
      .getItem("queue")
      .split(",")
      .map((call) => Number(call));
    liftMemory.value = Number(localStorage.getItem("liftMemory"));
    liftManager();
  }
}

function updateStorage() {
  localStorage.setItem("queue", queue.value);
  localStorage.setItem("liftMemory", liftMemory.value);
}

const directionOfMoving = computed(() => {
  // индикатор направления движения движения лифта
  if (liftMemory.value < queue.value[0] && liftIsWorking.value) {
    return queue.value[0] + " up";
  } else if (liftMemory.value > queue.value[0] && liftIsWorking.value) {
    return queue.value[0] + " down";
  }
  if (liftIsRest.value) {
    return liftMemory.value;
  }
  return null;
});

function haveRest() {
  liftIsRest.value = true; // лифт на отдыхе
  queue.value.splice(0, 1); // очищаем очередь от старого вызова
  updateStorage(); // записываем очередь в хранилище
  setTimeout(() => {
    liftIsRest.value = false; // лифт свободен
    liftIsWorking.value = false; // лифт свободен
    if (queue.value[0]) {
      // если есть что еще отрабатывать, запускаем Лифт
      liftManager();
    }
  }, restTiming);
}

function liftIsComing(liftCall) {
  // проверка на идущий лифт в направлении текущей нажатой кнопки
  if (liftIsWorking.value && liftCall === queue.value[0]) {
    return true;
  }
  return false;
}

function liftManager() {
  // переводим флаг Лифта в рабочее состояние
  liftIsWorking.value = true;
  // берем первый в очереди этаж и запускам движок лифта
  liftEngine(queue.value[0]);
}

function queueLoader(liftCall) {
  // проверяем нет ли вызова уже в очереди
  if (!queue.value.includes(liftCall) && liftMemory.value !== liftCall) {
    // добавляем вызов в очередь
    queue.value.push(liftCall);
    updateStorage();
    // запускаем менеджер, если лифт не в состоянии работы
    if (!liftIsWorking.value) {
      liftManager();
    }
  } else if (
    // проверка на вызов с этажа откуда только что уехал лифт
    liftCall === liftMemory.value &&
    liftIsWorking.value &&
    !queue.value.includes(liftCall) &&
    !liftIsRest.value
  ) {
    queue.value.push(liftCall);
    updateStorage();
  }
}

function liftEngine(liftCall) {
  // проверяем в какую сторону двигается лифт: вверх или вниз
  if (liftCall > liftMemory.value) {
    let counter = 1; // счетчик для интервалки 10 по 100
    let liftFlor = liftsBox.value[liftMemory.value] * gapOfFloor.value;
    const timer = setInterval(function () {
      liftLevel.value = String(liftFlor - diffGap) + "%";
      updateStorage();
      counter++;
      liftFlor -= diffGap; // уменьшаем отступ сверху на 1\10 от этажа
      if (counter === (liftCall - liftMemory.value) * stepFrequency) {
        liftMemory.value = liftCall; // меняем этаж в памяти на вызванный
        haveRest(); // моргание лифта
        clearInterval(timer);
      }
    }, 10);
  } else if (liftCall < liftMemory.value) {
    let counter = 1; // счетчик для интервалки 10 по 100
    let liftFlor = 0;
    if (liftMemory.value === liftsBox.value.length) {
      liftFlor = 0;
    } else {
      liftFlor = liftsBox.value[liftMemory.value] * gapOfFloor.value;
    }
    const timer = setInterval(function () {
      if (counter === (liftMemory.value - liftCall) * stepFrequency) {
        // при завершении инетервалки устанавливаем уровень этажа
        liftMemory.value = liftCall;
        haveRest(); // моргание лифта
        clearInterval(timer);
        liftLevel.value =
          String(liftsBox.value[liftCall] * gapOfFloor.value) + "%";
      }
      liftLevel.value = String(liftFlor + diffGap) + "%";
      counter++;
      liftFlor += diffGap; // уменьшаем отступ сверху на 1\10 от этажа
      updateStorage();
    }, 10);
  }
}
</script>

<template>
  <div class="container">
    <div class="containerLift">
      <div
        v-for="liftPlace in liftsBox"
        :key="liftPlace"
        class="liftPlace"
      ></div>
      <div
        :class="['lift', { blink: liftIsRest }]"
        :style="`top: ${liftLevel};`"
      >
        <div class="indicator" v-if="liftIsWorking && !liftIsRest">
          {{ directionOfMoving }}
        </div>
        <div v-else>{{ liftMemory }}</div>
      </div>
    </div>
    <div class="containerButtons">
      <div v-for="liftCall in liftsBox" :key="liftCall" class="buttonBox">
        <div
          :class="[
            'button',
            { colored: queue.includes(liftCall) },
            { blink: liftIsComing(liftCall) },
          ]"
          @click="queueLoader(liftCall)"
        >
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
  border: 2px solid rgb(134, 12, 61);
  border-radius: 10px;
  height: 70px;
  width: 70px;
  margin-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
}
.blink {
  transition: 0.3s;
  animation: blink-animation 1s steps(5, start) infinite;
  -webkit-animation: blink-animation 1s steps(5, start) infinite;
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
  transition: 0.3s;
}
.button:hover {
  background-color: red;
}
.colored {
  background-color: rgb(72, 163, 33);
  transition: 0.3s;
  color: aliceblue;
}
</style>

