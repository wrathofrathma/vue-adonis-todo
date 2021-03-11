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
        setEditable(state, project) {
            project.editMode = true;
        },
        unsetEditable(state, project) {
            project.editMode = false;
        },
        updateLabel(state,  {title, project}) {
            project.title = title
        }
    },
    actions: {
        createProject({state, dispatch}) {
            if(state.newProjectName) {
                return HTTP().post("/api/projects", {
                    title: state.newProjectName
                })
                .then(() => {
                    dispatch('getProjects')
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
        deleteProject({dispatch}, project) { 
            return HTTP()
            .delete(`/api/projects/${project.id}`)
            .then(() => {
                dispatch('getProjects')
            })
            .catch(() => {
                console.error("An error occurred while deleting the project")
            })
        }
    }
}