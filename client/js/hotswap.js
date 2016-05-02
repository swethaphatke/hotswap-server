var common = function () {
    var that = this;

    that.loadMessages = function () {
        $.get("../../app-data/messages_en.json", function (data) {
            var messages = JSON.parse(data);
            $(".hotswap").each(function (item) {
                $(this).text(messages[$(this).attr('data-msg-id')]);
            });
        });
    };

    that.closeMessage = function () {
        $('.message .close')
            .on('click', function () {
                $(this)
                    .closest('.message')
                    .transition('fade');
            });
    };
}

var patientList = function () {
    var that = this;

    that.getPatientList = function () {
        $.get("../../app-data/patient-list.json", function (data) {
            var patients = JSON.parse(data).patient;
            var template = '<div class="ui middle aligned selection list">' +
                '<div class="item">' +
                '<img class="ui avatar image" src="http://semantic-ui.com/images/avatar/small/helen.jpg">' +
                '<div class="content">' +
                '<a class="header" href="_href_">_name_</a>' +
                '</div>' +
                '</div>' +
                '</div>';
            var innerHTML = "";
            for (var i = 0; i < patients.length; i++) {
                var temp = template.replace("_name_", patients[i].name);
                temp = temp.replace("_href_", "patient-details.html?id=" + patients[i].id);
                innerHTML += temp;
            }
            $(".patient-list").html(innerHTML);
            that.listAlert();
        });
    };
    
    that.listAlert = function(){
        alert("Welcome to patient's database");
    }

}

var patientDetails = function () {
    var that = this;

    that.loadPatientDetails = function () {
        var patient_id = getUrlParameter('id');
        var patient = null;
        $.get("../../app-data/patient-list.json", function (data) {
            var patients = JSON.parse(data).patient;

            for (var i = 0; i < patients.length; i++) {
                if (patients[i].id == patient_id) {
                    patient = patients[i];
                    break;
                }
            }
            $(".patient-name").html(patient.name);
            $(".patient-phone").html(patient.phone);
        });
    }
}

var login = function () {

}