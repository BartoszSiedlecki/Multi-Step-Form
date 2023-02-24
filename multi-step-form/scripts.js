const formStep = document.querySelectorAll("[data-step]")
const buttonsNext = document.getElementsByName("next-step")
const buttonsBack = document.getElementsByName("prev-step")
const stepNumbers = document.getElementsByName("step-numbers")
const stepOneInputs = document.getElementsByName("one-input")
const stepTwoPlans = document.getElementsByName("plan-select")
const stepTwoSwitch = document.querySelector(".switch")
const switchOption = document.getElementsByName("switch-option")
const switchToggle = stepTwoSwitch.querySelector(".toggle")
const subPlanCont = document.getElementById("sub-plan")
const subTimeCont = document.getElementById("sub-time")
const subPriceCont = document.getElementById("sub-price")
const addOnCheckboxes = document.getElementsByName("add-on-checkboxes")
const addOnSummary = document.getElementById("sum-up-add-on-panel")
const onlineServiceCont = document.getElementById("online-service")
const largerStorageCont = document.getElementById("larger-storage")
const customizableProfileCont = document.getElementById("customizable-profile")
const changePlanBtn = document.getElementById("change-plan-btn")
const totalPerCont = document.getElementById("total-per-cont")
const finalPriceCont = document.getElementById("final-price-cont")
const personalInfo = document.getElementById("personal-info")

formData = {
    name: "",
    email: "",
    number: ""
}

let currentStep = 0

let subPlan = ""
let subPrice = 0
let subTime = ""

let onlineService = 0
let largerStorage = 0
let customizableProfile = 0

let addOnPriceOS = 0
let addOnPriceLS = 0
let addOnPriceCP = 0

let finalPrice = 0;

buttonsNext.forEach(function(button){
    button.addEventListener("click", nextStep)
})

buttonsBack.forEach(function(button){
    button.addEventListener("click", prevStep)
})

stepOneInputs.forEach(function(input){
    input.addEventListener("click", clearInput)
})

stepTwoPlans.forEach(function(plan){
    plan.addEventListener("click", selectPlan)
})

addOnCheckboxes.forEach(function(addOn){
    addOn.addEventListener("click", getAddOn)
})

switchToggle.addEventListener("click", toggleSub)

changePlanBtn.addEventListener("click", changePlan)

personalInfo.addEventListener("submit", e => {
    e.preventDefault()
    let data = []
    stepOneInputs.forEach(input => {
        data.push(input.value)
    })
    formData.name = data[0]
    formData.email = data[1]
    formData.number = data[2]
    nextStep()
})

function nextStep(){
    formStep[currentStep].classList.toggle("active")
    stepNumbers[currentStep].classList.toggle("number-active")
    currentStep += 1
    changePage()
    checkForAddons()
    sumUpPrice()
}

function prevStep(){
    formStep[currentStep].classList.toggle("active")
    stepNumbers[currentStep].classList.toggle("number-active")
    currentStep -= 1;
    changePage()
}

function clearInput(){
    if (this.value == 'e.g. Stephen King' || this.value == 'e.g. stephenking@lorem.com' || this.value == 'e.g. +1 234 567 890'){
        this.value= ""
   }
}

function selectPlan(){
    for(const plan of stepTwoPlans){
        plan.classList.remove("plan-active")
    }
    this.classList.add("plan-active")
    getSubPlan(this)
}

function getSubPlan(target){
    let pricePer = "/mo"
    if(target.classList.contains("arcade")){
        subPlan = "Arcade"
        subPrice = 9
    }else if(target.classList.contains("advanced")){
        subPlan = "Advanced"
        subPrice = 12
    }else if(target.classList.contains("pro")){
        subPlan = "Pro"
        subPrice = 15
    }else{
        subPlanCont.innerHTML = "Unknown"
    }
    if(subTime == "(Yearly)"){
        subPrice *= 12
        pricePer = "/yr"
    }   
    subPriceCont.innerHTML = "$"+subPrice+pricePer
    subPlanCont.innerHTML = subPlan
}

