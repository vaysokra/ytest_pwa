function insertImage(db, contact) {
    // create a new transaction
    const txn = db.transaction('Images', 'readwrite');
    // get the Contacts object store
    const store = txn.objectStore('Images');
    //
    let query = store.put(contact);
    // handle success case
    query.onsuccess = function (event) {
        console.log(event);
    };
    // handle the error case
    query.onerror = function (event) {
        console.log("onerror");
        console.log(event.target.errorCode);
    }
    // close the database once the 
    // transaction completes
    txn.oncomplete = function () {
        db.close();
    };
}
window.setImage = async (imageElementId, imageStream) => {
    const arrayBuffer = await imageStream.arrayBuffer();
    const blob = new Blob([arrayBuffer]);
    const url = URL.createObjectURL(blob);
    document.getElementById(imageElementId).src = url;

    //URL.revokeObjectURL(url);
    const request = indexedDB.open('CRM', 21);

    request.onerror = (event) => {
        console.error(`Database error: ${event.target.errorCode}`);
    };

    request.onsuccess = (event) => {
        // add implementation here
        const db = event.target.result;

        insertImage(db, {
            email: blob,
            firstName: 'John',
            lastName: 'Doe'
        });
    };
    // create the Contacts object store and indexes
    request.onupgradeneeded = (event) => {
        let db = event.target.result;

        // create the Contacts object store 
        // with auto-increment id
        let store = db.createObjectStore('Images', {
            autoIncrement: true
        });

        // create an index on the email property
        let index = store.createIndex('email', 'email', {
            unique: true
        });
    };
}
window.displayImage = async (imageElementId, imageStream) => {
    const arrayBuffer = await imageStream.arrayBuffer();
    const blob = new Blob([arrayBuffer]);
    const url = URL.createObjectURL(blob);
    document.getElementById(imageElementId).src = url;
};
//////////////////////////////////////////////////////////////////////////
function getImageById(db,imgID, id) {
    const txn = db.transaction('Images', 'readonly');
    const store = txn.objectStore('Images');

    let query = store.get(id);

    query.onsuccess = (event) => {
        if (!event.target.result) {
            console.log(`The contact with ${id} not found`);
        } else {
            console.table(event.target.result.firstName);
            const url = URL.createObjectURL(event.target.result.email);
            document.getElementById(imgID).src = url;
        }
    };

    query.onerror = (event) => {
        console.log(event.target.errorCode);
    }

    txn.oncomplete = function () {
        db.close();
    };
};
window.findImage = async (imgID) => {
    const request = indexedDB.open('CRM', 21);

    request.onerror = (event) => {
        console.error(`Database error: ${event.target.errorCode}`);
    };

    request.onsuccess = (event) => {
        // add implementation here
        const db = event.target.result;
        getImageById(db,imgID, 9);
    };
}