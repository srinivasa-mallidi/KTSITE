/* ============================================================
   MAXIMO MOBILE KT – Knowledge Module
   Enterprise SPA Module
============================================================ */


/* ============================================================
   MAIN RENDER FUNCTION
============================================================ */

function renderMobileSection() {

    return `
        <div class="server-side-wrapper">

            <div class="server-side-header">
                <h2>Maximo Mobile – Implementation & Customization KT</h2>
                <p>Environment Setup, Customizations & Deployment Knowledge Base</p>
            </div>

            <div class="server-side-body">

                <!-- LEFT NAVIGATION -->
                <div class="server-side-nav">
                    <button data-type="setup" class="active-btn">Initial Setup in Manage</button>
                    <button data-type="docker-access">Privileged Client Access & Docker Desktop Access</button>
                    <button data-type="docker">Docker & Workspace Setup</button>

                    <button data-type="tech-qgc">Technician – QGC</button>
                    <button data-type="issue-qgc">Issues & Transfers – QGC</button>
                    <button data-type="receive-qgc">Inventory Receiving – QGC</button>
                    <button data-type="count-qgc">Inventory Counting – QGC</button>

                    <button data-type="tech-sttl">Technician – STTL</button>
                    <button data-type="issue-sttl">Issues & Transfers – STTL</button>
                    <button data-type="receive-sttl">Inventory Receiving – STTL</button>
                    <button data-type="count-sttl">Inventory Counting – STTL</button>
                </div>

                <!-- RIGHT CONTENT -->
                <div id="mobileDynamicContent" class="server-side-content">
                </div>

            </div>
        </div>
    `;
}


/* ============================================================
   INIT FUNCTION – CALL AFTER HTML LOAD
============================================================ */

function initMobileSection() {

    document.querySelectorAll(".server-side-nav button").forEach(btn => {
        btn.addEventListener("click", function () {

            document.querySelectorAll(".server-side-nav button")
                .forEach(b => b.classList.remove("active-btn"));

            this.classList.add("active-btn");

            loadMobileContent(this.dataset.type);
        });
    });

    loadMobileContent("setup"); // default
}


/* ============================================================
   CONTENT LOADER
============================================================ */

function loadMobileContent(type) {

    const contentArea = document.getElementById("mobileDynamicContent");

    switch (type) {

        case "setup":
            contentArea.innerHTML = getInitialSetupContent();
            break;

        case "docker-access":
            contentArea.innerHTML = getDockerDesktopAccessContent();
            break;

        case "docker":
            contentArea.innerHTML = getDockerSetupContent();
            break;

        case "tech-qgc":
            contentArea.innerHTML = getTechQGCContent();
            break;

        case "issue-qgc":
            contentArea.innerHTML = getIssueQGCContent();
            break;

        case "receive-qgc":
            contentArea.innerHTML = getReceiveQGCContent();
            break;

        case "count-qgc":
            contentArea.innerHTML = getCountQGCContent();
            break;

        case "tech-sttl":
            contentArea.innerHTML = getTechSTTLContent();
            break;

        case "issue-sttl":
            contentArea.innerHTML = getIssueSTTLContent();
            break;

        case "receive-sttl":
            contentArea.innerHTML = getReceiveSTTLContent();
            break;

        case "count-sttl":
            contentArea.innerHTML = getCountSTTLContent();
            break;

        default:
            contentArea.innerHTML = "<p>No content available.</p>";
    }
}


/* ============================================================
   1) INITIAL SETUP IN MAXIMO MANAGE
============================================================ */

function getInitialSetupContent() {
return `

<h3>1. Initial Setup in Maximo Manage – Maximo Mobile Configuration</h3>

<div class="info-card">
Maximo Mobile is deployed as part of Maximo Application Suite (MAS).
During MAS installation or reinstallation, Maximo Mobile components are automatically provisioned.
However, Mobile will NOT function until security, person groups, and cron tasks are properly configured.
</div>


<h4>1.1 Mobile Deployment in MAS</h4>

<p>
Maximo Mobile comes bundled with MAS Manage. There is no separate installation like Maximo Anywhere.
Once MAS is installed:
</p>

<ul>
<li>Mobile Applications are available</li>
<li>Mobile metadata services are enabled</li>
<li>Sync services are provisioned</li>
<li>Mobile runtime container is deployed</li>
</ul>

<p>
However, configuration inside Manage is mandatory.
</p>


<h4>1.2 Security Group Configuration</h4>

<p>
Security Groups must be mapped correctly to Mobile Applications.
In our case, we previously used Maximo Anywhere, so we reused similar group mapping logic.
</p>

<table class="styled-table">
<tr>
<th>Old Anywhere Group</th>
<th>Mapped To Mobile App</th>
</tr>
<tr>
<td>ANYWHERE_TECHICIAN</td>
<td>Maximo Mobile – Technician</td>
</tr>
<tr>
<td>ANYWHERE_ISSUES_RETURNS</td>
<td>Issues & Transfers (Mobile)</td>
</tr>
<tr>
<td>ANYWHERE_TRANSFERS</td>
<td>Inventory Receiving (Mobile)</td>
</tr>
<tr>
<td>ANYWHERE_PHYSICAL_COUNT</td>
<td>Inventory Counting (Mobile)</td>
</tr>
</table>

<div class="image-box">
   <img src="assets/images/mobile_security_groups.png">
</div>

<p><strong>Configuration Steps:</strong></p>

<ul>
<li>Go to Security Groups</li>
<li>Grant access to respective Mobile applications</li>
<li>Provide Object level permissions</li>
<li>Grant data restrictions if required</li>
<li>Save and Apply Security Changes</li>
</ul>

<div class="image-box">
   <img src="assets/images/mobile_security_groups_1.png">
</div>
<div class="image-box">
   <img src="assets/images/mobile_security_groups_2.png">
</div>

<p>
Improper security configuration will result in:
</p>

<ul>
<li>App not visible in Mobile</li>
<li>Sync failures</li>
<li>Object access errors</li>
</ul>


<h4>1.3 Person Group Configuration</h4>

<p>
Person Groups must be configured site-wise.
</p>

<div class="image-box">
   <img src="assets/images/mobile_person_groups_1.png">
</div>

<p>
Navigation:
</p>

<p>
Go To → Administration → Person Groups
</p>

<p>
Ensure:
</p>

<ul>
<li>Correct Site ID mapping</li>
<li>Active status</li>
<li>Members correctly assigned</li>
</ul>

<div class="image-box">
   <img src="assets/images/mobile_person_groups_2.png">
</div>

<h4>1.4 Mobile Related Cron Tasks (Preloaded Database Sync)</h4>

<p>
Mobile relies on background Cron Tasks for:
</p>

<ul>
<li>Metadata publishing</li>
<li>Data preloading</li>
<li>Offline synchronization</li>
<li>Delta updates</li>
</ul>

<p>
After MAS installation, verify mobile-related cron tasks:
</p>

<p>
Navigation:
System Configuration → Platform Configuration → Cron Task Setup
</p>

<p><strong>Common Mobile Cron Tasks:</strong></p>

<table class="styled-table">
<tr>
<th>Cron Task</th>
<th>Purpose</th>
</tr>
<tr>
<td>MobileDbGeneration</td>
<td>Pushes the lookup data to the MobileDB as scheduled</td>
</tr>
</table>

<div class="image-box">
   <img src="assets/images/mobile_crontask_1.png">
</div>




<h4>1.5 Complete Setup Flow</h4>

<pre class="code-block">
MAS Installation  
→ Mobile Automatically Deployed  
→ Configure Security Groups  
→ Configure Person Groups  
→ Verify Mobile Cron Tasks  
→ Test Sync  
→ Deploy to Users  
</pre>

<p>
Initial configuration is critical.
Even if Mobile is installed, without proper security and cron configuration,
the application will not function properly.
</p>

`;
}

/* ============================================================
   2.1) Privileged Access and Docker Desktop Access
============================================================ */


