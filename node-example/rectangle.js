(function(){var rectangleModule = require('./rectangle-module')
function solveRectangle(lenght, breadth) {
        console.log(`lenght is  ${lenght} and breadth is ${breadth}`)
        rectangleModule(lenght,breadth ,(err,rectangle) => {
            if(err){
                console.log(err.message)
            }
            else{
                console.log(`Area of rectangle is ${rectangle.area(lenght , breadth)}`);
                console.log(`Parameter of rectangle is ${rectangle.parameter(lenght , breadth)}`)
            }
        })
        console.log('Line after calculating Rectangle operations')
    }
solveRectangle(2,5);
solveRectangle(10,5);
solveRectangle(0,5);
}());

// here i created a IIFE which will work a module and then i am calling this module in index.js file
