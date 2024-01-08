import { findUserById, findUsers } from "../services/user.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const allUsers = asyncHandler(async (req, res) => {
    const users = await findUsers();
    res.status(200).json({ users });
});

export const userById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await findUserById(id);
    res.status(200).json({ user });
});
