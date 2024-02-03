const validateData = (req, res, next) => {

    let isValid = true;
    let { trimmedName, trimmedEmail, trimmedPassword } = req.body;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let overallPasswordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&/,()+=[{}<>_;:^])[A-Za-z\d@.#$!%*?/,()+=[{}<>_;:&]{8,15}/;



    // if (!trimmedName || !trimmedEmail || !trimmedPassword) {
    //     isValid = false;
    //     return res.status(400).json({ 'error': 'Please fill in all the required input' });
    // }

    if (!trimmedName) {
        isValid = false;
        return res.status(400).json({ 'error': 'Name Cannot be blank' })
    }

    if (!trimmedEmail) {
        isValid = false;
        return res.status(400).json({ 'error': 'Please Enter your email' })
    } else if (!emailRegex.test(trimmedEmail)) {
        isValid = false;
        return res.status(400).json({ 'error': 'Enter a valid email' })
    }

    if (!trimmedPassword) {
        isValid = false;
        return res.status(400).json({ 'error': 'Please Enter your password' })
    } else if (!overallPasswordCheck.test(trimmedPassword)) {
        isValid = false;
        return res.status(400).json({ 'error': 'Password must contain atleast 1 Uppercase, 1 Lowercase, 1 digit, 1 special character, and must contain atleast 8 characters' })
    }

    if (isValid) {
        next()
    }
}

module.exports = {
    validateData
}