// To declare
//db and schema
const User = require("../db/model/user");
const database = require("../db/connexion");
const { successRes, errorRes } = require("../common/response");
const bcrypt = require("bcrypt");

async function register(req, res) {
  const user = new User(req.body);

  try {
    await user.save();
    //envoyer l'emaild e confirmation de création de compte
    const token = await user.generateAuthToken();
    const { password, ...useWithoutPassword } = user._doc;
    successRes(res, { ...useWithoutPassword, accessToken: token }, 201);
  } catch (e) {
    errorRes(res, e, 400);
  }
}

async function logIn(req, res) {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    const { password, ...useWithoutPassword } = user._doc;
    successRes(res, { ...useWithoutPassword, accessToken: token }, 201);
  } catch (e) {
    errorRes(res, e, 400);
  }
}

async function logOut(req, res) {
  try {
    req.user.tokens = [];
    await req.user.save();

    successRes(res, {}, 200);
  } catch (e) {
    errorRes(res, e, 500);
  }
}

async function myInfo(req, res) {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    console.log(user);
    if (!user) {
      return res.status(404).send("This is a wrong id");
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(404).send("This is a wrong id");
  }
}

async function updateInfo(req, res) {
  const allowedUpdates = ["name", "email", "password"];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    res.status(400).send({ error: "Invalid Upadates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
}

async function deleteUser(req, res) {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
}

// Function
/* async function registerUser(req, res) {
    if (!req.body.mail || !req.body.firstname || !req.body.lastname || !req.body.address || !req.body.city || !req.body.zip || !req.body.mobile || !req.body.password) {
        return res.status(400).json({
            status: "Veuillez remplir completement le formulaire d'inscription",
        });
    }
 
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(req.body.password, salt);
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    //const ip = req.headers["x-forwarded-for"].split(',')[0] || req.connection.remoteAddress;
 
    if (await isUserExist.byMail(req.body.mail)) {
        return res.status(400).json({
            status: "Votre adresse mail est déjà utiliser",
        });
    }
 
    newUser = new UserShema(new User(req.body.mail, req.body.firstname, req.body.lastname, req.body.address, req.body.city, req.body.zip, password, req.body.mobile, ip));
 
    newUser.save((err, data) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        } else {
            return updateUser(data._id, randKey.generate(250), res);
        }
    });
} */

module.exports = {
  register,
  logIn,
  logOut,
  myInfo,
  updateInfo,
};
