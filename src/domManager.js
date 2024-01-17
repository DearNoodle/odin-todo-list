import * as event from './eventManager';
import * as logic from './logicManager';
import removeIcon from './remove.jpg';
import showDescriptionIcon from './description.jpg';

const taskListUl = document.querySelector('ul.tasks');

function renderProjectList() {
    logic.projects.forEach(project => {
        addProjectSubtitle(project.type);
    });
}

function renderTaskList(target) {
    if (typeof(target) === 'string') {
        var projectType = target;
    } else {
        var projectType = target.textContent;
    }
    logic.projects.forEach(project => {
        if (project.type === projectType) {
            logic.trackers.currentProjectType = projectType;
            while (taskListUl.firstChild) {
                taskListUl.removeChild(taskListUl.firstChild);
            }
            project.tasks.forEach((task,index) => {
                const taskLi = document.createElement('li');
                taskLi.classList.add(project.type, 'task');
                taskLi.id = `task${index}`;
                taskListUl.appendChild(taskLi);
        
                const taskCheckbox = document.createElement('label');
                const hiddenCheckbox = document.createElement('input');
                taskCheckbox.className = 'is-finished';
                hiddenCheckbox.type = 'checkbox';
                hiddenCheckbox.className = 'hidden';
                event.addInputEvent(saveTaskCheckbox, hiddenCheckbox, task);
                loadTaskCheckbox(hiddenCheckbox, task.isFinished);
                taskCheckbox.appendChild(hiddenCheckbox);
                taskLi.appendChild(taskCheckbox);
        
                const taskTitle = document.createElement('p');
                taskTitle.className = 'task-title';
                event.addInputEvent(saveTaskTitle, taskTitle, task);
                loadTaskTitle(taskTitle, task.title);
                taskLi.appendChild(taskTitle);
                
                const taskShowDescription = document.createElement('img');
                taskShowDescription.src = showDescriptionIcon;
                taskShowDescription.className = 'icon-show-description';
                taskLi.appendChild(taskShowDescription);

                event.addClickEvent(selectTask, taskShowDescription, taskLi);
        
                const taskPriority = createPrioritySelectInput();
                event.addInputEvent(saveTaskPriority, taskPriority, task);
                loadTaskPriority(taskPriority, task.priority);
                taskLi.appendChild(taskPriority);

                const taskDate = document.createElement('input');
                taskDate.setAttribute('type', 'date');
                taskDate.className = 'due-date';
                event.addInputEvent(saveTaskDueDate, taskDate, task);
                loadTaskDueDate(taskDate, task.dueDate);
                taskLi.appendChild(taskDate);

                const taskRemove = document.createElement('img');
                taskRemove.src = removeIcon;
                taskRemove.className = 'icon-remove';
                taskLi.appendChild(taskRemove);
                event.addClickEvent(removeTask, taskRemove, {taskLi , index});

                const taskDescription = document.createElement('input');
                taskDescription.setAttribute('type', 'text');
                taskDescription.className = 'description';
                taskDescription.style.display = "none";
                event.addInputEvent(saveTaskDescription, taskDescription, task);
                loadTaskDescription(taskDescription, taskLi, project);
                taskLi.insertAdjacentElement('afterend', taskDescription);
            });
        }
    })
}

function loadTaskCheckbox(target, isChecked) {
    target.checked = isChecked;
}
function loadTaskTitle(target, name) {
    target.textContent = name;
}
function loadTaskPriority(target, priority) {
    target.value = priority;
}
function loadTaskDueDate(target, date) {
    target.value = date;
}
function loadTaskDescription(target, taskLi, project) {
    project.tasks.forEach((task , index) => {
        if (taskLi.id === `task${index}`) {
            target.value = task.description;
        }
    });
}

function saveTaskCheckbox(target, task) {
    task.isFinished = target.checked;
    logic.saveDataInLocalStorage();
}
function saveTaskTitle(target, task) {
    task.name = target.value;
    logic.saveDataInLocalStorage();
}
function saveTaskPriority(target, task) {
    task.priority = target.value;
    logic.saveDataInLocalStorage();
}
function saveTaskDueDate(target, task) {
    task.dueDate = target.value;
    logic.saveDataInLocalStorage();
}
function saveTaskDescription(target, task) {
    task.description = target.value;
    logic.saveDataInLocalStorage();
}

function selectTask (taskTitle, taskLi) {
    const taskDescription = taskLi.nextSibling;
    if (taskDescription.style.display === "none") {
        taskDescription.style.display = "";
    } else {
        taskDescription.style.display = "none";
    }
}

