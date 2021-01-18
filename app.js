const exprss = require('express');
const bodyParser = require('body-parser');
const routSpltr = require('./routes/sample');

const app = exprss();
const port = process.env.PORT || 2343;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(exprss.json());

app.use('/', routSpltr);

app.listen(port, () => {
    console.log(`Access the server at ${port}`);
})