function getDockerDesktopAccessContent() {
return `

<h3>1. Privileged Client Access & Docker Desktop Access</h3>

<div class="info-card">
Docker Desktop is required to customize Maximo Mobile applications using the
IBM Mobile Application Framework (MAF). However, due to corporate security
policies, users must obtain privileged client access before installing
Docker Desktop on their development machines.
</div>


<h4>1.1 Overview</h4>

<p>
To install Docker Desktop for Maximo Mobile development, the following
process must be completed:
</p>

<ul>
<li>Complete Privileged Client Access training</li>
<li>Raise CyberArk Endpoint Privilege Management request</li>
<li>Create Docker ID using corporate email</li>
<li>Raise Docker Desktop License request</li>
</ul>


<h4>1.2 Complete Privileged Client Access Training</h4>

<p>
Before requesting privileged access, users must complete the mandatory
PCA (Privileged Client Access) training.
</p>

<ul>
<li>Open the training link provided in the ServiceNow catalog</li>
<li>Complete the <b>PCA Training</b></li>
<li>Download the completion certificate or take screenshot proof</li>
</ul>

<p>
This evidence will be required while raising the privileged access request.
</p>


<h4>1.3 Raise Privileged Access Request (CyberArk EPM)</h4>

<p>
Navigate to the following catalog in ServiceNow:
</p>

<pre class="code-block">
ServiceNow → CyberArk Endpoint Privilege Management (EPM) Service
</pre>

<p>While raising the request provide the following details:</p>

<ul>
<li><b>Request Type:</b> Add Users</li>
<li><b>Persona:</b> Base Software Engineering Persona</li>
<li><b>Business Justification:</b> Required for Maximo Mobile development and Docker Desktop installation</li>
</ul>

<p>
Inside the catalog you will find a hyperlink to view available personas.
in our case we need :
</p>

<pre class="code-block">
Base Software Engineering Persona
</pre>

<p>
Submit the request and wait for approval from your <b>Line Manager</b>.
Example : RITM8311002
</p>


<h4>1.4 Create Docker ID</h4>

<p>
Before requesting Docker Desktop license, a Docker account must be created.
</p>

<ul>
<li>Go to the Docker official website</li>
<li>Create a <b>Docker ID</b> using your corporate Shell email ID</li>
<li>Save the Docker ID credentials</li>
</ul>

<p>
This Docker ID will be required during the Docker Desktop license request.
</p>


<h4>1.5 Raise Docker Desktop License Request</h4>

<p>
Once privileged access is approved, raise the Docker Desktop license request.
</p>

<pre class="code-block">
ServiceNow → Catalog → Docker Desktop License
</pre>

<p>Fill the request details:</p>

<ul>
<li><b>Requested For:</b> Yourself</li>
<li><b>Business Justification:</b> Maximo Mobile application development , provide other details</li>
<li><b>Do you have privileged access?</b> Yes</li>
<li><b>Docker ID:</b> Provide the Docker account created earlier</li>
</ul>

<p>
Submit the request and wait for approval.
Example : RITM6779751   
</p>


<h4>1.6 Approval Flow</h4>

<pre class="code-block">
Complete DCA Training
        ↓
Raise CyberArk Privileged Access Request
        ↓
Manager Approval
        ↓
Create Docker ID
        ↓
Raise Docker Desktop License Request
        ↓
Docker Desktop Installation Allowed
</pre>


<h4>1.7 Important Notes</h4>

<ul>
<li>Docker Desktop installation will fail without privileged access</li>
<li>Always create Docker ID using corporate email</li>
<li>Keep training completion evidence ready while raising request</li>
<li>Ensure requests are approved before proceeding with Docker setup</li>
</ul>

<p>
After completing these steps, proceed with the
<b>Docker Desktop & Mobile Workspace Setup</b> section to configure the
development environment.
</p>

`;
}

/* ============================================================
   2.2) DOCKER & WORKSPACE SETUP
============================================================ */

function getDockerSetupContent() {
return `

<h3>2. Docker Desktop & Mobile Workspace Setup – MAS Mobile Development</h3>

<div class="info-card">
Maximo Mobile customization is performed using IBM Mobile Application Framework (MAF) tools
inside a Docker container. Developers must configure Docker Desktop and pull
the correct maf-tools image version aligned with MAS Manage version.
</div>


<h4>2.1 Prerequisites</h4>

<ul>
<li>Docker Desktop installed</li>
<li>Entitlement Key</li>
<li>Local Workspace Folder</li>
</ul>


<h4>2.2 Login to IBM Container Registry</h4>

<p>Use entitlement key provided by IBM:</p>

<pre class="code-block">
docker login cp.icr.io --username cp --password &lt;entitlement-key&gt;
</pre>

<p>
If login succeeds, you will see:
</p>

<pre class="code-block">
Login Succeeded
</pre>


<h4>2.3 Pull MAF Tools Image</h4>

<p>Pull image matching MAS version:</p>

<pre class="code-block">
docker pull cp.icr.io/cp/manage/maf-tools:8.11.6
</pre>

<p>
Always ensure image version matches Manage version.
Version mismatch may cause metadata incompatibility.
</p>


<h4>2.4 Run Docker Container (General Template)</h4>

<pre class="code-block">
docker run -it --privileged ^
--env NODE_TLS_REJECT_UNAUTHORIZED=0 ^
-e CHOKIDAR_USEPOLLING=true ^
-p 3001:3001 -p 3006:3006 ^
-v C:/workspace-path:/graphite/workspace ^
cp.icr.io/cp/manage/maf-tools:8.11.6
</pre>

<p><strong>Parameter Explanation:</strong></p>

<ul>
<li><b>--privileged</b> → Required for mobile container</li>
<li><b>NODE_TLS_REJECT_UNAUTHORIZED=0</b> → Ignore TLS validation for dev</li>
<li><b>CHOKIDAR_USEPOLLING=true</b> → Fix file watch issues on Windows</li>
<li><b>-p 3001</b> → Graphite UI</li>
<li><b>-p 3006</b> → Mobile preview server</li>
<li><b>-v</b> → Map local workspace folder</li>
</ul>


<h4>2.5 Environment-Specific Workspace Setup</h4>

<h5>QGC UAT</h5>

<pre class="code-block">
docker run -it --privileged ^
--env NODE_TLS_REJECT_UNAUTHORIZED=0 ^
-e CHOKIDAR_USEPOLLING=true ^
-p 3001:3001 -p 3006:3006 ^
-v C:/docker/QGCUAT/workspace:/graphite/workspace ^
cp.icr.io/cp/manage/maf-tools:8.11.6
</pre>


<h5>QGC PROD</h5>

<pre class="code-block">
docker run -it --privileged ^
--env NODE_TLS_REJECT_UNAUTHORIZED=0 ^
-e CHOKIDAR_USEPOLLING=true ^
-p 3001:3001 -p 3006:3006 ^
-v C:/docker/QGCPROD/workspace:/graphite/workspace ^
cp.icr.io/cp/manage/maf-tools:8.11.6
</pre>


<h5>STTL UAT</h5>

<pre class="code-block">
docker run -it --privileged ^
--env NODE_TLS_REJECT_UNAUTHORIZED=0 ^
-e CHOKIDAR_USEPOLLING=true ^
-p 3001:3001 -p 3006:3006 ^
-v C:/docker/STTLUAT/workspace:/graphite/workspace ^
cp.icr.io/cp/manage/maf-tools:8.11.6
</pre>


<h5>STTL PROD</h5>

<pre class="code-block">
docker run -it --privileged ^
--env NODE_TLS_REJECT_UNAUTHORIZED=0 ^
-e CHOKIDAR_USEPOLLING=true ^
-p 3001:3001 -p 3006:3006 ^
-v C:/docker/STTLPROD/workspace:/graphite/workspace ^
cp.icr.io/cp/manage/maf-tools:8.11.6
</pre>


<h4>2.6 Access Mobile Workspace</h4>

<p>
After container starts:
</p>

<ul>
<li>Graphite UI → http://localhost:3001</li>
<li>Mobile Preview → http://localhost:3006</li>
</ul>


<h4>2.7 Mobile Development Flow</h4>

<pre class="code-block">
Start Docker Container  
→ Open Graphite UI  
→ Import Mobile App  
→ Modify AppCustomization.js  
→ Build  
→ Deploy to MAS  
→ Test on Device  
</pre>


<h4>2.8 Common Issues & Fixes</h4>

<table class="styled-table">
<tr><th>Issue</th><th>Resolution</th></tr>
<tr><td>Port 3001 already in use</td><td>Stop existing container</td></tr>
<tr><td>File change not detected</td><td>Use CHOKIDAR_USEPOLLING=true</td></tr>
<tr><td>Sync errors</td><td>Verify Manage version match</td></tr>
<tr><td>Image pull failed</td><td>Check entitlement key</td></tr>
</table>


<h4>2.9 Important Best Practices</h4>

<ul>
<li>Maintain separate workspace per environment</li>
<li>Never customize directly in PROD workspace</li>
<li>Version control workspace files</li>
<li>Align maf-tools version with MAS Manage</li>
<li>Clean container before major upgrades</li>
</ul>

<p>
Docker setup forms the foundation of all Mobile customizations.
Improper version alignment can cause build and deployment failures.
</p>

`;
}


/* ============================================================
   3-6 QGC CUSTOMIZATIONS
============================================================ */

function getTechQGCContent() {
return `
<h3>3. Technician App – QGC Customizations</h3>

<div class="info-card">
WILL UPDATE THIS ASAP
</div>
`;
}


