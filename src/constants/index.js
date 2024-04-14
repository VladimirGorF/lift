// константы управления конструктором лифта
export const stepFrequency = 100; // скорость движения лифта 100ед = 1эт/сек
export const restTiming = 3000; // время отдыха лифт в мс
const numberOfFloors = 5; // количество этажей лифта
export const liftBox = []; //  список этажей

// конструктор шахты лифта(этажность)
function liftConstructor(numberOfFloors) {
  for (let i = 1; i <= numberOfFloors; i++) {
    liftBox.unshift(i);
  }
}

liftConstructor(numberOfFloors); 


