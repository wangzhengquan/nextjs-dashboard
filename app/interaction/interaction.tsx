'use client';
import $ from "@/app/components/dom";

$(document).on('change', '#left-panel-collapse-btn', function(e) {
  console.log('changed', e.target.checked);
  if (e.target.checked) {
    $('#left-panel').addClass('collapsed');
  }
  else {
    $('#left-panel').removeClass('collapsed');
  }
});


const openFloatLeftPanel = () => {
  $('#float-left-panel').addClass('opened');
  $('.backdrop-panel').addClass('opened');
}

const closeFloatLeftPanel = () => {
  $('#float-left-panel').removeClass('opened');
  $('.backdrop-panel').removeClass('opened');
}

$(document).on('click', '#open-float-left-panel-btn', function(e) {
  console.log('open-float-left-panel-btn clicked');
  openFloatLeftPanel()
});

$(document).on('click', '#close-float-left-panel-btn', function(e) {
  closeFloatLeftPanel()
});

$(document).on('click', '.backdrop-panel', function(event){
  closeFloatLeftPanel();
});

$(document).on('click', '.nav-link', function(event){
  closeFloatLeftPanel();
});

export default function Interaction({}) {
  return (
    <></>
  );
}

 
