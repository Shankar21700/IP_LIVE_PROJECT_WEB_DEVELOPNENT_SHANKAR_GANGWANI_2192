const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/chat', (req, res) => {
  res.sendFile(__dirname + '/chatbot.html');
});

// Socket
const io = require('socket.io')(http);

function reply(message) {
  switch (message) {
    case 'Hi':
      return { message: "<p>Hi, how may I help you?<br>Please reply with the numbers to corresponding questions.</p><ol><li>General IP Queries</li><li>Learning Path 1</li><li>Learning Path 2</li><li>Learning Path 3/Live Project</li>"};
      break;
    case '1':
      return { message: "<p>Please select from below options</p><ol type='a'><li> Bitrix</li><li>Workgroup</li><li>Other technologies</li><li>Dates</li><li>College</li><li>Induction</li></ol>"};
      break;
    case '2':
      return { message: "<p>Please select from below options</p><ol type='I'><li>Login Issues</li><li>Quiz</li><li>Clockin/clockout</li></ol>"};
      break;
    case '3':
      return { message: "<p>Please select from below options</p><ol type='i'><li>Level of  Training</li><li>Training</li><li>Videos Loading</li></ol>"};
      break;
    case '4':
      return { message: "<p>Please select from below options</p><ol type='A'><li>Level</li><li>Mentorship/Doubts</li><li>Problem Statement</li><Li>After Live Project</ol>"};
      break;
    case 'a':
      return { message: "Q) By when will we receive access to Bitrix24?<br>A) If you have submitted the ‘New Joinee Form’ after the 1st of March, please wait till the 31st of March to receive your access.<br><br>Q) I m not able to access my Bitrix24 account?<br>A) Go to https://cloudcounselage24.bitrix24.com/ On the Login page, In the, ‘Enter the phone number or email’, type in your email id that you have registered with Cloud Counselage and Click ‘Forgot Password’. In case the problem persists, please write a mail to hrsupport@cloudcounselage.in<br><br>Q) I am not able to see my tasks.<br>A) Please remove the default 'In Progress' from your filter of the task section and try.<br><br>Q) What do we do in the work report?<br>A) As mentioned in the video, please write what you have done this week and request approval from your supervisor by clicking on 'send to supervisor'."};
      break;
    case 'b':
      return { message: "<p>Q) How many workgroups will an intern be a part of?/ How many workgroups should I be in?<br>A) Every intern should be a part of 2 workgroups.<br>1. '202003-IP'  -- This is a general workgroup. Everyone who is enrolled in IP should be a part of this workgroup.<br>2. '202003-IP-Technology'  -- This is a technology-specific workgroup. You'll be added to the technology you had enrolled for. For example '202003-IP-Python' for students who enrolled for python.<br>If anyone has not been added to any of these workgroups, kindly message 'Cloud Counselage HR' regarding the same over bitrix24 platform.<br><br>Q) I am having trouble finding the workgroup ( no workgroup is visible)<br>A) Please ensure that you have connected to the drive of that workgroup by going to your notification and connecting to the drive of that workgroup. If that is done, please try to search for your workgroup in the search bar at the top of your screen. To search, use the keywords, 202003-IP-TechnologyName. Ex '202003-IP-DevOps'. In case there is no invitation to you, please message Cloud Counselage HR. You will be added to 2 groups “202003-IP” which is a general workgroup and the other one is '202003-IP-Technology' which is a technology-specific workgroup.<br><br>Q) I am not added into my technology workgroup./ actually there are n no of tokens and every token I entered it is showing user no found or redirecting to the same page<br>A) Please follow the instruction given in the videos or the one in the Bitrix24 mail (these are the same videos share in the task), the tokens are given to you. Ensure that you are putting the right token on the right page.<p>"};
      break;
    case 'c':
      return { message:"<p>Q) I have opted for a blockchain internship, can I also learn about AI and do an internship in both? <br>A) You can learn both the technologies using Learning Path 2 (LP2) which will begin after the 2nd week of March, but your internship will only be continuing with the one you are selected for.<br><br>Q) Can I switch my technology now? / I had enrolled for two technologies at the time of form-filling and got selected for the technology I’m not interested in.<br>A) You cannot switch the technology currently. You have to continue with the one you are selected for. In the case of multiple form entries, you just got selected for one of them; the first one that you entered. You cannot make a switch right now.<br><br>Q) If we are working on more than one technology, are those technologies added to the certificate? <br>A) You are not restricted from doing the training of other technologies but you will only be given an internship certificate of the technology you’re selected for.<br><br>Q)Will I get LP3 and Live project of technology other than what I am selected for?<br>A) No, you will receive LP3 and Live Projects of your respective technology.</p>"};
      break;
   case 'd':
      return { message: "<p>Q) When does the LP1/ LP2/ LP3 begin dates and deadline/ end date?<br>A) The dates to begin the learning paths (LP) are: - <br>LP1 - 01/03/2020<br>LP2 - 18/03/2020<br>LP3 - 02/04/2020<br>All learning Paths (LP) are expected to be completed by the interns before the first   week of June as Live Projects will begin in that time frame. </p>"};
      break;
   case 'e':
      return { message: "<p>What to do when our university exams start?<br>A) We have provided our interns with preparatory leave from the exam season, nevertheless, you are free to work on your LP3 assignment, but we suggest to concentrate on your exams first.<br><br>Q) Is it okay to mention this internship as ongoing for college records?<br>A) Yes, we'll provide every intern a joining letter as soon as all interns are inducted. </p>"};
      break;
   case 'f':
      return { message: "<p>Q)Is the induction online or offline?<br>A) As a precautionary measure to safeguard our intern’s health, we have decided to conduct all the inductions online.<br><br>Q)I could not attend the induction last time, can I get an online induction again?/ I want some points said in the introduction, where can I get them.<br>A) We have created a separate page with a pre-recorded induction, please visit it; https://www.cloudcounselage.co.in/ipinduction<br><br>Q)Can I just finish the task that you have just uploaded as I have attended the live induction session on 22nd of march<br>A) Yes. Although, you can always revisit the induction so that you can review what has been said in it.</p>"};
      break;
   case 'I':
      return { message: "<p>Q) Which Browser I should use?<br>A) Google Chrome is recommended.<br><br>Q) Not able to access the LP1 page with my token/ When I put my token it redirects me to the home page/ Getting error while accessing the page- 'User Not Found'/Website Redirection Issue/Tokens not working.<br>A) Please watch the videos shared with the invite and you should not face any problems in accessing the training. Please follow the protocol shown in the videos.<br><br>Q) Login issues with training/ for every module of LP1/ LP2, do we have to register again for access to the content?<br>A) Yes, you need to register for every module of training. Some of you are facing login issues, we have kept the training visible without login. Even then, to post a comment and give a quiz you'll have to login. In case you face difficulty to do so, please try to perform your quiz or post a comment by using a different browser or incognito mode.<br><br>Q) I am applying my 2nd token that is the LP1 then it shows invalid user but the first token was accepted. What should I do?/ Tokens not working<br>A) For each training of LP1, there are different tokens. Please read the tasks or watch the videos again meticulously. Try accessing it in incognito mode.<br><br>Q) I did follow the instructions given in the video, but still, I'm not able to log in for the LP1 task<br>A) Ensure you're using the right token</p>"};
      break;
   case 'II':
      return { message: "<p>Q) What do I do after completing the quiz? how to complete the entire lp1<br>A) There are tokens for each training in the task, if this learning path is done, please wait for the next learning path to begin and then please try to finish it. If you are done with LP3 please wait for Live Projects to begin.<br><br>Q) Unable to access the quiz<br>A) Please retry after some time in an incognito window<br><br>Q) How do I access my quiz?A) As mentioned in the vide<br>Step1: Go to lp1 module<br>Step2: Select module<br>Step3: Put token (it will direct you to the home screen if the token is correct)<br>Step4: Again go to lp1 module n select that module<br>Step5: You will get the access by now<br>Step6: Register there (each time for every module)<br>Step7: Give the quiz<br>Step8: Logout</p>"};
      break;
   case 'III':
      return { message: "<p>Q) I forgot to clock in for a few days, will this affect my internship?<br>A) This could have an adverse effect on your internship, please contact Cloud Counsealge HR and provide a genuine reason to miss clock in/ clock out. Also, please start performing your clock in/ clock out now.<br><br>Q)Is it necessary to clock-in if I am done with my tasks?<br>A) Yes, it is mandatory to do, we are trying to include some more tasks due to the current scenarios, but adherence to clock-in/ clock-out policy is utterly important.</p>"};
      break;
   case 'i':
      return { message: "<p>Q) What happens in LP2? What kind of training can we expect? Is it a Basic/Advance level?<br>A) The main focus of LP2 is to provide you with a basic foundation of the technology you're interested in. The training is also handpicked in such a way that they enable you to work on LP3 assignments which interim gives you the beginning to start your study for the selected technology and in no terms is the only/ final training you should look into. Please keep learning after your LP2 is complete, that is the only way to grow in your technology of choice.<br><br>Q) Will these training be enough for us to complete the LP3 and Live Project. <br>A) The set of training is not exhaustive and you are required to keep learning about the technology on your own to excel in your Live Project.</p>"};
      break;
   case 'ii':
      return { message: "Q) Why only this training for LP2?<br>A) They are our training partners and we have handpicked this training to cover a certain topic for you. These training cover from the very basic to intermediate level and is the perfect medium for you to have a starting point<br><br>Q) Could I have done this training from other websites/ resources?<br><br>A) Yes, you could have but the reason to have these videos is to keep an enclosed environment for you to watch these tutorials without distractions with quizzes and forums for you to discuss in. As mentioned earlier, our main aim is to provide you with a starting point and baseline for the technology of your choice."};
      break;
   case 'iii':
      return { message: "<p>Q)The videos of LP2 are taking too much time to load.<br>A) We have uploaded the videos of the highest quality and best resolution which has resulted in some videos being over 1 GB as they are of hours in duration. To experience these high definition videos we request you to wait at least 5 minutes or more; depending on your computer's RAM and internet connection.</p>"};
      break;
   case 'A':
      return { message: "<p>Q)What happens in LP3? What kind of training can we expect? Is it a Basic/Advance level?<br>A) LP3 will be assignment based and its execution and content vary from technology to technology. This assignment will be like a mini-project for all interns in a particular technology which will be verified by Cloud Counselage Project Managers.</p>"};
      break;
   case 'B':
      return { message: "<p>Q)Will you provide mentorship or doubt clearing sessions in this internship?<br>A) As this is an internship you’re expected to do self-learning, mentorship is not part of an internship. However, we have created forums to resolve your doubts in the form of workgroups. As an intern ensure that you are part of relevant workgroups, i.e. ‘202003 - IP’ and your resp. Technology workgroup. In case, you are not a part of these workgroups, please reach out to ‘Cloud Counselage HR’ on Bitrix24 Chat.<br><br>Q)I am stuck in LP3/ Live project with a technical issue, Is there any technical person who can help in this?<br>A) As mentorship/ hand-holding is not part of an internship by definition, we would not provide any technical help. Nevertheless, feel free to ask your doubt in your respective workgroup chat/ in the community or Google it :)</p>"};
      break;
   case 'C':
      return { message: "<p>Q)For some reason, I'm unable to download my LP3 assignment problem statement document shared on LP3 page, is there any other way I can get it?<br>A) Since some of you are not able to download, please find the same document in your technology drive in the folder LP3. We have made an announcement in your respective technology workgroup as well, please check.<br><br>Q) Problem statements of the Live Project will be chosen by the intern or will be provided by Cloud Counselage?<br>A) Live Projects will be provided by Cloud Counselage as these are the ongoing projects of Cloud Counselage and your opportunity to create an impact in the organisation.</p>"};
      break;
   case 'D':
      return { message: "<p>What to do after Live Projects? Are we getting an offer letter/Stipend?<br>A) Submit your project and once it's reviewed as successful, collect your internship letter. Your internship is complete after this. There is no stipend for live projects. If your work is sublime and we have a vacancy in the position you're interested in, you may be offered a chance for interviews and can get an offer letter from Cloud Counselage Pvt. Ltd.</p?>"};
      break;
    default:
      return { message: '<p>please input from above mentioned values<br>send "Hi" to get main menu:)<p>' };
      break;
  }
}

io.on('connection', (socket) => {




//socket
  socket.on('message', (msg) => {

    socket.emit('message', reply(msg.message));
  });
});
//listening on port
http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
