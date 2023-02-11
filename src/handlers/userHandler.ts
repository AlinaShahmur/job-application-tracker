import Process from "../db/classes/Process";
import User from "../db/classes/User";
import { ObjectId } from 'mongodb'
import { HttpError } from "../error-handling/HttpError";


export const getUser = async (req, res, next) => {
    try {
        const { email } = req.params;
        let userExist, usersProcesses;
        userExist = await User.getUserByEmail(email);
        if (userExist) {
            usersProcesses = await Process.findByIds(userExist.processes.map(process => new ObjectId(process)));

            userExist.processes = usersProcesses
            return res.send(userExist)
        }
        let newUser = new User();
        newUser.email = email;
        newUser.processes = []
        const createdUser = await newUser.create();

        return res.send({sucess: true, data: {createdUser}});

    } catch (err) {
        return next(new HttpError(err.message, 500, "getUser")); 
    }
}