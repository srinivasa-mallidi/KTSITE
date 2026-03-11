/* ============================================================
   MAXIMO CUSTOMIZATIONS KT – Enterprise Change & Upgrade Hub
============================================================ */


/* ============================================================
   MAIN RENDER FUNCTION
============================================================ */

function renderCustomizationsSection() {

    return `
        <div class="server-side-wrapper">

            <div class="server-side-header">
                <h2>Maximo Customizations</h2>
            </div>

            <div class="server-side-body">

                <div class="server-side-nav">
                    <button data-type="dbconfig" class="active-btn">DBCONFIG</button>
                    <button data-type="deployment">Deployment</button>
                    <button data-type="sharepoint">Maximo SharePoint Notes</button>
                    <button data-type="aro">ARO Cluster Upgrade</button>
                    <button data-type="upgrade811">Maximo 8.11 Upgrade</button>
                    <button data-type="moc">MOC Application</button>
                    <button data-type="febmar2026">Maximo – Feb & Mar 2026 CRs</button>
                </div>

                <div id="customDynamicContent" class="server-side-content"></div>

            </div>
        </div>
    `;
}


/* ============================================================
   INIT FUNCTION
============================================================ */

function initCustomizationsSection() {

    document.querySelectorAll(".server-side-nav button").forEach(btn => {
        btn.addEventListener("click", function () {

            document.querySelectorAll(".server-side-nav button")
                .forEach(b => b.classList.remove("active-btn"));

            this.classList.add("active-btn");

            loadCustomizationContent(this.dataset.type);
        });
    });

    loadCustomizationContent("dbconfig");
}


/* ============================================================
   CONTENT LOADER
============================================================ */

function loadCustomizationContent(type) {

    const area = document.getElementById("customDynamicContent");

    switch (type) {

        case "dbconfig":
            area.innerHTML = getDBConfigCustomContent();
            break;

        case "deployment":
            area.innerHTML = getDeploymentContent();
            break;

        case "sharepoint":
            area.innerHTML = getSharePointContent();
            break;

        case "aro":
            area.innerHTML = getAROUpgradeContent();
            break;

        case "upgrade811":
            area.innerHTML = get811UpgradeContent();
            break;

        case "moc":
            area.innerHTML = getMOCContent();
            break;

        case "febmar2026":
            area.innerHTML = getFebMar2026CRContent();
            break;

        default:
            area.innerHTML = "<p>No data available.</p>";
    }
}


/* ============================================================
   DBCONFIG
============================================================ */

function getDBConfigCustomContent() {
return `

<h3>CONFIGDB – Process, Execution & Risk Management</h3>

<div class="info-card">
ConfigDB is the structural database deployment mechanism in Maximo.
It applies schema-level changes to database tables, objects, attributes,
indexes and relationships. Improper execution can impact full system availability.
</div>


<!-- ======================================================= -->
<h4>1. When is ConfigDB Required?</h4>

<p><strong>ConfigDB is REQUIRED for structural database changes:</strong></p>

<ul>
<li>New attribute added to an object</li>
<li>Existing column modified (length/type)</li>
<li>New object (table) creation</li>
<li>Object-level structural modification</li>
<li>Index creation</li>
<li>Relationship structural change</li>
<li>Major domain structural change</li>
</ul>

<p><strong>ConfigDB is NOT required for:</strong></p>

<ul>
<li>Automation Scripts only</li>
<li>UI Configuration (Application Designer)</li>
<li>Security changes</li>
<li>Minor data updates</li>
<li>Domain value additions (no structural change)</li>
</ul>


<!-- ======================================================= -->
<h4>2. Backend ConfigDB Method – Current Standard Practice</h4>

<p>
In MAS environments, we use backend execution through OpenShift.
Frontend ConfigDB via UI is avoided due to stability concerns.
</p>


<h5>Step 1 – Stop Manage</h5>

<p>Using Postman API:</p>

<pre class="code-block">
https://maxinst.manage.qgctest2.apps.qgctest.maximo.shell.com/toolsapi/toolservice/managestop
</pre>

<p>
Ensure all Manage pods are fully stopped before proceeding.
</p>


<h5>Step 2 – Navigate to OpenShift</h5>

<ul>
<li>Open OpenShift Console</li>
<li>Select Project</li>
<li>Go to Pods</li>
<li>Select <b>maxinst</b> pod</li>
<li>Open Terminal</li>
</ul>


<h5>Step 3 – Navigate to ConfigDB Directory</h5>

<pre class="code-block">
cd /opt/IBM/SMP/maximo/tools/maximo
</pre>


<h5>Step 4 – Execute ConfigDB</h5>

<pre class="code-block">
./configdb.sh
</pre>

<p>
Monitor terminal output carefully.
</p>

<p><strong>Expected Success Output:</strong></p>

<pre class="code-block">
BUILD SUCCESSFUL
ConfigDB completed successfully
</pre>


<h5>Step 5 – Start Manage</h5>

<pre class="code-block">
https://maxinst.manage.qgctest2.apps.qgctest.maximo.shell.com/toolsapi/toolservice/managestart
</pre>

<p>
Verify:
</p>

<ul>
<li>All pods restart successfully</li>
<li>No startup errors</li>
<li>Application accessible</li>
</ul>


<!-- ======================================================= -->
<h4>3. Why We Avoid Frontend ConfigDB</h4>

<p>
Previously ConfigDB was executed via UI.
</p>

<ul>
<li>Required Admin Mode ON</li>
<li>Admin Mode sometimes failed to enable</li>
<li>Unstable in clustered JVM setups</li>
<li>Occasional partial deployment</li>
</ul>

<p>
Backend method provides:
</p>

<ul>
<li>Better log visibility</li>
<li>Controlled execution</li>
<li>Reduced risk in clustered environment</li>
<li>More predictable behavior</li>
</ul>



<!-- ======================================================= -->
<h4>4. Rare Failure Scenario – ConfigDB Stuck</h4>

<p>
Although rare, ConfigDB may fail midway.
</p>

<p><strong>System Flag Impact:</strong></p>

<pre class="code-block">
CONFIGURING = 1
</pre>

<p>
If this flag remains set:
</p>

<ul>
<li>Application will not start properly</li>
<li>Logs show: "Application started successfully but waiting for deployment manager"</li>
<li>Discard Configuration option unavailable</li>
<li>System appears partially deployed</li>
</ul>

<p>
This scenario is extremely rare (observed once in 12+ years).
</p>


<!-- ======================================================= -->
<h4>5. Recovery Procedure (If ConfigDB Fails)</h4>

<p><strong>Step 1 – Revert Structural Changes</strong></p>

<ul>
<li>Validate which DDL statements were applied</li>
<li>Rollback incomplete changes manually if required</li>
<li>Confirm database consistency</li>
</ul>

<p><strong>Step 2 – Reset Configuring Flag</strong></p>

<pre class="code-block">
UPDATE MAXVARS
SET VARVALUE = '0'
WHERE VARNAME = 'CONFIGURING';
</pre>

<p>
⚠ Perform only after DB validation.
</p>

<p><strong>Step 3 – Restart Manage</strong></p>

<ul>
<li>Restart pods</li>
<li>Validate logs</li>
<li>Test application access</li>
</ul>


<p>
ConfigDB controls the structural backbone of Maximo.
Improper execution can cause full system downtime.
Hence strict change governance is mandatory.
</p>

`;
}

