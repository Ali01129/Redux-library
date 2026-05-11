# Redux-library

## Project Plan: Custom State Management Library

## 1. Project Overview

The goal of this project is to build a lightweight custom state management library inspired by Zustand.

The library will manage global state outside React, provide custom hooks for accessing and updating state, and be packaged as an npm library.

## 2. Main Objective

The library should allow different React components to share and update global state without using Redux, Zustand, or React Context.

The core idea is to create our own:

- State store
- State update logic
- Listener/subscriber system
- Custom hooks
- npm package setup

## 3. Implementation Approach

We will build the library in two possible ways.

### Option 1: Using `useSyncExternalStore`

This is the cleaner and more React-friendly approach.

`useSyncExternalStore` is a React hook designed specifically for connecting React components to an external store. Since our state will live outside React in a plain JavaScript/TypeScript object, this hook can safely handle subscription and re-rendering.

In this approach:

- Our library still manages the actual state.
- Our own `setState()` function updates the store.
- Our own `subscribe()` function manages listeners.
- `useSyncExternalStore` helps React read the latest state and re-render only when needed.

### Option 2: Fully From-Scratch Approach

In this approach, we manually connect the external store to React using:

- `useState`
- `useEffect`
- Custom listener logic
- Manual old-value vs new-value comparison

## 4. Core Store Design

The store will be the main part of the library. It will hold the state outside React.

The store will include:

- `state`: private state object
- `getState()`: reads the current state
- `setState()`: updates the state
- `subscribe()`: adds listeners
- `destroy()`: clears all listeners

The state should not be changed directly. It should only be updated through `setState()`.

## 5. TypeScript Store Logic

The store will use TypeScript generics so users can define any state shape.

Example:

```ts
const store = createStore({
  count: 0,
  theme: "dark",
  user: {
    name: "John",
  },
});
```

TypeScript should understand the correct types.

## 6. Listener/Subscriber System

The store will maintain a list of listeners. A listener is a function that runs when the store changes.

We will use a `Set` instead of an array because it avoids duplicate listeners and makes removing listeners easier.

Flow:

```txt
Component uses store value
↓
Component subscribes to the store
↓
State changes through setState()
↓
Store notifies listeners
↓
React checks latest value
↓
Only components using changed values re-render
```

Listeners are necessary because the state is outside React. Without listeners, React would not know that the store has changed.

## 7. React Hooks

The library will expose simple custom hooks for React components.

Main hooks:

```ts
useStoreValue(key)
useStoreSetter(key)
```

### `useStoreValue(key)`

Used to read a value from the store.

Example:

```ts
const count = useStoreValue("count");
```

### `useStoreSetter(key)`

Used to update a value in the store.

Example:

```ts
const setCount = useStoreSetter("count");

setCount(5);
```

This keeps the first version simple and avoids selector complexity.

## 8. Re-render Behaviour

One important goal is that only components using a changed state should re-render.
With `useSyncExternalStore`, React checks the returned snapshot. If the selected value is the same, React does not need to re-render that component.
