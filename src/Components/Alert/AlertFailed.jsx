import Swal from "sweetalert2";

const FailedAlert = (message) => {
    Swal.fire({
    icon: "error",
    title: "Oops...",
    text: `${message}`
    });
}

export default FailedAlert;