export function addClickEvent (func, target, parameter) {
    if (parameter === 'require-event') { 
        target.addEventListener('click', (e) => func(e, target));
    } else {
        target.addEventListener('click', () => func(target, parameter));
    }
}

export function addInputEvent (func, target, parameter) {
    target.addEventListener('input', () => func(target, parameter))
}

// document.querySelector('form').addEventListener('submit', (event) => {
//     event.preventDefault();
// });



