// exports.parameter = (x, y) => 2 * (x + y);
// exports.area = (x, y) => x * y;
 
// Another way to export whole module is 

module.exports = (x,y,callbackFuction) =>{
    // here we are exporting a function which have 3 variables 
    // x, y are going to be lenght and breadth of our rectange
    // callbackFunction, 3rd parameter , which we will return from this function as property of 
    // setTimeout function is return, ececute function when mention second delay is over .
    if(x<= 0 || y<=0){
        callbackFuction( new Error(
            'Value of lenght or breadth is negative or zero,which is not allowed'),null)
    }else{
        setTimeout(()=>{
            callbackFuction(null ,
                {
                 area: ()=> x*y,
                 parameter: ()=> 2*(x+y)
                }
                )}, 2000)
        }
}