/* ============================================================
   DEPLOYMENT
============================================================ */

function getDeploymentContent() {
return `

<h3>Deployment – Custom Java Class File Process</h3>

<div class="info-card">
Custom Java class deployment in MAS is required when business logic 
is implemented using compiled .class files. This process involves 
VM-level updates, ZIP packaging, MAS Core configuration update 
and validation of object class references.
Improper deployment can revert custom logic to OOB behavior.
</div>


<!-- ======================================================= -->
<h4>1. When is Deployment Required?</h4>

<p><strong>Deployment is required for:</strong></p>

<ul>
<li>Java class changes</li>
<li>Custom business object logic updates</li>
<li>Doclink class modification</li>
<li>Custom MBO class changes</li>
<li>Integration Java class updates</li>
</ul>

<p>
Deployment is NOT required for:
</p>

<ul>
<li>Automation Scripts</li>
<li>UI Configuration only</li>
<li>Domain value updates</li>
</ul>


<!-- ======================================================= -->
<h4>2. Step-by-Step Deployment Flow</h4>

<h5>Step 1 – Login to Windows VM</h5>

<p>
Use appropriate -B  Account.
</p>

<p><strong>Deployment Servers</strong></p>

<ul>
<li>QGC Test - AAENLO3459ARO (10.166.149.37) </li>
<li>STTL Test - AUWNL03527ARO4 (10.1.134.6)</li>
<li>QGC PROD - AAENL03567ARO2 (10.166.150.70)</li>
<li>STTL PROD - AUWPL03571ARO1 (10.1.135.71)</li>
</ul>


<h5>Step 2 – Navigate to Custom Classes Folder</h5>

<p><strong>Example Path:</strong></p>

<pre class="code-block">
E:\\QGC_TEST_CUST_CLASSES\\
</pre>

<p>Folder Structure:</p>

<ul>
<li>applications</li>
<li>deployment</li>
</ul>


<h5>Step 3 – Replace Class File</h5>

<p><strong>Example File:</strong></p>

<pre class="code-block">
applications/maximo/businessobjects/doclink/DocInfo.class
</pre>

<p><strong>Before Replacing:</strong></p>

<ul>
<li>✔ Take backup of existing .class file</li>
<li>✔ Confirm correct compiled version</li>
</ul>

<p><strong>Then:</strong></p>

<ul>
<li>✔ Replace with updated .class file</li>
</ul>


<!-- ======================================================= -->
<h5>Step 4 – Create New Deployment ZIP</h5>

<p>
Select:
</p>

<ul>
<li>applications folder</li>
<li>deployment folder</li>
</ul>

<p>
Right-click → Compress
</p>

<p><strong>Naming Convention:</strong></p>

<pre class="code-block">
shellcustom40.zip
shellcustom41.zip   ← New Version
</pre>

<p>
Each deployment MUST increment version number.
Never overwrite old ZIP.
</p>


<!-- ======================================================= -->
<h5>Step 5 – Login to MAS Core (Manage Core)</h5>

<p>
Login as MAS Admin.
</p>

<p>
Navigate:
</p>

<p>
Workspace → Update Configuration → Customization
</p>


<h5>Step 6 – Update ZIP Path</h5>

<p>
Change from:
</p>

<pre class="code-block">
shellcustom40.zip
</pre>

<p>
To:
</p>

<pre class="code-block">
shellcustom41.zip
</pre>


<h5>Step 7 – Click Apply Changes</h5>

<p>
System will:
</p>

<ul>
<li>Deploy new custom classes</li>
<li>Restart relevant pods</li>
<li>Update runtime references</li>
</ul>

<p>
Monitor pod restart logs carefully.
</p>


<!-- ======================================================= -->
<h4>3. Critical Issue After Apply Changes</h4>

<p>
Sometimes deployment resets custom class references.
</p>

<p>
System may revert to:
</p>

<pre class="code-block">
com.ibm.tivoli.maximo...
</pre>

<p>
Instead of:
</p>

<pre class="code-block">
com.bg.app.custom...
</pre>

<p>
This results in:
</p>

<ul>
<li>Custom logic not executing</li>
<li>System reverting to OOB behavior</li>
<li>Business rules failing silently</li>
</ul>


<!-- ======================================================= -->
<h4>4. Fix – Update MAXOBJECTCFG & MAXATTRIBUTECFG</h4>

<p>
Run controlled SQL script to restore custom class reference.
</p>

<pre class="code-block">
UPDATE MAXOBJECTCFG
SET CLASSNAME='com.bg.app.custom.WorkOrder'
WHERE OBJECTNAME='WORKORDER';
</pre>

<p>
If attribute-level class exists:
</p>

<pre class="code-block">
UPDATE MAXATTRIBUTECFG
SET CLASSNAME='com.bg.app.custom.CustomFieldClass'
WHERE OBJECTNAME='WORKORDER'
AND ATTRIBUTENAME='SOME_FIELD';
</pre>

<p>
✔ Always run as a script (not manual query)
✔ Ensure rollback capability
✔ Validate before PROD
</p>


<!-- ======================================================= -->
<h5>Step 8 – Final Restart of Manage</h5>

<p>Using Postman:</p>

<pre class="code-block">
https://maxinst.manage.qgctest2.apps.qgctest.maximo.shell.com/toolsapi/toolservice/managestop
https://maxinst.manage.qgctest2.apps.qgctest.maximo.shell.com/toolsapi/toolservice/managestart
</pre>

<p>
This ensures correct class loading into JVM / Container memory.
</p>


<!-- ======================================================= -->
<h4>5. Deployment Risk Management</h4>

<ul>
<li>Always backup previous ZIP</li>
<li>Never overwrite version</li>
<li>Validate class reference after deployment</li>
<li>Test in TEST before PROD</li>
<li>Verify no OOB fallback</li>
<li>Monitor logs post restart</li>
</ul>


<!-- ======================================================= -->
<h4>6. Complete Deployment Flow Summary</h4>

<pre class="code-block">
Compile Java  
→ Backup Old Class  
→ Replace .class File  
→ Create New ZIP Version  
→ Upload in MAS Core  
→ Apply Changes  
→ Validate Class Reference  
→ Restart Manage  
→ Smoke Testing  
</pre>

<p>
Custom Class Deployment is high-risk.
Improper execution may silently disable business logic.
Strict version control and validation is mandatory.
</p>

`;
}

