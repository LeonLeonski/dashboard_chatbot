export function loadState () {
    console.log('loadState')
    try {
        const serializedState = localStorage.getItem('state');

        if(serializedState === null) {
            return undefined;
        }

        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
}

export function saveState (state) {
    console.log(state);
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {

    }
}