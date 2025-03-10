// -- H / A - L3 - 1
//

const myIterable = { from: -1, to: 5 };
myIterable[Symbol.iterator] = function () {
  if (typeof this.from !== "number" || typeof this.to !== "number")
    throw new Error("Error! Object is not iterable");

  if (this.from > this.to)
    throw new Error("Error! 'from' is greater than 'to'");

  let count = this.from;

  let isDone = false;

  const next = () => {
    if (count > this.to) {
      isDone = true;
    }

    return { done: isDone, value: count++ };
  };
  return { next };
};
// for testing
for (const item of myIterable) {
  console.log(item);
}

//
// -- H / A - L3 - 2
//
function getPersons(name, age) {
  class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
  }

  function PersonFn(name, age) {
    this.name = name;
    this.age = age;
  }

  return [
    { name, age },
    Object.assign({}, { name, age }),
    Object.create(
      {},
      {
        name: {
          enumerable: true,
          writable: true,
          configurable: false,
          value: name,
        },
        age: {
          enumerable: true,
          writable: true,
          configurable: false,
          value: age,
        },
      }
    ),
    new Person(name, age),
    new PersonFn(name, age),
  ];
}
// for testing
const persons = getPersons("Michael Keaton", 73);

for (const person of persons) {
  console.log(`${person.name} ${person.age}`);
}
