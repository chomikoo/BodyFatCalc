/* jshint browser: true */

//CHECKING MEASURE SYS
function cheackingSys(system) {
    var ratio = 1,
        ratioW = 1;

    if (system[0].checked) {
        ratio = 0.39;
        //        ratioW = 2.2;
        setPLLabels();
        console.log(ratioW + " M " + ratio);
    } else if (system[1].checked) {
        ratio = 1;
        setUSLabels();
        console.log(ratioW + " L " + ratio);
    }
    return ratio;
};
//SET LABELS
function setUSLabels() {
    labelH.innerHTML = "Height [inch] :";
    labelW.innerHTML = "Weight [lbs] :";
    labelN.innerHTML = "Neck [inch] :";
    labelWa.innerHTML = "Waist [inch] :";
    labelHi.innerHTML = "Hip [inch] :";
};

function setPLLabels() {
    labelH.innerHTML = "Wzrost [cm] :";
    labelW.innerHTML = "Waga [kg] :";
    labelN.innerHTML = "Kark [cm] :";
    labelWa.innerHTML = "Talia [cm] :";
    labelHi.innerHTML = "Biodra [cm] :";
};

//BODY FAT CALCULATOR
function bodyFat(system) {
    var sex = document.getElementsByName("sex"),
        height = document.getElementById("height").value,

        neck = document.getElementById("neck").value,
        waist = document.getElementById("waist").value,
        hip = document.getElementById("hip").value,
        ratioW;

    fatInBody;
    weight = document.getElementById("weight").value


    ratio = cheackingSys(system);

    //CHECKING SEX

    if (sex[0].checked) {
        bf = Math.round((86.010 * Math.log10((waist * ratio) - (neck * ratio)) - 70.041 * Math.log10(height * ratio) + 36.76) * 10) / 10; // for man
        console.log(Math.round(bf * 10) / 10 + " % Male");
    } else if (sex[1].checked) {
        bf = Math.round((163.205 * Math.log10((waist * ratio) + (hip * ratio) - (neck * ratio)) - 97.684 * Math.log10(height * ratio) - 78.387) * 10) / 10; // for woman
        console.log(Math.round(bf * 10) / 10 + " % Female");
    }

    //Overall proportion of fat in the body
    if (system[0].checked) {
        ratioW = 1;
    } else {
        ratioW = 2.2;
    }
    console.log(ratioW + ' W ')
    fatInBody = Math.round((weight * ratioW * bf) / 100);




    //    MODAL
    if (bf > 0) {
        modal.style.display = "block";
        document.getElementById("bf").innerHTML = "<p class=\"bf_container\"> Twój BF to " + bf + " %</p><p class=\"bf_desc\">Masa tłuszczu w twoim ciele to ok. " + fatInBody + "[kg] </p>";
    } else {
        document.getElementById("alert").innerHTML = "<p> Czy na pewno poprawnie wypełniłeś wszystkie pola ?</p>";
    }
    return bf;

};


document.addEventListener("DOMContentLoaded", function () {
    var labelH = document.getElementById("labelH"),
        labelW = document.getElementById("labelW"),
        labelN = document.getElementById("labelN"),
        labelWa = document.getElementById("labelWa"),
        labelHi = document.getElementById("labelHi");

    var selectSystem = document.getElementById("select-system"),
        system = document.getElementsByName("system"),
        btn = document.getElementById("btn");

    selectSystem.addEventListener("click", function () {
        cheackingSys(system)
    }, false);

    btn.addEventListener("click", function () {
        bodyFat(system);
    });
 
//d hdf   hdh d    h  dg  h  

    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["M", "T"],
            datasets: [{
                backgroundColor: [
        "#2ecc71",
        "#3498db"
      ],
                data: [fatInBody, weight - fatInBody]
    }]
        }
    });
});
