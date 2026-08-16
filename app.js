const practicals=[
["🧪","Hb Estimation – Sahli","Principle, apparatus, steps, calculation and viva","Core"],
["🔬","RBC Count – Neubauer","Counting chamber practice and calculation","Core"],
["🧫","WBC Count – Neubauer","Dilution, chamber areas and calculation","Core"],
["🩸","Platelet Count – Manual","Manual platelet counting concept and calculation","Core"],
["📏","ESR – Westergren","Principle, setup, reading and interpretation concepts","Core"],
["📐","PCV / Hematocrit","Microhematocrit concept and calculation","Core"],
["🖌️","Peripheral Smear","Smear preparation, staining and systematic examination","Core"],
["🔎","DLC","100-cell differential count practice","Core"],
["🔴","RBC Morphology","Microcytic, macrocytic, hypochromic and common shapes","Morphology"],
["⚪","WBC Morphology","Normal leukocyte identification and features","Morphology"],
["🧬","Reticulocyte Count","Supravital staining concept and calculation","Core"],
["🧪","PT / aPTT","Coagulation test principles and result interpretation concepts","Coagulation"]
];

const details={
"Hb Estimation – Sahli":["Principle","Hemoglobin is converted to a colored acid hematin product and compared against a calibrated visual standard in the classic Sahli method.","Calculation","Read the Hb value from the graduated tube after following the laboratory SOP.","Viva","Why is careful endpoint reading important? Because visual color matching can introduce observer variation."],
"RBC Count – Neubauer":["Principle","A diluted blood sample is loaded into a Neubauer chamber and cells are counted in defined ruled areas.","Calculation","Use your laboratory's validated dilution, area and depth. The calculator in this app demonstrates the general chamber formula."],
"WBC Count – Neubauer":["Principle","A suitable WBC diluting fluid is used and leukocytes are counted in designated chamber squares.","Learning point","Accurate dilution, proper chamber loading and avoiding counting errors are essential."],
"Platelet Count – Manual":["Principle","Platelets can be manually counted using a suitable diluting fluid and a counting chamber.","Learning point","Follow the validated method and local SOP because manual platelet methods vary."],
"ESR – Westergren":["Principle","ESR measures the distance erythrocytes settle in a vertical column of anticoagulated blood over a specified time.","Learning point","Record the result in mm/hour and consider pre-analytical and biological factors."],
"PCV / Hematocrit":["Principle","Hematocrit is the proportion of blood volume occupied by red blood cells.","Calculation","PCV can be expressed as a percentage or L/L depending on the reporting system."],
"Peripheral Smear":["Sequence","Prepare an appropriate thin smear, allow it to dry, stain according to SOP, then examine systematically.","Learning point","Assess smear quality before interpreting cell morphology."],
"DLC":["Principle","A differential leukocyte count reports the relative proportions of leukocyte types in a counted cell population.","Practice","Count the requested number of cells using a consistent smear scanning pattern."],
"RBC Morphology":["Look for","Cell size, shape, color, inclusions and distribution. Examples include microcytes, macrocytes, target cells, spherocytes and elliptocytes.","Caution","Morphology should be interpreted with clinical and laboratory context."],
"WBC Morphology":["Look for","Nuclear shape, chromatin, cytoplasmic granules, cytoplasm and relative size.","Learning point","Use standardized teaching images and instructor guidance for abnormal-cell identification."],
"Reticulocyte Count":["Principle","Reticulocytes are young red cells containing residual ribosomal material that can be demonstrated with a supravital stain.","Calculation","Reticulocyte % = reticulocytes counted ÷ total RBCs counted × 100."],
"PT / aPTT":["PT","Assesses the extrinsic/common coagulation pathways in the laboratory.","aPTT","Assesses the intrinsic/common pathways. Interpretation requires the laboratory's reference interval and clinical context."]
};

