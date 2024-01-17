export let projects = [
    {
        type: 'Exercise',
        tasks: [
            {title: 'Push Up', description: '50 times',
            dueDate: '2024-01-09', priority: 'medium',
            isFinished: false},
            {title: 'Sidestep', description: '100 times',
             dueDate: '2024-01-10', priority: 'low', 
             isFinished: true}
        ]
    },
    {
        type: 'Reading',
        tasks: [
            {title: 'Harry Potter', description: 'Good story',
             dueDate: '2024-03-10', priority: 'low',
            isFinished: true},
            {title: 'Thermodynamic', description: 'Must finish before exam!',
             dueDate: '2024-01-20', priority: 'high', 
             isFinished: false}
        ]
    }
]

export let trackers = {currentProjectType: undefined};

export function saveDataInLocalStorage() {
    localStorage.projects = JSON.stringify(projects);
}

export function loadDataInLocalStorage() {
    if (localStorage.projects) {
        console.log(projects);
        projects = JSON.parse(localStorage.projects);
        console.log(projects);
    }
}
