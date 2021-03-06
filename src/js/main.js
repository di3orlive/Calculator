(function($){

    $.fn.buildCalc = function() {
        var di3Cal = this;
        for (var i = 0; i < di3Cal.length; ++i) {
            di3Cal[i].innerHTML ='<header class="calc-header">' +
                '<div class="calc-header-left">' +
                '<div class="item"><button class="btn" data-toggle="modal" data-target="#myModal"><i class="fa fa-bars"></i></button></div>' +
                '<div class="item"><button class="btn toggleBtn" ><i class="fa fa-arrow-circle-o-left"></i></button></div>' +
                '<div class="item"><button class="btn"><i class="fa fa-undo"></i></button> <span>RAD</span></div>' +
                '</div>' +
                '<div class="calc-header-right">' +
                '<div class="result"></div>' +
                '<div class="calcAll"></div>' +
                '</div>' +
                '</header>' +
                '' +
                '<section class="calc-body">' +
                '<article class="calc-body-calcBox">' +
                '<div class="calc-history"></div>' +
                '<div class="edit"><button class="btn">Edit</button></div>' +
                '</article>' +
                '<article class="calc-body-mathFunc"></article>' +
                '' +
                '<article class="calc-body-calcBtn"></article>' +
                '</section>';
        }


        var mathFuncArr = ['(', ')', 'mr', 'mc', 'm+', 'm-', '2nd', 'EE', 'x!', 'e', 'ex', '10x', 'ln',
                'log10', '1/x', 'x2', 'x3', 'xy', 'rootX', '3rootX', 'xRootY', 'sin', 'cos', 'tan', 'sinh',
                'cosh', 'tanh', 'deg', 'pi', 'rand'],
            calcBtnArr = ['c', '%', '/', '*', '7', '8', '9', '-', '4', '5', '6', '+', '1', '2', '3', '=',
                '0', '.', '+/-'];

        var calcBtn = $(".calc-body-calcBtn"),
            mathFunc = $(".calc-body-mathFunc"),
            newDiv, newBtn;

        for(var i in mathFuncArr) {
            function createFuncDiv(){
                newDiv = document.createElement("div");
                newBtn = document.createElement("button");
                newDiv.className = 'item';
                newBtn.className = 'btn btnBg-1';
                newBtn.innerText = mathFuncArr[i];

                newDiv.appendChild(newBtn);

                if(mathFuncArr[i] == '(' || mathFuncArr[i] == ')' || mathFuncArr[i] == 'xy'){
                    newBtn.onclick = function(i) {
                        return function() { set(mathFuncArr[i], this); }
                    }(i);
                }else{
                    newBtn.onclick = function(i) {
                        return function() { operator(mathFuncArr[i], this); }
                    }(i);
                }

            }


            mathFunc.each(function(j){
                if(('.' + mathFunc[j].className) == mathFunc.selector){
                    createFuncDiv();
                    mathFunc[j].appendChild(newDiv);
                }
            });
        }


        for(var i in calcBtnArr) {
            function createCalcDiv(){
                newDiv = document.createElement("div");
                newBtn = document.createElement("button");
                newDiv.className = 'item';
                newBtn.innerText = calcBtnArr[i];
                newDiv.appendChild(newBtn);

                switch(calcBtnArr[i]) {
                    case "c": newBtn.className = 'btn btnBg-2'; break;
                    case "%": newBtn.className = 'btn btnBg-2'; break;
                    case "/": newBtn.className = 'btn btnBg-2'; break;
                    case "*": newBtn.className = 'btn btnBg-2'; break;
                    case "-": newBtn.className = 'btn btnBg-2'; break;
                    case "+": newBtn.className = 'btn btnBg-2'; break;
                    case "=": newBtn.className = 'btn equal'; break;
                    default: newBtn.className = 'btn btnBg-3';
                }

                if(calcBtnArr[i] == 'c' || calcBtnArr[i] == '=' || calcBtnArr[i] == '+/-'){
                    newBtn.onclick = function(i) {
                        return function() { operator(calcBtnArr[i], this); }
                    }(i);
                }else{
                    newBtn.onclick = function(i) {
                        return function() { set(calcBtnArr[i], this); }
                    }(i);
                }
            }



            mathFunc.each(function(j){
                if(('.' + calcBtn[j].className) == calcBtn.selector){
                    createCalcDiv();
                    calcBtn[j].appendChild(newDiv);
                }
            });
        }


//======================================================================================================================


        function set(num, thisEl) {
            var thisCalHeader = $(thisEl).parent().parent().parent().parent()[0].firstChild,
                calcAll = $(thisCalHeader).find('.calcAll');
            $(calcAll)[0].innerText += num;
        }

        function operator(e, thisEl){
            var thisCalHeader = $(thisEl).parent().parent().parent().parent()[0].firstChild;
            var thisCalcBox = $(thisEl).parent().parent().parent().parent()[0].lastChild;

            var result = $(thisCalHeader).find('.result')[0],
                calcAll = $(thisCalHeader).find('.calcAll')[0],
                expression = calcAll.innerText,
                calcHistory = $(thisCalcBox).find('.calc-history')[0];


            switch(e) {
                case "c":
                    calcAll.innerText = '';
                    result.innerText = '';
                    break;
                case "=":
                    try {
                        if (expression.indexOf("xy") > -1) {
                            var arrExp = expression.split("xy");

                            result.innerText = Math.pow(arrExp[0], arrExp[1]);
                            calcAll.innerText = expression + '=' + Math.pow(arrExp[0], arrExp[1]);
                        } else {
                            result.innerText = eval(expression);
                            calcAll.innerText = expression + '=' + eval(expression);
                        }
                    } catch (e) {
                        alert('неа');
                    }
                    break;
                case "mr":
                    calcAll.innerText += calcHistory.lastChild.lastChild.innerText;
                    break;
                case "+/-":
                    calcAll.innerText = expression * -1;
                    break;
                case "mc":
                    while (calcHistory.firstChild) {
                        calcHistory.removeChild(calcHistory.firstChild);
                    }
                    break;
                case "m+":
                    var iteration = document.createElement('div'),
                        iterationTop = document.createElement('div'),
                        iterationBottom = document.createElement('div');

                    iteration.className = 'iteration';
                    iterationTop.className = 'top';
                    iterationBottom.className = 'bottom';

                    iterationTop.innerText = expression;
                    iterationBottom.innerText = eval(expression);

                    iteration.appendChild(iterationTop);
                    iteration.appendChild(iterationBottom);


                    calcHistory.appendChild(iteration);
                    break;
                case "m-":
                    calcHistory.removeChild(calcHistory.lastChild);
                    break;
                case "2nd":
                    //
                    //
                    //
                    //
                    break;
                case "EE":
                    result.innerText = Math.exp(Math.exp(expression));
                    calcAll.innerText = Math.exp(Math.exp(expression));
                    break;
                case "x!":
                function factorial(n) {
                    return n ? n * factorial(n - 1) : 1;
                }
                    result.innerText = factorial(expression);
                    calcAll.innerText = factorial(expression);
                    break;
                case "e":
                    result.innerText = Math.exp(1);
                    calcAll.innerText = Math.exp(1);
                    break;
                case "ex":
                    result.innerText = Math.exp(expression);
                    calcAll.innerText =  Math.exp(expression);
                    break;
                case "10x":
                    result.innerText = Math.pow(10, expression);
                    calcAll.innerText = Math.pow(10, expression);
                    break;
                case "ln":
                    result.innerText = Math.log(expression);
                    calcAll.innerText = Math.log(expression);
                    break;
                case "log10":
                    result.innerText = Math.log(expression) / Math.log(10);
                    calcAll.innerText = Math.log(expression) / Math.log(10);
                    break;
                case "1/x":
                    result.innerText = 1/expression;
                    calcAll.innerText = 1/expression;
                    break;
                case "x2":
                    result.innerText = Math.pow(expression, 2);
                    calcAll.innerText = Math.pow(expression, 2);
                    break;
                case "x3":
                    result.innerText = Math.pow(expression, 3);
                    calcAll.innerText = Math.pow(expression, 3);
                    break;
                case "xy":
                    result.innerText = Math.pow(x, y);
                    calcAll.innerText = Math.pow(x, y);
                    //
                    //
                    //
                    //
                    break;
                case "rootX":
                    calcAll.innerText = Math.sqrt(expression);
                    result.innerText = Math.sqrt(expression);
                    break;
                case "3rootX":
                    calcAll.innerText = Math.cbrt(expression);
                    result.innerText = Math.cbrt(expression);
                    break;
                case "xRootY":
                    //
                    //
                    //
                    //
                function xrooty(x, y) {
                    var xrooty = Math.pow(Math.abs(x), 1/y);
                    return x < 0 ? -xrooty : xrooty;
                }
                    break;
                case "sin":
                    calcAll.innerText = Math.sin(expression);
                    result.innerText = Math.sin(expression);
                    break;
                case "cos":
                    calcAll.innerText = Math.cos(expression);
                    result.innerText = Math.cos(expression);
                    break;
                case "tan":
                    calcAll.innerText = Math.tan(expression);
                    result.innerText = Math.tan(expression);
                    break;
                case "sinh":
                    calcAll.innerText = Math.sinh(expression);
                    result.innerText = Math.sinh(expression);
                    break;
                case "cosh":
                    calcAll.innerText = Math.cosh(expression);
                    result.innerText = Math.cosh(expression);
                    break;
                case "tanh":
                    calcAll.innerText = Math.tanh(expression);
                    result.innerText = Math.tanh(expression);
                    break;
                case "deg":
                    calcAll.innerText = expression * (180/Math.PI);
                    result.innerText = expression * (180/Math.PI);
                    break;
                case "pi":
                    calcAll.innerText = Math.PI;
                    result.innerText = Math.PI;
                    break;
                case "rand":
                    var rand = Math.random();
                    calcAll.innerText = rand;
                    result.innerText = rand;
                    break;
            }
        }
    };




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $('.di3Cal').buildCalc();

    $('.toggleBtn').on('click', function () {
        $(this).parent().parent().parent().parent().find('.calc-body').toggleClass('active');
    });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function log(e){
        console.log(e);
    }

})(jQuery);














