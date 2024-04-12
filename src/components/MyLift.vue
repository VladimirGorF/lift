<script setup>
import { ref } from "vue";

let liftsBox = ref([7, 6, 5, 4, 3, 2, 1]); //  список этажей
let gapOfFloor = ref(100 / liftsBox.value.length); // сколько процентов занимает каждый этаж
let diffGap = ref(gapOfFloor.value / 100); // пилим на 10 частей шаг лифта по 100мс
let liftLevel = ref(String(liftsBox.value[1] * gapOfFloor.value) + "%"); // начинаем с 1 этажа
let liftMemory = ref(1); //  память текущего этажа перед вызовом
let liftIsWorking = ref(false);
let liftIsRest = ref(false);
const queue = ref([]); // очередь вызовов

function haveRest() {
  liftIsRest.value = true; // лифт на отдыхе
  queue.value.splice(0, 1); // очищаем очередь от старого вызова
  setTimeout(() => {
    liftIsRest.value = false; // лифт свободен
    liftIsWorking.value = false; // лифт свободен
    if (queue.value[0]) {
      // если есть что еще отрабатывать, запускаем Лифт
      liftManager();
    }
  }, 3000);
}

function liftManager() {
  // переводим флаг Лифта в рабочее состояние
  liftIsWorking.value = true;
  // берем первый в очереди этаж, отрабатываем и удаляем его из списка
  liftEngine(queue.value[0]);
}

function queueLoader(liftCall) {
  // проверяем нет ли вызова уже в очереди
  if (!queue.value.includes(liftCall) && liftMemory.value !== liftCall) {
    // добавляем вызов в очередь
    console.log("в ечередб добваляем");
    queue.value.push(liftCall);
    // запускаем менеджер, если лифт не в состоянии работы
    if (!liftIsWorking.value) {
      liftManager();
    }
  } else if (liftCall === liftMemory.value && liftIsWorking.value) {
    // проверка на вызов с этажа откуда только что уехал лифт
    queue.value.push(liftCall);
  }
}

function liftEngine(liftCall) {
  // проверяем в какую сторону двигается лифт: вверх или вниз
  if (liftCall > liftMemory.value) {
    let counter = 1; // счетчик для интервалки 10 по 100
    let liftFlor = liftsBox.value[liftMemory.value] * gapOfFloor.value;
    const timer = setInterval(function () {
      liftLevel.value = String(liftFlor - diffGap.value) + "%";
      counter++;
      liftFlor -= diffGap.value; // уменьшаем отступ сверху на 1\10 от этажа
      if (counter === (liftCall - liftMemory.value) * 100) {
        haveRest(); // моргание лифта
        clearInterval(timer);
        // если это последний этаж
        if (liftCall === liftsBox.value.length) {
          liftLevel.value = "0%";
        } else {
          liftLevel.value =
            String(liftsBox.value[liftCall] * gapOfFloor.value) + "%"; // при заврешении инетервалки устанавливаем уровень этажа
        }
        liftMemory.value = liftCall; // меняем этаж в памяти на вызванный
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
      if (counter === (liftMemory.value - liftCall) * 100) {
        haveRest(); // моргание лифта
        clearInterval(timer);
        liftLevel.value =
          String(liftsBox.value[liftCall] * gapOfFloor.value) + "%"; // при завершении инетервалки устанавливаем уровень этажа
        liftMemory.value = liftCall; // запоминаем этаж на текущий
      }
      liftLevel.value = String(liftFlor + diffGap.value) + "%";
      counter++;
      liftFlor += diffGap.value; // уменьшаем отступ сверху на 1\10 от этажа
    }, 10);
  }
}
</script>

<template>
  <div class="container">
    <div class="containerLift">
      <div v-for="liftPlace in liftsBox" :key="liftPlace" class="liftPlace">
        {{ liftPlace }}
      </div>
      <div
        :class="['lift', { blink: liftIsRest }]"
        :style="`top: ${liftLevel};`"
      ></div>
    </div>
    <div class="containerButtons">
      <div v-for="liftCall in liftsBox" :key="liftCall" class="buttonBox">
        <div
          :class="['button', { colored: queue.includes(liftCall) }]"
          @click="queueLoader(liftCall)"
        >
          {{ liftCall }}
        </div>
      </div>
    </div>
    <div>{{ queue }} {{ liftMemory }}</div>
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
  border: 2px solid brown;
  height: 70px;
  width: 70px;
  margin-top: 5px;
}

.blink {
  transition: 0.3s;
  animation: blink-animation 1s steps(5, start) 3;
  -webkit-animation: blink-animation 1s steps(5, start) 3;
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
  background-color: blue;
  transition: 0.3s;
}
</style>
