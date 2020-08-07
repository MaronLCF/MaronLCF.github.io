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
            
 /*          db.collection("education").get().then(function(snapshot){
                snapshot.forEach(function(doc){
                    console.log(Object.values(doc.data()));
                    //console.log(get)
                })
            });
            
            var newObject = {
                name: "User Experience Society - DLSU",
                position: "Member",
                year_start: 2019,
                year_end: 2020
            }

/*            db.collection("organizations").add(newObject).then(function(doc){
                console.log("Item added with the uid: " + doc.id);
            })
            
*/        

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

            // create element and render school
            function renderSchool(doc){
                let dib = document.createElement('div');
                let school = document.createElement('div');
                let degree = document.createElement('div'); 
                let year_start = document.createElement('span');
                let year_end = document.createElement('span');

                dib.setAttribute('data-id', doc.id);
                school.textContent = doc.data().school;
                degree.textContent = doc.data().degree;
                year_start.textContent = doc.data().year_start + " - ";
                year_end.textContent = doc.data().year_end;


                dib.appendChild(school);
                dib.appendChild(degree);
                dib.appendChild(year_start);
                dib.appendChild(year_end);      

                schoollist.appendChild(dib);

            }

            // create element and render orgs
            function renderOrganization(doc){
                let dib = document.createElement('div');
                let name = document.createElement('div');
                let position = document.createElement('div'); 
                let year_start = document.createElement('span');
                let year_end = document.createElement('span');

                dib.setAttribute('data-id', doc.id);
                name.textContent = doc.data().name;
                position.textContent = doc.data().position;
                year_start.textContent = doc.data().year_start + " - ";
                year_end.textContent = doc.data().year_end;

                dib.appendChild(name);
                dib.appendChild(position);
                dib.appendChild(year_start);
                dib.appendChild(year_end);

                orglist.appendChild(dib);
            }

            function renderWorks(doc){
                let dib = document.createElement('div');
                let name = document.createElement('div');
                let year = document.createElement('div');

                dib.setAttribute('data-id', doc.id);
                name.textContent = doc.data().name;
                year.textContent = doc.data().year;

                dib.appendChild(name);
                dib.appendChild(year);

                worklist.appendChild(dib);

            }

            function renderHobbies(doc){
                let dib = document.createElement('div');
                let name = document.createElement('div');

                dib.setAttribute('data-id', doc.id);
                name.textContent = doc.data().name;

                dib.appendChild(name);

                hobbylist.appendChild(dib);

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

                dib.setAttribute('class', doc.id);
                link.setAttribute('href', doc.data().value);
                link.textContent = doc.id;

                dib.appendChild(link);

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

            db.collection('links').onSnapshot(snapshot => {
                let changes = snapshot.docChanges();
                changes.forEach(change => {
                   if(change.type == 'added'){
                       renderLink(change.doc);
                   }
                   else if (change.type == 'removed'){
                       let dib = linklist.querySelector('[data-id=' + change.doc.id + ']');
                       linklist.removeChild(dib);
                   }
                })
            })


/*            var email = "maron_fabelico@dlsu.edu.ph";
            var password = "password";
            
            firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
                console.log("user signed in");
                
                var user = firebase.auth().currentUser;
                if (user!=null){
                    console.log(user.email);
                }
            }).catch(function(err){
                if(err.code == "auth/wrong-password"){
                    alert("wrong password")
                }
                else{
                    alert(err.message);
                }
            });*/

            var TxtType = function(el, toRotate, period) {
                this.toRotate = toRotate;
                this.el = el;
                this.loopNum = 0;
                this.period = parseInt(period, 10) || 2000;
                this.txt = '';
                this.tick();
                this.isDeleting = false;
            };
        
            TxtType.prototype.tick = function() {
                var i = this.loopNum % this.toRotate.length;
                var fullTxt = this.toRotate[i];
        
                if (this.isDeleting) {
                this.txt = fullTxt.substring(0, this.txt.length - 1);
                } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
                }
        
                this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
        
                var that = this;
                var delta = 200 - Math.random() * 100;
        
                if (this.isDeleting) { delta /= 2; }
        
                if (!this.isDeleting && this.txt === fullTxt) {
                delta = this.period;
                this.isDeleting = true;
                } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.loopNum++;
                delta = 500;
                }
        
                setTimeout(function() {
                that.tick();
                }, delta);
            };
        
            window.onload = function() {
                var elements = document.getElementsByClassName('introtwo');
                for (var i=0; i<elements.length; i++) {
                    var toRotate = elements[i].getAttribute('data-type');
                    var period = elements[i].getAttribute('data-period');
                    if (toRotate) {
                      new TxtType(elements[i], JSON.parse(toRotate), period);
                    }
                }
                // INJECT CSS
                var css = document.createElement("style");
                css.type = "text/css";
                css.innerHTML = ".introtwo > .wrap { border-right: 0.08em solid #fff}";
                document.body.appendChild(css);
            };



      
            
