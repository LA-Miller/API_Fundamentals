// Application Programming Interface

// example of asynchronous code
// setTimeout(() => console.log('This is a test of timeouts'), 1000); //! runs function after 1000 ms

let promise = new Promise(function(resolve, reject) {
    setTimeout(() => {
        if(false){
            resolve('success');   
        } else {
            reject('failure');
        }
    }, 3000);
})

promise
    .then(blah => console.log(blah)) //blah = 'success'
    .catch(err => console.log(err)); //err = 'failure'

console.log('This code is after our promise & .then chain'); //logs before the promise bc of the delay 

function playFunc(){
    return 5;
}

console.log(playFunc());