function toggleSub(){
    this.classList.toggle("toggle-active")
    switchOption[0].classList.toggle("option-disabled")
    switchOption[1].classList.toggle("option-disabled")
    if(switchOption[0].classList.contains("option-disabled")){
        subTime = "(Yearly)"
        subPrice *= 12
        subPriceCont.innerHTML = "$"+subPrice+"/yr"
    }else{
        subTime = "(Monthly)"
        switch(subPlan){
            case "Arcade":{
                subPrice = 9
            }break
            case "Advanced":{
                subPrice = 12
            }break
            case "Pro":{
                subPrice = 15
            }
        }
        subPriceCont.innerHTML = "$"+subPrice+"/mo"
    }
    subTimeCont.innerHTML = subTime
}

function getAddOn(){
    this.classList.toggle("add-on-check-clicked")
    if(this.classList.contains("online-service")){
        if(onlineService == 0){
            onlineService = 1
        }else if(onlineService == 1){
            onlineService = 0
        }
    }else if(this.classList.contains("larger-storage")){
        if(largerStorage == 0){
            largerStorage = 1
        }else if(largerStorage == 1){
            largerStorage = 0
        }
    }else if(this.classList.contains("customizable-profile")){
        if(customizableProfile == 0){
            customizableProfile = 1
        }else if(customizableProfile == 1){
            customizableProfile = 0
        }
    }
}

function checkForAddons(){
    let toggleYear = "/mo"
    if(onlineService == 1){
        addOnPriceOS = 1
        if(subTime == "(Yearly)"){
            addOnPriceOS *= 12
            toggleYear = "/yr"
        }
        onlineServiceCont.innerHTML = `
            <h5 class="sum-up-add-on-name">Online Service</h5>
            <h5 class="sum-up-add-on-price">$`+ addOnPriceOS+toggleYear +`</h5>
        `
    }else if(onlineService == 0){
        onlineServiceCont.innerHTML = ""
        addOnPriceOS = 0
    }
    if(largerStorage == 1){
        addOnPriceLS = 2
        if(subTime == "(Yearly)"){
            addOnPriceLS *= 12
            toggleYear = "/yr"
        }
        largerStorageCont.innerHTML = `
            <h5 class="sum-up-add-on-name">Larger Storage</h5>
            <h5 class="sum-up-add-on-price">$`+ addOnPriceLS+toggleYear +`</h5>
        `
    }else if(largerStorage == 0){
        largerStorageCont.innerHTML = ""
        addOnPriceLS = 0
    }
    if(customizableProfile == 1){
        addOnPriceCP = 2
        if(subTime == "(Yearly)"){
            addOnPriceCP *= 12
            toggleYear = "/yr"
        }
        customizableProfileCont.innerHTML = `
            <h5 class="sum-up-add-on-name">Customizable Profile</h5>
            <h5 class="sum-up-add-on-price">$`+ addOnPriceCP+toggleYear +`</h5>
        `
    }else if(customizableProfile == 0){
        customizableProfileCont.innerHTML = ""
        addOnPriceCP = 0
    }
}

function sumUpPrice(){
    finalPrice = subPrice + addOnPriceOS + addOnPriceLS + addOnPriceCP
    if(subTime === "(Yearly)"){
        totalPerCont.innerHTML = "Total (per year)"
        finalPriceCont.innerHTML = "$"+finalPrice+"/yr"
    }
    else{
        totalPerCont.innerHTML = "Total (per month)"
        finalPriceCont.innerHTML = "$"+finalPrice+"/mo"
    }
    
    
}

function changePlan(){
    changePage()
    currentStep = 1
    changePage()
}

function changePage(){
    formStep[currentStep].classList.toggle("active")
    stepNumbers[currentStep].classList.toggle("number-active")
}