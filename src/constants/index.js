// конастанты управления конструктором лифта
export const stepFrequency = 100; // скорость движения лифта 100ед = 1эт/сек
export const restTiming = 3000; // время отдыха лифт в мс
const numberOfFloors = 5; // количество этажей лифта

export const liftBox = []; //  список этажей

function liftConstructor(numberOfFloors) {
  for (let i = 1; i <= numberOfFloors; i++) {
    liftBox.unshift(i);
  }
}

// конструктор шахты лифта(этажность)
liftConstructor(numberOfFloors); 
