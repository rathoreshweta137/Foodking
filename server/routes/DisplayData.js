const express = require('express')
const router = express.Router()

router.post('/foodData', function (req , res) {
    try {
        res.send([global.fooditem_2 , global.food_item])
    } catch (error) {
        console.error(error.message);
        res.send("Server error")
    }
})


module.exports = router;
