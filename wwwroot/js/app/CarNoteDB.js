function _f_1insertNote(db, jsonData) {
    // create a new transaction
    const txn = db.transaction('CarNote', 'readwrite');
    // get the Contacts object store
    const store = txn.objectStore('CarNote');
    //
    let query = store.put(jsonData);
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
function _f_2findAll(db, dotNetObjRef) {
    const txn = db.transaction('CarNote', 'readonly');
    const store = txn.objectStore('CarNote');

    // let query = store.getAll();
    let query = store.openCursor();

    query.onsuccess = (event) => {
        // if (!event.target.result) {
        //     console.log(`The contact with ${id} not found`);
        // } else {
        //     console.table(event.target.result);
        //     dotNetObjRef.invokeMethod('_f_readAll', event.target.result.value);
        // }
        const cursor = event.target.result;
        if (cursor) {
            console.table(cursor);
            dotNetObjRef.invokeMethod('_f_readAll', cursor.primaryKey, cursor.value);
            cursor.continue();
        } else {
            console.log('Exhausted all documents');
        }
    };

    query.onerror = (event) => {
        console.log(event.target.errorCode);
    }

    txn.oncomplete = function () {
        db.close();
    };
};
function _f_21findDB_by_id(db, id, dotNetObjRef) {
    const txn = db.transaction('CarNote', 'readonly');
    const store = txn.objectStore('CarNote');

    let query = store.get(parseInt(id));

    query.onsuccess = (event) => {
        if (!event.target.result) {
            console.log(`The contact with ${id} not found`);
        } else {
            console.table(event.target.result);
            dotNetObjRef.invokeMethod('_f_findDB_id', event.target.result);
        }
    };

    query.onerror = (event) => {
        console.log(event.target.errorCode);
    }

    txn.oncomplete = function () {
        db.close();
    };
};
function _f_3updateNote(db, id, jsonData, dotNetObjRef) {
    const txn = db.transaction('CarNote', 'readwrite');
    const store = txn.objectStore('CarNote');

    // const request = store.get(parseInt(id));

    // request.onsuccess = (event)=> {
    //     // const student = request.result;
    //     const student = event.target.result;
    //     // Change the name property
    //     // student.title = "name";

    //     // Create a request to update
    //     // const updateRequest = objectStore.update(student);
    //     const updateRequest = student.update(jsonData);
    //     updateRequest.onsuccess = () => {

    //         console.log(`Estudent updated, email: ${updateRequest.result}`)
    //         dotNetObjRef.invokeMethod('SuccessfulNotify');
    //     }
    // }
    store.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            if (cursor.primaryKey === parseInt(id)) {
                const updateData = jsonData;
                const request = cursor.update(updateData);
                request.onsuccess = () => {
                    console.log('A better album year?');
                    dotNetObjRef.invokeMethod('SuccessfulNotify');
                };
            };
            cursor.continue();
        } else {
            console.log('Entries all displayed.');
        }
    }
}
/////////////////////////////////production function///////////////////////////////////////////////////////////////////////////////////////////////
window.setNote = async (jsonData, dotNetObjRef) => {
    // const arrayBuffer = await imageStream.arrayBuffer();
    // const blob = new Blob([arrayBuffer]);
    // const url = URL.createObjectURL(blob);
    // document.getElementById(imageElementId).src = url;

    //URL.revokeObjectURL(url);
    const request = indexedDB.open('CarNoteDB', 1);

    request.onerror = (event) => {
        console.error(`Database error: ${event.target.errorCode}`);
    };

    request.onsuccess = (event) => {
        // add implementation here
        const db = event.target.result;

        _f_1insertNote(db, {
            title: jsonData.title,
            description: jsonData.description,
            typeID: jsonData.typeID,
            filter: jsonData.filter,
            startDate: jsonData.startDate,
        });
        dotNetObjRef.invokeMethod('SuccessfulNotify');
    };
    // create the Contacts object store and indexes
    request.onupgradeneeded = (event) => {
        let db = event.target.result;

        // create the Contacts object store 
        // with auto-increment id
        db.createObjectStore('CarNote', {
            autoIncrement: true
        });
    };
}

window.FindNoteDB = async (id, dotNetObjRef) => {
    const request = indexedDB.open('CarNoteDB', 1);

    request.onerror = (event) => {
        console.error(`Database error: ${event.target.errorCode}`);
    };

    request.onsuccess = (event) => {
        // add implementation here
        const db = event.target.result;
        _f_21findDB_by_id(db, id, dotNetObjRef);

    };
}

window.ReadAllNoteDB = async (dotNetObjRef) => {
    const request = indexedDB.open('CarNoteDB', 1);

    request.onerror = (event) => {
        console.error(`Database error: ${event.target.errorCode}`);
    };

    request.onsuccess = (event) => {
        // add implementation here
        const db = event.target.result;
        _f_2findAll(db, dotNetObjRef);

    };
}

window.UpdateNoteDB = async (id, jsonData, dotNetObjRef) => {
    const request = indexedDB.open('CarNoteDB', 1);

    request.onerror = (event) => {
        console.error(`Database error: ${event.target.errorCode}`);
    };

    request.onsuccess = (event) => {
        // add implementation here
        const db = event.target.result;
        _f_3updateNote(db, id, jsonData, dotNetObjRef);

    };
}