import Swal from "sweetalert2";

const SuccessAlert = (message) => {
    Swal.fire({
        title: `${message}`,
        icon: 'success',
        confirmButtonText: 'Cool'
    })   
}

export default SuccessAlert;