function renderPracticals(filter=""){
 const box=document.getElementById("practicalList"); box.innerHTML="";
 practicals.filter(p=>p[1].toLowerCase().includes(filter.toLowerCase())).forEach(p=>{
   const d=document.createElement("article"); d.className="card practical";
   d.innerHTML=`<div class="icon">${p[0]}</div><div><h3>${p[1]}</h3><p>${p[2]}</p><span class="tag">${p[3]}</span></div><button>Open</button>`;
   d.querySelector("button").onclick=()=>openPractical(p[1]); box.appendChild(d);
 });
}
function openPractical(name){
 const d=details[name]||["Overview","Follow your institutional SOP and instructor demonstration.","Practice","Use the calculators and quiz to reinforce the concept."];
 const box=document.getElementById("practicalList");
 box.innerHTML=`<article class="card"><button class="secondary" onclick="renderPracticals()">← Back</button><h2>${name}</h2>
 <h3>${d[0]}</h3><p>${d[1]}</p><h3>${d[2]}</h3><p>${d[3]}</p>
 <div class="notice"><b>Dry practical reminder:</b> This module is for education. Real specimen handling, reagents, equipment and reporting must be performed only under appropriate laboratory supervision.</div></article>`;
}
renderPracticals();
document.getElementById("practicalSearch").addEventListener("input",e=>renderPracticals(e.target.value));

document.querySelectorAll(".tab").forEach(b=>b.onclick=()=>showTab(b.dataset.tab));
document.querySelectorAll(".cardlink").forEach(b=>b.onclick=()=>showTab(b.dataset.go));
function showTab(id){document.querySelectorAll(".tab").forEach(b=>b.classList.toggle("active",b.dataset.tab===id));document.querySelectorAll(".panel").forEach(p=>p.classList.toggle("active",p.id===id));window.scrollTo({top:0,behavior:"smooth"});}

function n(id){return Number(document.getElementById(id).value)}
function calcCellCount(){const c=n("cellsCounted"),d=n("dilution"),a=n("area"),dep=n("depth"); const r=c*d/(a*dep); document.getElementById("cellResult").textContent=`Result: ${r.toLocaleString(undefined,{maximumFractionDigits:1})} cells/µL`;}
function calcIndices(){const hb=n("hb"),hct=n("hct"),rbc=n("rbc"); if(!hb||!hct||!rbc)return; const mcv=hct*10/rbc,mch=hb*10/rbc,mchc=hb*100/hct; document.getElementById("indexResult").innerHTML=`MCV: ${mcv.toFixed(1)} fL<br>MCH: ${mch.toFixed(1)} pg<br>MCHC: ${mchc.toFixed(1)} g/dL`;}
function calcRetic(){const r=n("retics"),t=n("totalRbc"); document.getElementById("reticResult").textContent=t>0?`Reticulocyte %: ${(r/t*100).toFixed(2)}%`:"Enter a valid total count."}
function calcCorrectedRetic(){const p=n("reticPct"),h=n("patientHct"),ref=n("refHct"); document.getElementById("correctedReticResult").textContent=ref>0?`Corrected reticulocyte %: ${(p*h/ref).toFixed(2)}%`:"Enter a valid reference Hct."}
function calcINR(){const pt=n("ptPatient"),normal=n("ptNormal"),isi=n("isi"); document.getElementById("inrResult").textContent=normal>0?`INR: ${Math.pow(pt/normal,isi).toFixed(2)}`:"Enter a valid normal PT."}

