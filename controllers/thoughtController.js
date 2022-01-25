const {Thought, User} = require('../models/');

module.exports = {
    getThoughts(req, res) {
      Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => {  console.log(err); res.status(500).json(err)});
    },
    getSingleThought(req, res) {
      Thought.findOne({ _id: req.params.thoughtId })
        .then((thought) => {
          if(!thought){
            res.status(404).json({ message: 'No thought with that ID' })
          } else {
            res.json(thought)
          }  
        })
        .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
     Thought.create(req.body)
        .then((thought) =>{
          return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
          )
        })
        .then((user) => {
          if(!user){
            res.status(404).json({ message: 'No user with that ID' })
          } else {
            res.json(user)
          }  
        })
        .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) {
       Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
        .then((thought) => {
            if(!thought){
              res.status(404).json({ message: 'No thought with that ID' })
            } else {
              res.json(thought)
            }  
          })
          .catch((err) => res.status(500).json(err));
      },
      deleteThought(req, res) {
       Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) => {
            if(!thought){
              res.status(404).json({ message: 'No thought with that ID' })
            } else {
              res.json({ message: 'Thought was deleted!' })
            }  
          })
          .catch((err) => res.json(err));
      },
      createReaction(req, res) {
       Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        )
        .then((thought) => {
            if(!thought){
              res.status(404).json({ message: 'No thought with that ID' })
            } else {
              res.json(thought)
            }  
          })
          .catch((err) => res.status(500).json(err));
      },
      deleteReaction(req, res) {
       Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        )
        .then((thought) => {
            if(!thought){
              res.status(404).json({ message: 'No thought with that ID' })
            } else {
              res.json(thought)
            }  
          })
          .catch((err) => res.status(500).json(err));
      }
  };