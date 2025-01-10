const router = require('express').Router();
const verifyToken = require('../middleware/auth');
const { generateInvitation } = require('../controllers/invitationController');

router.post('/generate', verifyToken, generateInvitation);

module.exports = router;