import HTTP from "../http"
export default {
    namespaced: true,
    state: {
        tasks: [],
        newTaskDescription: "",
    },
    mutations: {
        setTaskCompleted(state, {task, completed}) {
            task.completed = completed;
        },
        setTasks(state, tasks) {
            state.tasks = tasks;
        },
        setNewTaskDescription(state, desc) {
            state.newTaskDescription = desc;
        },
        appendTask(state, task) {
            state.tasks.push(task);
        },
        removeTask(state, task) {
            state.tasks.splice(state.tasks.indexOf(task), 1);
        },
        setEditable(state, record) {
            record.isEditMode = true;
        },
        unsetEditable(state, record) {
            record.isEditMode = false;
        },
        updateTaskDescription(state,  {task, description}) {
            task.description = description
        },
    },
    actions: {
        toggleTaskCompleted({ commit }, task) {
            return HTTP()
            .patch(`/api/tasks/${task.id}`, {
                completed: !task.completed
            })
            .then(() => {
                commit("setTaskCompleted", {
                    task: task,
                    completed: !task.completed
                })
            })
            .catch(() => {
                console.log("An error occurred while toggling the task completion.")
            })
        },
        fetchTasks({commit, rootState}) {
            return HTTP()
            .get(`/api/projects/${rootState.projects.activeProjectID}/tasks`)
            .then(({data}) => {
                commit('setTasks', data)
            })
            .catch(() => {
                commit('setTasks', [])
                console.log("An error occurred while fetching the project tasks.")
            })
        },
        createTask({commit, state, rootState}) {
            return HTTP()
            .post(`/api/projects/${rootState.projects.activeProjectID}/tasks`, {
                description: state.newTaskDescription
            })
            .then(({data}) => {
                commit('appendTask', data)
                commit('setNewTaskDescription', '')
                //Could also just dispatch fetchTasks again.
            })
            .catch(() => {
                console.log("An error occurred while creating the task.")
            })
        },
        deleteTask({commit}, task) {
            return HTTP()
            .delete(`/api/tasks/${task.id}`)
            .then(({data}) => {
                commit('removeTask', data)
            })
            .catch(() => {
                console.log("An error occurred while deleting the task.")
            })
        },
        updateTask({commit}, task) {
            return HTTP()
            .patch(`/api/tasks/${task.id}`, {
                description: task.description,
                completed: task.completed
            })
            .then(() => {
                commit('unsetEditable', task)
            })
            .catch(() => {
                console.log("An error occurred while updating the task.")
            })         
        },
    }

}