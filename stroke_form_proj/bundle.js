function collectData(){
    (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

    },{}],2:[function(require,module,exports){
       
                    element_vals = [] 
                    element_ids = ["user-name", "gender", "age", "hypertension", "heart-disease", "marriage-status", "work-type", "residence-type", "average-glucose-level", "bmi", "smoke"]
                    for(i=0;i<element_ids.length; i++){ 
                        input_obj = document.getElementById(element_ids[i]);
                        element_vals.push(input_obj.value)
                    }

                    const spawner = require('child_process').spawn; // init inside clicked function
                    const data_to_py = {
                        evs: element_vals,
                        eids: element_ids
                    }; // site inputs stored here

                    // console.log('Data sent to python script:', data_to_py); // logs data sent to py
                    const python_process = spawner('python', ['./test.py', JSON.stringify(data_to_py)]); //run python file with stringified inputs
                    
                    
                    
                    python_process.stdout.on('data', (data) => { // data is then collected from what python file outputs
                        console.log('Data received from python script:', JSON.parse(data.toString())); // here is the body of what should happen with output from python file
                        var container = document.getElementById('answersContainer');
                        container.innerText = JSON.parse(data.toString()).data_returned;
                    });

                
    /* 
    element_vals = [] 
                    element_ids = ["user-name", "age", "gender", "marriage-status", "work-type", "residence-type", "hypertension", "smoke", "average-glucose-level", "bmi"]
                    for(i=0;i<element_ids.length; i++){ 
                        input_obj = document.getElementById(element_ids[i]);
                        element_vals.push(input_obj.value)
                    }
    function sendToPy(){    
        // string
        // const data_to_py = 'send this to py script'

        //list
        // const data_to_py = ['send this to py script]'

        // object
        const data_to_py = {
            data_sent: 'sennnyy',
            data_returned: ''
        }; // site inputs stored here

        console.log('Data sent to python script:', data_to_py); // logs data sent to py
        const python_process = spawner('python', ['./test.py', JSON.stringify(data_to_py)]); //run python file with stringified inputs
        python_process.stdout.on('data', (data) => { // data is then collected from what python file outputs
            console.log('Data received from python script:', JSON.parse(data.toString())); // here is the body of what should happen with output from python file
        }); 
    }*/

    },{"child_process":1}]},{},[2]);
}