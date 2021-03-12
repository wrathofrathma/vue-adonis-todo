import HTTP from "@/http";

export default {
    namespaced: true,
    state: {
        newProjectName: "",
        projects: [],
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
        setActiveProject(state, projectID) {
            state.activeProjectID = projectID;
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
                    commit('tasks/setTasks', [], {root: true})
                    commit('setActiveProject', null)
                }
                commit('removeProject', project)  
            })
            .catch(() => {
                console.error("An error occurred while deleting the project")
            })
        },
        selectProject({ commit, dispatch }, project) {
            commit('setActiveProject', project.id);
            dispatch('tasks/fetchTasks', null, {root: true})
        }
    }
}