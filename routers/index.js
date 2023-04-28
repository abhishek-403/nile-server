const router = require('express').Router();
const authRouter = require('./authRouter')
const productRouter = require('./productRouter')

router.use("/auth",authRouter);
router.use("/products",productRouter);

module.exports= router;

