const exprss = require('express');
const strSpltr = require('../utils/firstDataTask');

const router = exprss.Router();

router.get('/api/', async (req, rsp) => {
    rsp.status(200).send('Please pass a version.');
});

router.get('/api/v1/', async (req, rsp) => {
    rsp.status(200).send('Please pass a function to be called.');
});

router.get('/api/v2/', async (req, rsp) => {
    rsp.status(200).send('Please pass a function to be called.');
});

router.post('/api/*/parse', async (req, rsp) => {
    const reqPathArr = req.path.split('/');
    const inpData = req.body.data;
    const respData = {};

    if (inpData === undefined || inpData.length <= 0) {
        rsp.status(400).send('Request to be passed.' + req.body.data);
        return 0;
    }

    if (reqPathArr[2] === 'v1') {
        respData.statusCode = 200;
        respData.data = strSpltr(inpData, 'v1');
    } else if (reqPathArr[2] === 'v2') {
        respData.statusCode = 200;
        respData.data = strSpltr(inpData, 'v2');
    }
    rsp.status(200).json(respData)
});

module.exports = router;
