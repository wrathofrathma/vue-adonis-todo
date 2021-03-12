import HTTP from "@/http";

export default {
    namespaced: true,
    state: {
        newProjectName: "",
        projects: [],
        tasks: [],
        newTaskDescription: "",
        activeProjectID: null
    },
    getters: {
        isProjectSelected(state) {
            return !state.activeProjectID;
        }
    },
    mutations: {
        setNewProjectName(state, name) {
            state.newProjectName = name;
        },
        appendProject(state, project) {
            state.projects.push(project);
        },
        setProjects(state, projects) {
            state.projects = projects;
        },
        setEditable(state, record) {
            record.isEditMode = true;
        },
        unsetEditable(state, record) {
            record.isEditMode = false;
        },
        updateRecordTitle(state,  {record, title}) {
            record.title = title
        },
        removeProject(state, project) {
            state.projects.splice(state.projects.indexOf(project),1);
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
        setActiveProject(state, projectID) {
            state.activeProjectID = projectID;
        },
        updateTaskDescription(state,  {task, description}) {
            task.description = description
        },
    },
    actions: {
        createProject({state, dispatch, commit}) {
            if(state.newProjectName) {
                return HTTP().post("/api/projects", {
                    title: state.newProjectName
                })
                .then(({data}) => {
                    dispatch('getProjects')
                    commit('setNewProjectName', '')
                    dispatch('selectProject', data)
                })
                .catch((error) => {
                    console.error("An error occurred while creating a new project.")
                    console.log(error)
                })
            }
        },
        getProjects({commit}) {
            return HTTP().get("/api/projects").then(({data}) => {
                commit('setProjects', data)
            }).catch(() => {
                console.error("An error occured while fetching projects.")
            })
        },
        saveProjectName({ commit}, project) {
            return HTTP().patch(`/api/projects/${project.id}`, {
                title: project.title
            }).then(() => {
                commit('unsetEditable', project)
            }).catch(() => {
                console.error("An error occurred while saving the project name.")
            })
        },
        deleteProject({commit, state}, project) { 
            return HTTP()
            .delete(`/api/projects/${project.id}`)
            .then(() => {
                if(project.id === state.activeProjectID){
                    commit('setTasks', [])
                    commit('setActiveProject', null)
                }
                commit('removeProject', project)  
            })
            .catch(() => {
                console.error("An error occurred while deleting the project")
            })
        },
        fetchTasks({commit, state}) {
            return HTTP()
            .get(`/api/projects/${state.activeProjectID}/tasks`)
            .then(({data}) => {
                commit('setTasks', data)
            })
            .catch(() => {
                console.log("An error occurred while fetching the project tasks.")
            })
        },
        createTask({commit, state}) {
            return HTTP()
            .post(`/api/projects/${state.activeProjectID}/tasks`, {
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
        selectProject({ commit, dispatch }, project) {
            commit('setActiveProject', project.id);
            dispatch('fetchTasks')
        }
    }
}