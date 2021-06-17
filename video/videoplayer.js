
var str = document.getElementById('videoplayer')
// console.log(str.src);
var create_email = false;
var final_transcript = '';
var recognizing = false;
var ignore_onend;
var listing_false = false;
var start_timestamp;
var userregister = false;
var useractivate = false;
var userdetails;

// var api_url = "https://nammibot.herokuapp.com/api/activity/url/converter";

function register() {
    $('#submit-btn1').attr('disabled','disabled')
    localStorage.setItem("useremail",document.getElementById('email').value)
    var sign_url = "https://nammibot.herokuapp.com/api/auth/signup/";
    signupApi(sign_url, function () {
        window.location.href="welcome.html"
    });
}
function userlogin() { 
        $('#submit-btn').attr('disabled','disabled')
        localStorage.setItem("useremail",document.getElementById('email').value)
        var login_url = "https://nammibot.herokuapp.com/api/auth/login/";
        loginApi(login_url, function () {
            window.location.href="welcome.html"
        });
}

function start() { 
    $('#submit-btn2').attr('disabled','disabled')
    var user= localStorage.getItem("useremail")
    if(user == null){
        localStorage.setItem("useremail",document.getElementById('email').value)
    }
    localStorage.setItem("youtube-Url",document.getElementById('url').value)
    var api_url = "https://nammibot.herokuapp.com/api/activity/url/converter/";
    getapi(api_url, function () {
        window.location.href="video.html"
    });
}

function logout() {
    localStorage.removeItem("useremail")
    localStorage.removeItem("userdetails")
    localStorage.removeItem('uuid')
    localStorage.removeItem('videotitle')
    localStorage.removeItem('youtube-Url')
    localStorage.removeItem('videourl')
    window.location.href="login.html";
}

async function signupApi(signUrl, cb) {
    const response = await fetch(signUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({first_name: document.getElementById('firstname').value,
                              last_name: document.getElementById('lastname').value,
                              email : document.getElementById('email').value,
                              password : document.getElementById('password').value})
    });
    var data = await response.json();

         if (data.password && data.password[0] == 'This password is entirely numeric.') {
            
                 Toastify({
                     text: "This password is entirely numeric",
                     duration: 3000,
                     newWindow: true,
                     close: true,
                     gravity: "top", // `top` or `bottom`
                     position: "right", // `left`, `center` or `right`
                     backgroundColor: "#e74c3c",
                     stopOnFocus: true, // Prevents dismissing of toast on hover
                     onClick: function(){} // Callback after click
                     }).showToast();
                 $('#submit-btn1').removeAttr('disabled')
                 return;
         } 
        
         if (data.email && data.email[0] == 'user with this email already exists.') {
                Toastify({
                    text: "user with this email already exists",
                    duration: 3000,
                    newWindow: true,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    backgroundColor: "#e74c3c",
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    onClick: function(){} // Callback after click
                    }).showToast();
                $('#submit-btn1').removeAttr('disabled')
                return;
         }

     function uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }
      
      var userID=uuid();
      localStorage.setItem("uuid" , userID);
      console.log(userID);
    console.log(data);
    if(cb) {cb();}
}


async function loginApi(login_url, cb) {
    const response = await fetch(login_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email : document.getElementById('email').value,
                              password : document.getElementById('password').value})
    });
    var data = await response.json();

    console.log(data.password)
    if (response.status == 200) {
        localStorage.setItem("userdetails", JSON.stringify(data));
    }

    if(data.email) {
        if(data.email[0] == "User with provided email does not exist") {
            $('#submit-btn').removeAttr('disabled');
            Toastify({
                text: "User with provided email does not exist",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                backgroundColor: "#e74c3c",
                stopOnFocus: true, // Prevents dismissing of toast on hover
                onClick: function(){} // Callback after click
                }).showToast();
            return;
        }
    
        if(data.email[0] == "User not active") {
            $('#submit-btn').removeAttr('disabled');
            Toastify({
                text: "User not active",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                backgroundColor: "#e74c3c",
                stopOnFocus: true, // Prevents dismissing of toast on hover
                onClick: function(){} // Callback after click
                }).showToast();
            return;
        }
    }

    if (data.password) {
        if(data.password[0] == "incorrect password") {
            $('#submit-btn').removeAttr('disabled');
            Toastify({
                text: "invalid credentials",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                backgroundColor: "#e74c3c",
                stopOnFocus: true, // Prevents dismissing of toast on hover
                onClick: function(){} // Callback after click
                }).showToast();
            return;
        }
    }
    function uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      } 
      var userID=uuid();
      localStorage.setItem("uuid" , userID);
    if(cb) {cb();}
}


