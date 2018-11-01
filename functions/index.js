const functions = require('firebase-functions');

exports.addContact = functions.firestore
    .document('users/{userId}')
    .onCreate((snap, context) => {
		//do great things here
    });
