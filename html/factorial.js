var factorial = (function() {
    var save = {};
    function fact (number) {
        if(number > 1) {
            var saved = save[number - 1] || fact(number - 1);
            var result = number * saved;
            save[number] = result;
            console.log(this);
            console.log(saved, result);
            return result;
        } else {
            return 1;
        }
    };

    return fact;
})();

factorial(7);
factorial(7);