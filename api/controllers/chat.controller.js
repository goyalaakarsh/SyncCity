// controllers/chatController.js
// // const Sendbird = require('sendbird');
// import Sendbird from 'sendbird'
import User from '../models/user.model.js';
import Department from '../models/department.model.js';
import Project from '../models/project.model.js';
import { channel } from 'diagnostics_channel';
import { getSendbirdObject } from '../utils/helper.js';
import axios from 'axios';
import dotenv from 'dotenv';
// require('dotenv').config();
dotenv.config();

const API_TOKEN = process.env.API_TOKEN;
const APPLICATION_ID = process.env.APPLICATION_ID;

const sb = getSendbirdObject();


export const createProjectChatroom = async (req, res) => {
  const { projectId } = req.body;
  let userIds = []
  try {
    // Fetch project details and populate depId and managerId
    const project = await Project.findById(projectId).populate('depId managerId');
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    console.log(project);
    
    // Get all employees working on the project

    const employees = await User.find({ projectId: { $in: [projectId] } });
    const employeeIds = employees.map(emp => emp._id.toString());
    
    
    userIds = [...employeeIds, project.managerId.id.toString()]
    
    await sb.connect(project.managerId.id.toString(), (user, error) => {
      if (error) {
        console.error('Connection failed: ', error);
      } else {
        console.log('Connected as: ', user.nickname);
      }
    });

    const params = new sb.GroupChannelParams(); 
    params.invitedUserIds = userIds;            
    params.name = `${project.name} Project Chat`;  
    params.isDistinct = false;     
    

    const channel = await sb.GroupChannel.createChannelWithUserIds(userIds, false,`${project.name} Project Chat`,null, null, null, (channel, error) => {});  // Create the group channel

    res.status(201).json({
      "status":"Channel Created",
      "group_name":channel.name,
      "group_url":channel.url    
    })

  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const createDepartmentChatroom = async (req, res) => {
  const { departmentId } = req.body;
  
  try {
    // Fetch department details and populate adminId
    const department = await Department.findById(departmentId).populate('adminId');
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }

    // Get all employees in the department
    const employees = await User.find({ depId: departmentId });
    const employeeIds = employees.map(emp => emp._id.toString());

    // Create the chatroom for the department with admin and employees
    // sb.GroupChannel.createChannelWithUserIds(
    //   [...employeeIds, department.adminId._id.toString()],
    //   true,
    //   departmentId,
    //   `${department.depName} Department Chat`,
    //   '', // Optionally add cover image URL
    //   '', // Optionally add custom data
    //   {},
    //   (channel, error) => {
    //     if (error) {
    //       return res.status(500).json({ error: 'Failed to create department chatroom' });
    //     }
    //     res.status(201).json({ message: 'Department chatroom created successfully', channel });
    //   }
    // );

    
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


export const getRelevantChannels = async (req, res) => {
    const userId = req.user.id;
    
    try {
      // Fetch user details and populate department and projectId
      console.log(userId);
      const user = await User.findById(userId).populate('depId').populate('projectId');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      console.log(APPLICATION_ID);
      const params = {
        members_include_in: userId,       // Filter channels by the user being a member
        limit: 20                         // Limit the number of results (optional)
      };
            axios.get(`https://api-${APPLICATION_ID}.sendbird.com/v3/group_channels`, {
        headers: {
          'Api-Token': API_TOKEN
        },
        params: params          
      })
      .then(response => {
        
        // console.log('Group Channels:', response.data);
        return res.json({"Group Channels": response.data})
      })
      .catch(error => {
        
        console.error('Error fetching group channels:', error);
      });
      
      
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
};


export const updateUserPermissions = async (req, res) => {
    const { userId, departmentId, projectIds } = req.body;
    
    try {
      // Fetch user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Update user's department and project associations
      user.depId = departmentId;
      user.projectId = projectIds;
      await user.save();
  
      // Inform user that their permissions have been updated
      res.status(200).json({ message: 'User permissions updated successfully', user });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };

  


export const getAdminChannels = async (req, res) => {
    const userId = req.user._id;
    
    try {
      // Fetch the admin user
      const admin = await User.findById(userId).populate('depId');
      if (!admin || admin.role !== 1) {
        return res.status(403).json({ error: 'Access denied, only admins can access this' });
      }
  
      // Fetch all channels for the admin's department
      sb.connect(admin._id.toString(), (sbUser, error) => {
        if (error) {
          return res.status(500).json({ error: 'Failed to connect to Sendbird' });
        }
  
        const listQuery = sb.GroupChannel.createMyGroupChannelListQuery();
        listQuery.includeEmpty = true;
  
        listQuery.next((channels, error) => {
          if (error) {
            return res.status(500).json({ error: 'Failed to fetch channels' });
          }
  
          // Filter channels by department and associated projects
          const adminChannels = channels.filter(channel => {
            return channel.customType === admin.depId._id.toString();
          });
  
          res.status(200).json({ channels: adminChannels });
        });
      });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  











export const addToDepartmentChat = async (user) => {
    try {
      const department = await Department.findById(user.depId);
      if (!department) throw new Error('Department not found');
  
      // Fetch all users already in the department's chat (admin and others)
      const departmentUsers = await User.find({ depId: department._id });
      const departmentUserIds = departmentUsers.map(depUser => depUser._id.toString());
  
      // Add the new user to the existing department chatroom
      sb.GroupChannel.createChannelWithUserIds(
        [...departmentUserIds, user._id.toString()], 
        true, 
        department._id.toString(), 
        `${department.depName} Department Chat`, 
        '', 
        '', 
        {}, 
        (channel, error) => {
          if (error) throw new Error('Failed to add user to department chat');
        }
      );
    } catch (error) {
      console.error('Error adding user to department chat:', error);
    }
};



  // Function to check if the user is already in the department chat
export const checkAndAddToDepartmentChat = async (user) => {
    try {
      // Connect to Sendbird as the user
      sb.connect(user._id.toString(), (sbUser, error) => {
        if (error) throw new Error('Sendbird connection failed');
  
        // List all the user's group channels
        const listQuery = sb.GroupChannel.createMyGroupChannelListQuery();
        listQuery.includeEmpty = true;
  
        listQuery.next(async (channels, error) => {
          if (error) throw new Error('Failed to fetch user channels');
  
          // Check if the department channel is in the user's channel list
          const isInDepartmentChat = channels.some(
            channel => channel.customType === user.depId.toString()
          );
  
          // If not, add the user to the department chat
          if (!isInDepartmentChat) {
            await addToDepartmentChat(user);
          }
        });
      });
    } catch (error) {
      console.error('Error checking and adding user to department chat:', error);
    }
};