function createPrioritySelectInput() {
    const taskPriority = document.createElement("select");
    taskPriority.className = 'priority';

    const lowOption = document.createElement("option");
    lowOption.value = "low";
    lowOption.innerText = "Low";
    taskPriority.appendChild(lowOption);
    const mediumOption = document.createElement("option");
    mediumOption.value = "medium";
    mediumOption.innerText = "Medium";
    taskPriority.appendChild(mediumOption);
    const highOption = document.createElement("option");
    highOption.value = "high";
    highOption.innerText = "High";
    taskPriority.appendChild(highOption);

    return taskPriority;
}

const projectListUl = document.querySelector('ul.project-list');
const buttonShowProjectForm = document.querySelector('button.show-project-form');
const projectAddForm = document.querySelector(".add-project");
const buttonShowTaskForm = document.querySelector('button.show-task-form');
const taskAddForm = document.querySelector(".add-task");

function hideForm(e) {
    if (taskAddForm === e.target || projectAddForm === e.target) {
        projectAddForm.style.display = "none";
        taskAddForm.style.display = "none";
    }
    if (e === 'submit') {
        projectAddForm.style.display = "none";
        taskAddForm.style.display = "none";
    }
}

function showProjectAddForm () {
    projectAddForm.style.display = "flex";
}

function submitProjectAddForm (target) {
    const projectType = projectAddForm.querySelector('#type').value;
    addProject(projectType);
    hideForm('submit');
}

function addProject(projectType) {
    if (!projectType.trim()) {
        projectType = 'Project';
    }
    logic.projects.push({type: projectType, tasks: []});
    addProjectSubtitle(projectType);
    logic.saveDataInLocalStorage();
}

function addProjectSubtitle(projectType) {
    const projectLi = document.createElement('li');
    projectLi.className = 'project';
    projectListUl.appendChild(projectLi);

    const projectSubtitle = document.createElement('p');
    projectSubtitle.className = 'project-subtitle';
    projectSubtitle.textContent = projectType;
    projectLi.appendChild(projectSubtitle);
    event.addClickEvent(renderTaskList, projectSubtitle);

    const buttonProjectRemove = document.createElement('span');
    buttonProjectRemove.className = 'remove-project';
    buttonProjectRemove.textContent = '\u00D7';
    projectLi.appendChild(buttonProjectRemove);
    event.addClickEvent(removeProject, buttonProjectRemove, {projectLi,projectSubtitle});
}

function removeProject (target, forRemove) {
    forRemove.projectLi.remove();
    logic.projects.forEach(project => {
        if (project.type === forRemove.projectSubtitle.textContent) {
            logic.projects = logic.projects.filter(value => value !== project);
        }
    });
    logic.saveDataInLocalStorage();
}

function showTaskAddForm (target, buttonAddTask) {
    taskAddForm.style.display = "flex";
    buttonAddTask.classList.remove(buttonAddTask.classList.item(1));
    buttonAddTask.classList.add(logic.trackers.currentProjectType);
}

function submitTaskAddForm (target) {
    const taskIsFinished = taskAddForm.querySelector('#is-finished').value;
    const taskTitle = taskAddForm.querySelector('#title').value;
    const taskDescription = taskAddForm.querySelector('#description').value;
    const taskPriority = taskAddForm.querySelector('#priority').value;
    const taskDueDate = taskAddForm.querySelector('#due-date').value;
    addTask({title: taskTitle, 
                    description: taskDescription,
                    dueDate: taskDueDate, 
                    priority: taskPriority, 
                    isFinished: taskIsFinished});
    hideForm('submit');
}

function addTask (task) {
    const projectType = logic.trackers.currentProjectType;
    logic.projects.forEach(project => {
        if (project.type === projectType) {
            project.tasks.push(task);
            renderTaskList(projectType);
        }
    });
    logic.saveDataInLocalStorage();
}

function removeTask (target, forRemove) {
    forRemove.taskLi.remove();
    logic.projects.forEach(project => {
        if (project.type === logic.trackers.currentProjectType) {
            project.tasks.splice(forRemove.index, 1);
        }
    });
    logic.saveDataInLocalStorage();
}

export function init () {
    const projectSubtitleArray = document.querySelectorAll('li.project');
    const buttonAddProject = projectAddForm.querySelector('.submit');
    const buttonAddTask = taskAddForm.querySelector('.submit');
    projectSubtitleArray.forEach(projectSubtitle => {
        event.addClickEvent(renderTaskList, projectSubtitle);
    });
    renderProjectList();
    renderTaskList('Exercise');

    event.addClickEvent(showProjectAddForm, buttonShowProjectForm, undefined, true);
    event.addClickEvent(submitProjectAddForm, buttonAddProject);

    event.addClickEvent(showTaskAddForm, buttonShowTaskForm, buttonAddTask, true);
    event.addClickEvent(submitTaskAddForm, buttonAddTask);

    event.addClickEvent(hideForm, document, 'require-event');
}