function getIssueQGCContent() {
return `

<h3>Issues & Transfers – QGC (ITMOBILE)</h3>

<div class="info-card">
The ITMOBILE application supports inventory issue, transfer, bulk pick and return
operations through Maximo Mobile. The initial codebase was inherited from the
T&T implementation. Some components remain in the code but are currently hidden
in the UI because they are not required for the QGC environment.
</div>

<p><b>Important Note:</b>  
After replacing any XML or JavaScript file in the mobile workspace, always make
a minor modification (for example adding a space) and save the file. This ensures
the system detects the update and rebuilds the mobile bundle.</p>


<h4>Application Overview</h4>

<ul>
<li>Application Name: <b>ITMOBILE</b></li>
<li>Purpose: Inventory Issue, Transfer and Return operations, View Item Details</li>
<li>Environment: Maximo Mobile – QGC</li>
<li>Initial Code Source: T&T Implementation</li>
<li>Developer: Ved Gupta (INVGWT), Srinivasa Mallidi (INSNQV), Sidhant Meru(AUSSA6)</li>
</ul>


<h4>Main Functionalities Available</h4>

<ul>
<li>View Inventory Details</li>
<li>Transfer Internal PO Items (Transfer Out)</li>
<li>Bulk Pick and Issue</li>
<li>Return Items</li>
</ul>

<div class="image-box">
   <img src="assets/images/mit1.png">
</div>


<h4>Home Page Customization</h4>

<p>
The ITMOBILE home page was customized to provide a submenu navigation interface.
This page acts as the main landing screen for all inventory operations.
</p>

<pre class="code-block">
&lt;page id="main" controller="SubMenuPageController"&gt;
</pre>


<h4>Datasource Customizations</h4>

<p>Several datasources were created or modified to support mobile operations.</p>

<table class="styled-table">
<tr>
<th>Datasource</th>
<th>Object Structure</th>
<th>Purpose</th>
</tr>

<tr>
<td>transferreservationsListDS</td>
<td>MXAPIINVRES</td>
<td>Userd for Transfer Internal PO Items Page</td>
</tr>

<tr>
<td>additionalitemListDS</td>
<td>MXAPIINVENTORY</td>
<td>This came as part of STTL Customizations where we used to get the INVENTORY details</td>
</tr>

<tr>
<td>additionalitemListDS2</td>
<td>MXAPIINVENTORY</td>
<td>Used for View Item Details Page</td>
</tr>

<tr>
<td>bulkpickBinDS</td>
<td>MXAPIINVBAL</td>
<td>Provides bin lookup for Bulk Pick functionality</td>
</tr>

<tr>
<td>returnItemsDS</td>
<td>MOBILEMATUSETRANS</td>
<td>Fetches items available for return</td>
</tr>

<tr>
<td>reservationListDS</td>
<td>MXAPIINVRES</td>
<td>This is OOB, We are not using as Issue Reserved Items and </br> Bulk Pick Issue is implemented in QGC</td>
</tr>

<tr>
<td>invUseDS</td>
<td>MXAPIINVUSE</td>
<td>This is OOB, We are not using in QGC.</br> Creation of InvUse records are required for Issue, Transfer, Return and </br> in case of QGC , these are handled by Automation Scripts.</td>
</tr>


</table>


<h4>Key Pages Implemented</h4>

<table class="styled-table">
<tr>
<th>Page ID</th>
<th>Controller</th>
<th>Purpose</th>
</tr>

<tr>
<td>main</td>
<td>SubMenuPageController</td>
<td>This page acts as the main landing screen for all inventory operation</td>
</tr>

<tr>
<td>viewinventorydetails</td>
<td>SubMenuPageController</td>
<td>Entry screen for inventory detail 
</br>
<div class="image-box">
   <img src="assets/images/mit2.png">
</div>
</td>
</tr>

<tr>
<td>viewitemdetailspage</td>
<td>shellinventoryDataController</td>
<td>Displays detailed item information</br>
<div class="image-box">
   <img src="assets/images/mit3.png">
</div>
</td>
</tr>

<tr>
<td>invBalanceList</td>
<td>shellinventoryDataController</td>
<td>Displays bin level inventory balances</br>
<div class="image-box">
   <img src="assets/images/mit4.png">
</div>
</td>
</tr>

<tr>
<td>transferreservationsList</td>
<td>TransferReservedItemPageController</td>
<td>Transfer items reserved via internal PO</br>
<div class="image-box">
   <img src="assets/images/mit5.png">
</div>
</br>
<div class="image-box">
   <img src="assets/images/mit6.png">
</div>
</td>
</tr>

<tr>
<td>viewBulkPickList</td>
<td>SubMenuPageController</td>
<td>Entry screen for Bulk Pick functionality</br>
<div class="image-box">
   <img src="assets/images/mit7.png"></br>
<div class="image-box">
   <img src="assets/images/mit8.png">
</div>
</td>
</div>
</td>
</tr>

<tr>
<td>viewReturnItems</td>
<td>ReturnItemsPageController</td>
<td>Return issued items to inventory</br>
<div class="image-box">
   <img src="assets/images/mit9.png">
</div>
</td>
</tr>

<tr>
<td>reservationsList</td>
<td>ReservationsListPageController</td>
<td>OOB Page for Issue Reserved Items and this is hidden in QGC</td>
</tr>

<tr>
<td>invUsageList</td>
<td>InventoryUsageListPageController</td>
<td>OOB Page for viewing INVUSAGE records and  this is hidden in QGC</td>
</tr>

<tr>
<td>invUsage</td>
<td>InventoryUsagePageController</td>
<td>OOB Page for Invusage and  this is used to create INVUSAGE records, ex - for Transfer Reserved Items</td>
</tr>

</table>




<h4>Bulk Pick & Issue Functionality</h4>

<p>
Bulk Pick functionality was developed to enable warehouse technicians to pick
multiple reserved items efficiently.
</p>

<p>The items are categorized based on bin prefixes:</p>

<ul>
<li>A – I</li>
<li>J – R</li>
<li>S – Z</li>
<li>Non Alphabetic Prefix</li>
</ul>

<p>Each category loads a separate page to improve performance.</p>


<h4>Custom Messages Added</h4>

<pre class="code-block">
&lt;message id="exceedreserved"
text="The number cannot exceed the quantity Due."/&gt;

&lt;message id="default_storeroom_not_defined_msg"
text="You must define a default storeroom for this user before issuing or transferring items."/&gt;
</pre>


<h4>JavaScript Controllers</h4>

<p>
Multiple controllers were implemented to manage page logic and user interactions.
</p>

<ul>
<li>InventoryUsagePageController.js</li>
<li>TransferReservedItemPageController.js</li>
<li>ReturnItemsPageController.js</li>
<li>ReservationsBulkPickListPageController.js</li>
<li>ReservationsBulkPickListPageController2.js</li>
<li>ReservationsBulkPickListPageController3.js</li>
<li>ReservationsBulkPickListPageController4.js</li>
</ul>


<h4>Bulk Pick Controller Features</h4>

<ul>
<li>Barcode scanning for item picking</li>
<li>Bin lookup support</li>
<li>Quantity validation</li>
<li>Pick verification</li>
<li>Bulk group identification</li>
<li>Real-time pick status updates</li>
</ul>


<h4>Automation Scripts Used</h4>

<table class="styled-table">
<tr>
<th>Script</th>
<th>Purpose</th>
</tr>

<tr>
<td>BGINVRESPICK</td>
<td>Create INVUSE transaction from BGINVPICKLIST</td>
</tr>

<tr>
<td>BGRETURNFROMMOBILE</td>
<td>Create INVUSE transaction for returned items</td>
</tr>

<tr>
<td>BGRETURNFROMMOBILE2</td>
<td>Populate return transaction values</td>
</tr>

<tr>
<td>BGREPLACENAME</td>
<td>Replace ENTERBY with PICKVERIFIEDBY</td>
</tr>

<tr>
<td>BGRETURNNAME</td>
<td>Update ENTERBY with MOBILEUPDATEDBY</td>
</tr>

<tr>
<td>BGMOBRETURN</td>
<td>For Mobile Return - BIN Handling</td>
</tr>

</table>


<h4>Escalations</h4>

<p>
Escalations are configured to process issue and return transactions generated
from mobile operations.
</p>

<ul>
<li>BGINVRESPICK – Creates INVUSE from BGINVPICKLIST</li>
<li>BGRETURNFROMMOBI – Creates INVUSE from MATUSETRANS</li>
<li>BGREPLACENAME – Update ENTERYBY by PICKVERIFIEDBY</li>
<li>BGRETURNNAME – Update ENTERBY by MOBILEUPDATEDBY and reinstant reservation</li>
</ul>


<h4>Database Configuration</h4>

<ul>
<li>New object created: <b>BGINVPICKLIST</b></li>
<li>New fields added to <b>INVRESERVE</b> table
    <ul>
        <li><b>BGPICKLISTID</b></li>
        <li><b>BULKPICKMEMO</b></li>
    </ul>
</li>
<li>New relationships IN <b>BGINVPICKLIST</b>
    <ul>
        <li><b>BGINVRESERVE</b></li>
        <li><b>BGINVUSE</b></li>
        <li><b>ITEM</b></li>
    </ul>
</li>
<li>New relationships IN <b>MATUSETRANS</b>
    <ul>
        <li><b>BGINVPICKLIST</b></li>
    </ul>
</li>
<li>MATUSETRANS updated with <b>MOBILEUPDATEDBY</b> field</li>
</ul>


<h4>Reports</h4>

<table class="styled-table">
<tr>
<th>Report</th>
<th>Purpose</th>
</tr>

<tr>
<td>Mobile_Bulk_Pick_Report</td>
<td>Generates bulk pick transaction report</td>
</tr>
</table>

<div class="warning-box">
Do Not Export the Mobile_Bulk_Pick_Report.rptdesign Report
</div>


<h4>Important Notes</h4>

<ul>
<li>Some T&T features remain in the code but are hidden for QGC</li>
<li>Unused components should be reviewed and removed in future releases</li>
<li>Bulk Pick functionality depends on picklist object and escalation jobs</li>
</ul>

`;
}


