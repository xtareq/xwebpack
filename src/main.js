import './assets/scss/style.scss';
var app = require('./controllers/app');

console.log(app.name);

function getAuthor()
{
    return "Tareq Hossain"
}

console.log(getAuthor())