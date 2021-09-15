// Click handlers
// Add click event to all A-tags in .topnav except 'home'
$(".topnav a").click(function(){
    const html          = $(this).html().toLowerCase()
    const blob_selector = `.blobHolder3.${html}`
    let selectors       = ["contact", "works", "impressum"]
    const sel_idx       = selectors.indexOf(html)

    if (!$(blob_selector).length){
        return
    }

    // Specific
    changeClass(blob_selector, "clicked")
    
    switch (html){
        case "contact":
            updateContactPage();
            break;
        case "works":
            updateWorksPage();
            break;
        case "impressum":
            updateImpressumPage();
            break;
    }

    // General
    changeClass(".landingPage_title", "hidden")
    changeClass(".landingMobile_title", "hidden")

    changeClass(".topnav", "visible")
    if (!hasClass(".topnav", "visible")){
        $(".topnav a:first-child").css("visibility", "visible")
        $(".topnav a:first-child").css("opacity", "1")
    }
    setTimeout(changeBodyColor, 1000*2)
})
// Home click event reverts all changes to the landing page
$(".topnav a:first-child").click(function(){
    revertToHome()

    if (!hasClass(".topnav", "visible")){
        $(".topnav").addClass("visible")
    }
    setTimeout(changeBodyColor, 0)
})

function disableBlobs(){
    $(".blobHolder3").css("visibility", "hidden")
}
disableBlobs()

// Executing when page is loaded
// $(".contactItem").each(
//     function(){
//         let active = $(this)
//         active.hover(
//             () => active.addClass("jiggle"),
//             () => active.removeClass("jiggle")
//         )
//     }
// )

hover_expr = (element) => element.hover(
    () => element.addClass("jiggle"),
    () => element.removeClass("jiggle")
)

animDelayOnChildren(".topnav", (i) => `${i*2}00`, false, true)
animDelayOnChildren(".contactHolder ul", (i) => `${i+10}00`, false, true)
animDelayOnChildren(".landingMobile_title", (i) => `${i*1250}`, false, false, true)


// Fires after the given time passed, the given time is the duration of the startig animation
setTimeout(function() {
    $(".topnav").addClass("visible")   
}, ms_duration)

// Little fix cuz the svg gets cut of before the animation finishes
setTimeout(function(){
    $(".overflowwrapper").children().each(function(){
        $(this).addClass("overflowwrapper")
    }) 
}, ms_duration*4)