function getReceiveQGCContent() {
return `

<h3>Inventory Receiving – QGC (IRMOBILE)</h3>

<div class="info-card">
The IRMOBILE application enables warehouse technicians to receive inventory
items from Purchase Orders using Maximo Mobile. Several optimizations and
custom validations were implemented for the QGC environment to improve
performance and enforce business rules during receiving operations.
</div>

<p><b>Important Note:</b>  
After replacing XML or JavaScript files in the mobile workspace, always make a
small modification (such as adding a space) and save the file. This ensures the
mobile framework detects the update and rebuilds the bundle.</p>


<h4>Application Overview</h4>

<ul>
<li>Application Name: <b>IRMOBILE</b></li>
<li>Purpose: Inventory Receiving via Mobile Devices</li>
<li>Environment: Maximo Mobile – QGC</li>
<li>Developer: Ved Gupta (INVGWT), Srinivasa Mallidi (INSNQV), Sidhant Meru(AUSSA6)</li>
</ul>


<h4>Main Functionalities</h4>

<ul>
<li>Inventory Receving</li>
<li>Receive Internal PO Items (Transfer In)</li>
</ul>

<div class="image-box">
   <img src="assets/images/mir1.png">
</div>

<h4>Datasource Customizations</h4>

<p>Several datasource optimizations were implemented to reduce mobile loading
time and improve performance.</p>

<table class="styled-table">
<tr>
<th>Datasource</th>
<th>Object Structure</th>
<th>Purpose</th>
</tr>

<tr>
<td>dspolist</td>
<td>MXAPIPO</td>
<td>Fetch open PO records for mobile receiving</td>
</tr>

<tr>
<td>dspolistPoline</td>
<td>POLINE relationship</td>
<td>Fetch PO line items with additional fields</td>
</tr>

<tr>
<td>dspolistMatrectrans</td>
<td>MATRECTRANS relationship</td>
<td>Displays receipt transactions</td>
</tr>

<tr>
<td>assetreturnDS</td>
<td>ASSETSTORETURN relationship</td>
<td>Handles  return transactions</td>
</tr>

<tr>
<td>mobileReceipts</td>
<td>MXAPIRECEIPT</td>
<td>Stores  created receipt records</td>
</tr>

<tr>
<td>shipmentDS</td>
<td>MXAPISHIPMENT</td>
<td>Fetch shipments available for receiving</td>
</tr>

<tr>
<td>receivejsonDS</td>
<td></td>
<td>JSON DATASOURCE </td>
</tr>

<tr>
<td>receiptjsonDS</td>
<td></td>
<td>JSON DATASOURCE</td>
</tr>

</table>


<h4>Datasource Performance Improvements</h4>

<ul>
<li>Disabled <b>offline-immediate-download</b> for heavy datasets</li>
<li>Removed <b>searchable="true"</b> from unnecessary attributes</li>
<li>Removed unused attributes such as <b>_imagelibref</b></li>
<li>Added sorting for receipt records</li>
</ul>

<pre class="code-block">
order-by="orderdate desc"
order-by="actualdate desc"
</pre>



<h4>PO List Page Improvements</h4>

<p>
The PO list page layout was optimized to improve usability and performance.
</p>

<ul>
<li>Reload button added</li>
<li>List layout redesigned</li>
<li>Reduced unnecessary fields</li>
</ul>

<div class="image-box">
   <img src="assets/images/mir2.png">
</div>

<div class="image-box">
   <img src="assets/images/mir3.png">
</div>



<h4>Receive Page Customizations</h4>

<p>The receiving page was enhanced with additional validation logic and UI
features.</p>

<pre class="code-block">
&lt;page id="receivepage" controller="ReceivePageController"&gt;
</pre>

<ul>
<li>Added To Bin lookup datasource</li>
<li>Added Available Bin lookup datasource</li>
<li>Added item detail sliding drawer</li>
<li>Added expiration date validation</li>
<li>Added store location display</li>
</ul>

<div class="image-box">
   <img src="assets/images/mir4.png">
</div>

<h4>Additional Fields Added</h4>

<p>Several attributes were added to support business logic during receiving.</p>

<ul>
<li>storeloc</li>
<li>tobin</li>
<li>bgmatcollectqty</li>
<li>bgsapdeleted</li>
<li>bgsapblocked</li>
<li>rejectcode</li>
<li>expirationdate</li>
</ul>

<div class="image-box">
   <img src="assets/images/mir5.png">
</div>



<h4>Receipt Page Customization</h4>

<p>The receipt history page was updated with additional information.</p>

<ul>
<li>Reject Code column added</li>
<li>Column width adjustments</li>
<li>Improved sorting of receipt records</li>
</ul>

<div class="image-box">
   <img src="assets/images/mir6.png">
</div>


<h4>Return Page </h4>


<div class="image-box">
   <img src="assets/images/mir7.png">
</div>

<h4>Void Page </h4>


<div class="image-box">
   <img src="assets/images/mir8.png">
</div>

<h4>Receive Internal PO Items (Transfer In) Page </h4>


<div class="image-box">
   <img src="assets/images/mir9.png">
</div>

<div class="image-box">
   <img src="assets/images/mir10.png">
</div>




<h4>Custom Validation Messages</h4>

<pre class="code-block">
&lt;message id="invalidExpDate"
text="Enter a valid Expiry Date (Next Week and onwards)"/&gt;

&lt;message id="polinenum"
text="PO Line Num"/>

&lt;message id="emptyPackingSlip_msg"
text="A value is required for Packing Slip field"/&gt;

&lt;message id="emptyToBin_msg"
text="A value is required for To Bin field"/&gt;

&lt;message id="emptyUseBy_msg"
text="Expiration Date field is required for Item(s)"/&gt;
</pre>


<h4>JavaScript Controllers</h4>

<p>
Custom logic for receiving functionality was implemented using the following
controllers.
</p>

<ul>
<li>POListPageController.js</li>
<li>ReceivePageController.js</li>
<li>PostRequestUtil.js</li>
</ul>


<h4>Key JavaScript Enhancements</h4>

<ul>
<li>Reload datasource functionality</li>
<li>Enhanced validation for receiving items</li>
<li>To Bin lookup logic</li>
<li>Handling expiration date validations</li>
<li>Receipt transaction posting</li>
</ul>


<h4>Automation Scripts</h4>

<table class="styled-table">
<tr>
<th>Script</th>
<th>Purpose</th>
</tr>

<tr>
<td>BGRECEIPTLABELZPL</td>
<td>Generate ZPL label for received items</td>
</tr>

<tr>
<td>BGVOIDRECEIPT</td>
<td>Handle mobile VOID receipt transaction, Setting REJECTCODE & ISSUETYPE</td>
</tr>

</table>


<h4>Escalations</h4>

<ul>
<li><b>BGRECEIPTLABELZP</b> – Prints receiving labels automatically</li>
</ul>


<h4>Object Structure Updates</h4>

<table class="styled-table">
<tr>
<th>Object Structure</th>
<th>Saved Query</th>
<th>Purpose</th>
</tr>

<tr>
<td>MXAPIPO</td>
<td>IROPENPOMOBILE</td>
<td>Fetch open PO list</td>
</tr>

<tr>
<td>MXAPISHIPMENT</td>
<td>SHELLSHIPMOBILE</td>
<td>Shipment receiving</td>
</tr>

<tr>
<td>MXAPIINVBAL</td>
<td>MOBILEBINDS</td>
<td>To Bin lookup</td>
</tr>

<tr>
<td>MXAPIINVBAL</td>
<td>MOBILEBINDS2</td>
<td>Available Bin lookup</td>
</tr>

<tr>
<td>MOBILESHIPMENTLINE</td>
<td>MOBILETRANSFERIN</td>
<td>Tranfer In</td>
</tr>

</table>


<h4>Database Script Requirement</h4>

<p>
The following database update must be executed for proper return and void
functionality.
</p>

<pre class="code-block">
UPDATE maxattribute
SET classname = 'psdi.app.inventory.FldMatRecTransReceiptQuantity'
WHERE classname = 'com.bg.app.inventory.FldMatRecTransReceiptQuantity';
</pre>

<p>
After executing the script, restart the Maximo application server.
</p>


<h4>Reports</h4>

<table class="styled-table">
<tr>
<th>Report</th>
<th>Purpose</th>
</tr>

<tr>
<td>receivingLabel.rptdesign</td>
<td>Print receiving labels</td>
</tr>

</table>


<h4>Important Notes</h4>

<ul>
<li>Datasource optimization significantly reduced mobile loading time</li>
<li>To Bin lookup implemented to guide warehouse receiving</li>
<li>Receiving label printing handled automatically by escalation</li>
<li>Expiration date validation added to enforce inventory quality standards</li>
</ul>

`;
}


