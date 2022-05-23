import Process from "../db/classes/Process";
import User from "../db/classes/User";
const mongodb = require('mongodb')


export const getUser = async (req, res) => {
    try {
        const { email } = req.params;
        let userExist, usersProcesses;
        userExist = await User.getUserByEmail(email);
        if (userExist) {
            usersProcesses = await Process.findByIds(userExist.processes.map(process => new mongodb.ObjectId(process)));
            console.log({usersProcesses});

            userExist.processes = usersProcesses
            return res.send(userExist)
        }
        let newUser = new User();
        newUser.email = email;
        newUser.processes = []
        const createdUser = await newUser.create();
        return res.send(createdUser)

    } catch (error) {
        console.log(error);
        res.send('Error in get User', error.message)
    }
}