//BE SURE TO PROTECT EVERYTHING IN THE CONFIG
//DON'T COMMIT IT!!!

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAMZX-cBy2zhpSBD2Dg3ayZOObE6hy3hik",
  authDomain: "qlsp-f18ff.firebaseapp.com",
  projectId: "qlsp-f18ff",
  storageBucket: "qlsp-f18ff.appspot.com",
  messagingSenderId: "784737522105",
  appId: "1:784737522105:web:420ecd0d0d0e915a77a668",
  measurementId: "G-ELDRGSE09G",
};
firebase.initializeApp(firebaseConfig);
var image = [];
// firebase bucket name
// REPLACE WITH THE ONE YOU CREATE
// ALSO CHECK STORAGE RULES IN FIREBASE CONSOLE
var fbBucketName = "images";

// get elements
var uploader = document.getElementById("uploader");
var fileButton = document.getElementById("file");

// listen for file selection
fileButton.addEventListener("change", function (e) {
  //Get files
  for (var i = 0; i < e.target.files.length; i++) {
    var imageFile = e.target.files[i];

    uploadImageAsPromise(imageFile);
  }
});

//Handle waiting to upload each file using promise
function uploadImageAsPromise(imageFile) {
  return new Promise(function (resolve, reject) {
    var storageRef = firebase
      .storage()
      .ref(fbBucketName + "/" + imageFile.name);

    //Upload file
    var task = storageRef.put(imageFile);

    //Update progress bar
    task.on(
      "state_changed",
      function progress(snapshot) {
        var percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploader.value = percentage;
      },
      function error(err) {},
      function complete() {
        var downloadURL = task.snapshot.downloadURL;
        console.log("dowload URL --->", downloadURL);
        image.push(downloadURL);
        let divLocation = document.getElementById("display");
        let imgElement = document.createElement("img");
        imgElement.src = downloadURL;
        divLocation.append(imgElement);
      }
    );
  });
}
function getImage() {
  return image;
}
