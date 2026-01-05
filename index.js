// local storage implementations

let myleads=[]
const inputEl=document.getElementById("input-el")
const inputBtn=document.getElementById("input-btn")
const leads=JSON.parse(localStorage.getItem("myleads")) //bringing from local storage
if(leads){
    myleads=leads
       render(myleads)
}
const deleteBtn=document.getElementById("delete-btn")
deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myleads=[]
    render(myleads)
})
inputBtn.addEventListener("click",function(){
    myleads.push(inputEl.value)
    inputEl.value=""
    localStorage.setItem("myleads",JSON.stringify(myleads))
 render(myleads)
    
     // imp : so once we refresh we loose our data so to avoid
    // that we need to set up local storage for our chrome extension

})

const tabBtn=document.getElementById("tab-btn")
tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
    myleads.push(tabs[0].url)
localStorage.setItem("myleads",JSON.stringify(myleads))
render(myleads)})
})

function render(leads){
ulEl=document.getElementById("ul-el")
let items=[]
for(let i=0;i<leads.length;i++){
    // items +="<li> <a target='_blank' href=' " + myleads[i] +" '> "+myleads[i]+ "</a> </li>"
    // using template strings to avoid multiple single and double quotes
    // using target and blank enables link to open in a new tab
    items+= `<li>
    <a target='_blank' href='${leads[i]}'>
    ${leads[i]} 
    </a>
    </li>`
}
console.log(localStorage.getItem("leads"))
    ulEl.innerHTML=items
}