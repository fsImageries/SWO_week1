var works_small_mquery = window.matchMedia("(max-width: 450px)")
var works_mid_mquery = window.matchMedia("(max-width: 900px)")
var works_big_mquery = window.matchMedia("(min-width: 900px)")
var last_elem
var last_elems
var objs 

$.get('data/images2.csv', function(data) {
  objs = $.csv.toObjects(data)
  for (obj of objs){
    
    let parent = `<div class="parent ${obj.name}" onclick="window.open('${obj.link}', '_blank')"></div>`
    let child = `<div class="child" style="background-image: url('${obj.filepath.replaceAll("\\", "/")}')"></div>`
    let text = `<div class="childText">${obj.name.replaceAll("_", " ")}</div>`

    parent = $(parent).append(child)
    parent = $(parent).append(text)
    $(".imageGrid").append(parent)
}
  $(".imageGrid").append("<div class='parent'></div>")
}, 'text');


// Helpers
function isBottom(range=0){
  let elem = $(".worksHolder")
  return elem[0].scrollHeight - elem.scrollTop() <= (elem.outerHeight() + range)
}

function isTop(range=0){
  let elem = $(".worksHolder")
  return elem.scrollTop() <= range
}

function getParentSiblings(element, idx1=1, idx2=2){
  let parent = $(element).parent()
  let index = $(".parent").index(parent)
  let active_elems = $(".parent").slice(index-idx1, index+idx2)
  return active_elems
}

// Scroll functions for title display
function scroll_1x_title(clear_item){
      
  let cur_elem = document.elementFromPoint($(window).width()/2, $(window).height()/2);
  let parent = $(cur_elem).parent()

  parent.children().addClass("hovered")

  if (last_elem === undefined){
    last_elem = cur_elem
  }

  if (last_elem != cur_elem){
    let last_parent = $(last_elem).parent()
    last_parent.children().removeClass("hovered")
    last_elem = cur_elem
  }

  if (clear_item){
    clearInterval(clear_item)
  }
}

function scroll_2x_title(clear_item){
  let cur_elem
  if (isTop(50)){
    cur_elem = $(".child")[0]
  }
  else if (isBottom(50)){
    cur_elem = $(".child")[$(".child").length-2]
  }
  else {
    cur_elem = document.elementFromPoint($(window).width()/4, $(window).height()/2);
  }

  active_elems = getParentSiblings(cur_elem, 0, 2)
  active_elems.children().addClass("hovered2")
  active_elems.each(function(index){
    animDelayOnChildren(this, (i) => `${index*4}00`, false, false)
  })

  if (last_elem === undefined){
    last_elems = cur_elem
  }

  if (last_elem != cur_elem){
    let last_active_elems = getParentSiblings(last_elem, 0, 2)
    last_active_elems.children().removeClass("hovered2")
    last_elem = cur_elem
  }

  if (clear_item){
    clearInterval(clear_item)
  }
}

function scroll_3x_title(clear_item){
  let cur_elem
  if (isTop(100)){
    cur_elem = $(".child")[1]
  }
  else if (isBottom(100)){
    cur_elem = $(".child")[$(".child").length-2]
  }
  else {
    cur_elem = document.elementFromPoint($(window).width()/2, $(window).height()/2);
  }

  active_elems = getParentSiblings(cur_elem)
  active_elems.children().addClass("hovered2")
  active_elems.each(function(index){
    animDelayOnChildren(this, (i) => `${index*4}00`, false, false)
  })

  if (last_elem === undefined){
    last_elems = cur_elem
  }

  if (last_elem != cur_elem){
    let last_active_elems = getParentSiblings(last_elem)
    last_active_elems.children().removeClass("hovered2")
    last_elem = cur_elem
  }

  if (clear_item){
    clearInterval(clear_item)
  }
}

// Wait for images to be loaded into the imageGrid
function waitTillFinished(func){
  const wait_until_element_appear = setInterval(function(wait_until_element_appear){
    func(wait_until_element_appear)
  }, 0);
}

// Main decision making function
function setupWorksTitle(){
  if (!isTouchDevice()){
    // Wait till all images got loaded by works.js
    const wait_until_element_appear = setInterval(
      function (){
      if ($(".imageGrid .child").length !== 0) {
    
        $(".imageGrid .parent").hover(
            function(){
                const childs = $(this).children()
                $(childs).addClass("hovered")
            },
            function(){
                const childs = $(this).children()
                $(childs).removeClass("hovered")
            }
        )
        clearInterval(wait_until_element_appear);
      }
    }, 0);
  } 
  else if (works_small_mquery.matches){
    waitTillFinished(scroll_1x_title)
    $(".worksHolder").scroll(scroll_1x_title)
}
  else if (works_mid_mquery.matches){
    waitTillFinished(scroll_2x_title)
    $(".worksHolder").scroll(scroll_2x_title)
  }
  else if (works_big_mquery){
    waitTillFinished(scroll_3x_title)
    $(".worksHolder").scroll(scroll_3x_title)
  }
}

setupWorksTitle()
$(window).resize(setupWorksTitle)




