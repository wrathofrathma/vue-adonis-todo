import HTTP from "@/http";

export default {
    namespaced: true,
    state: {
        newProjectName: "",
        projects: []
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
        }
    },
    actions: {
        createProject({state, dispatch, commit}) {
            if(state.newProjectName) {
                return HTTP().post("/api/projects", {
                    title: state.newProjectName
                })
                .then(() => {
                    dispatch('getProjects')
                    commit('setNewProjectName', '')
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
        deleteProject({commit}, project) { 
            return HTTP()
            .delete(`/api/projects/${project.id}`)
            .then(() => {
                commit('removeProject', project)  
            })
            .catch(() => {
                console.error("An error occurred while deleting the project")
            })
        }
    }
}