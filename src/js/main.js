(function($){

    var calcObj = {
        mathFunc: [
            {
                operand: "(", set: 'operand', btnClassName: "btn btnBg-1"
            },
            {
                operand: ")", set: 'operand', btnClassName: "btn btnBg-1"
            },
            {
                operand: "xy", set: 'operand', btnClassName: "btn btnBg-1"
            },
            {
                operand: "mr", set: 'operator', btnClassName: "btn btnBg-1"
            },
            {
                operand: "mc", set: 'operator', btnClassName: "btn btnBg-1"
            },
            {
                operand: "m+", set: 'operator', btnClassName: "btn btnBg-1"
            },
            {
                operand: "m-", set: 'operator', btnClassName: "btn btnBg-1"
            },
            {
                operand: "2nd", set: 'operator', btnClassName: "btn btnBg-1"
            },
            {
                operand: "EE", set: 'operator', btnClassName: "btn btnBg-1"
            },
            {
                operand: "x!", set: 'operator', btnClassName: "btn btnBg-1"
            },
            {
                operand: "e", set: 'operator', btnClassName: "btn btnBg-1"
            },
            {
                operand: "ex", set: 'operator', btnClassName: "btn btnBg-1"
            },
            {
                operand: "10x", set: 'operator', btnClassName: "btn btnBg-1"
            },
            {
                operand: "ln", set: 'operator', btnClassName: "btn btnBg-1"
            },
            {
                operand: "log10", set: 'operator', btnClassName: "btn btnBg-1"
            },
            {
                operand: "1/x", set: 'operator', btnClassName: "btn btnBg-1"
            },
            {
                operand: "x2", set: 'operator', btnClassName: "btn btnBg-1"
            },
            {
                operand: "x3", set: 'operator', btnClassName: "btn btnBg-1"
            },
            {
                operand: "rootX", set: 'operator', btnClassName: "btn btnBg-1"
            },
            {
                operand: "3rootX", set: 'operator', btnClassName: "btn btnBg-1"
            },
            {
                operand: "xRootY", set: 'operator', btnClassName: "btn btnBg-1"
            },
            {
                operand: "sin", set: 'operator', btnClassName: "btn btnBg-1"
            },
            {
                operand: "cos", set: 'operator', btnClassName: "btn btnBg-1"
            },
            {
                operand: "tan", set: 'operator', btnClassName: "btn btnBg-1"
            },
            {
                operand: "sinh", set: 'operator', btnClassName: "btn btnBg-1"
            },
            {
                operand: "cosh", set: 'operator', btnClassName: "btn btnBg-1"
            },
            {
                operand: "tanh", set: 'operator', btnClassName: "btn btnBg-1"
            },
            {
                operand: "deg", set: 'operator', btnClassName: "btn btnBg-1"
            },
            {
                operand: "pi", set: 'operator', btnClassName: "btn btnBg-1"
            },
            {
                operand: "rand", set: 'operator', btnClassName: "btn btnBg-1"
            }
        ],

        calcBtnArr: [
            {
                operand: "c", set: 'operator', btnClassName: "btn btnBg-2"
            },
            {
                operand: "%", set: 'operand', btnClassName: "btn btnBg-2"
            },
            {
                operand: "/", set: 'operand', btnClassName: "btn btnBg-2"
            },
            {
                operand: "*", set: 'operand', btnClassName: "btn btnBg-2"
            },
            {
                operand: "7", set: 'operand', btnClassName: "btn btnBg-3"
            },
            {
                operand: "8", set: 'operand', btnClassName: "btn btnBg-3"
            },
            {
                operand: "9", set: 'operand', btnClassName: "btn btnBg-3"
            },
            {
                operand: "-", set: 'operand', btnClassName: "btn btnBg-2"
            },
            {
                operand: "4", set: 'operand', btnClassName: "btn btnBg-3"
            },
            {
                operand: "5", set: 'operand', btnClassName: "btn btnBg-3"
            },
            {
                operand: "6", set: 'operand', btnClassName: "btn btnBg-3"
            },
            {
                operand: "+", set: 'operand', btnClassName: "btn btnBg-2"
            },
            {
                operand: "1", set: 'operand', btnClassName: "btn btnBg-3"
            },
            {
                operand: "2", set: 'operand', btnClassName: "btn btnBg-3"
            },
            {
                operand: "3", set: 'operand', btnClassName: "btn btnBg-3"
            },
            {
                operand: "=", set: 'operator', btnClassName: "btn equal"
            },
            {
                operand: "0", set: 'operand', btnClassName: "btn btnBg-3"
            },
            {
                operand: ".", set: 'operand', btnClassName: "btn btnBg-3"
            },
            {
                operand: "+/-", set: 'operator', btnClassName: "btn btnBg-3"
            }
        ]
    };

    var source   = $("#di3Calc").html();
    var template = Handlebars.compile(source);
    var html    = template(calcObj);
    $("body").append(html);

//======================================================================================================================

    $('.calc-body').on('click', '[data-set]', function(){
        var di3Calc = $(this).parent().parent().parent().parent(),
            calcAll = $(di3Calc).find('.calcAll'),
            calcText = $(calcAll).text(),
            btnText = $(this).text(),
            thisCalHeader = $(di3Calc).find('.calc-header'),
            result = $(thisCalHeader).find('.result'),
            thisCalcBox = $(di3Calc).find('.calc-body-calcBox'),
            calcHistory = $(thisCalcBox).find('.calc-history');


        if($(this).attr('data-set') == 'operand'){
            $(calcAll).text(calcText + btnText);
        }else{
            switch($(this).text()) {
                case "c":
                    calcAll.text('');
                    result.text('');
                    break;
                case "=":
                    if (calcText.indexOf("xy") > -1) {
                        var arrExp = calcText.split("xy");

                        result.text(Math.pow(arrExp[0], arrExp[1]));
                        calcAll.text(calcText + '=' + Math.pow(arrExp[0], arrExp[1])) ;
                    } else {
                        log(result);
                        result.text(eval(calcText));
                        calcAll.text(calcText + '=' + eval(calcText));
                    }
                    break;
                case "mr":
                    calcAll.text(calcText + calcHistory.find('.iteration').last().text());
                    break;
                case "+/-":
                    calcAll.text(calcText * -1);
                    break;
                case "mc":
                    calcHistory.find('.iteration').remove();
                    break;
                case "m+":
                    var iteration = document.createElement('div'),
                        iterationTop = document.createElement('div'),
                        iterationBottom = document.createElement('div');

                    iteration.className = 'iteration';
                    iterationTop.className = 'top';
                    iterationBottom.className = 'bottom';

                    iterationTop.innerText = calcText;
                    iterationBottom.innerText = eval(calcText);
                    iteration.appendChild(iterationTop);
                    iteration.appendChild(iterationBottom);

                    calcHistory.append(iteration);
                    break;
                case "m-":
                    calcHistory.find('.iteration').last().remove();
                    break;
                case "2nd":
                    //
                    //
                    //
                    //
                    break;
                case "EE":
                    result.text(Math.exp(Math.exp(calcText)));
                    calcAll.text(Math.exp(Math.exp(calcText)));
                    break;
                case "x!":
                function factorial(n) {
                    return n ? n * factorial(n - 1) : 1;
                }
                    result.text(factorial(calcText));
                    calcAll.text(factorial(calcText));
                    break;
                case "e":
                    result.text(Math.exp(1));
                    calcAll.text(Math.exp(1));
                    break;
                case "ex":
                    result.text(Math.exp(calcText));
                    calcAll.text(Math.exp(calcText));
                    break;
                case "10x":
                    result.text(Math.pow(10, calcText));
                    calcAll.text(Math.pow(10, calcText));
                    break;
                case "ln":
                    result.text(Math.log(calcText));
                    calcAll.text(Math.log(calcText));
                    break;
                case "log10":
                    result.text(Math.log(calcText) / Math.log(10));
                    calcAll.text(Math.log(calcText) / Math.log(10));
                    break;
                case "1/x":
                    result.text(1/calcText);
                    calcAll.text(1/calcText);
                    break;
                case "x2":
                    result.text(Math.pow(calcText, 2));
                    calcAll.text(Math.pow(calcText, 2));
                    break;
                case "x3":
                    result.text(Math.pow(calcText, 3));
                    calcAll.text(Math.pow(calcText, 3));
                    break;
                case "xy":
                    result.text(Math.pow(x, y));
                    calcAll.text(Math.pow(x, y));
                    //
                    //
                    //
                    //
                    break;
                case "rootX":
                    calcAll.text(Math.sqrt(calcText));
                    result.text(Math.sqrt(calcText));
                    break;
                case "3rootX":
                    calcAll.text(Math.cbrt(calcText));
                    result.text(Math.cbrt(calcText));
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
                    calcAll.text(Math.sin(calcText));
                    result.text(Math.sin(calcText));
                    break;
                case "cos":
                    calcAll.text(Math.cos(calcText));
                    result.text(Math.cos(calcText));
                    break;
                case "tan":
                    calcAll.text(Math.tan(calcText));
                    result.text(Math.tan(calcText));
                    break;
                case "sinh":
                    calcAll.text(Math.sinh(calcText));
                    result.text(Math.sinh(calcText));
                    break;
                case "cosh":
                    calcAll.text(Math.cosh(calcText));
                    result.text(Math.cosh(calcText));
                    break;
                case "tanh":
                    calcAll.text(Math.tanh(calcText));
                    result.text(Math.tanh(calcText));
                    break;
                case "deg":
                    calcAll.text(calcText * (180/Math.PI));
                    result.text(calcText * (180/Math.PI));
                    break;
                case "pi":
                    calcAll.text(Math.PI);
                    result.text(Math.PI);
                    break;
                case "rand":
                    var rand = Math.random();
                    calcAll.text(rand);
                    result.text(rand);
                    break;
            }
        }
    });



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $('.toggleBtn').on('click', function () {
        $(this).parent().parent().parent().parent().find('.calc-body').toggleClass('active');
    });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function log(e){
        console.log(e);
    }

})(jQuery);