/* ============================================================
   SHAREPOINT NOTES
============================================================ */

function getSharePointContent() {
return `

<h3>Maximo – SharePoint Integration</h3>

<div class="info-card">
This module explains Maximo SharePoint integration architecture, 
authentication model, upload/download logic, migration strategy, 
deployment process and automated recovery mechanism.
</div>


<!-- ===================================================== -->
<h4>1. Architecture Overview</h4>

<p>Maximo determines DMS behavior using field <strong>URLPARAM1</strong>.</p>

<table class="styled-table">
<tr><th>Value</th><th>DMS Used</th></tr>
<tr><td>ASSAI</td><td>ASSAI DMS</td></tr>
<tr><td>SHP</td><td>SharePoint</td></tr>
<tr><td>EB</td><td>EB Documents</td></tr>
</table>

<p>
Based on this flag, Maximo switches upload and download logic dynamically.
</p>


<!-- ===================================================== -->
<h4>2. Download Flow (View Attachment)</h4>

<p><strong>Trigger:</strong> User clicks “View Attachment”</p>

<h5>Code Flow</h5>

<pre class="code-block">
refreshWebURL()
   → refreshWebURLForPrint()
       → check URLPARAM1
           → ASSAI → ASSAI download
           → SHP   → getSHPDocumentContent()
</pre>

<h5>SharePoint Download Process</h5>

<pre class="code-block">
getSHPDocumentContent()
   → getSHPToken()
   → GET {driveURL}/items/{documentID}/content
   → return byte[]
</pre>

<h5>Document ID Storage</h5>

<table class="styled-table">
<tr><th>Field</th><th>Purpose</th></tr>
<tr><td>BGSHPDOCNUM</td><td>SharePoint Document ID</td></tr>
<tr><td>URLPARAM1</td><td>Identifies DMS</td></tr>
</table>


<!-- ===================================================== -->
<h4>3. OAuth Token Authentication</h4>

<p>Method: <strong>getSHPToken()</strong></p>

<p>Reads system properties:</p>

<ul>
<li>client_id</li>
<li>client_secret</li>
<li>grant_type</li>
<li>scope</li>
<li>token_url</li>
</ul>

<h5>Token Flow</h5>

<pre class="code-block">
POST {token_url}
Content-Type: application/x-www-form-urlencoded
→ receive access_token
</pre>

<p>
Token reused for upload & download.
</p>


<!-- ===================================================== -->
<h4>4. Upload Flow (Add Attachment)</h4>

<p>Triggered inside: <strong>save()</strong></p>

<pre class="code-block">
if DMSSourceName == "ASSAI":
    uploadFileToASSAI()
elif DMSSourceName == "SHP":
    uploadFileToSHP()
</pre>

<p>
System property controlling DMS:
</p>

<pre class="code-block">
mxe.doclink.dmsSource.name
</pre>


<!-- ===================================================== -->
<h4>5. SharePoint Upload Logic</h4>

<h5>Steps</h5>

<pre class="code-block">
1. Get Bearer Token
2. Build URL:
   driveURL + "/root:/" + filename + ":/content"
3. Upload using PUT
4. Receive JSON response
5. Save ID to BGSHPDOCNUM
</pre>

<h5>Unique File Name Generation</h5>

Uses MaxVar: <strong>docKeyIncr</strong>

Final name format:

<pre class="code-block">
filename_docKeyIncr.ext
</pre>

Prevents overwrite in SharePoint.


<!-- ===================================================== -->
<h4>6. API Summary</h4>

<table class="styled-table">
<tr><th>Action</th><th>Method</th></tr>
<tr><td>Token</td><td>POST token_url</td></tr>
<tr><td>Download</td><td>GET /items/{id}/content</td></tr>
<tr><td>Upload</td><td>PUT /root:/filename:/content</td></tr>
</table>


<!-- ===================================================== -->
<h4>7. System Properties</h4>

<table class="styled-table">
<tr><th>Property</th><th>Description</th></tr>
<tr><td>mxe.doclink.shp.client_id</td><td>OAuth Client ID</td></tr>
<tr><td>mxe.doclink.shp.client_secret</td><td>OAuth Secret</td></tr>
<tr><td>mxe.doclink.shp.scope</td><td>OAuth Scope</td></tr>
<tr><td>mxe.doclink.shp.tokenurl</td><td>Token Endpoint</td></tr>
<tr><td>mxe.doclink.shp.driveurl</td><td>SharePoint Drive URL</td></tr>
<tr><td>mxe.doclink.dmsSource.name</td><td>Active DMS Identifier</td></tr>
</table>


<!-- ===================================================== -->
<h4>8. SharePoint Recovery Process</h4>

<div class="info-card">
Used to auto-recover failed SharePoint uploads.
Runs daily escalation.
</div>

<h5>Escalation Name</h5>

BGSHPDOCRECOVER

<h5>Schedule</h5>

Daily 11:30 PM (Australia Time)

<h5>Escalation Points</h5>

<table class="styled-table">
<tr><th>Point</th><th>Purpose</th><th>Action</th><th>AutomationScript</th></tr>
<tr><td>1</td><td>Download from MDS</td><td>TESTMDSDOWNLOAD</td><td>TESTMDSDOWNLOAD</td></tr>
<tr><td>2</td><td>Upload to SharePoint</td><td>BGRECOVERSHP</td><td>BGRECOVERSHP</td></tr>
<tr><td>3</td><td>Update DOCINFO fields</td><td>BGMOBILEDOCINFO2</td><td>BGMOBILEDOCINFO2</td></tr>
</table>

<h4>Automation Script – TESTMDSDOWNLOAD (Download from MDS)</h4>

<pre class="code-block">
from psdi.mbo import MboValue
from psdi.mbo import SqlFormat
from psdi.mbo import MboConstants
from psdi.mbo import MboRemote
from psdi.mbo import MboSetRemote
from psdi.server import MXServer
from java.net import URL, HttpURLConnection
from java.io import File, FileOutputStream, BufferedInputStream
import jarray
from psdi.util.logging import MXLoggerFactory

logger = MXLoggerFactory.getLogger("maximo.script.debug")
logger.error("DEBUG: Executed TESTMDSDOWNLOAD")

docinfoId = mbo.getString('DOCINFOID').replace("," , "")
documentName = mbo.getString('DOCUMENT')
fileUrl = mbo.getString('URLNAME')
docPath = '/doclinks/MDS'

filename = documentName + "_" + docinfoId + ".pdf"
destFile = File(docPath, filename)

if "mds.shell.com" in fileUrl:
    try:
        urlObj = URL(fileUrl)
        conn = urlObj.openConnection()
        conn.setConnectTimeout(15000)
        conn.setReadTimeout(60000)
        conn.setRequestProperty("User-Agent", "Maximo-Autoscript")

        inStream = BufferedInputStream(conn.getInputStream())
        outStream = FileOutputStream(destFile)
        buffer = jarray.zeros(8192, 'b')

        while True:
            n = inStream.read(buffer, 0, len(buffer))
            if n == -1:
                break
            outStream.write(buffer, 0, n)

        outStream.close()
        inStream.close()

    except Exception as e:
        logger.error("DEBUG: Error TESTMDSDOWNLOAD" + str(e))

    mbo.setValue("URLNAME",
                 docPath + "/" + filename,
                 MboConstants.NOACTION | MboConstants.NOVALIDATION)
</pre>

<h4>Automation Script – BGRECOVERSHP (Upload to SharePoint)</h4>

<pre class="code-block">
import jarray
from java.io import File
from java.util import HashMap
from psdi.mbo import MboConstants
from psdi.server import MXServer
from java.util import Base64
from org.apache.http.client.methods import HttpPost, HttpPut
from org.apache.http.impl.client import HttpClients
from org.apache.http.entity import StringEntity, ByteArrayEntity
from org.apache.http.util import EntityUtils
from java.nio.charset import StandardCharsets
from java.net import URLEncoder
from psdi.util.logging import MXLoggerFactory
from com.ibm.json.java import JSONObject
from java.io import FileInputStream

logger = MXLoggerFactory.getLogger("maximo.script.debug")
logger.error("DEBUG: Executed BGRECOVERSHP")

params = HashMap()
params.put("grant_type", MXServer.getMXServer().getProperty("mxe.doclink.shp.grant_type"))
params.put("scope", MXServer.getMXServer().getProperty("mxe.doclink.shp.scope"))
params.put("client_secret", MXServer.getMXServer().getProperty("mxe.doclink.shp.client_secret"))
params.put("client_id", MXServer.getMXServer().getProperty("mxe.doclink.shp.client_id"))

def getParamsString(params):
    result = []
    for entry in params.entrySet():
        key = entry.getKey()
        value = entry.getValue()
        result.append(
            URLEncoder.encode(str(key), "UTF-8") + "=" +
            URLEncoder.encode(str(value), "UTF-8")
        )
    return "&".join(result)

if mbo.isNull("BGSHPDOCNUM"):

    docinfoId = mbo.getString('DOCINFOID').replace("," , "")
    documentName = mbo.getString('DOCUMENT')
    baseDocName = documentName.rsplit('.',1)[0]
    fileName = baseDocName + '_' + docinfoId
    url_name = mbo.getString('URLNAME')
    extention = url_name.split('.')[-1]
    finalFileName = fileName.replace(' ', '%20') + "." + extention

    httpclient1 = HttpClients.createDefault()
    token_url = MXServer.getMXServer().getProperty("mxe.doclink.shp.tokenurl")
    post_request1 = HttpPost(token_url)

    str1 = getParamsString(params)
    entity1 = StringEntity(str1, StandardCharsets.UTF_8)
    post_request1.setEntity(entity1)
    post_request1.setHeader("Content-Type", "application/x-www-form-urlencoded")

    response1 = httpclient1.execute(post_request1)
    response_content1 = EntityUtils.toString(response1.getEntity(), StandardCharsets.UTF_8)
    obj = JSONObject.parse(response_content1)
    httpclient1.close()

    httpclient2 = HttpClients.createDefault()
    shp_drivenurl = MXServer.getMXServer().getProperty("mxe.doclink.shp.driveurl")
    post_request2 = HttpPut(shp_drivenurl + "/root:/" + finalFileName + ":/content")

    file = File(url_name)
    inputStream = FileInputStream(file)
    length = file.length()
    bytes = jarray.zeros(length, 'b')

    offset = 0
    while offset < length:
        numRead = inputStream.read(bytes, offset, length-offset)
        offset += numRead

    requestEntity = ByteArrayEntity(bytes)
    post_request2.setEntity(requestEntity)
    post_request2.setHeader("Authorization", "Bearer " + obj.get("access_token"))

    response2 = httpclient2.execute(post_request2)
    response_content2 = EntityUtils.toString(response2.getEntity(), StandardCharsets.UTF_8)
    httpclient2.close()

    obj2 = JSONObject.parse(response_content2)

    mbo.setValue("BGSHPDOCNUM",
                 obj2.get("id"),
                 MboConstants.NOACCESSCHECK | MboConstants.NOVALIDATION_AND_NOACTION)

    mbo.setValue("BGDOCEXTENSION",
                 extention,
                 MboConstants.NOACCESSCHECK | MboConstants.NOVALIDATION_AND_NOACTION)
</pre>

<h4>Automation Script – BGMOBILEDOCINFO2 (Update DOCINFO Fields)</h4>

<pre class="code-block">
from psdi.mbo import MboConstants
from psdi.util.logging import MXLoggerFactory

logger = MXLoggerFactory.getLogger("maximo.script.debug")
logger.error("DEBUG: Executed BGMOBILEDOCINFO2")

bgAssaidocnum = mbo.getString("BGASSAIDOCNUM")
bgshpdocnum = mbo.getString("BGSHPDOCNUM")

if mbo.isNull("BGSHPDOCNUM") and (bgAssaidocnum is not None or bgAssaidocnum != ''):

    mbo.setValue("URLNAME",
                 "/doclinks/app/IBM/doclinks/temp_print_dir/" + bgAssaidocnum + ".jpg",
                 MboConstants.NOACTION | MboConstants.NOVALIDATION)

    mbo.setValue("URLPARAM1",
                 "ASSAI",
                 MboConstants.NOACCESSCHECK | MboConstants.NOVALIDATION_AND_NOACTION)

    mbo.setValue("BGASSAIURL",
                 "https://ausso.assaicloud.com/AWau106/get/download/QGC/DOCS/" + bgAssaidocnum,
                 MboConstants.NOACTION | MboConstants.NOVALIDATION)

    mbo.setValue("BGDOCEXTENSION",
                 "jpg",
                 MboConstants.NOACTION | MboConstants.NOVALIDATION)

else:

    ext = mbo.getString("BGDOCEXTENSION")

    mbo.setValue("URLNAME",
                 "/doclinks/app/IBM/doclinks/temp_print_dir/" + bgshpdocnum + "." + ext,
                 MboConstants.NOACTION | MboConstants.NOVALIDATION)

    mbo.setValue("URLPARAM1",
                 "SHP",
                 MboConstants.NOACCESSCHECK | MboConstants.NOVALIDATION_AND_NOACTION)
</pre>

<h5>SharePoint Identifier</h5>

<pre class="code-block">
URLPARAM1 = 'SHP'
</pre>

If NULL → considered failed.




`;
}


