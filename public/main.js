function checkUser() {
	let inputUserName = $("#userName").val();
	let inputPassword = $("#password").val();

	$.ajax({
		type: "POST",
		url: "/login",
		data: {
			userName: inputUserName,
			password: inputPassword,
		},
		success: function (response) {
			// console.log(response);
			if (response === "true") {
				// console.log("Welcome");
				$("#modalTitle").html("You logged in successfully.").css({ color: "green" });
				setTimeout(function () {
					$("#loginModal").modal("hide");
				}, 2000);
			} else {
				// console.log("Failed");
				$("#modalTitle").html("Username or password is wrong. Please try again.").css({ color: "red" });
				// setTimeout(function () {
				// 	$("#loginModal").modal("hide");
				// }, 2000);
			}
		},
	});

	// $("#loginModal").modal("hide");
}

$("#submit").on("click", function () {
	checkUser();
});
$(document).on("keypress", function (e) {
	if (e.which === 13) {
		checkUser();
	}
});
