const spawner = require('child_process').spawn;
// string
const data_to_pass_in = ''; // form inputs will replace ''
const python_process = spawner('python', ['./python.py', JSON.stringify(data_to_pass_in)]) // name of python file in place of './python.py' 
python_process.stdout.on('data', (data) => {});