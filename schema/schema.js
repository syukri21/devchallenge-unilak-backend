import project from "../models/project";
import user from "../models/user";
import events from "../models/events"
import GraphQLDate from "graphql-date"
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  graphql
} from "graphql";



const EventType = new GraphQLObjectType({
  name: "event",
  fields : () => ({
    id :  {type: GraphQLID},
    eventid : {type: GraphQLString},
    date : {type: GraphQLDate},
    description: {type: GraphQLString},
    location: {type: GraphQLString},
    projectid : {
      type: new GraphQLList(ProjectType),
      resolve(parent, args){
        return project.find({
            project: {$in: parent.projectid}
        })
      },
    },
  })
})


const ProjectType = new GraphQLObjectType({
  name: "project",
  fields: () => ({
    id: { type: GraphQLID },
    project: { type: GraphQLString },
    projectnama: { type: GraphQLString },
    unit: { type: GraphQLString },
    stakeholder: { type: GraphQLString },
    sprint: { type: GraphQLInt },
    status: { type: GraphQLString },
    rating: { type: GraphQLInt },
    description: { type: GraphQLString },
    stardate: { type: GraphQLString },
    enddate: { type: GraphQLString },
    uid: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return user.find({
          user: { $in: parent.uid }
        });
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    id: { type: GraphQLID },
    user: { type: GraphQLString },
    namalengkap: { type: GraphQLString },
    password: { type: GraphQLString },
    stream: { type: GraphQLString },
    level: { type: GraphQLString },
    rating: { type: GraphQLInt },
    pointburn: { type: GraphQLInt },
    pointqueue: { type: GraphQLInt },
    pointremain: { type: GraphQLInt },
    totalpoint: { type: GraphQLInt },
    uid: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return project.find({
          project: { $in: parent.uid }
        });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return user.find({});
      }
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return project.find({});
      }
    },
    user: {
      type: UserType,
      args: { user: { type: GraphQLString } },
      resolve(parent, args) {
        return user.findOne({ user: args.user });
      }
    },
    project: {
      type: ProjectType,
      args: { project: { type: GraphQLString } },
      resolve(parent, args) {
        return project.findOne({ project: args.project });
      }
    },
    events : {
      type: new GraphQLList(EventType),
      resolve(parent, args){
        return events.find({})
      }
    },
    event : {
      type: EventType,
      args : { event: {type: GraphQLString}  },
      resolve(parent, args ){
        return events.findOne({eventid: args.event})
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        user: { type: GraphQLString },
        namalengkap: { type: GraphQLString },
        password: { type: GraphQLString },
        stream: { type: GraphQLString },
        level: { type: GraphQLString },
        rating: { type: GraphQLInt },
        pointburn: { type: GraphQLInt },
        pointqueue: { type: GraphQLInt },
        pointremain: { type: GraphQLInt },
        totalpoint: { type: GraphQLInt }
      },
      resolve(parent, args) {
        let usr = new user({
          user: args.user,
          namalengkap: args.namalengkap,
          password: args.password,
          stream: args.stream,
          level: args.level,
          rating: args.rating,
          pointburn: args.rating,
          pointremain: args.pointremain,
          pointqueue: args.pointqueue,
          totalpoint: args.totalpoint
        });
        return usr.save();
      }
    },
    addProject: {
      type: ProjectType,
      args: {
        project: { type: GraphQLString },
        projectnama: { type: GraphQLString },
        unit: { type: GraphQLString },
        stakeholder: { type: GraphQLString },
        sprint: { type: GraphQLInt },
        status: { type: GraphQLString },
        rating: { type: GraphQLInt },
        description: { type: GraphQLString },
        stardate: { type: GraphQLString },
        enddate: { type: GraphQLString }
      },
      resolve(parent, args) {
        let prjct = new project({
          project: args.project,
          projectnama: args.projectnama,
          unit: args.unit,
          stakeholder: args.stakeholder,
          sprint: args.sprint,
          status: args.status,
          rating: args.rating,
          description: args.description,
          stardate: args.stardate,
          enddate: args.enddate
        });
        return prjct.save();
      }
    },
    updateUser: {
      type: UserType,
      args: {
        user: { type: GraphQLString },
        namalengkap: { type: GraphQLString },
        password: { type: GraphQLString },
        stream: { type: GraphQLString },
        level: { type: GraphQLString },
        rating: { type: GraphQLInt },
        pointburn: { type: GraphQLInt },
        pointqueue: { type: GraphQLInt },
        pointremain: { type: GraphQLInt },
        totalpoint: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return user.update(
          { user: args.user },
          {
            $set: {
              namalengkap: args.namalengkap,
              password: args.password,
              stream: args.stream,
              level: args.level,
              rating: args.rating,
              pointburn: args.pointburn,
              pointqueue: args.pointqueue,
              pointremain: args.pointremain,
              totalpoint: args.totalpoint
            }
          },
          { upsert: true }
        );
      }
    },
    updateProject: {
      type: ProjectType,
      args: {
        project: { type: GraphQLString },
        projectnama: { type: GraphQLString },
        unit: { type: GraphQLString },
        stakeholder: { type: GraphQLString },
        sprint: { type: GraphQLInt },
        status: { type: GraphQLString },
        rating: { type: GraphQLInt },
        description: { type: GraphQLString },
        stardate: { type: GraphQLString },
        enddate: { type: GraphQLString }
      },
      resolve(parent, args) {
        return project.update(
          { project: args.project },
          {
            $set: {
              projectnama: args.projectnama,
              unit: args.unit,
              stakeholder: args.stakeholder,
              sprint: args.sprint,
              status: args.status,
              rating: args.rating,
              description: args.description,
              stardate: args.stardate,
              enddate: args.enddate
            }
          },
          { upsert: true }
        );
      }
    },

    addEvent : {
      type: EventType,
      args: {
        eventid: {type: GraphQLString},
        date: {type: GraphQLDate},
        description: {type: GraphQLString},
        location: {type: GraphQLString},
        projectid: {
          type : new GraphQLList(GraphQLString),
        }
      },
      resolve(parent, args){
        let evnts = new events({
          eventid: args.eventid,
          date: args.date,
          description: args.description,
          location:args.location,
          projectid: args.projectid,
        })

        return evnts.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