/* ============================================================
   ARO CLUSTER UPGRADE
============================================================ */

function getAROUpgradeContent() {
return `

<h3>ARO Cluster Upgrade – v4.14.16 → v4.15.44</h3>

<div class="info-card">
Upgrade of Azure Red Hat OpenShift (ARO) cluster from version 4.14.16 
to 4.15.44 using Web Console (UI method). This document captures 
preparation steps, execution process, validation checks and key risks.
</div>


<!-- ======================================================= -->
<h4>1. Upgrade Overview</h4>

<table class="styled-table">
<tr><th>Component</th><th>Value</th></tr>
<tr><td>Platform</td><td>Azure Red Hat OpenShift (ARO)</td></tr>
<tr><td>Source Version</td><td>4.14.16</td></tr>
<tr><td>Target Version</td><td>4.15.44</td></tr>
<tr><td>Environment</td><td>Development (DEV)</td></tr>
<tr><td>Upgrade Method</td><td>Web Console (UI)</td></tr>
</table>


<!-- ======================================================= -->
<h4>2. Preparation & Validation Phase</h4>

<h5>2.1 Cluster Health Checks</h5>

<table class="styled-table">
<tr><th>Component</th><th>Status</th></tr>
<tr><td>Cluster Operators</td><td>Healthy</td></tr>
<tr><td>Machine Config Pools</td><td>Not Degraded</td></tr>
<tr><td>Pod Disruption Budgets (PDBs)</td><td>No Blocking Restrictions</td></tr>
<tr><td>Cluster-wide Proxy</td><td>Not Enabled</td></tr>
</table>

<p>
Since proxy was not enabled, certain backup validations were not applicable.
</p>


<h5>2.2 oc CLI Validation</h5>

<pre class="code-block">
oc get co
oc get mcp
oc get nodes
</pre>

<p>
Ensured all nodes were Ready and operators Available=True.
</p>


<!-- ======================================================= -->
<h4>3. Backup Strategy</h4>

<h5>3.1 etcd Backup</h5>

<p>
Backup executed from one Control Plane node as per Red Hat guidance.
</p>

<pre class="code-block">
sudo /usr/local/bin/cluster-backup.sh /backup-location
</pre>

<p>
Backup stored locally on the node.
</p>

<p><strong>Important:</strong></p>

<ul>
<li>Rollback is NOT supported in OpenShift minor upgrades.</li>
<li>Backup is for disaster recovery assistance only.</li>
<li>Worker nodes were not backed up (stateless).</li>
</ul>


<!-- ======================================================= -->
<h4>4. Red Hat Readiness Confirmation</h4>

<ul>
<li>Cluster health reviewed by Red Hat team</li>
<li>Email confirmation received</li>
<li>Green signal provided to proceed</li>
</ul>

<p>
Upgrade executed as collaborative activity:
Red Hat + Microsoft teams on standby.
</p>


<!-- ======================================================= -->
<h4>5. Upgrade Execution (UI Method)</h4>

<h5>5.1 Initiation</h5>

<p>
Accessed OpenShift Web Console:
</p>

<ul>
<li>Administration → Cluster Settings → Updates</li>
<li>Selected Version 4.15.44</li>
<li>Clicked Update</li>
</ul>

<p>
Initial Status:
</p>

<pre class="code-block">
Release not accepted
→ Accepted
→ Upgrade Started
</pre>


<h5>5.2 Monitoring</h5>

<p>
Observed via:
</p>

<ul>
<li>Update History tab</li>
<li>Cluster Operators page</li>
<li>oc get co</li>
</ul>

<p>
Estimated Duration:
4–6 hours (based on Red Hat experience)
</p>

<p>
Screenshots and progress updates shared periodically.
</p>


<!-- ======================================================= -->
<h4>6. Upgrade Flow – Technical Sequence</h4>

<pre class="code-block">
1. Control Plane Nodes Updated
2. etcd Upgrade
3. API Server Rolling Restart
4. Operators Upgrade
5. Worker Nodes Upgrade
6. Machine Config Pools Update
7. Final Cluster Stabilization
</pre>


<!-- ======================================================= -->
<h4>7. Key Insights & Decisions</h4>

<ul>
<li>Rollback not supported</li>
<li>Backup for recovery only</li>
<li>Worker nodes hold no critical configuration</li>
<li>Cluster-wide proxy not enabled</li>
<li>Upgrade performed in DEV first</li>
<li>Vendor collaboration ensured</li>
</ul>


<!-- ======================================================= -->
<h4>8. Risk Considerations</h4>

<ul>
<li>Pod disruption during control plane update</li>
<li>API downtime during restart window</li>
<li>Operator degraded state post upgrade</li>
<li>MachineConfigPool stuck in Updating</li>
<li>Cluster version stuck in progressing=True</li>
</ul>

<p>
Mitigation:
Continuous monitoring + vendor standby.
</p>


<!-- ======================================================= -->
<h4>9. Post-Upgrade Validation Checklist</h4>

<pre class="code-block">
oc get nodes
oc get co
oc get mcp
oc get pods -A
</pre>

Verify:

<ul>
<li>All nodes Ready</li>
<li>All operators Available=True</li>
<li>No degraded components</li>
<li>No CrashLoopBackOff pods</li>
</ul>


<!-- ======================================================= -->
<h4>10. Action Tracker</h4>

<table class="styled-table">
<tr><th>Task</th><th>Status</th></tr>
<tr><td>Cluster health check</td><td></td></tr>
<tr><td>oc CLI validation</td><td></td></tr>
<tr><td>etcd backup</td><td></td></tr>
<tr><td>Red Hat confirmation</td><td></td></tr>
<tr><td>Upgrade initiation</td><td></td></tr>
<tr><td>Progress monitoring</td><td></td></tr>
<tr><td>Upgrade Completion</td><td></td></tr>
<tr><td>Post Upgrade Testing</td><td></td></tr>
</table>

`;
}