async function getapi(url, cb) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({url: document.getElementById('url').value})
    });
    var data = await response.json();

    function uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }
      
      var userID=uuid();
      localStorage.setItem("uuid" , userID);
      console.log(userID);
      
    if(response.status != 200) {
        Toastify({
            text: "invalid Url",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            backgroundColor: "#e74c3c",
            stopOnFocus: true, // Prevents dismissing of toast on hover
            onClick: function(){} // Callback after click
            }).showToast();
        $('#submit-btn2').attr('disabled','disabled')
        return
    }
    localStorage.setItem("videotitle", data.title ? data.title : "");
    localStorage.setItem("videourl", data.url ? data.url : "https://r5---sn-p5qs7nsr.googlevideo.com/videoplayback?expire=1619027263&ei=3xCAYOgmxeKDA_HDr5AH&ip=54.82.238.245&id=o-AJVHGkNaRrXreyibmfAUYJ5ecH7PFlKTIZhiUsXaDIqe&itag=18&source=youtube&requiressl=yes&mh=HC&mm=31%2C29&mn=sn-p5qs7nsr%2Csn-p5qlsnrr&ms=au%2Crdu&mv=m&mvi=5&pl=14&initcwndbps=1017500&vprv=1&mime=video%2Fmp4&ns=Jwnxk9Acjxj3Ffp4aEoyzMIF&gir=yes&clen=221019966&ratebypass=yes&dur=12402.660&lmt=1613234228714395&mt=1619005502&fvip=5&fexp=24001373%2C24007246&c=WEB&txp=5430432&n=wIjdYOmAZIYOxWTt&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRAIgcZWur-_5n8BzDF_VfrDqK4J1xRASIKYAVs4IQXgNqDECIDIueKRxUnYcRjOCEw5Wc3QAwGviz_I7LnbGNA6sbva4&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRgIhAKKwnyZScP0IXm085iEOGPIpwpI9OAyhsOZRcidQlGBNAiEAmDuTsMrSj3d62mK7gez5qYAlXRV4LD42OGQ8c55X5uw%3D");
    console.log(data);
    if(cb) {cb();}
}

function checkLogin() {
    var user= localStorage.getItem("useremail")
    console.log(user)
    // var userdetailses = JSON.parse(localStorage.getItem("userdetails"))
    // console.log(userdetailses)
    if(user == null ){
        $("#withoutsignup").css('display','block')
    }else {
        $("#withoutsignup").css('display','none')
    }
}

