let triggers = require('./data')

var message = 'post'
var result = triggers.find(trigger => trigger.words.some(w => message.indexOf(w) !== -1))

console.log('test: ', result);

