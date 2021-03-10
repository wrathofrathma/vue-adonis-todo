'use strict'

const Project = use("App/Models/Project")

class ProjectController {
    async index({auth}) {
        const user = await auth.getUser();
        return await user.projects().fetch();
    }

    async create({request, auth}) {
        //Authenticating with our token
        const user = await auth.getUser();
        //Object deconstruction to get the title of hte project
        const {title} = request.all();
        //There are 3 ways we can do this in a way that associates the project with the user.
        /* 1. Use the constructor and give it the user_id manually.
        const project = await Project.create({
            user_id: user.id,
            title
        })
         * */
        /* Use project.fill({}) or project.title="something" on a new project object
         * const project = new Project();
         project.title = "Hello world"
         * or
         project.fill({
            title
         })

         Then save it with await user.projects().save(project);
         */
        const project = new Project();
        project.fill({
            title
        });
        //Then saving it to associate it with the user
        await user.projects().save(project);
        return project;
    }
}

module.exports = ProjectController
