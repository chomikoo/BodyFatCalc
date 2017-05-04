/* jshint browser: true */
/*jslint latedef:false*/
/*global labelH, labelW, labelN, labelWa, labelHi, ratio, bf, waist, height, hip, modal, weight, neck,Chart*/
//SET LABELS

function setUSLabels() {
    labelH.innerHTML = "Height [inch] :";
    labelW.innerHTML = "Weight [lbs] :";
    labelN.innerHTML = "Neck [inch] :";
    labelWa.innerHTML = "Waist [inch] :";
    labelHi.innerHTML = "Hip [inch] :";
}

function setPLLabels() {
    labelH.innerHTML = "Wzrost [cm] :";
    labelW.innerHTML = "Waga [kg] :";
    labelN.innerHTML = "Kark [cm] :";
    labelWa.innerHTML = "Talia [cm] :";
    labelHi.innerHTML = "Biodra [cm] :";
}
//CHECKING MEASURE SYS
function cheackingSys(system) {
    var ratio = 1,
        ratioW = 1;

    if (system[0].checked) {
        ratio = 0.39;
        setPLLabels();
//        console.log(ratioW + " M " + ratio);
    } else if (system[1].checked) {
        ratio = 1;
        ratioW = 2.2;
        setUSLabels();
//        console.log(ratioW + " us " + ratio);
    }
    var ratioArr = [ratio, ratioW];

    return ratioArr;
}



function fatInBody(weight, bf, ratio) {
//    console.log(ratio[1] + " wyw");
    return Math.round((weight.value / ratio[1] * bf) / 100);
    
}
//BODY FAT CALCULATOR
function bodyFat(system, sex) {

    ratio = cheackingSys(system);

    //CHECKING SEX

    if (sex[0].checked) {
        bf = Math.round((86.010 * Math.log10((waist.value * ratio[0]) - (neck.value * ratio[0])) - 70.041 * Math.log10(height.value * ratio[0]) + 36.76) * 10) / 10; // for man
//        console.log(Math.round(bf * 10) / 10 + " % Male");
    } else if (sex[1].checked) {
        bf = Math.round((163.205 * Math.log10((waist.value * ratio[0]) + (hip.value * ratio[0]) - (neck.value * ratio[0])) - 97.684 * Math.log10(height.value * ratio[0]) - 78.387) * 10) / 10; // for woman
//        console.log(Math.round(bf * 10) / 10 + " % Female");
    }

    //    MODAL
    if (bf > 0) {
        modal.style.display = "block";
        document.getElementById("bf").innerHTML = "<p class=\"bf_container\"> Twój BF to " + bf + " %</p><p class=\"bf_desc\">Masa tłuszczu w twoim ciele to ok. " + fatInBody(weight, bf, ratio) + "[kg] </p>";
    } else {
        document.getElementById("alert").innerHTML = "<p> Czy na pewno poprawnie wypełniłeś wszystkie pola ?</p>";
    }
    //CHART 
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["Tłuszcz", "Reszta"],
            datasets: [{
                backgroundColor: [
            "#89253E",
            "#d1d1d1"
          ],
                data: [fatInBody(weight, bf, ratio), (weight.value - fatInBody(weight, bf, ratio))]
        }]
        }
    });
    return bf;

}


document.addEventListener("DOMContentLoaded", function () {
    var labelH = document.getElementById("labelH"),
        labelW = document.getElementById("labelW"),
        labelN = document.getElementById("labelN"),
        labelWa = document.getElementById("labelWa"),
        labelHi = document.getElementById("labelHi");

    var sex = document.getElementsByName("sex"),
        height = document.getElementById("height"),
        weight = document.getElementById("weight"),
        neck = document.getElementById("neck"),
        waist = document.getElementById("waist"),
        hip = document.getElementById("hip");

    var selectSystem = document.getElementById("select-system"),
        system = document.getElementsByName("system"),
        btn = document.getElementById("btn");




    selectSystem.addEventListener("click", function () {
        cheackingSys(system);
    }, false);

    btn.addEventListener("click", function () {
        bodyFat(system, sex);
    });


});
