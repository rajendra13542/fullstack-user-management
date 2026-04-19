import asyncHandler from "../middleware/asyncHandler.js";
import { createUserService, deleteUserService, getUserService, getUsersService, updateUserService } from "../services/userService.js";
import { sendResponse } from "../utils/response.js";

// CREATE USER
const createUser = asyncHandler(async (req, res) => {
    const user = await createUserService(req.body)
    sendResponse(res, 201, user);
})

// GET USER
const getUser = asyncHandler(async (req, res) => {
    const user = await getUserService(req.params);
    sendResponse(res, 200, user, "User fetched successfully");
})

//GET ALL USER
const getUsers = asyncHandler(async (req, res) => {
    const user = await getUsersService();
    sendResponse(res, 200, user, "User fetched successfully");
})

//DELETE USER
const deleteUser = asyncHandler(async (req, res) => {
    const user = await deleteUserService(req.params)
    sendResponse(res, 200, user, "User deleted successfully");
})

//UPDATE USER
const updateUser = asyncHandler(async (req, res) => {
    const user = await updateUserService(req.params.id, req.body);
    sendResponse(res, 200, user, "User updated successfully");
})

export {
    createUser, getUser, getUsers, deleteUser, updateUser
}