/* ============================================================
   MAXIMO 8.11 UPGRADE
============================================================ */

function get811UpgradeContent() {
return `

<h3>Maximo 8.11 Upgrade</h3>

<div class="info-card">
WILL UPDATE SOON
</div>


`;
}


/* ============================================================
   MOC APPLICATION
============================================================ */

function getMOCContent() {
return `

<h3>MOC Application – Functional & Technical Flow</h3>

<div class="info-card">
The MOC (Management of Change) application is a custom-built Maximo module.
It operates using a hybrid architecture combining:
• Workflow logic
• Automation scripts
• Possible Java class customizations (save-level validations)

This application is NOT purely workflow-driven.
It is a combination of workflow routing + script-based validations.
</div>


<!-- ===================================================== -->
<h4>1. Architecture Overview</h4>

<ul>
<li><strong>Workflow:</strong> Major status routing and approval flow.</li>
<li><strong>Automation Scripts:</strong> Conditional validations, auto status transitions, flag validations.</li>
<li><strong>Java Custom Classes:</strong> Possible save-level logic (especially for auto transitions).</li>
</ul>

<p><strong>Design Pattern:</strong> Hybrid Workflow + Automation Script Model</p>


<!-- ===================================================== -->
<h4>2. End-to-End MOC Lifecycle</h4>

<div class="flow-wrapper">

<div class="flow-box">WAPPR</div>
<div class="flow-arrow">↓</div>

<div class="flow-box">REQUESTED</div>
<div class="flow-arrow">↓</div>

<div class="flow-box">ACCEPTED_MOC</div>
<div class="flow-arrow">↓</div>

<div class="flow-box">DESIGN</div>
<div class="flow-arrow">↓</div>

<div class="flow-box">DESIGNED</div>
<div class="flow-arrow">↓</div>

<div class="flow-box">PEND_REVIEW</div>
<div class="flow-arrow">↓</div>

<div class="flow-box">REVIEWED</div>
<div class="flow-arrow">↓</div>

<div class="flow-box">APPROVED</div>
<div class="flow-arrow">↓</div>

<div class="flow-box">IMPLEMENTED</div>
<div class="flow-arrow">↓</div>

<div class="flow-box">READY_TO_GO_LIVE</div>
<div class="flow-arrow">↓</div>

<div class="flow-box">LIVE</div>
<div class="flow-arrow">↓</div>

<div class="flow-box">HANDOVER</div>
<div class="flow-arrow">↓</div>

<div class="flow-box">READY_TO_CLOSE</div>
<div class="flow-arrow">↓</div>

<div class="flow-box final-status">CLOSED</div>

</div>

<p>Each transition is triggered by:</p>
<ul>
<li>Workflow routing</li>
<li>Completion of mandatory actions</li>
<li>Automation script validation (on-save / flag check)</li>
<li>Assignment completion</li>
</ul>


<!-- ===================================================== -->
<h4>3. Detailed Stage Observations</h4>

<h5>3.1 WAPPR → REQUESTED</h5>

<ul>
<li>Workflow initiated manually.</li>
<li>Acceptance Date required.</li>
<li>Two options:
    <ul>
        <li>Accept MOC</li>
        <li>Request More Information</li>
    </ul>
</li>
</ul>

If accepted → moves to ACCEPTED_MOC.


<h5>3.2 Design Phase</h5>

<ul>
<li>3 mandatory design actions must be completed.</li>
<li>Status auto changes from DESIGN → DESIGNED.</li>
<li>Likely implemented using:
    <ul>
        <li>Automation script checking completion flags</li>
        <li>Save-level validation</li>
    </ul>
</li>
</ul>


<h5>3.3 Review & Approval Phase</h5>

<ul>
<li>Reviewers must be added.</li>
<li>RA Sign-off and DRPRT Sign-off required.</li>
<li>Assignments created internally.</li>
<li>Workflow routes through PEND_REVIEW → REVIEWED → APPROVED.</li>
</ul>

Important:
<ul>
<li>If values missing → workflow will not route.</li>
<li>User must keep clicking "Route Workflow" until valid.</li>
</ul>


<h5>3.4 Implementation Phase</h5>

<ul>
<li>Implementation actions created per location.</li>
<li>Each location must:
    <ul>
        <li>Complete implementation action</li>
        <li>Complete required approvals</li>
    </ul>
</li>
<li>If multiple locations exist → all must complete.</li>
<li>Only then status → IMPLEMENTED.</li>
</ul>


<h5>3.5 Go-Live Phase</h5>

Mandatory:

<ul>
<li>Ready to Go Live toggle button </li>
<li>Go Live Authorization toggle button</li>
<li>Handover Acceptance toggle button</li>
</ul>

Observed:

<ul>
<li>If fields missing → workflow does not route.</li>
<li>Sometimes UI refresh required.</li>
<li>Go-live authority group must be populated.</li>
</ul>


<h5>3.6 Closeout Phase</h5>

<ul>
<li>Closeout action must be completed.</li>
<li>Two closure validations:
    <ul>
        <li>Closed by Change Coordinator</li>
        <li>Closed by Another Group</li>
    </ul>
</li>
<li>Both required before final CLOSED status.</li>
</ul>


<!-- ===================================================== -->
<h4>4. Multi-Site MOC Behavior</h4>

<p><strong>Checkbox:</strong> Multi-Site MOC</p>

<h5>Functional Purpose</h5>

<ul>
<li>Allows adding locations from multiple sites.</li>
<li>Supports cross-site change execution.</li>
</ul>

<h5>Technical Observations from KT</h5>

<ul>
<li>Locations from different sites behave differently.</li>
<li>Go-Live worked only for default site location.</li>
<li>Non-default site locations blocked at Go-Live stage.</br>
<div class="image-box">
   <img src="assets/images/moc_1.png">
</div>
</li>
<li>User default site influences routing.</li>
<li>Possible site-based validation script.</li>
<li>Authority group may differ per site.</li>
</ul>

⚠ Open Issue:
Multi-site record could not fully close for non-default sites.

Action Required:
<ul>
<li>Investigate site validation logic</li>
<li>Review Go-Live authority group mapping</li>
<li>Check automation script filtering by site</li>
</ul>


<!-- ===================================================== -->
<h4>5. Rejection Behavior</h4>

When rejected at REQUESTED stage:

<ul>
<li>No resubmission workflow.</li>
<li>No automatic action back to requester.</li>
<li>Record remains rejected.</li>
<li>No "Resubmit" option observed.</li>
</ul>

Conclusion:
Likely design limitation.

Enhancement required if business wants resubmission flow.


<!-- ===================================================== -->
<h4>6. Visibility Restrictions</h4>

For certain MOC Types (e.g., Organization-related):

<ul>
<li>Visible only to:
    <ul>
        <li>MOC Owner</li>
        <li>Change Coordinator Group</li>
        <li>Specific security groups</li>
    </ul>
</li>
</ul>

Likely implemented via:

<ul>
<li>Data restrictions</li>
<li>Conditional security</li>
<li>Automation script-based filtering</li>
</ul>


<!-- ===================================================== -->
<h4>7. Known Defects / Historical Fixes</h4>

<ul>
<li>Previous defect when adding locations caused incorrect closeout behavior.</li>
<li>Automation script updated by Siddhant earlier.</li>
<li>Multi-site behavior still partially unclear.</li>
</ul>


<!-- ===================================================== -->
<h4>8. Debugging Approach for Stuck MOC</h4>

If MOC is stuck:

<ol>
<li>Check current status.</li>
<li>Click "View Workflow".</li>
<li>Check pending assignments.</li>
<li>Verify mandatory flags completed.</li>
<li>Check location-specific actions.</li>
<li>Verify site-based authority groups.</li>
<li>Check automation scripts for validation logic.</li>
</ol>

`;
}


