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
        }
    }
}