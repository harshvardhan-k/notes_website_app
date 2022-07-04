const addBtn=document.getElementById('addBtn');
const titleTab=document.querySelector("input");
const descTab=document.querySelector("textarea");
const appear=document.getElementById('Appear');
const notes=JSON.parse(localStorage.getItem("note")||"[]");
const NoteHead=document.getElementById("addNote1");
const NoteCont=document.getElementById("addNote2");
const searching=document.getElementById("searchNote");

function showNotes(){
    document.querySelectorAll(".card").forEach(note => note.remove());
    notes.forEach((note,index)=>{
        let newCreature=`
        <div class="card border-primary mb-3" style="max-width: 18rem; min-height:13rem">
        <div class="card-header"><h5 class="card-title">${note.title}</h5></div>
        <div class="card-body text-primary">
          <p class="card-text">${note.desc}</p>
        </div>
        <ul class="menu">
            <span onclick="editNote(${index},'${note.title}','${note.desc}')" class="iconify" data-icon="ant-design:edit-outlined" id="ab"></span>
            <span onclick="deleteNote(${index})" class="iconify" data-icon="ant-design:delete-outlined" id="cd"></span>
        </ul>
        <hr>
        <div id="belowhr">
        <p id="dt">${note.time}</p>
        </div>
      </div>`;
      appear.insertAdjacentHTML("afterend",newCreature);
    })
}
showNotes();
addBtn.addEventListener('click',()=>{
    let noteTitle=titleTab.value; 
    let noteDesc=descTab.value;
    if(noteTitle || noteDesc){
        let timenow= Date();
        let noteInfo={
            title:noteTitle,
            desc:noteDesc,
            time:timenow
        }
        notes.push(noteInfo);
        localStorage.setItem("note",JSON.stringify(notes));
    }
    showNotes();
    titleTab.value="";
    descTab.value="";
})


function deleteNote(noteIndex){
    notes.splice(noteIndex,1);
    localStorage.setItem("note",JSON.stringify(notes));
    showNotes();
}

function editNote(ID,TITLE,DESC){
    if(NoteHead.value=="" && NoteCont.value==""){
    NoteHead.value=TITLE;
    NoteCont.value=DESC;
    deleteNote(ID);
    }
    else{
        alert("Please clear the input textareas first");
    }
}


searching.addEventListener("input",function(){
    let inpUT=searching.value.toLowerCase();
    console.log('input'.inp);
    let available=document.getElementsByClassName("card border-primary mb-3");
    Array.from(available).forEach(function(e){
        let txt1=e.getElementsByTagName("h5")[0].innerText;
        let txt2=e.getElementsByTagName("p")[0].innerText;
        if(txt1.includes(inpUT) || txt2.includes(inpUT)){
            e.style.display="block";
        }
        else{
            e.style.display="none";
        }
    })
})
