const router = require('express').Router();
const {
    getThoughts, 
    getSingleThought, 
    createThought, 
    updateThought, 
    deleteThought,
    createReaction, 
    deleteReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtid/reactions').post(createReaction);

router.route('/:thoughtid/reactions/:reactionId').delete(deleteReaction);

module.exports = router;