const questions=[
["Which chamber is commonly used for manual cell counting?","Neubauer improved counting chamber",["Neubauer improved counting chamber","Petri dish","Centrifuge tube","Capillary tube"]],
["MCV is expressed in which unit?","fL",["g/dL","fL","pg","%"]],
["MCH represents:","Average hemoglobin content per red cell",["Average cell volume","Average hemoglobin content per red cell","Packed cell volume","Platelet volume"]],
["A differential leukocyte count reports:","Relative proportions of leukocyte types",["Only RBC size","Relative proportions of leukocyte types","Serum proteins","Coagulation time"]],
["ESR is commonly reported as:","mm/hour",["g/dL","fL","mm/hour","cells/µL"]],
["Reticulocytes are:","Young red cells with residual ribosomal material",["Mature platelets","Young red cells with residual ribosomal material","Plasma proteins","Mature neutrophils"]],
["MCHC is calculated using Hb and:","Hematocrit",["WBC count","Hematocrit","ESR","Platelet count"]],
["PT primarily evaluates:","Extrinsic and common coagulation pathways",["Only platelets","Extrinsic and common coagulation pathways","RBC morphology","ESR"]],
["Which is a smear-quality consideration?","A suitable thin, well-distributed smear",["Only tube color","A suitable thin, well-distributed smear","Patient age alone","Room number"]],
["Manual counting accuracy depends strongly on:","Correct dilution, chamber loading and systematic counting",["Guessing the count","Correct dilution, chamber loading and systematic counting","Changing formulas each time","Skipping quality checks"]]
];
let quiz=[],qi=0,score=0,answered=false;
function shuffle(a){return [...a].sort(()=>Math.random()-.5)}
function startQuiz(){quiz=shuffle(questions);qi=0;score=0;answered=false;renderQuiz();showTab("quiz")}
function renderQuiz(){if(qi>=quiz.length){document.getElementById("quizBox").innerHTML=`<h2>Quiz complete 🎉</h2><p>Your score: <b>${score}/${quiz.length}</b></p><button onclick="startQuiz()">Try Again</button>`;localStorage.setItem("lastQuiz",`${score}/${quiz.length}`);updateStats();return}
 const q=quiz[qi]; document.getElementById("quizBox").innerHTML=`<div class="tag">Question ${qi+1}/${quiz.length}</div><h2>${q[0]}</h2><div>${shuffle(q[2]).map(o=>`<button class="option" onclick="answer(this,${JSON.stringify(o)})">${o}</button>`).join("")}</div><div id="feedback"></div>`;
 answered=false;
}
function answer(btn,opt){if(answered)return;answered=true;const q=quiz[qi],ok=opt===q[1];btn.classList.add(ok?"correct":"wrong");if(ok)score++;document.querySelectorAll(".option").forEach(b=>{if(b.textContent===q[1])b.classList.add("correct")});document.getElementById("feedback").innerHTML=`<div class="feedback">${ok?"✅ Correct!":"❌ Not quite."} <b>Answer:</b> ${q[1]}<br><small>${qi<quiz.length-1?"Tap the button below to continue.":"Tap below to finish."}</small><br><button onclick="qi++;renderQuiz()">Next →</button></div>`}

const vivas=[
["What is the purpose of a Neubauer chamber?","It provides a defined grid, area and depth for manual cell counting."],
["What does PCV measure?","The proportion of blood volume occupied by red blood cells."],
["What does MCV indicate?","The average volume of individual red blood cells."],
["Why is a peripheral smear examined?","To assess blood-cell morphology and support differential interpretation."],
["What is DLC?","Differential leukocyte count—the relative distribution of different white-cell types."],
["What is ESR?","The rate at which red cells settle in a vertical column of blood under standardized conditions."],
["What is a reticulocyte?","A young erythrocyte containing residual ribosomal material detectable with a supravital stain."],
["What is INR?","An internationally standardized expression of prothrombin time used for coagulation monitoring."],
["Why should laboratory SOPs be followed?","They standardize procedures, support quality and help maintain safe, reliable results."],
["Why is smear quality important?","Poor thickness, staining or distribution can make morphology assessment unreliable."]
];
let vi=0;
function renderViva(){const q=vivas[vi];document.getElementById("vivaBox").innerHTML=`<div class="tag">Viva ${vi+1}/${vivas.length}</div><div class="viva-question">${q[0]}</div><button onclick="document.getElementById('vivaAnswer').classList.remove('hidden')">Show answer</button><div id="vivaAnswer" class="answer hidden">${q[1]}</div>`}
function nextViva(){vi=(vi+1)%vivas.length;renderViva()} renderViva();


const morphology=[
["🔴","Neutrophil","Usually multilobed nucleus; fine cytoplasmic granules. Main normal circulating granulocyte."],
["🟣","Lymphocyte","Typically round dense nucleus with a relatively small rim of cytoplasm in a small mature lymphocyte."],
["🟠","Monocyte","Large cell with abundant gray-blue cytoplasm and a folded or indented nucleus."],
["🟡","Eosinophil","Typically bilobed nucleus with prominent coarse eosinophilic granules."],
["🟤","Basophil","Coarse dark granules may partly obscure the nucleus."],
["🔴","Erythrocyte","Mature RBC is anucleate and normally shows central pallor with a biconcave-disc appearance on a well-made smear."],
["🟢","Platelet","Small cytoplasmic fragments involved in primary hemostasis; best assessed at appropriate smear areas."]
];
function renderMorphology(){
 const g=document.getElementById("morphologyGrid"); if(!g)return; g.innerHTML="";
 morphology.forEach(x=>{const d=document.createElement("article");d.className="card cell-card";d.innerHTML=`<div class="cell-icon">${x[0]}</div><h3>${x[1]}</h3><p>${x[2]}</p>`;g.appendChild(d)})
}
renderMorphology();

