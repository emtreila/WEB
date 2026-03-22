$(document).ready(function () {
    $("#generate_chart_button").click(function () {
        const numbers_str = $("#input_numbers").val();
        const numbers = numbers_str.split(", ").map(x => Number(x));
        $("#chart").empty();

        for (let i = 0; i < numbers.length; i++) {
            const bar = $("<div>").addClass("bar");
            $("#chart").append(bar);
            setTimeout(() => {
                bar.css("height", `${numbers[i]}px`);
            }, 500);
        }

    });
});