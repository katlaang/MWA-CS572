

module.exports.numberAddittion= function(req, res){
    let number1=0;
    let number2=0;
    //let sum=0;

    if(req.query && req.query.number2){
        console.log(req.query.number2);
        number2=parseInt(req.query.number2);
    }

    if (req.params && req.params.number1) {
        console.log(req.params.number1);
        number1 = parseInt(req.params.number1);
    }

    const sum = (number1+number2);
    res.json({ status: 200, result: sum });
}