const dlcTypes=["Neutrophil","Lymphocyte","Monocyte","Eosinophil","Basophil"];
let dlc={Neutrophil:0,Lymphocyte:0,Monocyte:0,Eosinophil:0,Basophil:0};
function resetDLC(){dlc={Neutrophil:0,Lymphocyte:0,Monocyte:0,Eosinophil:0,Basophil:0};renderDLC()}
function renderDLC(){
 const total=Object.values(dlc).reduce((a,b)=>a+b,0);
 document.getElementById("dlcCount").innerHTML=dlcTypes.map(t=>`<div><strong>${dlc[t]}</strong><span>${t}</span></div>`).join("");
 document.getElementById("dlcButtons").innerHTML=dlcTypes.map(t=>`<button class="dlc-btn" onclick="addDLC('${t}')" ${total>=100?"disabled":""}>➕ ${t}</button>`).join("");
 const r=document.getElementById("dlcResult");
 if(total<100)r.textContent=`Cells counted: ${total}/100`;
 else r.innerHTML=`<b>100-cell DLC complete.</b><br>`+dlcTypes.map(t=>`${t}: ${dlc[t]}%`).join(" • ");
}
function addDLC(t){const total=Object.values(dlc).reduce((a,b)=>a+b,0);if(total<100){dlc[t]++;renderDLC()}}
resetDLC();

let exam=[],ei=0,escore=0,examStarted=false,examTimer=null,examSeconds=600;
function startExam(){
 exam=shuffle(questions.concat(vivas.map(v=>[v[0],v[1],[v[1],"Not applicable","None","All of these"]]))).slice(0,20);
 ei=0;escore=0;examStarted=true;examSeconds=600;clearInterval(examTimer);
 examTimer=setInterval(()=>{examSeconds--;renderExamTimer();if(examSeconds<=0){clearInterval(examTimer);finishExam()}},1000);
 renderExam();
}
function renderExamTimer(){const el=document.getElementById("examTimer");if(el){const m=Math.floor(examSeconds/60),sec=String(examSeconds%60).padStart(2,"0");el.textContent=`Time: ${m}:${sec}`}}
function renderExam(){
 if(!examStarted)return;
 if(ei>=exam.length){finishExam();return}
 const q=exam[ei];
 document.getElementById("examBox").innerHTML=`<div id="examTimer" class="timer"></div><div class="tag">Question ${ei+1}/20</div><h2>${q[0]}</h2>${shuffle(q[2]).map(o=>`<button class="option" onclick="examAnswer(this,${JSON.stringify(o)})">${o}</button>`).join("")}<div id="examFeedback"></div>`;
 renderExamTimer();
}
function examAnswer(btn,opt){if(btn.dataset.done)return;btn.dataset.done="1";const q=exam[ei];const ok=opt===q[1];if(ok){escore++;btn.classList.add("correct")}else{btn.classList.add("wrong")}document.querySelectorAll("#examBox .option").forEach(b=>{if(b.textContent===q[1])b.classList.add("correct")});document.getElementById("examFeedback").innerHTML=`<div class="feedback">${ok?"Correct":"Incorrect"} — answer: <b>${q[1]}</b><br><button onclick="ei++;renderExam()">Next →</button></div>`}
function finishExam(){clearInterval(examTimer);examStarted=false;document.getElementById("examBox").innerHTML=`<h2>Exam complete 🎉</h2><p>Score: <b>${escore}/20</b></p><p>${escore>=14?"Good work!":"Keep practising and review the practical modules."}</p><button onclick="startExam()">Try Again</button>`;localStorage.setItem("examScore",`${escore}/20`)}

function updateStats(){document.getElementById("quizScore").textContent=localStorage.getItem("examScore")||localStorage.getItem("lastQuiz")||"—";document.getElementById("progressCount").textContent=localStorage.getItem("completedPracticals")||"0"}
updateStats();
document.querySelectorAll(".calc button").forEach(()=>{});
let deferredPrompt;window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;document.getElementById("installBtn").classList.remove("hidden")});
document.getElementById("installBtn").onclick=async()=>{if(deferredPrompt){deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;document.getElementById("installBtn").classList.add("hidden")}};