if (!('webkitSpeechRecognition' in window)) {
    upgrade();
} else {
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.maxAlternatives = 0
    var lastaddsnapshot;
    recognition.onstart = function () {
        recognizing = true;
        $('#stop').css('display','none')
        $('#listening').css('display','block')
        $('#allowmic').css('display','none')
    };

    recognition.onerror = function (event) {
        console.log(event)
        
        if (event.error == 'no-speech') {
            
            ignore_onend = true;
        }
        if (event.error == 'audio-capture') {
            
            ignore_onend = true;
        }
        if (event.error == 'network') {
            
        }
        if (event.error == 'not-allowed') {
            if (event.timeStamp - start_timestamp < 100) {
            
            } else {
            
            }
            ignore_onend = true;
        }
    };

    recognition.onend = function () {
        console.log("end")
        listing_false = true
        if(listing_false) {
            $('#stop').css('display','block')
            $('#listening').css('display','none')
            $('#allowmic').css('display','block')
        }
        recognizing = false;
        if (ignore_onend) {
            return;
        }
        if (!final_transcript) {
            return;
        }
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
            var range = document.createRange();
            range.selectNode(document.getElementById('final_span'));
            window.getSelection().addRange(range);
        }
        if (create_email) {
            create_email = false;
            createEmail();
        }
    };

    var resumes = false;
    var addcomment = false;
    var commenttext = "";
    var videoId = 'videoplayer';
    var scaleFactor = 0.25;
    var snapshots = [];
    var comments = [];
    var sanpshotfirst = false
    var canvas;
    var pause = ['pause',' pause','pose','pase','boss',' baldus',' pose',' pase',' boss',' baldus'];
    var comment = ['comment','Air Command','add comment','adamant',' comment',' Air Command',' add comment','adamant'];
    var sanpshot = ['snapshot','snapchat','snap','Snapshot','Snapchat',' snapshot',' snapchat',' snap',' Snapshot',' Snapchat']
    var stopes = ['stop',' stop'];
    var resume = ['resume','rosume','resu','resum',' resume',' rosume',' resu',' resum']
    var play = ['play','clay','Play','Clay',' play',' clay',' Play',' Clay']
    recognition.onresult = function (event) {
        
        console.log(event)
        var lastelementIdx = event.results.length - 1
        var lastEl = event.results[lastelementIdx] ? event.results[lastelementIdx][0].transcript : '';
        var lastEl = lastEl.toLowerCase();

        console.log(event.results[lastelementIdx][0].transcript)

        if ((play.includes(lastEl) || lastEl.match('play')) && addcomment == false) {
            str.play();
        }

        if ((pause.includes(lastEl) || lastEl.match('pause')) && addcomment == false) {
            str.pause();
            resumes = true;
        }
        if ((sanpshot.includes(lastEl) || lastEl.match('snapshot')) && addcomment == false) {
            shoot()
            sanpshotfirst = true
            var audio = new Audio('video/audio.mp3');
            audio.play();
            getdata()
        }
        if ((comment.includes(lastEl) || lastEl.match('add comment')) && sanpshotfirst == true)  {
            addcomment = true;
            setTimeout(function(){
                $("#comments"+snapshots.length - 1).focus();
            }, 50);
            $("#commentlisting").css('display','block')
            // event.results[i][0].splice(i,1)
        }
        if ((resume.includes(lastEl) || lastEl.match('resume')) && addcomment == false) {
            console.log(resumes)
            if(resumes){
                str.play();
            }
        }
        if ((stopes.includes(lastEl) || lastEl.match('stop')) && sanpshotfirst == true) {
            $("#commentlisting").css('display','none')
            sanpshotfirst = false;
            addcomment = false;
            var lastidx = snapshots.length - 1;
            $("#comments"+snapshots.length - 1).blur();
            commenttext = '';
            getdata()    
        }

        if (lastEl.match('send email')) {
            sendemail()
        }

        if(addcomment) {
            commenttext += lastEl.replace(/add comment/g, '');
            var lastidx = snapshots.length - 1;
            $("#comments" + lastidx).val(commenttext.trim());
            comments[lastidx] = commenttext;
        }
    }
    
    function getdata() {
        var activity_url = "https://nammibot.herokuapp.com/api/activity/"
        html2canvas($('#canvas' + [snapshots.length - 1]), {
            onrendered: function (canvas) {
                img = canvas.toDataURL("image/png")
                var blobBin = atob(img.split(',')[1]);
                var array = [];
                for(var i = 0; i < blobBin.length; i++) {
                    array.push(blobBin.charCodeAt(i));
                }
                files = new Blob([new Uint8Array(array)], { type: "image/png" });
                
                canvas.toBlob(function (blob) {
                    let formData = new FormData()
                    let file = new File([blob], "fileName.jpeg", { type: "image/jpeg" })
                    formData.append("snapshot", file)
                    formData.append("email",localStorage.getItem('useremail') ? localStorage.getItem('useremail'): "")
                    formData.append("session_id", localStorage.getItem('uuid') ? localStorage.getItem('uuid') : "1345695656555532")
                    formData.append("comment", comments[comments.length - 1] ? comments[comments.length - 1] : "")
                    formData.append("user", userdetails ? userdetails.user_id : "")    
                    formData.append("url", localStorage.getItem("youtube-Url")? localStorage.getItem("youtube-Url") : "https://www.youtube.com/watch?v=FuaQ1QhJOkc")
                    formData.append("start_time", moment().format())
    
                     fetch(activity_url, {
                        method: 'POST',
                        // headers: {
                        //     'Content-Type': 'multipart/form-data'
                        // },
                        body: formData
                    }).then(response => {
                        var data = response.json();
                        console.log(data)     
                    });
                }, 'image/jpeg', 0.95);

            }
        });

            
    }

    function upgrade() {
        start_button.style.visibility = 'hidden';
        showInfo('info_upgrade');
    }

    var two_line = /\n\n/g;
    var one_line = /\n/g;
    function linebreak(s) {
        return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
    }

    var first_char = /\S/;
    function capitalize(s) {
        return s.replace(first_char, function (m) { return m.toUpperCase(); });
    }

    function myFunction() {
        if (recognizing) {
            recognition.stop();
            return;
        }
        final_transcript = '';
        recognition.start();
        recognition.lang = ['en-IN', 'india'];
        var videoUrl = localStorage.getItem("videourl");
        var videotitle = localStorage.getItem('videotitle');
        $('#videoplayer').attr('src',videoUrl)
        $('#video-Title').text(videotitle)
        ignore_onend = false;
        start_timestamp = event.timeStamp;        
        userdetails = JSON.parse(localStorage.getItem("userdetails"))

        function uuid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
              var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
              return v.toString(16);
            });
          }
          
          var userID=uuid();
          localStorage.setItem("uuid" , userID);
    }
   
    function allowmic() {
        recognition.start();
        $('#listening').css('display','block')
        $('#myalerts').css('display','none')
        listing_false = false
    }

    function capture(video, scaleFactor) {
        if (scaleFactor == null) {
            scaleFactor = 1;
        }
        var w = video.videoWidth * scaleFactor;
        var h = video.videoHeight * scaleFactor;
        canvas = document.createElement('canvas');
        canvas.setAttribute('crossorigin', 'anonymous')
        canvas.width = w;
        canvas.height = h;
        canvas.setAttribute('id', 'snapshot' + snapshots.length);
        var ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, w, h);
        return canvas;
    }
    var str = document.getElementById('videoplayer')
    if(str && str.src) {
       
        $('#height').text(str.height)
        $('#width').text(str.width)
    }

    /**
     * Invokes the <code>capture</code> function and attaches the canvas element to the DOM.
     */
    function shoot() {
        sanpshotfirst = true
        $('#screensection').show();
        var video = document.getElementById(videoId);
        var canvas = capture(video, scaleFactor);
        snapshots.push(canvas)
        comments.push();
        render();
    }

    function render() {
        
        $('#output').html('');

        for (var i = snapshots.length - 1; i >= 0; i--) {
            var str = `
                <div class="row note-row" style="margin-top:25px">
                    <div class="col-md-4 col-5"  id="canvas${i}">
                    </div>
                    <div class="col-md-6 col-4 comment">
                        <textarea id="comments${i}" class="form-control" placeholder="please type your note here" rows="3" cols="30"></textarea>
                    </div>
                    <div class="col-md-2 col-3 deletecomment">
                    <i class="fa fa-trash" id="snapshot${i}" onclick="removesnapshot(${i})" aria-hidden="true"></i>
                    </div>
                </div>
            `;
            $("#output").append(str);
            $("#canvas"+[i]).append(snapshots[i]);
            $("#comments"+[i]).val(comments[i]); 
        }
    }

   

    snapshot =  function(el) {
        console.log(canvas);

        html2canvas($('#canvas'+[i]), {
            onrendered: function (canvas) {
                var img = canvas.toDataURL("image/png")
                console.log(img)
                window.open(img);
            }
        });
        for (var i = 0; i < snapshots.length; i++) {
            console.log(snapshots)
            html2canvas($('#canvas'+[i]), {
                onrendered: function (canvas) {
                    console.log(canvas);
                    var image = canvas.toDataURL("image/png")
                    var link = document.createElement('a')
                    link.href = image
                    link.download = "output.png";
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                }
            });
        }  
    }

    function removesnapshot(id) {
        console.log("yes",id)
        snapshots.splice(id,1)
        var output = document.getElementById('output');
        output.innerHTML = '';
        for (var i = 0; i < snapshots.length; i++) {
            console.log(snapshots[i])
            var str = `
                <div class="row" style="margin-top:25px">
                    <div class="col-md-5 col-5" id="canvas${i}">
                    </div>
                    <div class="col-md-4 col-4" id="comment${i}">
                    <textarea class="form-control" value="" placeholder="please type your note here" rows="4" cols="20"></textarea>
                    </div>
                    <div class="col-md-3 col-3" >
                    <i class="fa fa-trash" id="snapshot${i}" onclick="removesnapshot(${i})" aria-hidden="true"></i>
                    </div>
                </div>
            `;
            $("#output").append(str);
        }
        for (var i = 0; i < snapshots.length; i++) {
            $("#canvas"+[i]).append(snapshots[i]);
            $("#comment"+[i]).append(comment[i]);
            $("#snapshot"+[i]).append(snapshot[i]);
        }            
    }

    function sendemail() {
        $('#sendemail').attr('disabled','disabled')
        var sendemail_url = "https://nammibot.herokuapp.com/api/activity/send/mail/"
        const response =  fetch(sendemail_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({session_id: localStorage.getItem("uuid") ? localStorage.getItem("uuid") : "616dd6df-c89f-4214-89a3-380e15adb47f",
                                  email: localStorage.getItem("useremail") ? localStorage.getItem("useremail") : ""})
        }).then(response => {
            var data =  response.json();
            if(response.status != 200) {
                Toastify({
                    text: "some thing went wrong",
                    duration: 3000,
                    newWindow: true,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    backgroundColor: "#e74c3c",
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    onClick: function(){} // Callback after click
                    }).showToast();
                $('#sendemail').removeAttr('disabled')
                return
            }
        })
    }
}