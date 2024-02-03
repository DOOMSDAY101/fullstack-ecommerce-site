let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let admin = require('../config/firebase-config');

const { getDatabase } = require('firebase-admin/database');
const db = getDatabase();

let app = express()
let port = process.env.PORT || 8080;

let { validateData } = require('./middlewares/dataCheck');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())


app.post('/signup', validateData, async (req, res) => {
    let { trimmedName, trimmedEmail, trimmedPassword } = req.body;

    let firstname = trimmedName.split(' ')[0];

    admin.auth().createUser({
        email: trimmedEmail,
        password: trimmedPassword,
        displayName: trimmedName,
        fullname: trimmedName,
        emailVerified: false,
        disabled: false
    }).then((data) => {
        res.status(200).json({ 'message': 'User created successfully', 'email': data.email, 'password': trimmedPassword })
        createDb(data, firstname, trimmedPassword);
    }).catch((e) => {
        console.log(e.message)
        if (e.code === "auth/email-already-exists") {
            return res.status(409).json({ 'error': 'Email is alerady in use' })
        } else {
            return res.status(503).json({ 'error': 'An error Occured during signup' })
        }
    })
})


function createDb(datas, firstname, trimmedPassword) {
    let date = new Date().toString();
    const refn = db.ref(datas.uid);
    let userMail = datas.email.toString();
    let username = datas.displayName;
    const userRef = refn.child("User")

    userRef.set({
        firstname: firstname,
        account_created: date,
        mail: userMail,
        full_name: username,

    }).then(() => {
        console.log('User account and db created succesfully');
    }).catch((err) => {
        console.log('error occured while creating db', err)
    })

}


// A function to delete a user
function deleteUser(uid) {
    admin.auth().deleteUser(uid).then(() => {
        let refn = db.ref(uid);

        refn.remove().then(() => {
            console.log('Account and db deleted succesfully')
        }).catch((e) => {
            console.log(e);
        })
    }).catch((e) => {
        console.log(e)
    })

}


let products = {}

async function productsDb() {
    console.log('reading db')
    let db = admin.database();
    let ref = db.ref('1Products');

    let dbData = await ref.once('value', (snapshot) => {
        if (!snapshot.val()) {
            console.log('Error reading database')
        } else {
            console.log("database exists")
        }
        products = snapshot.val()
    })

}

productsDb();
app.get('/products', (req, res) => {
    res.json(products.products)
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})