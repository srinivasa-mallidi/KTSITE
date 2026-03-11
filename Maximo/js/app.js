
function loadServers(){
  document.getElementById("content").innerHTML = renderServerSection();
}

function loadSupport(){
  document.getElementById("content").innerHTML = renderSupportSection();
}

function loadServerSide(){
  document.getElementById("content").innerHTML = renderServerSideSection();
}

function loadARO(){
  document.getElementById("content").innerHTML = renderAROSection();
}

function loadCore(){
  document.getElementById("content").innerHTML = renderCoreSection();
}

function loadMobile(){
  document.getElementById("content").innerHTML = renderMobileSection();
  initMobileSection();
}

function loadManage(){
  document.getElementById("content").innerHTML = renderManageSection();
  initializeManageSection(); 
}


function loadCustomizations() {
    document.getElementById("content").innerHTML = renderCustomizationsSection();
    initCustomizationsSection();
}

loadServers();