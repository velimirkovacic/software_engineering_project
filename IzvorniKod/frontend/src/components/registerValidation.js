const registerValidation = (values) => {

    let errors = {};

    if (!values.nickname) {
        errors.nickname = "Unesite nadimak!"
    }

    if (!values.name) {
        errors.name = "Unesite ime!"
    }

    if (!values.email) {
        errors.nickname = "Unesite email adresu!"
    }

    if (!values.password) {
        errors.password = "Unesite lozinku!"
    }

    if (!values.rePassword) {
        errors.rePassword = "Unesite ponovno lozinku!"
    }

    return errors;
};

export default registerValidation;