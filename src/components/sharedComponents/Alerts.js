import Swal from "sweetalert2";

export function successAlert() {
    return (
        Swal.fire({
            title: "Success!",
            text: "",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#2F2F2F"
        })
    )
}

export function errorAlert() {
    return (
        Swal.fire({
            title: "Error!",
            text: "Something went wrong.",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#2F2F2F"
        })
    )
}