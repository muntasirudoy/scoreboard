// SELECT ELEMENT
const addMatchBtn = document.querySelector(".addMatch");
const resetBtn = document.querySelector(".resetBtn");
const container = document.querySelector(".matchWrap");
const newCountersContainer = document.getElementById("newCounter");
// InitialState
const initialState = {
  counter: [
    {
      id: 1,
      value: 0,
    },
  ],
};

// ACTION IDENTIFIERS
const INCREMENT = "increment";
const DECREMENT = "decrement";
const NEW_COUNTER = "addition";
const RESET = "reset";

// ACTION CREATORS
const increment = (id, value) => {
  return {
    type: INCREMENT,
    payload: {
      id: id,
      value: value,
    },
  };
};

const decrement = (id, value) => {
  return {
    type: DECREMENT,
    payload: {
      id: id,
      value: value,
    },
  };
};

const addCounter = (id) => {
  return {
    type: NEW_COUNTER,
    payload: {
      id: id,
    },
  };
};

const reset = () => {
  return {
    type: RESET,
  };
};

// REDUCER
const countReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      const newIncrement = {
        ...state,
        counter: [...state.counter],
      };

      const incrementCounter = newIncrement.counter.find(
        (counter) => counter.id === action.payload.id
      );
      incrementCounter.value = incrementCounter.value + action.payload.value;

      return newIncrement;
    case DECREMENT:
      const newDecrement = {
        ...state,
        counter: [...state.counter],
      };

      const decrementCounter = newDecrement.counter.find(
        (counter) => counter.id === action.payload.id
      );
      decrementCounter.value = decrementCounter.value - action.payload.value;

      return newDecrement;
    case NEW_COUNTER:
      const newCounter = {
        ...state,
        counter: [
          ...state.counter,
          {
            id: action.payload.id,
            value: 0,
          },
        ],
      };

      return newCounter;
    case RESET: {
      const newReset = {
        ...state,
        counter: [...state.counter],
      };

       let resetall = Object.values(newReset).map((e) => (e.value = 0));


      return resetall;
    }

    default:
      return state;
  }
};
// STORE
const store = Redux.createStore(countReducer);
// RENDER UI
const updateCounterUI = (id) => {
  const currentState = store.getState();
  const allCounter = currentState.counter;
  const currentCounters = allCounter.find((counter) => counter.id === id);

  const counterValue = document.getElementById(`count-${id}`);
  console.log(`count-${id}`);
  counterValue.innerHTML = currentCounters.value;
};
// INCREMENT & DECREMENT STATE HANDLE
const newElementHandler = (id, value) => {
  const incrementBtn = document.getElementById(`increment-${id}`);
  const decrementBtn = document.getElementById(`decrement-${id}`);

  incrementBtn.addEventListener("change", (e) => {
    e.preventDefault();
    setTimeout((e) => {
      store.dispatch(increment(id, Number(incrementBtn.value)));
      updateCounterUI(id);
    }, 2000);
  });

  decrementBtn.addEventListener("change", (e) => {
    e.preventDefault();
      store.dispatch(decrement(id, Number(decrementBtn.value)));
      updateCounterUI(id);
  });
};
// NEW COUNTER UI
const newCounterUI = (id) => {
  const currentState = store.getState();
  const matchNo = currentState.counter.length - 1;
  const newDivElement = document.createElement("div");
  newDivElement.innerHTML = `
  <div class="match ">
  <div class="wrapper">
      <button class="lws-delete">
          <img src="./image/delete.svg" alt="" />
      </button>
      <h3 class="lws-matchName">Match ${matchNo}</h3>
  </div>
  <div class="inc-dec">
      <form class="incrementForm">
          <h4>Increment</h4>
          <input
          id='increment-${id}'
              type="number"
              name="increment"
              class="lws-increment"
          />
      </form>
      <form class="decrementForm">
          <h4>Decrement</h4>
          <input
          id='decrement-${id}'
              type="number"
              name="decrement"
              class="lws-decrement"
          />
      </form>
  </div>
  <div class="numbers">
      <h2 class="lws-singleResult" id="count-${id}">0</h2>
  </div>
</div>
  `;
  container.insertBefore(newDivElement, newCountersContainer);
  const randomValue = Math.round(Math.random() * 10) + 1;
  newElementHandler(id, randomValue);
};

window.addEventListener("load", () => {
  const id = Math.random() * Math.random();
  store.dispatch(addCounter(id));
  newCounterUI(id);
});
// NEW COUNTER EVENT
addMatchBtn.addEventListener("click", () => {
  const id = Math.random() * Math.random();
  store.dispatch(addCounter(id));
  newCounterUI(id);
});

resetBtn.addEventListener("click", () => {
  store.dispatch(reset());
});

const CounterUI = () => {
  const currentState = store.getState();
  const allCounter = currentState.counter;
  allCounter.forEach((counter) => {
    updateCounterUI(counter.id);
  });
};

//Initial Counter
newElementHandler(1, 1);
