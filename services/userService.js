import User from "../models/userModal.js"
import AppError from "../utils/AppError.js";

export const createUserService = async (data) => {
  const existing = await User.findOne({ email: data.email })
  if (existing) {
    throw new AppError("User already exists", 400);
  }
  return await User.create(data);
}

export const getUserService = async (data) => {
  const user = await User.findById(data.id);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return user;
}

export const getUsersService = async () => {
  const user = await User.find();
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return user;
}

export const deleteUserService = async (data) => {
  const user = await User.findByIdAndDelete(data.id);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return user;

}

export const updateUserService = async (id, data) => {
  const user = await User.findByIdAndUpdate(id, { email: data.email }, { new: true, runValidators: true })
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return user;
}