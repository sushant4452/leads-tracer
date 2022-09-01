let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const saveBtn = document.getElementById("save-btn")

let leadsFromLocalStore = JSON.parse(localStorage.getItem("myLeads"))
if(leadsFromLocalStore){
    myLeads = leadsFromLocalStore
    render(myLeads)
}
saveBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads" , JSON.stringify(myLeads))
    render(myLeads)
    })
    
})
function render(lead){
    let listItems = ""
    for(let i = 0; i< lead.length; i++){
        listItems += 
        `<li>
            <a target = '_blank' href = '${lead[i]}'>
            ${lead[i]}
            </a>
        </li>`
    }
    ulEl.innerHTML = listItems

}

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
   render(myLeads)
})

inputBtn.addEventListener("click", function(){
    
    myLeads.push(inputEl.value);
    inputEl.value = '';
    localStorage.setItem("myLeads" , JSON.stringify(myLeads))
    render(myLeads)

})