function getCountQGCContent() {
return `

<h3>Inventory Counting – QGC (ICMOBILE)</h3>

<div class="info-card">
The ICMOBILE application supports physical inventory counting using mobile
devices. The counting process was customized for the QGC environment to support
multi-stage counting and discrepancy validation before updating system balances.
</div>

<p><b>Important Note:</b>  
The base implementation was inherited from the T&T mobile implementation.
Some legacy components remain in the codebase but are not used in QGC.
These components should be reviewed and removed in future cleanup activities.</p>


<h4>Application Overview</h4>

<ul>
<li>Application Name: <b>ICMOBILE</b></li>
<li>Purpose: Mobile Inventory Counting</li>
<li>Environment: Maximo Mobile – QGC</li>
<li>Developer: Ved Gupta (INVGWT), Srinivasa Mallidi (INSNQV), Sidhant Meru(AUSSA6)</li>
</ul>


<h4>Counting Methodology</h4>

<p>
Inventory counting in QGC follows a <b>three-stage validation process</b> to
ensure accuracy before updating stock balances.
</p>

<ul>
<li><b>Stage 1 Counting</b> – Initial physical count performed by technician</li>
<li><b>Stage 2 Counting</b> – Verification count performed if discrepancies exist</li>
<li><b>Stage 3 Counting</b> – Final confirmation stage before system update</li>
</ul>




<h4>Page Structure</h4>

<table class="styled-table">
<tr>
<th>Page ID</th>
<th>Controller</th>
<th>Purpose</th>
</tr>

<tr>
<td>main</td>
<td>SubMenuPageController</td>
<td>Main landing page for inventory counting
</br>
<div class="image-box">
   <img src="assets/images/mic1.png">
</div>
</td>
</tr>

<tr>
<td>Stage1SubMenu</td>
<td>Stage1SubMenuController</td>
<td>Dataset selection for Stage 1 counting
</br>
<div class="image-box">
   <img src="assets/images/mic2.png">
</div>
</td>
</tr>

<tr>
<td>adHoc</td>
<td>AdHocPageController</td>
<td>Stage 1 Counting Page
</br>
<div class="image-box">
   <img src="assets/images/mic3.png">
</div>
</td>
</tr>



<tr>
<td>Stage2SubMenu</td>
<td>Stage2SubMenuController</td>
<td>Dataset selection for Stage 2 counting</br>
<div class="image-box">
   <img src="assets/images/mic4.png">
</div>
</td>
</tr>

<tr>
<td>adHocB</td>
<td>AdHocPageControllerB</td>
<td>Stage 2 Counting Page</br>
<div class="image-box">
   <img src="assets/images/mic5.png">
</div>
</td>
</tr>

<tr>
<td>adHocC</td>
<td>AdHocPageControllerC</td>
<td>Stage 3 Counting Page</br>
<div class="image-box">
   <img src="assets/images/mic6.png">
</div>
</td>
</tr>

<tr>
<td>invBalDetail</td>
<td>InvBalDetailPageController</td>
<td>Detailed view of inventory balance</td>
</tr>

</table>


<h4>Dataset Segmentation</h4>

<p>
Large inventory datasets are divided into multiple groups to improve mobile
performance and reduce loading time.
</p>

<p>The datasets are split using saved queries:</p>

<pre class="code-block">
MOBILEINVCNTB
MOBILEINVCNTC
</pre>

<p>
These datasets allow mobile devices to process inventory counts efficiently
without loading the entire inventory dataset at once.
</p>


<h4>Object Structure Changes</h4>

<table class="styled-table">
<tr>
<th>Object Structure</th>
<th>Saved Query</th>
<th>Purpose</th>
</tr>

<tr>
<td>MXAPIINVBAL</td>
<td>MOBILEINVCNTB</td>
<td>Inventory count dataset partition</td>
</tr>

<tr>
<td>MXAPIINVBAL</td>
<td>MOBILEINVCNTC</td>
<td>Inventory count dataset partition</td>
</tr>

<tr>
<td>MXAPIINVCOUNTING</td>
<td>BGINVCOUNTING</td>
<td>New object structure created for mobile counting</td>
</tr>

</table>


<h4>Database Configuration</h4>

<p>
A new custom object was introduced to support mobile counting operations.
</p>

<ul>
<li><b>BGINVCOUNTING</b> – Custom table for storing mobile counting data</li>
</ul>

<p>
This object stores intermediate counting values before they are validated and
committed to the inventory balance tables.
</p>


<h4>Automation Script</h4>

<table class="styled-table">
<tr>
<th>Script Name</th>
<th>Launch Point</th>
<th>Purpose</th>
</tr>

<tr>
<td>BGISCOUNTDEL</td>
<td>Action Level – BGINVCOUNTING</td>
<td>Deletes counted records once ISCOUNTED = 1</td>
</tr>

</table>


<h4>Escalation Configuration</h4>

<p>
An escalation is configured to periodically remove completed counting records.
</p>

<table class="styled-table">
<tr>
<th>Name</th>
<th>Schedule</th>
<th>Condition</th>
</tr>

<tr>
<td>BGISCOUNTDEL</td>
<td>1d,0,0,21,*,*,*,*,*,*</td>
<td>ISCOUNTED = '1'</td>
</tr>

</table>


<h4>Counting Workflow</h4>

<pre class="code-block">
Technician opens ICMOBILE app
        ↓
Stage 1 Counting (Initial Count)
        ↓
If mismatch detected
        ↓
Stage 2 Counting (Verification)
        ↓
If still mismatch
        ↓
Stage 3 Counting (Final validation)
        ↓
Inventory balance updated
</pre>


<h4>Reports</h4>

<table class="styled-table">
<tr>
<th>Report</th>
<th>Description</th>
<th>Purpose</th>
</tr>

<tr>
<td>BGINVCOUNTING_Counted.rptdesign</td>
<td>Stage 3 discrepancy report</td>
<td>Captures items where physical count differs from system balance</td>
</tr>

</table>


<h4>Important Notes</h4>

<ul>
<li>Stage 3 report must run before escalation execution</li>
<li>This ensures discrepancy data is not deleted before reporting</li>
<li>Dataset partitioning improves mobile performance</li>
<li>Legacy T&T counting components may still exist in code</li>
</ul>

`;
}


/* ============================================================
   7-10 STTL CUSTOMIZATIONS
============================================================ */


