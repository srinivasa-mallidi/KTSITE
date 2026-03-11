function renderServerSection(){

  return `
    <div class="section-card">

      <div class="section-title">Maximo Environment – Server & DB Details</div>

      <div class="env-tabs">
        <button class="env-btn active" onclick="loadEnv('qgctest')">QGC TEST</button>
        <button class="env-btn" onclick="loadEnv('qgcprod')">QGC PROD</button>
        <button class="env-btn" onclick="loadEnv('sttltest')">STTL TEST</button>
        <button class="env-btn" onclick="loadEnv('sttlprod')">STTL PROD</button>
      </div>

      <div id="envContent" class="env-content"></div>

    </div>
  `;
}


/* ---------- ENV DATA ---------- */

const environments = {

  qgctest: {
    name: "QGC TEST",
    manage:"https://qgctest2.manage.qgctest2.apps.qgctest.maximo.shell.com/maximo/",
    mobile:"https://qgctest2.home.qgctest2.apps.qgctest.maximo.shell.com/",
    core:"https://admin.qgctest2.apps.qgctest.maximo.shell.com/",
    aro:"https://console-openshift-console.apps.qgctest.maximo.shell.com/",
    deploy:"AAENLO3459ARO (10.166.149.37)",
    db:"AAENLO3459ARO1.linux.shell.com (10.166.146.36)",
    dbname:"AQMXDBUAT",
    custom:"http://10.166.149.37/QGC_TEST_CUST_CLASSES/"
  },

  qgcprod: {
    name: "QGC PROD",
    manage:"https://qgcprod.manage.qgcprod.apps.qgcprod.maximo.shell.com/maximo/",
    mobile:"https://qgcprod.home.qgcprod.apps.qgcprod.maximo.shell.com/",
    core:"https://admin.qgcprod.apps.qgcprod.maximo.shell.com/",
    aro:"https://console-openshift-console.apps.qgcprod.maximo.shell.com/",
    deploy:"AAENL03567ARO2 (10.166.150.70)",
    db:"AAEPL03567ORA1.linux.shell.com (10.166.150.68)",
    dbname:"AQMXDBPRD",
    custom:"http://10.166.150.70/QGC_PROD_CUST_CLASSES/"
  },

  sttltest: {
    name: "STTL TEST",
    manage:"https://sttltest1.manage.sttltest1.apps.sttltest.maximo.shell.com/maximo/",
    mobile:"https://sttltest1.home.sttltest1.apps.sttltest.maximo.shell.com/",
    core:"https://admin.sttltest1.apps.sttltest.maximo.shell.com/",
    aro:"https://console-openshift-console.apps.sttltest.maximo.shell.com/",
    deploy:"AUWNL03527ARO4 (10.1.134.6)",
    db:"AUWNL03527ORA1.linux.shell.com (10.1.134.4)",
    dbname:"ATMXDBUAT",
    custom:"http://10.1.134.6/STTL_TEST_CUST_CLASSES/"
  },

  sttlprod: {
    name: "STTL PROD",
    manage:"https://sttlprod.manage.sttlprod.apps.sttlprod.maximo.shell.com/maximo/",
    mobile:"https://sttlprod.home.sttlprod.apps.sttlprod.maximo.shell.com/",
    core:"https://admin.sttlprod.apps.sttlprod.maximo.shell.com/",
    aro:"https://console-openshift-console.apps.sttlprod.maximo.shell.com/",
    deploy:"AUWPL03571ARO1 (10.1.135.71)",
    db:"AUWPL03571ORA21.linux.shell.com (10.1.135.70)",
    dbname:"ATMXDBPRD",
    custom:"http://10.1.135.71/STTL_PROD_CUST_CLASSES/"
  }

};


/* ---------- RENDER ENV ---------- */

function loadEnv(envKey){

  const env = environments[envKey];

  document.getElementById("envContent").innerHTML = `
    <div class="env-card">

      <h3>${env.name}</h3>

      <table>
        <tr><th>Component</th><th>Details</th></tr>

        <tr><td>Manage URL</td><td><a href="${env.manage}" target="_blank">${env.manage}</a></td></tr>
        <tr><td>Mobile URL</td><td><a href="${env.mobile}" target="_blank">${env.mobile}</a></td></tr>
        <tr><td>Core URL</td><td><a href="${env.core}" target="_blank">${env.core}</a></td></tr>
        <tr><td>ARO Console</td><td><a href="${env.aro}" target="_blank">${env.aro}</a></td></tr>
        <tr><td>Deployment Server</td><td>${env.deploy}</td></tr>
        <tr><td>DB Server</td><td>${env.db}</td></tr>
        <tr><td>Database Name</td><td>${env.dbname}</td></tr>
        <tr><td>Custom Classes</td><td><a href="${env.custom}" target="_blank">${env.custom}</a></td></tr>

      </table>

    </div>
  `;

  /* active tab highlight */
  document.querySelectorAll(".env-btn").forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");
}


/* default load */
setTimeout(()=> loadEnv('qgctest'), 100);