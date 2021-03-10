'use strict'

const Project = use("App/Models/Project")
const AuthService = use("App/Services/AuthorizationService")

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

    //Adding params to the input object gives us the query parameters from the route.
    async destroy({response, auth, params}) {
        const user = await auth.getUser();
        const { id } = params;

        // Will return us the project model if it exists
        const project = await Project.find(id);
        //Ensure the user that is auth'd is the owner of the project.
        AuthService.verifyPermission(project, user);

        await project.delete();
        // return response.status(403);
        return project;
    }

    async update({auth, params, request}) {
        const user = await auth.getUser();
        const { id } = params;
        const project = await Project.find(id);
        AuthService.verifyPermission(project,user);

        project.merge(request.only('title'))
        await project.save();
        return project;
    }
}

module.exports = ProjectController