function getTechSTTLContent() {
return `

<h3>Technician Application – STTL (Maximo Mobile)</h3>

<div class="info-card">
The STTL Technician Mobile Application enables field technicians to create,
view, update and complete Work Orders directly from mobile devices such as
iPad or iPhone. The application integrates with Maximo Manage to synchronize
Work Requests, Work Orders, Failure Reporting, Labor, Attachments and Work Logs.
</div>


<h4>Application Overview</h4>

<ul>
<li><b>Application Name:</b> Technician (My Schedule)</li>
<li><b>Environment:</b> STTL Maximo Mobile</li>
<li><b>Platform:</b> iOS Devices (iPad / iPhone)</li>
<li><b>Purpose:</b> Mobile execution of maintenance activities</li>
<li><b>Integration:</b> Maximo Manage – Work Order Tracking</li>
</ul>


<h4>Login & Application Access</h4>

<p>The technician must connect the mobile application to the STTL environment
before accessing work orders.</p>

<pre class="code-block">
Test Environment URL
https://sttltest1.home.sttltest1.apps.sttltest.maximo.shell.com/
</pre>

<p><b>Login Steps</b></p>

<ol>
<li>Open IBM Maximo Mobile application.</li>
<li>Enter environment URL and click <b>Connect</b>.</li>
<li>Enter valid Maximo credentials.</li>
<li>Click <b>Sign In</b>.</li>
</ol>

<p>After successful login, the user can access application tiles via the
<b>9-dot menu icon</b>.</p>


<h4>Technician Application Tile</h4>

<p>The main technician application is accessed through the tile:</p>

<ul>
<li><b>My Schedule</b> – Displays assigned work orders and technician tasks.</li>
</ul>


<h4>Work Request Creation (Mobile)</h4>

<p>Technicians can create Work Requests directly from the mobile device.</p>

<p><b>Steps to Create Work Request:</b></p>

<ol>
<li>Open the mobile application.</li>
<li>Click the <b>+ icon</b>.</li>
<li>Select <b>Create Work Request</b>.</li>
<li>Enter required information.</li>
<li>Click <b>Save</b>.</li>
</ol>

<div class="image-box">
   <img src="assets/images/smit2.png">
</div>


<h4>Mandatory Fields for Work Request</h4>

<table class="styled-table">
<tr>
<th>Field</th>
<th>Description</th>
</tr>

<tr>
<td>Description</td>
<td>Short description of the issue</td>
</tr>

<tr>
<td>Location</td>
<td>Equipment or location where issue occurred</td>
</tr>

<tr>
<td>Work Type</td>
<td>Defines maintenance category</td>
</tr>

<tr>
<td>Work Identification Type</td>
<td>Classification of work request</td>
</tr>

<tr>
<td>Function</td>
<td>Operational function affected</td>
</tr>

<tr>
<td>Impact</td>
<td>Operational impact level</td>
</tr>

<tr>
<td>Likelihood</td>
<td>Probability of occurrence</td>
</tr>

<tr>
<td>Priority Justification</td>
<td>Reason for assigned priority</td>
</tr>

</table>

<div class="image-box">
   <img src="assets/images/smit3.png">
</div>

<div class="image-box">
   <img src="assets/images/smit4.png">
</div>



<h4>Long Description Structure</h4>

<p>The long description contains structured operational details.</p>

<pre class="code-block">
DEFECT FOUND
EQUIPMENT FUNCTION
MITIGATION
CORRECTION STEPS TAKEN
SUGGESTED FIX REQUIRED
MANNING / MATERIALS & TOOLS
LOCATION
ACCESS REQUIREMENTS
CONDITION FOR WORK
OTHER INFORMATION
</pre>


<h4>Risk Ranking Calculation</h4>

<p>
Risk Ranking is automatically calculated using the formula:
</p>

<pre class="code-block">
Risk Ranking = Impact × Likelihood
</pre>

<p>Example:</p>

<pre class="code-block">
Impact = A1
Likelihood = 1
Risk Ranking = 1
</pre>


<h4>Work Request Workflow</h4>

<pre class="code-block">
Mobile Work Request Created
        ↓
Status = SUBMITTED
        ↓
Approved by Supervisor
        ↓
Status = ACCEPTED
        ↓
Converted to Work Order
</pre>


<h4>Work Order Lifecycle (STTL)</h4>

<p>After approval, the Work Request becomes a Work Order and follows the
standard maintenance lifecycle.</p>

<pre class="code-block">
SUBMITTED
   ↓
ACCEPTED
   ↓
APPR
   ↓
WSCHED
   ↓
SCHED
   ↓
INPRG
   ↓
TCOMP (Technician Completed)
   ↓
SUPCOMP
   ↓
CLOSE
</pre>


<h4>Technician Work Order Features</h4>

<div class="image-box">
   <img src="assets/images/smit1.png">
</div>

<div class="image-box">
   <img src="assets/images/smit5.png">
</div>

<div class="image-box">
   <img src="assets/images/smit6.png">
</div>

<div class="image-box">
   <img src="assets/images/smit7.png">
</div>

<div class="image-box">
   <img src="assets/images/smit8.png">
</div>


<table class="styled-table">
<tr>
<th>Feature</th>
<th>Description</th>
</tr>

<tr>
<td>Work Order Details</td>
<td>View assigned work order information</td>
</tr>

<tr>
<td>Work Logs</td>
<td>Add technician notes
</br>
<div class="image-box">
   <img src="assets/images/smit19.png">
</div></br>
<div class="image-box">
   <img src="assets/images/smit20.png">
</div>
</td>
</tr>

<tr>
<td>Failure Reporting</td>
<td>Enter problem, cause and remedy</td>
</tr>

<tr>
<td>Labor Reporting</td>
<td>Record labor hours</td>
</tr>

<tr>
<td>Attachments</td>
<td>Add photos, documents and files</td>
</tr>

<tr>
<td>Tasks</td>
<td>View associated job plan tasks
</br>
<div class="image-box">
   <img src="assets/images/smit18.png">
</div>
</td>
</tr>

<tr>
<td>Materials and tools</td>
<td>View Planned Material , Tools, Labor 
</br>
<div class="image-box">
   <img src="assets/images/smit17.png">
</div>
</td>
</tr>


</table>


<h4>Failure Reporting</h4>

<p>
Technicians must report failure details for corrective maintenance activities.
</p>

<p>Failure reporting includes:</p>

<ul>
<li>Failure Class (auto populated)</li>
<li>Problem Code</li>
<li>Cause Code</li>
<li>Remedy Code</li>
<li>Problem Note</li>
<li>Cause Note</li>
<li>Remedy Note</li>
</ul>

<div class="image-box">
   <img src="assets/images/smit9.png">
</div>

<div class="image-box">
   <img src="assets/images/smit10.png">
</div>


<h4>Labor Reporting</h4>

<p>Technicians can record labor usage including:</p>

<ul>
<li>Planned Labor</li>
<li>Labor Resource</li>
<li>Skill Level</li>
<li>Start Time</li>
<li>End Time</li>
<li>Hours Worked</li>
</ul>

<div class="image-box">
   <img src="assets/images/smit11.png">
</div>


<h4>Attachment Handling</h4>

<p>Technicians can attach supporting evidence such as photos or documents.</p>

<p>Attachment Options:</p>

<ul>
<li>Photo Library</li>
<li>Take Photo / Video</li>
<li>Upload File</li>
</ul>

<p>Attachments synchronize automatically between:</p>

<ul>
<li>Mobile Application</li>
<li>Maximo Web Application</li>
</ul>

<div class="image-box">
   <img src="assets/images/smit12.png">
</div>

<div class="image-box">
   <img src="assets/images/smit13.png">
</div>

<div class="image-box">
   <img src="assets/images/smit14.png">
</div>


<h4>Work Order Completion</h4>

<p>Technicians complete work orders using the <b>Complete Work Order</b> action.</p>

<pre class="code-block">
Failure Reporting Completed
        ↓
Click "Complete Work Order"
        ↓
Status changes to TCOMP
</pre>

<div class="image-box">
   <img src="assets/images/smit15.png">
</div>

<h4>Work Order Queries</h4>

<p>The technician application supports multiple work order queries.</p>

<ul>
<li>Assigned Work</li>
<li>PM Worklist for Current Week</li>
<li>CM Worklist for Current Week</li>
<li>Completed Work Orders</li>
<li>Created By Me</li>
</ul>

<div class="image-box">
   <img src="assets/images/smit16.png">
</div>



<h4>Search & Filter Options</h4>

<p>Technicians can filter work orders based on:</p>

<ul>
<li>Asset</li>
<li>Location</li>
<li>Status</li>
<li>Work Type</li>
</ul>


<h4>Sorting Options</h4>

<ul>
<li>Work Order</li>
<li>Priority</li>
<li>Status</li>
<li>Description</li>
<li>Asset</li>
<li>Work Type</li>
<li>Location</li>
</ul>


<h4>Important Notes</h4>

<ul>
<li>Most fields in Work Order Details are <b>read-only</b> to prevent unauthorized modifications.</li>
<li>Only selected fields such as <b>Actual Start</b>, <b>Actual Finish</b>, and <b>Work Logs</b> are editable.</li>
<li>Attachments and work logs synchronize automatically with Maximo Manage.</li>
<li>Failure reporting is mandatory for certain work types such as CM and Fail-Fix PM.</li>
</ul>


<h4>Integration Validation</h4>

<p>
All work order updates performed in the mobile application are synchronized
with the Maximo Web Application including:
</p>

<ul>
<li>Work Order Number</li>
<li>Site</li>
<li>Description</li>
<li>Status</li>
<li>Attachments</li>
<li>Failure Reporting</li>
<li>Labor</li>
<li>Work Logs</li>
</ul>

<p>
This ensures consistency between mobile operations and enterprise maintenance
records within Maximo Manage.
</p>

`;
}


