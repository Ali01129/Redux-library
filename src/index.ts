export function createStore<T>(initialState: T) {
  let state = initialState;
  const listeners: Function[] = []; // a list of listeners to keep track of

  function getState() {
    return state;
  }

  function setState(newState: Partial<T>) {
    state = { ...state, ...newState };

    listeners.forEach((listener) => {
      listener();
    });
  }

  function subscribe(listener: Function) {
    listeners.push(listener);

    return () => {
      const index = listeners.indexOf(listener);

      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }

  return {
    getState,
    setState,
    subscribe,
  };
}

// here we are just testing the functions we created
const store = createStore({
  count: 0,
  user: {
    name: "Anam",
    email: "Anam@example.com",
  },
  isLoggedIn: true,
  products: [],
  theme: "dark",
});

console.log(store.getState().count); // Output: 0
console.log(store.getState().products);
console.log(store.setState({ count: 5 })); // Output: undefined
console.log(store.getState().count); // Output: 5