/* ============================================================
   FEB,Mar 2026 CRs
============================================================ */
function getFebMar2026CRContent() {
return `

<h3>Maximo – February & March 2026 Change Requests</h3>

<div class="info-card">
This section provides a detailed technical explanation of Feb–Mar 2026 CRs.
</div>

<!-- ======================================================= -->
<h3>February 2026 Change Requests</h3>

<table class="styled-table">
<tr>
    <th>CR ID</th>
    <th>Description</th>
    <th>Complexity</th>
</tr>

<tr>
    <td>2064157</td>
    <td>Ability for Planners to Add Asset Spare Parts</td>
    <td>Medium</td>
</tr>
<tr>
    <td>2016014</td>
    <td>Upadate primavera to see mutiple permit numbers for each task line</td>
    <td>High</td>
</tr>
</table>


<!-- ======================================================= -->
<h4>1. CR 2064157 – Ability for Planners to Add Asset Spare Parts</h4>

<p><strong>Business Requirement:</strong></p>
Allow planners to:
<ul>
<li>Open Asset application</li>
<li>Have Save access</li>
<li>Add spare parts to Asset</li>
</ul>

But restrict them from:
<ul>
<li>Edit any Asset fields</li>
<li>Modify Specifications</li>
<li>Modify Meters</li>
<li>Edit other tabs</li>
<li>Delete records</li>
<li>Use “Select Spare Parts” (bulk select button)</li>
<li>Use any multi-select button in other tabs</li>
</ul>
<div class="warning-box">
User must have Save access, but still behave like read-only user except for adding spare part via New Row.
</br>
That is the complexity.
</div>
</br>
<h4>Why This Was Challenging</h4>

<p>
In Maximo, if Save access is granted:
</p>

<ul>
<li>All fields become editable</li>
<li>Delete icons become active</li>
<li>Buttons become enabled</li>
<li>Multi-select functionality works</li>
</ul>

<p>
So the challenge was: Give Save access but restrict almost all UI editing.
</p>
</br>
<p><strong>Technical Solution:</strong></p>

<ul>
<li>Created new Security Group: <strong>BGASSETSPARES_LIMITED</strong></li>
<li>Granted Read + Save access to Asset application </br>
<div class="image-box">
   <img src="assets/images/febcr_1_1.png">
</div>
</li>
<li>Created Condition Expression to identify this group <strong>BGASSETREAD</strong></br>
<div class="image-box">
   <img src="assets/images/febcr_1_2.png">
</div>
</li>
<li>Created Custom Signature Option</li>
<li>Applied SIG option to all tabs (except spare part tab)
<p>Applied to:</p>

<ul>
<li>Asset Tab</li>
<li>Meters Tab</li>
<li>Specifications Tab</li>
<li>Other visible tabs</li>
</ul>

<p>Attached via Advanced Properties.</p>
</li>
<li>Configured Conditional Properties:
    <ul>
        <li>Input Mode → Read Only</li>
        <li>Disabled → True</li>
    </ul></br>
<div class="image-box">
   <img src="assets/images/febcr_1_3.png">
</div>
</li>
<li>Disabled “Select Spare Parts” button via SIG</li>
<li>Used OOB SAVE SIG to hide Delete icons</li>
</ul>

<p><strong>Important Technical Insight:</strong></p>
<ul>
<li>One SIG option applies globally wherever attached.</li>
<li>Changing its conditional property affects all linked components.</li>
<li>Delete behavior overridden via SAVE signature modification.</li>
</ul>

<p><strong>Risk Level:</strong> Medium  
(App Designer + SIG behavior modification)</p>

<!-- ===================================================== -->
<h4>Special Handling – Spare Part Tab</h4>

<p>Spare Part tab contains three sections:</p>

<ul>
<li>Asset/Parent Data</li>
<li>Assemblies</li>
<li>Spare Parts</li>
</ul>

<p>
Requirement: Allow “New Row” for spare parts.
</p>

<p>
Solution:
</p>

<ul>
<li>Did NOT apply signature to entire Spare Part tab</li>
<li>Applied signature separately to Asset and Assemblies sections</li>
<li>Did NOT apply to Spare Part section itself</li>
</ul>

<p>
Data Source ID set as <strong>mainrecord</strong> for correct behavior.
</p>
<h4>Disable “Select Spare Parts” Button</h4>

<p>
Bulk select button allows multiple item selection.
Even if tab is read-only, this button works.
</p>

<p>
Applied signature directly to the Push Button element.
</p>

<div class="highlight-box">
Important: Apply signature to Push Button (inner element),
not Button Group (outer container).
</div>

<!-- ===================================================== -->
<h4>Delete Icon Issue</h4>

<p>
Even after restrictions, user could delete records because Save access
automatically enables delete.
</p>

<!-- ===================================================== -->
<h4>Delete Restriction Solution</h4>

<p>
Modified Out-of-Box Signature Option: <strong>SAVE</strong>
</p>

<ul>
<li>Added same condition</li>
<li>Set Display = False</li>
</ul>

<p>
Result: Delete icon disappears for restricted group.
</p>

<p>
Note:
Some tabs did not have SAVE signature attached to delete button.
In such cases, SAVE signature was manually added.
</p>

<!-- ===================================================== -->
<h4> Mandatory Security Step</h4>

<p>
After creating new Signature Option:
</p>

<ul>
<li>Grant access to this Signature in Security Groups</li>
<li>Otherwise restriction will not work</li>
</ul>




<!-- ======================================================= -->
<h3>March 2026 Change Requests</h3>

<table class="styled-table">
<tr>
    <th>CR ID</th>
    <th>Description</th>
    <th>Complexity</th>
</tr>

<tr>
    <td>2014420</td>
    <td>Display Direct Issue PRs in Inventory Availability Screen</td>
    <td>Medium</td>
</tr>

<tr>
    <td>2014486</td>
    <td>DR shouldn't get approved when lined WB is closed or cancelled</td>
    <td>Medium</td>
</tr>
</table>

<!-- ======================================================= -->
<h4>1. Display Direct Issue PRs – Inventory Availability</h4>

<p><strong>Navigation:</strong> Inventory → View Item Availability → Purchasing Tab</p>

<p><strong>Current Behavior:</strong></p>
<ul>
<li>Purchase Orders displayed</li>
<li>Purchase Requisitions displayed</li>
<li>Direct Issue PRs NOT displayed</li>
</ul>

<p><strong>Root Cause:</strong></p>
Data fetched using relationship:
<pre class="code-block">
PRLINE_NOHIST
</pre>

Defined in <strong>library.xml</strong> dialog configuration.

<p><strong>Planned Fix:</strong></p>
Modify WHERE clause of relationship to include:
<ul>
<li>Direct Issue PR type</li>
<li>Relevant status conditions</li>
</ul>

<p><strong>No DB Structural Change Required.</strong></p>

<p><strong>Risk Level:</strong> Low  
(Relationship-level update only)</p>

<p><strong>Deployment Risk:</strong> Minimal</p>


<!-- ======================================================= -->
<h4>2. Prevent DR Approval if Linked WO Closed/Cancelled</h4>

<p><strong>Current Issue:</strong></p>
DR can be approved even if linked Work Order is:
<ul>
<li>Closed</li>
<li>Cancelled</li>
<li>PM Cancelled</li>
</ul>

<p><strong>Expected Behavior:</strong></p>
Block approval if WO status is invalid.

<p><strong>Attempted Approach:</strong></p>
Workflow node inserted before approval → route to STOP node.  
Did not work reliably.

<p><strong>Recommended Technical Solution:</strong></p>
Automation Script on Status Change event:

<pre class="code-block">
if mbo.getRelatedMbo("WORKORDER").getString("STATUS") in ("CLOSE","CAN","PMCAN"):
    service.error("DR cannot be approved because linked WO is closed/cancelled.")
</pre>

<p><strong>Advantages:</strong></p>
<ul>
<li>Immediate validation</li>
<li>Works irrespective of workflow routing</li>
<li>Cleaner implementation</li>
</ul>

<p><strong>Complexity:</strong> Medium  
(Requires script testing + workflow coordination)</p>


`;
}