function getIssueSTTLContent() {
return `

<h3>Issues & Transfers – STTL (Maximo Mobile)</h3>

<div class="info-card">
The Issues & Transfers mobile application enables store technicians to
view inventory information and perform inventory issue transactions directly
from mobile devices. This application supports issuing reserved items,
issuing additional items, and viewing inventory and bin details.
</div>


<h4>Application Overview</h4>

<ul>
<li><b>Application Name:</b> Issues & Transfers</li>
<li><b>Environment:</b> STTL Maximo Mobile</li>
<li><b>Platform:</b> iPad / iPhone</li>
<li><b>Purpose:</b> Mobile inventory issue transactions</li>
</ul>


<h4>Login & Environment Connection</h4>

<p>Technicians must connect the mobile application to the STTL environment.</p>

<pre class="code-block">
Test Environment URL

https://sttltest1.home.sttltest1.apps.sttltest.maximo.shell.com/
</pre>

<p><b>Login Steps</b></p>

<ol>
<li>Open IBM Maximo Mobile Application.</li>
<li>Enter the environment URL.</li>
<li>Click <b>Connect</b>.</li>
<li>Enter valid credentials.</li>
<li>Click <b>Sign In</b>.</li>
</ol>


<h4>Application Navigation</h4>

<p>
After login, users can access mobile applications through the
<b>9-Dot menu icon</b>.
</p>

<ul>
<li>Tap the <b>9-Dot icon</b> at the bottom right.</li>
<li>Select the <b>Issues & Transfers</b> tile.</li>
</ul>


<div class="image-box">
   <img src="assets/images/smit21.png">
</div>

<h4>Main Menu Options</h4>

<table class="styled-table">
<tr>
<th>Option</th>
<th>Description</th>
</tr>

<tr>
<td>View Inventory Details</td>
<td>Displays inventory information for items and bins</td>
</tr>

<tr>
<td>Issue Reserved Items</td>
<td>Issue materials already reserved for a Work Order</td>
</tr>

<tr>
<td>Inventory Usage</td>
<td>Issue Additional Items, Transfer Items, Return Items</td>
</tr>

<tr>
<td>Transfer Reserved Items</td>
<td>View the Item details of Internal PO</td>
</tr>

</table>


<div class="image-box">
   <img src="assets/images/smit22.png">
</div>


<h4>View Inventory Details</h4>

<p>This section allows technicians to check inventory data.</p>


<div class="image-box">
   <img src="assets/images/smit23.png">
</div>

<h5>View Item Details</h5>

<p>The following item information is displayed:</p>

<ul>
<li>Item Number</li>
<li>Item Description</li>
<li>Manufacturer Part Number</li>
<li>Manufacturer</li>
<li>Storeroom</li>
<li>Site</li>
<li>Issue Unit</li>
<li>Default Bin</li>
<li>Critical / Repairable / Fast Response Indicators</li>
<li>Current Total Balance</li>
</ul>

<div class="image-box">
   <img src="assets/images/smit24.png">
</div>


<h5>View Bin Details</h5>

<p>Bin-level inventory details include:</p>

<ul>
<li>Item Number</li>
<li>Item Description</li>
<li>Bin</li>
<li>Lot Number</li>
<li>Storeroom</li>
<li>Site</li>
<li>Physical Count</li>
<li>Current Total Balance</li>
</ul>

<div class="image-box">
   <img src="assets/images/smit25.png">
</div>


<h4>Search & Refresh Options</h4>

<p>Users can perform quick searches using the search bar.</p>

<p>Search parameters include:</p>

<ul>
<li>Item Number</li>
<li>Item Description</li>
<li>Manufacturer</li>
<li>Storeroom</li>
<li>Bin</li>
<li>Site</li>
</ul>

<p>The <b>Refresh icon</b> reloads the latest inventory data.</p>


<h4>Issue Reserved Items</h4>

<p>
Reserved items are materials already allocated to a Work Order.
Technicians can issue these materials directly using the mobile application.
</p>

<div class="image-box">
   <img src="assets/images/smit26.png">
</div>

<div class="image-box">
   <img src="assets/images/smit27.png">
</div>

<div class="image-box">
   <img src="assets/images/smit28.png">
</div>




<p><b>Steps:</b></p>

<ol>
<li>Select <b>Issue Reserved Items</b>.</li>
<li>Select item using the checkbox.</li>
<li>Click <b>Select</b>.</li>
<li>Open <b>Create Inventory Usage</b> page.</li>
<li>Adjust the quantity if required.</li>
<li>Save the transaction.</li>
</ol>


<h5>Displayed Fields</h5>

<ul>
<li>Item Number</li>
<li>Item Description</li>
<li>Work Order Number</li>
<li>Bin</li>
<li>Due Date</li>
<li>Quantity Due</li>
</ul>


<h5>Item Issue Details</h5>

<p>When opening item details the following fields are displayed:</p>

<ul>
<li>Item Description</li>
<li>Quantity Due</li>
<li>Quantity to Issue</li>
<li>From Bin</li>
<li>Work Order Number</li>
<li>Location</li>
<li>Asset</li>
<li>Person</li>
<li>Material Request</li>
</ul>


<h5>Split Item Function</h5>

<p>
If required, items can be split across multiple bins.
</p>

<pre class="code-block">
Select Item
   ↓
Click Split Item
   ↓
Enter Quantity
   ↓
Select Bin
   ↓
Save
</pre>


<h4>Issue Additional Items</h4>

<p>
Additional items allow technicians to issue materials that were not
reserved in advance.
</p>

<div class="image-box">
   <img src="assets/images/smit29.png">
</div>

<div class="image-box">
   <img src="assets/images/smit30.png">
</div>

<div class="image-box">
   <img src="assets/images/smit31.png">
</div>


<p><b>Steps:</b></p>

<ol>
<li>Select <b>Inventory Usage</b>.</li>
<li>Choose items from the inventory list.</li>
<li>Click <b>Issue</b> Button at top.</li>
<li>Open <b>Create Inventory Usage</b> page.</li>
<li>Adjust quantity if required.</li>
<li>Save the transaction.</li>
<li>Issue the transaction.</li>
</ol>


<h5>Displayed Fields</h5>

<ul>
<li>Item Number</li>
<li>Item Description</li>
<li>Site</li>
<li>Storeroom</li>
<li>Current Balance etc...</li>
</ul>



<h4>Transfer Items</h4>

<p>
Transfer Items allow technicians to transfer materials from storeroom to storeroom & bin to bin.
</p>

<div class="image-box">
   <img src="assets/images/smit35.png">
</div>

<div class="image-box">
   <img src="assets/images/smit36.png">
</div>

<div class="image-box">
   <img src="assets/images/smit37.png">
</div>


<p><b>Steps:</b></p>

<ol>
<li>Select <b>Inventory Usage</b>.</li>
<li>Choose items from the inventory list.</li>
<li>Click <b>Transfer</b> Button at top.</li>
<li>Open <b>Create Inventory Usage</b> page.</li>
<li>Adjust quantity if required.</li>
<li>Enter the From Bin ,To Storeroom  and To Bin.</li>
<li>Save the transaction.</li>
<li>Transfer the transaction.</li>
</ol>



<h4>Return Items</h4>

<p>
Return Items allow technicians to Return the Items that are issued against workorders. 
</p>

<div class="image-box">
   <img src="assets/images/smit32.png">
</div>

<div class="image-box">
   <img src="assets/images/smit33.png">
</div>

<div class="image-box">
   <img src="assets/images/smit34.png">
</div>


<p><b>Steps:</b></p>

<ol>
<li>Select <b>Inventory Usage</b>.</li>
<li>Choose items from the inventory list.</li>
<li>Click <b>Return</b> Button at top.</li>
<li>Open <b>Create Inventory Usage</b> page.</li>
<li>Adjust quantity if required.</li>
<li>Select WorkOrder.</li>
<li>Save the transaction.</li>
<li>Return the transaction.</li>
</ol>



<h4>Transfer Reserved Items</h4>

<p>
Transfering Reserved Items from Internal PO 
</p>

<div class="image-box">
   <img src="assets/images/smit38.png">
</div>

<div class="image-box">
   <img src="assets/images/smit39.png">
</div>

<div class="image-box">
   <img src="assets/images/smit40.png">
</div>


<p><b>Steps:</b></p>

<ol>
<li>Select <b>Transfe Reserved Items</b>.</li>
<li>Choose items from the Internal PO list.</li>
<li>Click <b>TransferOut</b> Button at top.</li>
<li>Open <b>Create Inventory Usage</b> page.</li>
<li>Adjust quantity if required.</li>
<li>Select FromBin, To Storeroom, ToBin details.</li>
<li>Save the transaction.</li>
<li>TransferOut the transaction.</li>
</ol>

`;
}



