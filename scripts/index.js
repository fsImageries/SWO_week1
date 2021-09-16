// Definitions and Declarations
const duration    = $(":root").css("--first-anim-duration")
const ms_duration = parseInt(duration) * 1000 - 500
const childs      = $(".topnav").children()
var   isTouch     = isTouchDevice()
var landingMobile_small_mquery = window.matchMedia("(max-width: 300px)")


function isTouchDevice() {
    return (('ontouchstart' in window) ||
       (navigator.maxTouchPoints > 0) ||
       (navigator.msMaxTouchPoints > 0));
}

function changeClass(selector, key){
    if (!hasClass(selector, key)){
        $(selector).addClass(key)
    } else {
        $(selector).removeClass(key)
    } 
}

function hasClass(selector, key){
    if (!$(selector).attr("class").includes(key)){
        return false
    } else {
        return true
    } 
}

function animDelayOnChildren(element, eval_exp, exe_expr=false, transition=false, reverse=false){
    let childs = $(element).children()
    const delay_attr = transition ? "transition-delay" : "animation-delay"

    if (reverse){
        childs = childs.toArray().reverse()
    }
    
    for (i=0;i<childs.length;i++){
        let child = $(childs[i])
        child.css(delay_attr, `${eval_exp(i)}ms`)

        if(exe_expr){exe_expr(child)}
    }
}

function getActivePage(){
    const contact = $(".blobHolder3.contact").attr("class").includes("clicked")
    const works = $(".blobHolder3.works").attr("class").includes("clicked")
    const impress = $(".blobHolder3.impressum").attr("class").includes("clicked")

    if(contact) {return "contact"}
    else if (works) {return "works"}
    else if (impress){return "impressum"}
    else {return "home"}
}

function changeBodyColor(){
    const active_page = getActivePage()

    if (active_page === "contact"){
        var color = $(":root").css("--barbie-pink")
        $(".blobHolder path, .blobHolder2 path").css("fill", color)
        // $(".blobHolder3.works, .blobHolder3.impressum").css("display", "none")
    } 
    else if (active_page === "works"){
        var color = $(":root").css("--back-works-blob")
        $(".blobHolder path, .blobHolder2 path").css("fill", color)
        // $(".blobHolder3.contact, .blobHolder3.impressum").css("display", "none")
    } 
    else if (active_page === "impressum"){
        var color = $(":root").css("--back-impressum-blob")
        $(".blobHolder path, .blobHolder2 path").css("fill", color)
        // $(".blobHolder3.works, .blobHolder3.works").css("display", "none")
    }
    else if (active_page === "home"){
        var color = $(":root").css("--royal-blue-dark")
        $(".blobHolder path").css("fill", $(":root").css("--vivid-sky-blue"))
        $(".blobHolder2.a path").css("fill", $(":root").css("--sapphire-blue"))
        $(".blobHolder2.b path").css("fill", $(":root").css("--denim-blue"))
        // $(".blobHolder3.works, .blobHolder3.impressum, .blobHolder3.contact").css("display", "none")
    }
    $("body").css("background-color", color)
}

function revertToHome(){
    const active_page = getActivePage()

    $(".blobHolder3").each(function(){
        if ($(this).attr("class").includes("clicked")){
            $(this).removeClass("clicked")}
    })

    switch (active_page){
        case "contact":
            updateContactPage(revert=true);
            break;

        case "works":
            updateWorksPage(revert=true);
            break;

        case "impressum":
            updateImpressumPage(revert=true)
            break;
    }

    $(".landingPage_title").removeClass("hidden")
    $(".landingMobile_title").removeClass("hidden")
}

function updateContactPage(revert=false){
    if (revert){
        // $(".blobHolder3.works, .blobHolder3.impressum").css("display", "block")
        $(".blobHolder3.contact").css("visibility", "hidden")

        $(".contactHolder").css("transition", ".5s")
    } else {
        // $(".blobHolder3.works, .blobHolder3.impressum").css("display", "none")
        $(".blobHolder3.contact").css("visibility", "visible")

        $(".contactHolder").css("transition", "4s")
    }
    
    changeClass(".contactHolder", "clicked")
}

function updateWorksPage(revert=false){
    // changeClass(".worksHolder", "clicked")

    if (revert){
        // $(".blobHolder3.impressum, .blobHolder3.contact").css("display", "block")
        $(".blobHolder3.works").css("visibility", "hidden")

        $(".worksHolder").removeClass("clicked")
        $(".imageGrid .parent").css("transition", "0.5s")
        
        animDelayOnChildren(".imageGrid", (i) => `${i*1.5}0`, false, true, true)
        $(".worksHolder").css("visibility", "hidden")
    } else {
        // $(".blobHolder3.impressum, .blobHolder3.contact").css("display", "none")
        $(".blobHolder3.works").css("visibility", "visible")

        $(".worksHolder").addClass("clicked")
        $(".worksHolder").css("visibility", "visible")
        $(".imageGrid .parent").css("transition", "1s")
        // $(".imageGrid .parent").css("transform", "scale(1)")
        animDelayOnChildren(".imageGrid", (i) => `${i+5}00`, false, true)
        
    }
}

function updateImpressumPage(revert=false){
    if (revert){
        // $(".blobHolder3.works, .blobHolder3.contact").css("display", "block")
        $(".blobHolder3.impressum").css("visibility", "hidden")

        $(".impressumHolder").css("transition", ".5s")
        $(".impressumHolder").addClass("hidden")
    } else {
        // $(".blobHolder3.works, .blobHolder3.contact").css("display", "none")
        $(".blobHolder3.impressum").css("visibility", "visible")

        $(".impressumHolder").removeClass("hidden")
        $(".impressumHolder").css("transition", "3s")
    }
}

function landingMobile_space(){
$(".landingMobile_title .text").each(function(index){
    const mult = landingMobile_small_mquery.matches ? 6: 5
    $(this).css("top", `${index*mult}vh`)
})
}