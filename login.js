// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAzmkcuT6W7Pb-nlld6FLOt7Vu3SV78RQ4",
    authDomain: "ccapdev-mp.firebaseapp.com",
    databaseURL: "https://ccapdev-mp.firebaseio.com",
    projectId: "ccapdev-mp",
    storageBucket: "ccapdev-mp.appspot.com",
    messagingSenderId: "14023497540",
    appId: "1:14023497540:web:dcf3c805eef8d50c9fa911"
};

// Initialize Firebase
var defaultProject = firebase.initializeApp(firebaseConfig);

var db = firebase.firestore()

const loggedIn = document.querySelectorAll('#logout');
const loggedOut = document.querySelectorAll('#logged');

const setupUI = (user) => {
    if (user) {
        loggedIn.forEach(item => item.style.display = 'block');
        loggedOut.forEach(item => item.style.display = 'none');
    } else {
        loggedIn.forEach(item => item.style.display = 'none');
        loggedOut.forEach(item => item.style.display = 'block');
    }
}

// listen for auth status
firebase.auth().onAuthStateChanged(user => {
    if (user){
        const schoollist = document.querySelector('#educ');
        const orglist = document.querySelector('#orgs');
        const introlist = document.querySelector('#infoid');
        const worklist = document.querySelector('#trabaho');
        const hobbylist = document.querySelector('#myhobbies');
        const linklist = document.querySelector('#sociallink');
        const form = document.querySelector('#addeducation');
        const formorg = document.querySelector('#addorganization');
        const formwork = document.querySelector('#addworks');
        const formhobby = document.querySelector('#addhobbies');
        const formintro = document.querySelector('#editintro');
        const formg = document.querySelector('#editgithub');
        const formli = document.querySelector('#editlinkedin');
        const formt = document.querySelector('#edittwitter');

        $('#edipage').show();
        $('#alerter').hide();

        // create element and render school
        function renderSchool(doc){
            let dib = document.createElement('div');
            let school = document.createElement('div');
            let degree = document.createElement('div'); 
            let year_start = document.createElement('span');
            let year_end = document.createElement('span');
            let cross = document.createElement('div');

            dib.setAttribute('data-id', doc.id);
            cross.setAttribute('id',"xbutton");
            school.textContent = doc.data().school;
            degree.textContent = doc.data().degree;
            year_start.textContent = doc.data().year_start + " - ";
            year_end.textContent = doc.data().year_end;
            cross.textContent = 'X';


            dib.appendChild(school);
            dib.appendChild(degree);
            dib.appendChild(year_start);
            dib.appendChild(year_end);
            dib.appendChild(cross);        

            schoollist.appendChild(dib);

            // delete data
            cross.addEventListener('click', (e) => {
                e.stopPropagation();
                let id = e.target.parentElement.getAttribute('data-id');
                db.collection('education').doc(id).delete();
            })
        }

        // create element and render orgs
        function renderOrganization(doc){
            let dib = document.createElement('div');
            let name = document.createElement('div');
            let position = document.createElement('div'); 
            let year_start = document.createElement('span');
            let year_end = document.createElement('span');
            let cross = document.createElement('div');

            dib.setAttribute('data-id', doc.id);
            cross.setAttribute('id',"xbutton");
            name.textContent = doc.data().name;
            position.textContent = doc.data().position;
            year_start.textContent = doc.data().year_start + " - ";
            year_end.textContent = doc.data().year_end;
            cross.textContent = 'X';

            dib.appendChild(name);
            dib.appendChild(position);
            dib.appendChild(year_start);
            dib.appendChild(year_end);
            dib.appendChild(cross);

            orglist.appendChild(dib);

            // delete data
            cross.addEventListener('click', (e) => {
                e.stopPropagation();
                let id = e.target.parentElement.getAttribute('data-id');
                db.collection('organizations').doc(id).delete();
            })
        }

        function renderWorks(doc){
            let dib = document.createElement('div');
            let name = document.createElement('div');
            let year = document.createElement('div');
            let cross = document.createElement('div');

            dib.setAttribute('data-id', doc.id);
            cross.setAttribute('id',"xbutton");
            name.textContent = doc.data().name;
            year.textContent = doc.data().year;
            cross.textContent = 'X';

            dib.appendChild(name);
            dib.appendChild(year);
            dib.appendChild(cross);

            worklist.appendChild(dib);

            // delete data
            cross.addEventListener('click', (e) => {
                e.stopPropagation();
                let id = e.target.parentElement.getAttribute('data-id');
                db.collection('works').doc(id).delete();
            })
        }

        function renderHobbies(doc){
            let dib = document.createElement('div');
            let name = document.createElement('div');
            let cross = document.createElement('span');

            dib.setAttribute('data-id', doc.id);
            name.textContent = doc.data().name;
            cross.setAttribute('id',"xbutton");
            cross.textContent = 'X';

            dib.appendChild(name);
            dib.appendChild(cross);

            hobbylist.appendChild(dib);

            // delete data
            cross.addEventListener('click', (e) => {
                e.stopPropagation();
                let id = e.target.parentElement.getAttribute('data-id');
                db.collection('hobbies').doc(id).delete();
            })
        }

        function renderIntro(doc){
            let dib = document.createElement('div');
            let value = document.createElement('div');

            dib.setAttribute('class', doc.id);
            value.textContent = doc.data().value;

            dib.appendChild(value);

            introlist.appendChild(dib);
        }

        function renderLink(doc){
            let dib = document.createElement('div');
            let link = document.createElement('a');
            let edit = document.createElement('a');

            dib.setAttribute('class', doc.id);
            link.setAttribute('href', doc.data().value);
            link.setAttribute('class', "linkcss");
            edit.setAttribute('class',"addbtn rounded-circle");
            edit.setAttribute('data-toggle',"modal");
            edit.setAttribute('id',"plusl");
            edit.setAttribute('data-target',"#modalEdit" + doc.id);
            link.textContent = doc.id + "       ";
            edit.textContent = "edit";

            dib.appendChild(link);
            dib.appendChild(edit);

            linklist.appendChild(dib);

        }

        //realtime listener
        db.collection('education').orderBy('year_start').onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
               if(change.type == 'added'){
                   renderSchool(change.doc);
               }
               else if (change.type == 'removed'){
                   let dib = schoollist.querySelector('[data-id=' + change.doc.id + ']');
                   schoollist.removeChild(dib);
               }
            })
        })

        db.collection('organizations').orderBy('year_start').onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
               if(change.type == 'added'){
                   renderOrganization(change.doc);
               }
               else if (change.type == 'removed'){
                   let dib = orglist.querySelector('[data-id=' + change.doc.id + ']');
                   orglist.removeChild(dib);
               }
            })
        })

        db.collection('works').orderBy('year').onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
               if(change.type == 'added'){
                   renderWorks(change.doc);
               }
               else if (change.type == 'removed'){
                   let dib = worklist.querySelector('[data-id=' + change.doc.id + ']');
                   worklist.removeChild(dib);
               }
            })
        })

        db.collection('hobbies').onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
               if(change.type == 'added'){
                   renderHobbies(change.doc);
               }
               else if (change.type == 'removed'){
                   let dib = hobbylist.querySelector('[data-id=' + change.doc.id + ']');
                   hobbylist.removeChild(dib);
               }
            })
        })

       db.collection('others').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                renderIntro(doc);
            })
        });

        db.collection('links').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                renderLink(doc);
            })
        });


        //saving data
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (form.degree.value != "" && form.school.value != "" && form.year_start.value != "" && form.year_end.value != ""){
            db.collection('education').add({
                school: form.school.value,
                degree: form.degree.value,
                year_start: parseInt(form.year_start.value),
                year_end: parseInt(form.year_end.value)
            });
            }
            else if (form.school.value != "" && form.year_start.value != "" && form.year_end.value != ""){
                db.collection('education').add({
                    school: form.school.value,
                    year_start: parseInt(form.year_start.value),
                    year_end: parseInt(form.year_end.value)
                });
            }
                form.school.value = '';
                form.degree.value = '';
                form.year_start.value = '';
                form.year_end.value = '';
                $('#modalAddEduc').modal('toggle');
        })

        formorg.addEventListener('submit', (e) => {
            e.preventDefault();
            if (formorg.name.value != "" && formorg.position.value != "" && formorg.year_start.value != "" && formorg.year_end.value != ""){
            db.collection('organizations').add({
                name: formorg.name.value,
                position: formorg.position.value,
                year_start: parseInt(formorg.year_start.value),
                year_end: parseInt(formorg.year_end.value)
            });
            }
                formorg.name.value = '';
                formorg.position.value = '';
                formorg.year_start.value = '';
                formorg.year_end.value = '';
                $('#modalAddOrgs').modal('toggle');
        })

        formwork.addEventListener('submit', (e) => {
            e.preventDefault();
            if (formwork.name.value != "" && formwork.year.value != ""){
            db.collection('works').add({
                name: formwork.name.value,
                year: parseInt(formwork.year.value)
            });
            }
                formwork.name.value = '';
                formwork.year.value = '';
                $('#modalAddWork').modal('toggle');
        })

        formhobby.addEventListener('submit', (e) => {
            e.preventDefault();
            if (formhobby.name.value != ""){
            db.collection('hobbies').add({
                name: formhobby.name.value
            });
            }
                formhobby.name.value = '';
                $('#modalAddHobby').modal('toggle');
        })

        formintro.addEventListener('submit', (e) => {
            e.preventDefault();
            if (formintro.intro.value != ""){
                db.collection('others').doc('intro').update({
                    value: formintro.intro.value
                })
            }
                formintro.intro.value = '';
                $('#modalEditIntro').modal('toggle');
        })

        formg.addEventListener('submit', (e) => {
            e.preventDefault();
            if (formg.linkg.value != ""){
                db.collection('links').doc('Github').update({
                    value: formg.linkg.value
                })
            }
                formg.linkg.value = '';
                $('#modalEditGithub').modal('toggle');
        })

        formli.addEventListener('submit', (e) => {
            e.preventDefault();
            if (formli.linkli.value != ""){
                db.collection('links').doc('Linkedin').update({
                    value: formli.linkli.value
                })
            }
                formli.linkli.value = '';
                $('#modalEditLinkedin').modal('toggle');
        })

        formt.addEventListener('submit', (e) => {
            e.preventDefault();
            if (formt.linkt.value != ""){
                db.collection('links').doc('Twitter').update({
                    value: formt.linkt.value
                })
            }
                formt.linkt.value = '';
                $('#modalEditTwitter').modal('toggle');
        })

        setupUI(user);
    } else {

        function renderLogout(){

            $('#infoid').empty();
            $('#orgs').empty();
            $('#educ').empty();
            $('#trabaho').empty();
            $('#myhobbies').empty();
            $('#sociallink').empty();
            $('#edipage').hide();
            $('#alerter').show();
        }

        setupUI();
        renderLogout();

    }
})


// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    firebase.auth().signInWithEmailAndPassword(email, password).then(cred => {
        console.log("test");
        loginForm.reset();
        $('#modalLoginForm').modal('toggle');
    });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    firebase.auth().signOut();
});