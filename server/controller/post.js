const {Post} = require('../models')
const uploadFile = require("../middleware/upload");

class Controller {
    static read(req,res,next) {
        Post.findAll({
            order : [['id', 'ASC']]
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err);
            next(err)
        })
    }

    static readId(req,res,next) {
        Post.findOne({
            where : {
                id : req.params.id
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
            console.log(err);
        })
    }

    static async add(req, res, next) {
        try {
            await uploadFile(req, res);
            if (req.file == undefined) {
                return res.status(400).send({ message: "Please upload a file!" });
            }

            req.body.media = 'http://localhost:3000/upload/' + req.file.originalname
            Post.create(req.body)
            res.status(200).send({
                message: "Add Post Success!",
            });
        } catch (err) {
            next(err)
            console.log(err, "<<<<<<<<ERRORRR")
        }
    }

    static edit (req,res,next) {
        Post.update(req.body, {
            where : {
                id : req.params.id
            },
            returning : true
        })
        .then(data => {
            res.status(200).json(data[1][0])
        })
        .catch(err => {
            next(err)
        })
    }

    static delete (req,res,next) {
        Post.destroy({
            where : {
                id : req.params.id
            }
        })
        .then(data => {
            res.status(200).json(`Post success to delete`)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = Controller