function getReceiveSTTLContent() {
return `

<h3>Inventory Receiving – STTL (Maximo Mobile)</h3>

<div class="info-card">
The Inventory Receiving mobile application allows store technicians to receive
items from Purchase Orders directly from mobile devices. This module supports
receiving materials, returning items, viewing receipt history, and voiding
incorrect receipt transactions.
</div>


<h4>Application Overview</h4>

<ul>
<li><b>Application Name:</b> Inventory Receiving</li>
<li><b>Environment:</b> STTL Maximo Mobile</li>
<li><b>Platform:</b> iPad / iPhone</li>
<li><b>Purpose:</b> Mobile Purchase Order receiving transactions</li>
</ul>


<h4>Login & Environment Connection</h4>

<p>Users must connect the mobile application to the STTL environment.</p>

<pre class="code-block">
Test Environment URL

https://sttltest1.home.sttltest1.apps.sttltest.maximo.shell.com/
</pre>

<p><b>Login Steps</b></p>

<ol>
<li>Open IBM Maximo Mobile Application.</li>
<li>Enter the environment URL.</li>
<li>Click <b>Connect</b>.</li>
<li>Enter valid credentials.</li>
<li>Click <b>Sign In</b>.</li>
</ol>


<h4>Application Navigation</h4>

<ul>
<li>Tap the <b>9-Dot icon</b> at the bottom right.</li>
<li>Select the <b>Inventory Receiving</b> tile.</li>
</ul>

<div class="image-box">
   <img src="assets/images/smit21.png">
</div>


<h4>Open Purchase Orders</h4>

<p>
After opening the application, the system displays a list of
<b>Open Purchase Orders</b>.
</p>
<div class="image-box">
   <img src="assets/images/smit41.png">
</div>

<p>The following information is displayed:</p>

<ul>
<li>PO Number</li>
<li>Order Date and Time</li>
<li>Item Number</li>
<li>Item Description</li>
<li>PO Lines</li>
</ul>


<h4>Available Operations</h4>

<table class="styled-table">
<tr>
<th>Option</th>
<th>Description</th>
</tr>

<tr>
<td>Receive</td>
<td>Receive items from the Purchase Order</td>
</tr>

<tr>
<td>Return</td>
<td>Return received items to vendor</td>
</tr>

<tr>
<td>Receipts</td>
<td>View receipt transaction history</td>
</tr>

<tr>
<td>Void</td>
<td>Cancel incorrect receipt transactions</td>
</tr>

<tr>
<td>Attachments</td>
<td>Users can take a photo of the item while receving and attach it to PO record
</br>
<div class="image-box">
   <img src="assets/images/smit43.png">
</div>
</td>
</tr>

</table>

<div class="image-box">
   <img src="assets/images/smit42.png">
</div>

<h4>Search & Refresh Options</h4>

<p>Users can search Purchase Orders using the search bar.</p>

<p>Search parameters include:</p>

<ul>
<li>PO Number</li>
<li>Item Number</li>
<li>Item Description</li>
</ul>

<p>The <b>Check for Updates</b> icon refreshes the latest records from the server.</p>


<h4>Receive Items</h4>

<p>This function allows technicians to receive items for a Purchase Order.</p>

<p><b>Steps:</b></p>

<ol>
<li>Select the Purchase Order.</li>
<li>Click <b>Receive</b>.</li>
<li>Select the item to receive.</li>
<li>Edit the necessary fields.</li>
<li>Save the transaction.</li>
</ol>

<div class="image-box">
   <img src="assets/images/smit44.png">
</div>




<h4>Return Items</h4>

<p>
If items were incorrectly received or damaged, they can be returned
to the vendor.
</p>

<p><b>Steps:</b></p>

<ol>
<li>Select the Purchase Order.</li>
<li>Open <b>Return</b> page.</li>
<li>Select the item to return.</li>
<li>Enter return quantity.</li>
<li>Save the transaction.</li>
</ol>

<div class="image-box">
   <img src="assets/images/smit45.png">
</div>

<h5>Return Details</h5>

<ul>
<li>Item Number</li>
<li>Item Description</li>
<li>Return Quantity</li>
<li>Receipt Number</li>
<li>Unit</li>
<li>Date and Time</li>
<li>Status</li>
<li>Total Quantity</li>
</ul>


<h4>Receipt History</h4>

<p>
The Receipts page displays previously received items.
</p>

<p>The following information is available:</p>

<ul>
<li>Item Number</li>
<li>Item Description</li>
<li>Quantity</li>
<li>Status</li>
<li>Receipt Number</li>
<li>Date and Time</li>
</ul>

<div class="image-box">
   <img src="assets/images/smit46.png">
</div>

<h4>Void Transactions</h4>

<p>
The Void option cancels receipt transactions that were created incorrectly.
</p>

<p><b>Steps:</b></p>

<ol>
<li>Open the Purchase Order.</li>
<li>Select <b>Void</b>.</li>
<li>Select the item to void.</li>
<li>Click <b>Save</b>.</li>
</ol>

<div class="image-box">
   <img src="assets/images/smit47.png">
</div>

<p>
This action reverses the receipt transaction in Maximo.
</p>


<h4>Shipment Receiving - Transfer In</h4>

<ul>
<li>For the Items Transfered Out from "Transfer Reserver Items" Functionality in Issues & Transfer App, System will create Shipment Records. </li>
<li>We use these Shipment Records to perform Transfer In.</li>
</ul>

<div class="image-box">
   <img src="assets/images/smit48.png">
</div>


<h4>Open Shipment Receiving</h4>

<p>
After opening the application, the system displays a list of
<b>Open Shipment Records</b>.
</p>
<div class="image-box">
   <img src="assets/images/smit49.png">
</div>

<p>The following information is displayed:</p>

<ul>
<li>Shipment Number</li>
<li>Shipment Date</li>
<li>From Site</li>
<li>Shipped By</li>
<li>Shipment Lines</li>
</ul>


<h4>Available Operations</h4>

<table class="styled-table">
<tr>
<th>Option</th>
<th>Description</th>
</tr>

<tr>
<td>Receive</td>
<td>Receive items from the Shipment Record</td>
</tr>

<tr>
<td>Return</td>
<td>Return received items (Not used much)</td>
</tr>

<tr>
<td>Receipts</td>
<td>View receipt transaction history</td>
</tr>

<tr>
<td>Void</td>
<td>Cancel incorrect receipt transactions (Not used much) </td>
</tr>

</table>

<div class="image-box">
   <img src="assets/images/smit50.png">
</div>

<h4>Search & Refresh Options</h4>

<p>Users can search Shipment Records using the search bar.</p>

<p>Search parameters include:</p>

<ul>
<li>Shipment Number</li>
</ul>

<p>The <b>Check for Updates</b> icon refreshes the latest records from the server.</p>


<h4>Receive</h4>

<p>This function allows users to receive items for a Shipment Record.</p>

<p><b>Steps:</b></p>

<ol>
<li>Select the Shipment Record.</li>
<li>Click <b>Receive</b>.</li>
<li>Select the item to receive.</li>
<li>Edit the necessary fields.</li>
<li>Save the transaction.</li>
</ol>

<div class="image-box">
   <img src="assets/images/smit51.png">
</div>
<div class="image-box">
   <img src="assets/images/smit52.png">
</div>


`;
}


function getCountSTTLContent() {
return `

<h3>Inventory Counting – STTL (Maximo Mobile)</h3>

<div class="info-card">
The Inventory Counting mobile application allows store technicians to perform
physical inventory counting using mobile devices. This module supports Ad Hoc
inventory counting, updating physical quantities, filtering by bin or lot,
and saving physical counts to synchronize with Maximo Manage.
</div>


<h4>Application Overview</h4>

<ul>
<li><b>Application Name:</b> Inventory Counting</li>
<li><b>Environment:</b> STTL Maximo Mobile</li>
<li><b>Platform:</b> iPad / iPhone</li>
<li><b>Purpose:</b> Perform physical inventory verification</li>
</ul>


<h4>Login & Environment Connection</h4>

<p>Users must connect the mobile application to the STTL environment.</p>

<pre class="code-block">
Test Environment URL

https://sttltest1.home.sttltest1.apps.sttltest.maximo.shell.com/
</pre>

<p><b>Login Steps</b></p>

<ol>
<li>Open IBM Maximo Mobile Application.</li>
<li>Enter the environment URL.</li>
<li>Click <b>Connect</b>.</li>
<li>Enter valid credentials.</li>
<li>Click <b>Sign In</b>.</li>
</ol>


<h4>Application Navigation</h4>

<ul>
<li>Tap the <b>9-Dot icon</b> at the bottom right.</li>
<li>Select the <b>Inventory Counting</b> tile.</li>
</ul>

<div class="image-box">
   <img src="assets/images/smit21.png">
</div>

<h4>Main Counting Options</h4>

<table class="styled-table">
<tr>
<th>Option</th>
<th>Description</th>
</tr>

<tr>
<td>Ad Hoc Count</td>
<td>Perform manual inventory counting</td>
</tr>
</table>


<h4>Ad Hoc Counting</h4>

<div class="image-box">
   <img src="assets/images/smit53.png">
</div>

<p>
Ad Hoc counting allows technicians to perform physical counts of items
directly from mobile devices.
</p>

<div class="image-box">
   <img src="assets/images/smit54.png">
</div>

<div class="image-box">
   <img src="assets/images/smit55.png">
</div>


<p>The following item details are displayed:</p>

<ul>
<li>Item Number</li>
<li>Item Description</li>
<li>Bin</li>
<li>Site</li>
<li>Storeroom</li>
<li>Quantity Due</li>
<li>Current Balance</li>
<li>Physical Count</li>
<li>TextBox to update Physical Count (Editable)</li>
</ul>


<h4>Item Material Details</h4>

<p>Technicians can open item details to view additional information.</p>

<ul>
<li>Item Type</li>
<li>Lot Number</li>
<li>Unit</li>
<li>Item Number</li>
<li>Item Description</li>
</ul>


<h4>Search Options</h4>

<p>Users can search inventory records using the search bar.</p>

<p>Search parameters include:</p>

<ul>
<li>Item Number</li>
<li>Item Description</li>
<li>Bin</li>
</ul>


<h4>Filter Options</h4>

<p>Inventory records can be filtered using the Filter icon.</p>

<p>Available filters:</p>

<ul>
<li>Bin</li>
<li>Lot</li>
</ul>

<p><b>Steps:</b></p>

<ol>
<li>Click the <b>Filter icon</b>.</li>
<li>Select Bin or Lot.</li>
<li>Select the required values.</li>
<li>Click <b>Save</b>.</li>
</ol>


<h4>Sort Options</h4>

<p>The Sort icon allows users to change the display order.</p>

<p>Available sorting fields:</p>

<ul>
<li>Lot</li>
<li>Bin</li>
<li>Count Due</li>
<li>Item</li>
</ul>


<h4>Counting Workflow</h4>

<pre class="code-block">
Open Inventory Counting
        ↓
Select Ad Hoc Count
        ↓
Search or Filter Item
        ↓
Enter Physical Count
        ↓
Move Item to "Counted"
        ↓
Save Transaction
</pre>



<h4>Save Confirmation</h4>

<p>After saving the physical count, the system displays confirmation:</p>

<pre class="code-block">
"Item Physical Count is saved"
</pre>

`;
}