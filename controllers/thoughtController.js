const Thought = require('../models/Thought');

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
        .then((thought) => res.json(thought))
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
              res.json(thought)
            }  
          })
          .then(() => res.json({ message: 'Thought was deleted!' }))
          .catch((err) => res.status(500).json(err));
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
          { $pull: { reaction: { reactionId: req.params.reactionId } } },
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