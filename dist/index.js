export function createStore(initialState) {
    let state = initialState;
    function getState() {
        return state;
    }
    return {
        getState,
    };
}
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
//# sourceMappingURL=index.js.map