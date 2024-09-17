import { createUser, getUserByEmail } from "../db/users";
import express from "express";
import { authentication, random } from "../helpers";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) return res.sendStatus(400);
    console.log("here___________?????");

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.json(user).sendStatus(200).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
