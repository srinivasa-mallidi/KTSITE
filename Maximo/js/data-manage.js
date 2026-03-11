/* ============================================================
   MAXIMO MANAGE KT – Knowledge Module
============================================================ */


/* ============================================================
   MAIN RENDER FUNCTION (ONLY RETURNS HTML)
============================================================ */

function renderManageSection() {
    return `
        <div class="server-side-wrapper">

            <div class="server-side-header">
                <h2>Maximo Manage – Functional & Technical Knowledge</h2>
                <p>Application Configuration & Business Process Knowledge Base</p>
            </div>

            <div class="server-side-body">

                <div class="server-side-nav">
                    <button data-type="automation" class="active-btn">Automation Scripts</button>
                    <button data-type="escalation">Escalations</button>
                    <button data-type="cron">Cron Tasks</button>
                    <button data-type="dbconfig">Database Configuration</button>
                    <button data-type="mif">Integration Framework</button>
                    <button data-type="asset">Asset Management</button>
                    <button data-type="wo">Work Order Management</button>
                    <button data-type="inventory">Inventory Management</button>
                    <button data-type="purchase">Purchase Management</button>
                    <button data-type="pm">Preventive Maintenance</button>
                </div>

                <div id="manageDynamicContent" class="server-side-content"></div>

            </div>
        </div>
    `;
}


/* ============================================================
   INITIALIZER – MUST BE CALLED AFTER RENDER
============================================================ */

function initializeManageSection() {

    const buttons = document.querySelectorAll(".server-side-nav button");

    buttons.forEach(btn => {
        btn.addEventListener("click", function () {

            buttons.forEach(b => b.classList.remove("active-btn"));
            this.classList.add("active-btn");

            loadManageContent(this.dataset.type);
        });
    });

    // Load default section
    loadManageContent("automation");
}


/* ============================================================
   CONTENT LOADER
============================================================ */

function loadManageContent(type) {

    const contentArea = document.getElementById("manageDynamicContent");

    if (!contentArea) return;

    switch (type) {
        case "automation":
            contentArea.innerHTML = getAutomationContent();
            break;
        case "escalation":
            contentArea.innerHTML = getEscalationContent();
            break;
        case "cron":
            contentArea.innerHTML = getCronContent();
            break;
        case "dbconfig":
            contentArea.innerHTML = getDBConfigContent();
            break;
        case "mif":
            contentArea.innerHTML = getMIFContent();
            break;
        case "asset":
            contentArea.innerHTML = getAssetContent();
            break;
        case "wo":
            contentArea.innerHTML = getWOContent();
            break;
        case "inventory":
            contentArea.innerHTML = getInventoryContent();
            break;
        case "purchase":
            contentArea.innerHTML = getPurchaseContent();
            break;
        case "pm":
            contentArea.innerHTML = getPMContent();
            break;
        default:
            contentArea.innerHTML = "<p>No content available.</p>";
    }
}


/* ============================================================
   CONTENT FUNCTIONS
============================================================ */

function getAutomationContent() {
return `

<h3>Automation Scripts – Complete Technical KT</h3>

<div class="info-card">
<b>Automation Scripts</b> allow implementing business logic without Java deployment.
They operate inside the Maximo MBO framework and replace most traditional Java customizations.
</div>


<!-- ========================================================= -->
<h4>1. MBO vs MBO Set</h4>

<h5>1.1 Core Definitions</h5>

<ul>
<li><b>MBO (Maximo Business Object)</b> – Represents a single row from a Maximo table.  
Example: One ASSET record.</li>

<li><b>MBO Set</b> – Represents a collection of MBOs (resultset).  
Example: All ASSET records returned by a query.</li>
</ul>

<div class="highlight-box">
MBO Set = Table / Dataset  
MBO = One Row inside the dataset
</div>

Automation scripts always operate on:
<ul>
<li>The current <b>mbo</b></li>
<li>Or retrieve additional <b>MboSets</b> when needed</li>
</ul>


<!-- ========================================================= -->
<h4>2. Java Classes in Maximo & Script Equivalents</h4>

<table class="styled-table">
<tr><th>Java Class</th><th>Purpose</th><th>Automation Script Equivalent</th></tr>
<tr><td>MBO class</td><td>Object level logic</td><td>Object Launch Point</td></tr>
<tr><td>Field class</td><td>Attribute level logic</td><td>Attribute Launch Point</td></tr>
<tr><td>Action class</td><td>Button / Workflow logic</td><td>Action Launch Point</td></tr>
<tr><td>Custom Cron</td><td>Scheduled logic</td><td>ScriptCrontask</td></tr>
<tr><td>Condition class</td><td>Workflow condition</td><td>Condition Launch Point</td></tr>
<tr><td>Role class</td><td>Assignment routing</td><td>ScriptRole</td></tr>
<tr><td>Integration classes</td><td>MIF Pre/Post processing</td><td>Integration Launch Point</td></tr>
</table>

Automation scripts eliminate:
• EAR rebuild  
• Deployment  
• Server restart  


<!-- ========================================================= -->
<h4>3. MBO Lifecycle</h4>

<h5>Lifecycle Stages</h5>

<ul>
<li>Instantiation – MBO created in memory</li>
<li>InitValue() – When record loads from List → Detail</li>
<li>Init() – After initValue; used for security & field control</li>
<li>GetValue()</li>
<li>SetValue()</li>
<li>Save()</li>
<li>Commit()</li>
<li>Delete()</li>
<li>Destruction</li>
</ul>

Most scripts execute during:
<ul>
<li>Before Save</li>
<li>After Save</li>
<li>After Commit</li>
</ul>


<!-- ========================================================= -->
<h4>4. Object Launch Point</h4>

Used when logic must run at object level (ASSET, WORKORDER, SR etc.)

<h5>4.1 Event Types</h5>

<h6>Initialize Value</h6>
Triggers when record opens.  
Used to prepopulate default values.

Equivalent to Java initValue().

<h6>Validate Application</h6>
Triggers during Save validation.

Use cases:
• Check mandatory fields  
• Validate status transitions  

Use:
<pre class="code-block">
service.error("cust","invalidStatus")
</pre>

<h6>Allow Object Creation</h6>
Runs before new record created.  
Return false or throw error to block creation.

<h6>Allow Object Deletion</h6>
Runs before delete execution.

<h6>Save Event</h6>

Subtypes:
• Add (new record)  
• Update (edit record)  
• Delete  

Timing Options:

<b>Before Save</b> – Most common  
<b>After Save</b> – After save, before commit  
<b>After Commit</b> – After DB commit (cannot block)

Use After Commit only for:
• Integration  
• Notifications  
• Logging  


<!-- ========================================================= -->
<h4>5. Attribute Launch Point</h4>

Runs immediately when user changes field.  
Does NOT require Save.

<table class="styled-table">
<tr><th>Event</th><th>When It Executes</th><th>Example</th></tr>
<tr><td>Initial Access Restriction</td><td>When MBO loads</td><td>Make field read-only</td></tr>
<tr><td>Initialize Value</td><td>When record displays</td><td>Default Storeroom</td></tr>
<tr><td>Validate</td><td>On tab-out</td><td>Target Date validation</td></tr>
<tr><td>Retrieve List</td><td>On lookup open</td><td>Filter active records</td></tr>
<tr><td>Run Action</td><td>Immediately after change</td><td>Auto-populate fields</td></tr>
</table>


<!-- ========================================================= -->
<h4>6. Action Launch Point</h4>

Triggers only when explicitly invoked:

• Button click  
• Escalation  
• Workflow node  

Conceptual Flow:

USER → ACTION → Launch Point → Script

Difference:
Object LP = Automatic  
Action LP = Manual / Triggered  

Used for:
• Recalculate Cost  
• Copy Priority  
• Escalation updates  


<!-- ========================================================= -->
<h4>7. MXServer</h4>

<pre class="code-block">
from psdi.server import MXServer
mx = MXServer.getMXServer()
userInfo = mx.getSystemUserInfo()
assetset = mx.getMboSet("ASSET", userInfo)
</pre>

Use only when relationships not possible.  
Preferred method = Database relationship.


<!-- ========================================================= -->
<h4>8. Fetching MBO Sets</h4>

<h5>8.1 Database Relationship (Preferred)</h5>

<pre class="code-block">
assetset = mbo.getMboSet("ALLASSETS")
</pre>

<h5>8.2 Dynamic Relationship</h5>

<pre class="code-block">
assetset = mbo.getMboSet(
"$ASSET:ASSET:ASSETNUM='{}' AND SITEID='{}'".format(
mbo.getString("ASSETNUM"),
mbo.getString("SITEID")
))
</pre>

<h5>8.3 Using MXServer</h5>

<pre class="code-block">
assetset = mx.getMboSet("ASSET", mx.getUserInfo())
</pre>


<!-- ========================================================= -->
<h4>9. Iterating Through MboSet</h4>

Avoid:
<pre class="code-block">
for i in range(woset.count()):
</pre>

Preferred:
<pre class="code-block">
wo = woset.moveFirst()
while wo:
    wo = woset.moveNext()
</pre>


<!-- ========================================================= -->
<h4>10. GetValue / SetValue</h4>

<pre class="code-block">
asset = mbo.getValue("ASSETNUM")
mbo.setValue("STATUS","APPR")
</pre>


<!-- ========================================================= -->
<h4>11. MboConstants</h4>

<table class="styled-table">
<tr><th>Constant</th><th>Purpose</th></tr>
<tr><td>NOVALIDATION</td><td>Skip validation</td></tr>
<tr><td>NOACCESSCHECK</td><td>Override security</td></tr>
<tr><td>NOACTION</td><td>Skip action logic</td></tr>
<tr><td>READONLY</td><td>Make field read-only</td></tr>
<tr><td>REQUIRED</td><td>Make field mandatory</td></tr>
</table>

Combine flags:
<pre class="code-block">
mbo.setValue("FIELD", value,
MboConstants.NOACCESSCHECK | MboConstants.NOVALIDATION)
</pre>


<!-- ========================================================= -->
<h4>12. Field Flags</h4>

Read-only:
<pre class="code-block">
mbo.setFieldFlag("DESCRIPTION",
MboConstants.READONLY, True)
</pre>

Mandatory:
<pre class="code-block">
mbo.setFieldFlag("LOCATION",
MboConstants.REQUIRED, True)
</pre>


<!-- ========================================================= -->
<h4>13. Error Handling</h4>

<pre class="code-block">
service.error("MYGRP","MYKEY")
service.setWarning("MYGRP","MYWARN")
</pre>


<!-- ========================================================= -->
<h4>14. Implicit Variables</h4>

<table class="styled-table">
<tr><th>Variable</th><th>Meaning</th></tr>
<tr><td>mbo</td><td>Current record</td></tr>
<tr><td>mboset</td><td>Current resultset</td></tr>
<tr><td>onadd</td><td>Record creation</td></tr>
<tr><td>onupdate</td><td>Record update</td></tr>
<tr><td>ondelete</td><td>Record deletion</td></tr>
<tr><td>interactive</td><td>True if triggered by UI</td></tr>
<tr><td>app</td><td>Application name</td></tr>
<tr><td>service</td><td>Service API</td></tr>
<tr><td>evalResult</td><td>Condition return value</td></tr>
</table>


<!-- ========================================================= -->
<h4>15. Launch Point Selection Guide</h4>

<table class="styled-table">
<tr><th>Requirement</th><th>Launch Point</th></tr>
<tr><td>Logic on Save</td><td>Object LP</td></tr>
<tr><td>Immediate field validation</td><td>Attribute LP</td></tr>
<tr><td>Button / Escalation logic</td><td>Action LP</td></tr>
<tr><td>Workflow condition</td><td>Condition LP</td></tr>
<tr><td>Assignment routing</td><td>Role Script</td></tr>
<tr><td>Integration transformation</td><td>Integration LP</td></tr>
</table>

`;
}


function getEscalationContent() {
return `

<h3>Escalations – Complete Technical & Functional KT</h3>

<div class="info-card">
<p>
Escalations automatically monitor records and trigger actions when specific 
conditions are met. They run in the background using Cron Tasks.
</p>
</div>


<h4>1. What is an Escalation?</h4>

<p>Escalation is a background monitoring mechanism in Maximo that:</p>

<ul>
<li>Periodically checks records</li>
<li>Evaluates a condition</li>
<li>Executes one or more actions</li>
</ul>

<p><strong>Common Use Cases:</strong></p>

<ul>
<li>Overdue Work Orders</li>
<li>SLA breaches</li>
<li>Priority updates</li>
<li>Status auto-changes</li>
<li>Email notifications</li>
<li>Automatic record creation</li>
</ul>

<p>
Escalations are executed by the <strong>Escalation Cron Task</strong>.
</p>


<h4>2. Escalation Architecture</h4>

<p><strong>Conceptual Flow:</strong></p>

<pre class="code-block">
CRON TASK (ESCALATION)  
        ↓  
Escalation Definition  
        ↓  
Escalation Point  
        ↓  
Condition Evaluation  
        ↓  
Action Execution
</pre>

<p>Escalation depends on:</p>

<ul>
<li>Cron Task Setup</li>
<li>SQL Where Clause</li>
<li>Escalation Points</li>
<li>Actions</li>
<li>Active Status</li>
</ul>


<h4>3. Core Components of Escalation</h4>

<h5>3.1 Escalation Record</h5>

<p>Main configuration includes:</p>

<ul>
<li>Applies To (Object Name) – e.g., WORKORDER</li>
<li>Condition (SQL Where Clause)</li>
<li>Schedule</li>
<li>Active checkbox</li>
</ul>

<p><strong>Example:</strong></p>

<p>Object: WORKORDER</p>

<pre class="code-block">
status='WAPPR' AND targetdate < sysdate
</pre>

<p>
This means: Find all WOs that are waiting for approval and overdue.
</p>


<h5>3.2 Escalation Points</h5>

<p>Escalation Points define what happens when condition becomes TRUE.</p>

<p>Each Escalation can have multiple Escalation Points.</p>

<p>Each Escalation Point contains:</p>

<ul>
<li>Escalation Condition (optional additional filter)</li>
<li>Actions</li>
<li>Notifications</li>
<li>Repeat configuration</li>
</ul>


<h5>3.3 Actions</h5>

<p>Escalation can execute:</p>

<ul>
<li>Status Change</li>
<li>Set Value</li>
<li>Custom Action Launch Point</li>
<li>Workflow</li>
<li>Communication Template</li>
<li>Custom Automation Script</li>
</ul>

<p><strong>Example:</strong></p>

<ul>
<li>Action Type = Custom Action</li>
<li>Action = WO_SET_HIGH_PRIORITY</li>
</ul>


<h4>4. Escalation Scheduling</h4>

<p>Escalations run through Cron Task.</p>

<p><strong>Navigation:</strong><br>
System Configuration → Platform Configuration → Cron Task Setup
</p>

<p>Cron Task: ESCALATION</p>

<p>Each escalation has its own instance.</p>

<p>Schedule is defined using:</p>

<ul>
<li>Cron Expression</li>
<li>Simple frequency (e.g., every 10 minutes)</li>
</ul>

<p><strong>Example – Run every 15 minutes:</strong></p>

<pre class="code-block">
0 */15 * * * ?
</pre>

<p><strong>Important:</strong> Lower frequency = higher DB load.</p>


<h4>5. Escalation Condition Types</h4>

<p>Escalation condition is written in SQL format.</p>

<p><strong>Examples:</strong></p>

<p>Overdue WO:</p>

<pre class="code-block">
status IN ('APPR','INPRG') 
AND targetdate < sysdate
</pre>

<p>SR older than 3 days:</p>

<pre class="code-block">
status='NEW' 
AND reportdate < (sysdate - 3)
</pre>

<p>High meter reading:</p>

<pre class="code-block">
meterreading > 10000
</pre>

<p><strong>Performance Note:</strong> Avoid complex subqueries unless necessary.</p>


<h4>6. Escalation Repeat Option</h4>

<p>Escalation Points allow repeat configuration.</p>

<ul>
<li>Execute only once</li>
<li>Repeat every X hours</li>
<li>Repeat until condition changes</li>
</ul>

<p>
Example: Send reminder email every 24 hours until WO is completed.
</p>


<h4>7. Escalation with Action Launch Point</h4>

<p>Escalation can call Automation Script.</p>

<p><strong>Flow:</strong></p>

<pre class="code-block">
Escalation → Action → Action Launch Point → Script
</pre>

<p><strong>Example:</strong></p>

<ul>
<li>If WO overdue > 5 days</li>
<li>Increase Priority</li>
<li>Send Email</li>
<li>Update Status</li>
</ul>

<p>
This allows complex logic beyond simple set value.
</p>


<h4>8. Escalation Performance Considerations</h4>

<p><strong>Very important in Production.</strong></p>

<p><strong>Best Practices:</strong></p>

<ul>
<li>Always index fields used in condition</li>
<li>Avoid full table scans</li>
<li>Avoid using NOT EXISTS with heavy joins</li>
<li>Avoid running every 1 minute in PROD</li>
<li>Keep WHERE clause optimized</li>
</ul>

<p><strong>Bad Example:</strong></p>

<pre class="code-block">
status!='COMP'
</pre>

<p><strong>Better:</strong></p>

<pre class="code-block">
status IN ('WAPPR','APPR','INPRG')
</pre>

<p>Reason: Negative conditions cause full scans.</p>


<h4>9. Escalation Common Issues</h4>

<p><strong>Issue 1 – Escalation not running</strong></p>

<ul>
<li>Is escalation Active?</li>
<li>Is Cron Task active?</li>
<li>Is schedule correct?</li>
</ul>

<p><strong>Issue 2 – Action not triggering</strong></p>

<ul>
<li>Escalation Point condition</li>
<li>Action configuration</li>
<li>Security permissions</li>
</ul>

<p><strong>Issue 3 – Performance slowdown</strong></p>

<ul>
<li>SQL explain plan</li>
<li>DB indexes</li>
<li>Frequency settings</li>
</ul>


<h4>10. Real Production Scenarios</h4>

<p><strong>Scenario 1 – WO SLA Breach</strong></p>

<pre class="code-block">
status IN ('APPR','INPRG') 
AND targetdate < sysdate
</pre>

<ul>
<li>Increase priority</li>
<li>Send notification</li>
</ul>

<p><strong>Scenario 2 – Auto Cancel PR</strong></p>

<pre class="code-block">
status='WAPPR' 
AND changedate < (sysdate - 30)
</pre>

<ul>
<li>Change status to CAN</li>
</ul>

<p><strong>Scenario 3 – Meter Threshold Alert</strong></p>

<pre class="code-block">
meterreading > threshold
</pre>

<ul>
<li>Create Work Order</li>
</ul>


<h4>11. Escalation vs Cron Task vs Workflow</h4>

<table class="styled-table">
<tr><th>Feature</th><th>Escalation</th><th>Cron Task</th><th>Workflow</th></tr>
<tr><td>Time-based</td><td>Yes</td><td>Yes</td><td>No</td></tr>
<tr><td>Record Monitoring</td><td>Yes</td><td>No</td><td>No</td></tr>
<tr><td>User Driven</td><td>No</td><td>No</td><td>Yes</td></tr>
<tr><td>Complex Routing</td><td>Limited</td><td>No</td><td>Yes</td></tr>
</table>


<h4>12. When to Use Escalation?</h4>

<p><strong>Use Escalation when:</strong></p>

<ul>
<li>Condition is time-based</li>
<li>Record must be monitored automatically</li>
<li>No user interaction required</li>
<li>Batch processing required</li>
</ul>

<p><strong>Do NOT use Escalation when:</strong></p>

<ul>
<li>Logic must run immediately on save</li>
<li>Requires complex routing logic</li>
<li>Depends heavily on user interaction</li>
</ul>


<h4>13. Enterprise Best Practices</h4>

<ul>
<li>Always test escalation in TEST before PROD</li>
<li>Monitor logs after activation</li>
<li>Disable escalation before modifying</li>
<li>Use meaningful naming convention</li>
<li>Document SQL conditions clearly</li>
<li>Keep frequency optimized</li>
</ul>

<p><strong>Naming Examples:</strong></p>

<ul>
<li>ESC_WO_OVERDUE_15MIN</li>
<li>ESC_PR_AUTO_CANCEL_30D</li>
</ul>


<h4>14. Escalation Lifecycle Summary</h4>

<pre class="code-block">
Cron triggers  
→ Escalation runs SQL  
→ Records fetched  
→ Condition true?  
→ Action executes  
→ Repeat based on configuration  
</pre>

<p>
Escalation is powerful but must be handled carefully in production systems.
</p>

`;
}

function getCronContent() {
return `

<h3>Cron Tasks – Complete Technical & Administrative KT</h3>

<div class="info-card">
<p>
Cron Tasks execute background processes in Maximo at scheduled intervals.
They are system-level schedulers responsible for automation, integrations,
escalations, report generation, PM generation and more.
</p>
</div>


<h4>1. What is a Cron Task?</h4>

<p>A Cron Task is a background scheduler in Maximo that:</p>

<ul>
<li>Runs automatically at configured intervals</li>
<li>Executes system processes</li>
<li>Runs without user interaction</li>
<li>Operates using Cron Expression scheduling</li>
</ul>

<p><strong>Navigation:</strong><br>
System Configuration → Platform Configuration → Cron Task Setup
</p>


<h4>2. Cron Task Architecture</h4>

<p><strong>Conceptual Flow:</strong></p>

<pre class="code-block">
Application Server  
        ↓  
Cron Service Thread  
        ↓  
Cron Task Instance  
        ↓  
Business Logic Execution
</pre>

<p>Cron Tasks run inside:</p>

<ul>
<li>CRON Server Bundle (in MAS)</li>
<li>JVM Cron Cluster (in Maximo 7.6)</li>
</ul>


<h4>3. Cron Task Components</h4>

<p>Each Cron Task has:</p>

<ol>
<li>Cron Task Definition (Class)</li>
<li>Cron Task Instance</li>
<li>Schedule (Cron Expression)</li>
<li>Parameters</li>
<li>Active Status</li>
</ol>

<p><strong>Example:</strong></p>

<ul>
<li>Cron Task: PMWOGEN</li>
<li>Instance: PMWOGEN_TEST</li>
<li>Schedule: Every 1 hour</li>
</ul>


<h4>4. Common Standard Cron Tasks</h4>

<table class="styled-table">
<tr><th>Cron Task</th><th>Purpose</th></tr>
<tr><td>ESCALATION</td><td>Runs Escalations</td></tr>
<tr><td>PMWOGEN</td><td>Generates Preventive Maintenance WOs</td></tr>
<tr><td>REPORTSCHED</td><td>Scheduled Reports</td></tr>
<tr><td>INTEGRATION</td><td>Outbound/Inbound MIF processing</td></tr>
<tr><td>WORKFLOW</td><td>Workflow background processing</td></tr>
<tr><td>REORDER</td><td>Inventory Reorder Processing</td></tr>
</table>


<h4>5. Cron Expression Explained</h4>

<p><strong>Cron Expression format:</strong></p>

<pre class="code-block">
Seconds Minutes Hours DayOfMonth Month DayOfWeek Year
</pre>

<p><strong>Examples:</strong></p>

<p>Every 15 minutes:</p>

<pre class="code-block">
0 */15 * * * ?
</pre>

<p>Every day at 2 AM:</p>

<pre class="code-block">
0 0 2 * * ?
</pre>

<p><strong>Important Symbols:</strong></p>

<ul>
<li>* → Any value</li>
<li>? → No specific value</li>
<li>*/5 → Every 5 units</li>
</ul>


<h4>6. Cron Task Instances</h4>

<p>Each Cron Task can have multiple instances.</p>

<p><strong>Why multiple instances?</strong></p>

<ul>
<li>Different schedules</li>
<li>Different parameters</li>
<li>Different environments</li>
</ul>

<p><strong>Example:</strong></p>

<ul>
<li>ESCALATION_QGC_TEST</li>
<li>ESCALATION_STTL_TEST</li>
<li>ESCALATION_PROD</li>
</ul>


<h4>7. Script Cron Task</h4>

<p>Automation Scripts can be used as Cron Task using:</p>

<p><strong>Launch Point Type = Cron Task</strong></p>

<p><strong>Class used:</strong><br>
com.ibm.tivoli.maximo.script.ScriptCrontask
</p>

<p><strong>Use Cases:</strong></p>

<ul>
<li>Daily cleanup job</li>
<li>Custom data archiving</li>
<li>Batch data transformation</li>
</ul>

<p><strong>Basic Script Cron Example:</strong></p>

<pre class="code-block">
from psdi.server import MXServer

mx = MXServer.getMXServer()
userInfo = mx.getSystemUserInfo()

assetSet = mx.getMboSet("ASSET", userInfo)
asset = assetSet.moveFirst()

while asset:
    # custom logic
    asset = assetSet.moveNext()

assetSet.close()
</pre>


<h4>8. Cron Task Threading & Performance</h4>

<p>Cron Tasks run in background threads.</p>

<p><strong>Important considerations:</strong></p>

<ul>
<li>Avoid long-running queries</li>
<li>Avoid full table scans</li>
<li>Close MboSets after use</li>
<li>Avoid count() in loops</li>
<li>Avoid heavy nested loops</li>
</ul>

<p><strong>Bad Example:</strong></p>

<pre class="code-block">
for i in range(set.count()):
</pre>

<p><strong>Preferred:</strong></p>

<pre class="code-block">
mbo = set.moveFirst()
while mbo:
    mbo = set.moveNext()
</pre>


<h4>9. Cron Server Bundle (MAS Architecture)</h4>

<p>In MAS:</p>

<p>Server Bundles segregate workloads.</p>

<p><strong>Cron Server Bundle handles:</strong></p>

<ul>
<li>Escalations</li>
<li>PM generation</li>
<li>Integration polling</li>
<li>Reorder processing</li>
<li>Workflow background jobs</li>
</ul>

<p>This prevents UI slowdown.</p>

<p><strong>Architecture Difference:</strong></p>

<ul>
<li>Maximo 7.6 → Cron ran inside JVM cluster</li>
<li>MAS → Cron runs in dedicated pod(s)</li>
</ul>


<h4>10. Common Cron Task Issues</h4>

<p><strong>Issue 1 – Cron not running</strong></p>

<ul>
<li>Instance Active?</li>
<li>Schedule correct?</li>
<li>Cron Task Enabled?</li>
<li>Server Bundle healthy?</li>
</ul>

<p><strong>Issue 2 – Duplicate processing</strong></p>

<ul>
<li>Multiple instances active</li>
<li>Overlapping schedules</li>
<li>Long execution time</li>
</ul>

<p><strong>Issue 3 – Performance impact</strong></p>

<ul>
<li>Poor SQL condition</li>
<li>Missing indexes</li>
<li>Large dataset processing</li>
</ul>


<h4>11. Escalation vs Cron Task</h4>

<table class="styled-table">
<tr><th>Feature</th><th>Cron Task</th><th>Escalation</th></tr>
<tr><td>Time-based</td><td>Yes</td><td>Yes (via Cron)</td></tr>
<tr><td>Direct SQL Monitoring</td><td>No</td><td>Yes</td></tr>
<tr><td>Complex Batch Processing</td><td>Yes</td><td>Limited</td></tr>
<tr><td>Automation Script Based</td><td>Yes</td><td>Via Action</td></tr>
</table>


<h4>12. Cron Logging & Monitoring</h4>

<p><strong>Logs available in:</strong></p>

<ul>
<li>SystemOut.log (7.6)</li>
<li>MAS pod logs (OpenShift)</li>
<li>CRON server logs</li>
</ul>

<p><strong>Best practice:</strong></p>

<pre class="code-block">
service.log("Cron Started")
</pre>

<p>Always monitor logs after activation.</p>


<h4>13. Production Best Practices</h4>

<ul>
<li>Do not run heavy Cron every minute</li>
<li>Stagger multiple Cron tasks</li>
<li>Use indexing on monitored columns</li>
<li>Test in TEST environment first</li>
<li>Document all custom Cron Tasks</li>
<li>Avoid running large Cron jobs during peak hours</li>
</ul>

<p><strong>Example Naming:</strong></p>

<ul>
<li>CRON_PM_GENERATION_2AM</li>
<li>CRON_ASSET_CLEANUP_WEEKLY</li>
</ul>


<h4>14. Cron Task Lifecycle</h4>

<pre class="code-block">
Server starts  
→ Cron Service initializes  
→ Cron Instance loaded  
→ Schedule matched  
→ Logic executed  
→ Wait for next trigger  
</pre>

<p>
Cron Tasks are backbone of system automation.
Improper configuration can impact system performance heavily.
</p>

`;
}

function getDBConfigContent() {
return `

<h3>Database Configuration – Complete Technical & Structural KT</h3>

<div class="info-card">
<p>
Database Configuration is used to make structural changes in Maximo’s database schema.
It controls Objects, Attributes, Domains, Relationships, Indexes and table-level settings.
All structural changes require Apply Configuration (ConfigDB).
</p>
</div>


<h4>1. What is Database Configuration?</h4>

<p>Database Configuration allows:</p>

<ul>
<li>Create new attributes (columns)</li>
<li>Create new objects (tables)</li>
<li>Modify attribute properties</li>
<li>Define relationships</li>
<li>Create indexes</li>
<li>Define domains</li>
</ul>

<p><strong>Navigation:</strong><br>
System Configuration → Platform Configuration → Database Configuration
</p>


<h4>2. Objects (Tables)</h4>

<p>Each Object in Maximo represents a database table.</p>

<p><strong>Examples:</strong></p>
<ul>
<li>ASSET → ASSET table</li>
<li>WORKORDER → WORKORDER table</li>
</ul>

<p>Object configuration includes:</p>

<ul>
<li>Object Name</li>
<li>Table Name</li>
<li>Persistent / Non-Persistent flag</li>
<li>Site / Org Level flag</li>
<li>Main Object flag</li>
</ul>

<p><strong>Persistent Object:</strong> Stored physically in DB.</p>
<p><strong>Non-Persistent Object:</strong> Used for UI only. No table created.</p>


<h4>3. Attributes (Columns)</h4>

<p>Attributes represent table columns.</p>

<p><strong>Required fields while creating attribute:</strong></p>

<ul>
<li>Attribute Name</li>
<li>Type (ALN, NUMERIC, DATE, YORN etc.)</li>
<li>Length</li>
<li>Required flag</li>
<li>Persistent flag</li>
</ul>

<p><strong>Example:</strong></p>

<ul>
<li>Add new field to WORKORDER</li>
<li>Attribute: SRI_PRIORITY_LEVEL</li>
<li>Type: ALN</li>
<li>Length: 10</li>
</ul>

<p>After creation → Apply Configuration required.</p>


<h4>4. Domains</h4>

<p>Domains control allowed values and enforce data integrity.</p>

<p><strong>Types of Domains:</strong></p>

<ul>
<li>ALN Domain (static values)</li>
<li>Numeric Domain</li>
<li>Table Domain</li>
<li>Crossover Domain</li>
<li>Synonym Domain</li>
</ul>

<p><strong>Example ALN Domain:</strong></p>

<ul>
<li>Domain Name: PRIORITY_LEVEL</li>
<li>Values: LOW, MEDIUM, HIGH</li>
</ul>

<p><strong>Synonym Domain Example:</strong></p>

<ul>
<li>STATUS domain</li>
<li>APPR → Approved</li>
<li>INPRG → In Progress</li>
</ul>


<h4>5. Relationships</h4>

<p>Relationships define how objects link.</p>

<p><strong>Example:</strong> WORKORDER → ASSET</p>

<ul>
<li>Relationship Name: WOASSET</li>
<li>Child Object: ASSET</li>
</ul>

<p><strong>Where Clause:</strong></p>

<pre class="code-block">
assetnum = :assetnum 
and siteid = :siteid
</pre>

<p><strong>Used for:</strong></p>

<ul>
<li>Fetching MboSets in scripts</li>
<li>Lookup filtering</li>
<li>Integration</li>
<li>Automation scripts</li>
</ul>


<h4>6. Indexes</h4>

<p>Indexes improve query performance.</p>

<p><strong>Example Escalation Query:</strong></p>

<pre class="code-block">
status='APPR' AND targetdate < sysdate
</pre>

<p>Create index on:</p>

<ul>
<li>STATUS</li>
<li>TARGETDATE</li>
</ul>

<p>Without index → Full table scan.</p>

<p><strong>Important:</strong> Always review DB explain plan before production deployment.</p>


<h4>7. Apply Configuration (ConfigDB)</h4>

<p>After structural change:</p>

<ul>
<li>Click Apply Configuration Changes</li>
</ul>

<p><strong>Behind the scenes:</strong></p>

<pre class="code-block">
• System stops services
• DDL statements executed
• Tables altered
• Indexes created
• Metadata updated
• Restart required
</pre>


<h4>8. What Happens During ConfigDB?</h4>

<ol>
<li>Set CONFIGURING flag = 1</li>
<li>Execute DB structural updates</li>
<li>Update MAXOBJECTCFG</li>
<li>Update MAXATTRIBUTECFG</li>
<li>Set CONFIGURING flag = 0</li>
</ol>

<p>If failure occurs:</p>

<ul>
<li>CONFIGURING remains 1</li>
<li>System cannot start</li>
<li>Manual fix required</li>
</ul>


<h4>9. Configuring Flag</h4>

<p><strong>Table:</strong> MAXVARS</p>
<p><strong>Variable:</strong> CONFIGURING</p>

<p>If CONFIGURING = 1 → System believes ConfigDB incomplete.</p>

<p><strong>Fix:</strong></p>

<pre class="code-block">
update maxvars 
set varvalue='0' 
where varname='CONFIGURING';
</pre>


<h4>10. Common ConfigDB Failures</h4>

<ol>
<li>Column already exists</li>
<li>Data type mismatch</li>
<li>Constraint violation</li>
<li>Large table alteration timeout</li>
<li>Index creation failure</li>
</ol>

<p><strong>Troubleshooting:</strong></p>

<ul>
<li>Check logs</li>
<li>Check DB error messages</li>
<li>Rollback incomplete changes</li>
</ul>


<h4>11. Structural vs Non-Structural Changes</h4>

<p><strong>Structural Changes (Require Apply Config):</strong></p>

<ul>
<li>New attribute</li>
<li>New object</li>
<li>Attribute type change</li>
<li>Index creation</li>
</ul>

<p><strong>Non-Structural Changes (No ConfigDB required):</strong></p>

<ul>
<li>Domain value addition</li>
<li>Security group change</li>
<li>Automation script creation</li>
</ul>


<h4>12. MAS vs Maximo 7.6 Behavior</h4>

<p><strong>Maximo 7.6:</strong></p>
<ul>
<li>ConfigDB runs on JVM</li>
<li>Full EAR rebuild sometimes required</li>
</ul>

<p><strong>MAS 8/9:</strong></p>
<ul>
<li>Runs inside Manage container</li>
<li>No EAR rebuild</li>
<li>Apply Configuration handled via pod</li>
<li>Uses Kubernetes orchestration</li>
</ul>


<h4>13. Performance Considerations</h4>

<p>Large tables (WORKORDER, ASSET, INVOICE) require:</p>

<ul>
<li>Maintenance window</li>
<li>DB backup before config</li>
<li>Off-hours deployment</li>
<li>Monitoring lock duration</li>
</ul>

<p><strong>Never apply config during peak production hours.</strong></p>


<h4>14. Best Practices</h4>

<ul>
<li>Always test in DEV</li>
<li>Backup DB before PROD</li>
<li>Disable escalations before config</li>
<li>Take downtime window</li>
<li>Document changes</li>
<li>Validate indexes post deployment</li>
<li>Restart after completion</li>
</ul>


<h4>15. Enterprise Governance</h4>

<ul>
<li>Raise change request</li>
<li>Get CAB approval</li>
<li>Attach DDL impact assessment</li>
<li>Perform post-validation testing</li>
</ul>

<p>Database Configuration is high-risk activity in production environments.</p>


<h4>16. Summary Flow</h4>

<pre class="code-block">
Create Attribute  
→ Save  
→ Apply Configuration  
→ CONFIGURING = 1  
→ DB Structure Updated  
→ CONFIGURING = 0  
→ Restart  
</pre>

<p>
Database Configuration controls the schema foundation of Maximo.
Improper changes can impact entire system stability.
</p>

`;
}

function getMIFContent() {
return `

<h3>Maximo Integration Framework (MIF) – Complete Technical & Functional KT</h3>

<div class="info-card">
<p>
Maximo Integration Framework (MIF) enables data exchange between Maximo and 
external systems such as SAP, Oracle, GIS, Azure, mobile apps and custom APIs.
It supports inbound, outbound, synchronous and asynchronous integrations.
</p>
</div>


<h4>1. What is MIF?</h4>

<p>
MIF is the middleware layer inside Maximo responsible for:
</p>

<ul>
<li>Importing data into Maximo</li>
<li>Exporting data from Maximo</li>
<li>Transforming data formats</li>
<li>Handling message processing</li>
<li>Managing integration errors</li>
</ul>

<p><strong>Navigation:</strong><br>
<ul>
<li>Integration → Object Structures </li>
<li>Integration → Enterprise Services</li>
<li>Integration → Publish Channels</li>
<li>Integration → External Systems</li>
<li>Integration → End Points</li>
</ul>

</p>


<h4>2. MIF Architecture</h4>

<p><strong>Conceptual Flow:</strong></p>

<pre class="code-block">
External System  
        ↓  
Endpoint (HTTP / JMS / FILE)  
        ↓  
Enterprise Service / Publish Channel  
        ↓  
Object Structure  
        ↓  
Maximo MBO Layer  
        ↓  
Database
</pre>

<p>MIF runs inside:</p>

<ul>
<li>MIA Server Bundle (MAS)</li>
<li>Integration JVM Cluster (Maximo 7.6)</li>
</ul>


<h4>3. Core Components of MIF</h4>

<h5>3.1 Object Structure</h5>

<p>
Object Structure defines the data structure exchanged between systems.
It contains:
</p>

<ul>
<li>Parent Object (e.g., WORKORDER)</li>
<li>Child Objects (e.g., WPMATERIAL, LABTRANS)</li>
<li>Relationships</li>
<li>Processing rules</li>
</ul>

<p><strong>Example:</strong></p>

<ul>
<li>MXWO – Work Order Object Structure</li>
<li>MXASSET – Asset Object Structure</li>
</ul>


<h5>3.2 Enterprise Service (Inbound)</h5>

<p>
Enterprise Service handles inbound data (external → Maximo).
</p>

<ul>
<li>Receives XML / JSON</li>
<li>Validates data</li>
<li>Processes via MBO</li>
<li>Saves to database</li>
</ul>

<p><strong>Example Use Case:</strong></p>

<ul>
<li>SAP sends new Work Order</li>
<li>MIF processes and creates WO in Maximo</li>
</ul>


<h5>3.3 Publish Channel (Outbound)</h5>

<p>
Publish Channel sends data from Maximo to external systems.
</p>

<ul>
<li>Triggered on Save</li>
<li>Triggered via Action</li>
<li>Triggered via Escalation</li>
</ul>

<p><strong>Example:</strong></p>

<ul>
<li>When WO status changes to COMP</li>
<li>Send update to SAP</li>
</ul>


<h5>3.4 External System</h5>

<p>
External System groups:
</p>

<ul>
<li>Enterprise Services</li>
<li>Publish Channels</li>
<li>Endpoints</li>
</ul>

<p>
It represents logical external system (e.g., SAP, GIS, Azure).
</p>


<h5>3.5 Endpoints</h5>

<p>Endpoints define communication mechanism:</p>

<ul>
<li>HTTP / REST</li>
<li>SOAP</li>
<li>JMS Queue</li>
<li>Flat File</li>
<li>XML File</li>
</ul>

<p><strong>Example HTTP Endpoint:</strong></p>

<pre class="code-block">
URL: https://sap.company.com/api/workorder
Method: POST
Auth: Basic / OAuth
</pre>


<h4>4. Integration Types</h4>

<table class="styled-table">
<tr><th>Type</th><th>Description</th></tr>
<tr><td>Inbound</td><td>External system sends data to Maximo</td></tr>
<tr><td>Outbound</td><td>Maximo sends data to external system</td></tr>
<tr><td>Synchronous</td><td>Immediate request-response</td></tr>
<tr><td>Asynchronous</td><td>Message queue based processing</td></tr>
</table>


<h4>5. Message Processing Flow</h4>

<p>Inbound Processing:</p>

<pre class="code-block">
Message Received  
→ Validate XML/JSON  
→ Apply Object Structure  
→ Apply Automation Scripts (if any)  
→ Save MBO  
→ Commit  
</pre>

<p>Outbound Processing:</p>

<pre class="code-block">
Record Saved  
→ Publish Channel Triggered  
→ Data Transformed  
→ Sent via Endpoint  
→ Status Logged  
</pre>


<h4>6. Processing Rules</h4>

<p>MIF supports:</p>

<ul>
<li>Add only</li>
<li>Update only</li>
<li>Add or Update</li>
<li>Delete processing</li>
</ul>

<p>
These are configured at Object Structure level.
</p>


<h4>7. Integration Launch Points</h4>

<p>
Automation Scripts can be attached to:
</p>

<ul>
<li>Enterprise Service (Inbound)</li>
<li>Publish Channel (Outbound)</li>
</ul>

<p><strong>Used for:</strong></p>

<ul>
<li>Data transformation</li>
<li>Field mapping</li>
<li>Custom validation</li>
<li>Conditional processing</li>
</ul>

<p><strong>Example Script Logic:</strong></p>

<pre class="code-block">
if mbo.getString("STATUS") == "NEW":
    mbo.setValue("PRIORITY", "1")
</pre>


<h4>8. Integration Error Handling</h4>

<p>
MIF logs errors in:
</p>

<ul>
<li>Message Tracking</li>
<li>Integration Queue</li>
<li>Error Status table</li>
<li>MAS Pod logs</li>
</ul>

<p><strong>Common Errors:</strong></p>

<ul>
<li>Invalid field value</li>
<li>Missing mandatory attribute</li>
<li>Security permission error</li>
<li>Relationship mismatch</li>
<li>Duplicate key</li>
</ul>


<h4>9. Message Reprocessing</h4>

<p>If message fails:</p>

<ul>
<li>Fix data issue</li>
<li>Go to Message Tracking</li>
<li>Select message</li>
<li>Click Reprocess</li>
</ul>

<p>
Never manually update DB without understanding integration state.
</p>


<h4>10. MIF Performance Considerations</h4>

<ul>
<li>Use indexing on integration keys</li>
<li>Avoid large XML payloads</li>
<li>Enable batching when possible</li>
<li>Avoid synchronous calls for heavy processing</li>
<li>Monitor MIA pod CPU usage</li>
</ul>


<h4>11. MAS vs Maximo 7.6 Integration</h4>

<table class="styled-table">
<tr><th>Feature</th><th>Maximo 7.6</th><th>MAS 8/9</th></tr>
<tr><td>Integration Engine</td><td>JVM based</td><td>MIA Server Bundle</td></tr>
<tr><td>Deployment</td><td>EAR based</td><td>Container based</td></tr>
<tr><td>Scaling</td><td>Vertical</td><td>Horizontal Pods</td></tr>
<tr><td>Logging</td><td>SystemOut.log</td><td>Pod Logs (OpenShift)</td></tr>
</table>


<h4>12. Real Production Scenarios</h4>

<p><strong>Scenario 1 – SAP creates WO in Maximo</strong></p>
<ul>
<li>Enterprise Service receives XML</li>
<li>Object Structure validates</li>
<li>WO created</li>
</ul>

<p><strong>Scenario 2 – Maximo sends WO completion to SAP</strong></p>
<ul>
<li>Status changes to COMP</li>
<li>Publish Channel triggers</li>
<li>HTTP endpoint sends data</li>
</ul>

<p><strong>Scenario 3 – GIS Location Sync</strong></p>
<ul>
<li>Nightly Cron triggers outbound sync</li>
<li>Location data updated</li>
</ul>


<h4>13. Best Practices</h4>

<ul>
<li>Always test integration in TEST environment</li>
<li>Monitor Message Tracking daily</li>
<li>Use meaningful naming convention</li>
<li>Document field mappings</li>
<li>Avoid direct DB updates for integration records</li>
<li>Secure endpoints with authentication</li>
</ul>


<h4>14. Summary</h4>

<pre class="code-block">
External System  
→ Endpoint  
→ Enterprise Service / Publish Channel  
→ Object Structure  
→ MBO Processing  
→ Database  
</pre>

<p>
MIF is a critical enterprise integration layer.
Improper configuration can impact data integrity across systems.
</p>

`;
}


function getAssetContent() {
return `

<h3>Asset Management – Complete Functional & Technical KT</h3>

<div class="info-card">
<p>
Asset Management in Maximo manages the complete lifecycle of physical assets
from planning and procurement to operation, maintenance and retirement.
It integrates with Work Management, Inventory, Procurement, Finance and Integration modules.
</p>
</div>


<h4>1. What is an Asset in Maximo?</h4>

<p>
An Asset represents a physical item that is maintained, tracked and managed
throughout its operational lifecycle.
</p>

<p><strong>Examples:</strong></p>

<ul>
<li>Pumps</li>
<li>Compressors</li>
<li>Transformers</li>
<li>Vehicles</li>
<li>Production Equipment</li>
</ul>

<p>
Each Asset record stores:
</p>

<ul>
<li>Asset Number</li>
<li>Description</li>
<li>Location</li>
<li>Site / Organization</li>
<li>Status</li>
<li>Warranty details</li>
<li>Vendor information</li>
<li>Financial data</li>
<li>Meter readings</li>
</ul>


<h4>2. Asset Lifecycle in Maximo</h4>

<p><strong>End-to-End Lifecycle:</strong></p>

<pre class="code-block">
Planning  
→ Procurement  
→ Receiving  
→ Installation  
→ Operation  
→ Maintenance  
→ Modification  
→ Decommission  
→ Retirement  
</pre>


<h4>3. Phase 1 – Planning</h4>

<p>Before asset creation, planning activities may include:</p>

<ul>
<li>Capital planning</li>
<li>Budget approvals</li>
<li>Asset classification</li>
<li>Item master creation</li>
</ul>

<p><strong>Maximo Apps Used:</strong></p>

<ul>
<li>Item Master</li>
<li>Companies</li>
<li>Classifications</li>
<li>Chart of Accounts (Financial integration)</li>
</ul>


<h4>4. Phase 2 – Procurement</h4>

<p>Asset is procured via purchasing process.</p>

<p><strong>Flow:</strong></p>

<pre class="code-block">
Purchase Requisition  
→ Purchase Order  
→ Approval  
→ Receiving  
</pre>

<p><strong>Maximo Apps Used:</strong></p>

<ul>
<li>Purchase Requisitions (PR)</li>
<li>Purchase Orders (PO)</li>
<li>Receiving</li>
<li>Invoice Matching</li>
</ul>


<h4>5. Phase 3 – Asset Creation</h4>

<p>
Assets can be created:
</p>

<ul>
<li>Manually in Assets application</li>
<li>Automatically during Receiving</li>
<li>Via Integration (SAP, ERP)</li>
<li>Via Migration tool</li>
</ul>

<p><strong>Primary Application:</strong> Assets</p>

<p>
Navigation: Go To → Assets → Assets
</p>


<h4>6. Phase 4 – Installation</h4>

<p>
Asset is installed at a location.
</p>

<ul>
<li>Assign to Location</li>
<li>Set Parent Asset (hierarchy)</li>
<li>Define Rotating asset if applicable</li>
<li>Define warranty start date</li>
</ul>

<p><strong>Apps Used:</strong></p>

<ul>
<li>Assets</li>
<li>Locations</li>
<li>Move/Modify Assets</li>
</ul>


<h4>7. Asset Hierarchy</h4>

<p>
Assets can be organized hierarchically.
</p>

<p><strong>Example:</strong></p>

<pre class="code-block">
Plant  
  → Compressor System  
      → Motor  
      → Pump  
</pre>

<p>
Hierarchy enables:
</p>

<ul>
<li>Failure tracking</li>
<li>Roll-up costing</li>
<li>Maintenance planning</li>
<li>Impact analysis</li>
</ul>


<h4>8. Phase 5 – Operation</h4>

<p>
During operational phase:
</p>

<ul>
<li>Asset status = OPERATING</li>
<li>Meter readings captured</li>
<li>Condition monitored</li>
<li>Performance analyzed</li>
</ul>

<p><strong>Apps Used:</strong></p>

<ul>
<li>Assets</li>
<li>Meters</li>
<li>Condition Monitoring</li>
<li>Asset Health (MAS Manage advanced)</li>
</ul>


<h4>9. Phase 6 – Maintenance</h4>

<p>
Maintenance ensures asset reliability.
</p>

<h5>9.1 Corrective Maintenance</h5>

<ul>
<li>Breakdown occurs</li>
<li>Service Request created</li>
<li>Work Order generated</li>
<li>Repair completed</li>
</ul>

<p><strong>Apps Used:</strong></p>

<ul>
<li>Service Requests</li>
<li>Work Order Tracking</li>
<li>Labor Reporting</li>
<li>Inventory Usage</li>
</ul>

<h5>9.2 Preventive Maintenance</h5>

<ul>
<li>Time-based PM</li>
<li>Meter-based PM</li>
<li>Seasonal PM</li>
</ul>

<p><strong>Apps Used:</strong></p>

<ul>
<li>Preventive Maintenance (PM)</li>
<li>PM Forecast</li>
<li>Work Order Tracking</li>
</ul>


<h4>10. Phase 7 – Modification / Upgrade</h4>

<p>
Asset may be upgraded or modified.
</p>

<ul>
<li>Component replacement</li>
<li>Capacity enhancement</li>
<li>Design change</li>
</ul>

<p>
Tracked via:
</p>

<ul>
<li>Work Orders</li>
<li>Asset Specifications</li>
<li>History tab</li>
</ul>


<h4>11. Phase 8 – Decommission</h4>

<p>
Asset is taken out of service.
</p>

<ul>
<li>Status changed to DECOMMISSIONED</li>
<li>Warranty closed</li>
<li>Financial adjustments made</li>
</ul>

<p><strong>Apps Used:</strong></p>

<ul>
<li>Assets</li>
<li>Financial Integration</li>
<li>Asset Disposal</li>
</ul>


<h4>12. Phase 9 – Retirement</h4>

<p>
Final lifecycle stage.
</p>

<ul>
<li>Status changed to RETIRED</li>
<li>Asset removed from hierarchy</li>
<li>Historical data retained</li>
</ul>

<p>
Asset history remains for audit and compliance.
</p>


<h4>13. Asset Status Lifecycle</h4>

<table class="styled-table">
<tr><th>Status</th><th>Meaning</th></tr>
<tr><td>NOT READY</td><td>Created but not operational</td></tr>
<tr><td>OPERATING</td><td>Active and in service</td></tr>
<tr><td>DOWN</td><td>Temporarily not functional</td></tr>
<tr><td>DECOMMISSIONED</td><td>Removed from active service</td></tr>
<tr><td>RETIRED</td><td>Fully closed asset</td></tr>
</table>


<h4>14. Financial Tracking</h4>

<p>
Maximo tracks:
</p>

<ul>
<li>Acquisition cost</li>
<li>Maintenance cost</li>
<li>Labor cost</li>
<li>Material cost</li>
<li>Total lifecycle cost</li>
</ul>

<p>
Cost roll-up possible from child to parent assets.
</p>


<h4>15. Asset & Other Modules Integration</h4>

<table class="styled-table">
<tr><th>Module</th><th>Integration Purpose</th></tr>
<tr><td>Work Management</td><td>Maintenance execution</td></tr>
<tr><td>Inventory</td><td>Spare parts usage</td></tr>
<tr><td>Purchasing</td><td>Asset procurement</td></tr>
<tr><td>Integration</td><td>ERP sync</td></tr>
<tr><td>Escalations</td><td>Auto status updates</td></tr>
<tr><td>Automation Scripts</td><td>Business rule enforcement</td></tr>
</table>


<h4>16. Asset Performance & KPIs</h4>

<ul>
<li>MTBF (Mean Time Between Failures)</li>
<li>MTTR (Mean Time To Repair)</li>
<li>Asset Availability</li>
<li>Maintenance Cost Ratio</li>
<li>Downtime Hours</li>
</ul>


<h4>17. Enterprise Best Practices</h4>

<ul>
<li>Use meaningful asset numbering convention</li>
<li>Maintain proper classification</li>
<li>Use hierarchy effectively</li>
<li>Enable PMs for critical assets</li>
<li>Track meters accurately</li>
<li>Audit asset status changes</li>
</ul>


<h4>18. Lifecycle Summary Flow</h4>

<pre class="code-block">
Procurement  
→ Asset Creation  
→ Installation  
→ Operation  
→ Preventive / Corrective Maintenance  
→ Upgrade  
→ Decommission  
→ Retirement  
</pre>

<p>
Asset Management is the backbone of Maximo.
Proper configuration ensures reliability, compliance and cost optimization.
</p>

`;
}


function getWOContent() {
return `

<h3>Work Order Management – Complete Functional & Technical KT</h3>

<div class="info-card">
<p>
Work Order Management in Maximo controls the planning, execution, tracking 
and closure of maintenance activities. It integrates with Assets, Inventory, 
Purchasing, Labor, Preventive Maintenance, and Financial modules.
</p>
</div>


<h4>1. What is a Work Order?</h4>

<p>
A Work Order (WO) is a formal record used to authorize, track and manage 
maintenance work on assets or locations.
</p>

<p><strong>Types of Work Orders:</strong></p>

<ul>
<li>Corrective Maintenance (CM)</li>
<li>Preventive Maintenance (PM)</li>
<li>Emergency Work</li>
<li>Inspection Work</li>
<li>Capital Project Work</li>
</ul>

<p><strong>Main Application:</strong><br>
Go To → Work Orders → Work Order Tracking
</p>


<h4>2. Work Order Lifecycle</h4>

<p><strong>Typical Lifecycle:</strong></p>

<pre class="code-block">
WAPPR (Waiting Approval)
→ APPR (Approved)
→ INPRG (In Progress)
→ COMP (Completed)
→ CLOSE (Closed)
</pre>

<table class="styled-table">
<tr><th>Status</th><th>Description</th></tr>
<tr><td>WAPPR</td><td>Created but not approved</td></tr>
<tr><td>APPR</td><td>Approved and ready to execute</td></tr>
<tr><td>INPRG</td><td>Work is ongoing</td></tr>
<tr><td>COMP</td><td>Work completed</td></tr>
<tr><td>CLOSE</td><td>Financially and operationally closed</td></tr>
<tr><td>CAN</td><td>Cancelled</td></tr>
</table>


<h4>3. Work Order Creation Methods</h4>

<ul>
<li>Manual creation in Work Order Tracking</li>
<li>Generated from Preventive Maintenance (PM)</li>
<li>Created from Service Request (SR)</li>
<li>Created via Escalation</li>
<li>Created via Integration (ERP)</li>
<li>Created via Meter-based trigger</li>
</ul>


<h4>4. Core Components of Work Order</h4>

<h5>4.1 Header Information</h5>

<ul>
<li>WO Number</li>
<li>Description</li>
<li>Asset / Location</li>
<li>Status</li>
<li>Priority</li>
<li>Target Start / Finish Date</li>
<li>Owner / Supervisor</li>
</ul>

<h5>4.2 Plans Tab</h5>

<ul>
<li>Planned Labor</li>
<li>Planned Materials</li>
<li>Planned Tools</li>
<li>Planned Services</li>
</ul>

<h5>4.3 Actuals Tab</h5>

<ul>
<li>Actual Labor</li>
<li>Actual Materials</li>
<li>Actual Tools</li>
<li>Actual Services</li>
</ul>

<h5>4.4 Specifications</h5>

<ul>
<li>Classification-driven attributes</li>
<li>Custom dynamic fields</li>
</ul>


<h4>5. Work Order Hierarchy</h4>

<p>
Work Orders can be structured hierarchically.
</p>

<pre class="code-block">
Parent WO
   → Child WO 1
   → Child WO 2
</pre>

<p>
Useful for:
</p>

<ul>
<li>Shutdown maintenance</li>
<li>Project work</li>
<li>Large maintenance campaigns</li>
</ul>


<h4>6. Work Order Types</h4>

<table class="styled-table">
<tr><th>Type</th><th>Purpose</th></tr>
<tr><td>CM</td><td>Corrective maintenance</td></tr>
<tr><td>PM</td><td>Preventive maintenance</td></tr>
<tr><td>EM</td><td>Emergency work</td></tr>
<tr><td>INSP</td><td>Inspection</td></tr>
<tr><td>CAPEX</td><td>Capital expenditure work</td></tr>
</table>


<h4>7. Work Order Planning Process</h4>

<pre class="code-block">
WO Created  
→ Planner reviews  
→ Add labor & materials  
→ Estimate cost  
→ Approve WO  
→ Assign crew  
</pre>

<p><strong>Apps Used:</strong></p>

<ul>
<li>Work Order Tracking</li>
<li>Graphical Assignment</li>
<li>Assignment Manager</li>
<li>Labor Reporting</li>
</ul>


<h4>8. Scheduling & Assignment</h4>

<ul>
<li>Assign to Crew</li>
<li>Assign to Individual Labor</li>
<li>Set target dates</li>
<li>Use Graphical Scheduling</li>
</ul>

<p><strong>Apps Used:</strong></p>

<ul>
<li>Graphical Assignment</li>
<li>Scheduler</li>
<li>Labor Reporting</li>
</ul>


<h4>9. Material & Inventory Integration</h4>

<p>
Materials planned and issued from Inventory.
</p>

<pre class="code-block">
Planned Material  
→ Issue from Storeroom  
→ Actual Cost updated  
</pre>

<p><strong>Apps Used:</strong></p>

<ul>
<li>Inventory</li>
<li>Issues & Transfers</li>
<li>Work Order Tracking</li>
</ul>


<h4>10. Purchasing Integration</h4>

<p>
If material not available:
</p>

<ul>
<li>Create PR from WO</li>
<li>Generate PO</li>
<li>Receive material</li>
<li>Charge cost to WO</li>
</ul>


<h4>11. Labor & Cost Tracking</h4>

<p>
Maximo tracks:
</p>

<ul>
<li>Labor hours</li>
<li>Labor rate</li>
<li>Material cost</li>
<li>Service cost</li>
<li>Total WO cost</li>
</ul>

<p>
Costs roll up to:
</p>

<ul>
<li>Asset</li>
<li>Location</li>
<li>Parent WO</li>
</ul>


<h4>12. Preventive Maintenance Integration</h4>

<p>
PM automatically generates WOs.
</p>

<pre class="code-block">
PM Cron runs  
→ PMWOGEN  
→ WO created  
→ Status = WAPPR  
</pre>

<p><strong>Apps Used:</strong></p>

<ul>
<li>Preventive Maintenance</li>
<li>PM Forecast</li>
<li>Work Order Tracking</li>
</ul>


<h4>13. Workflows in Work Orders</h4>

<p>
Workflow controls approval process.
</p>

<ul>
<li>Approval routing</li>
<li>Status transitions</li>
<li>Conditional branching</li>
<li>Email notifications</li>
</ul>


<h4>14. Automation Scripts & Escalations in WO</h4>

<ul>
<li>Status validation</li>
<li>Auto priority update</li>
<li>SLA breach monitoring</li>
<li>Auto close logic</li>
</ul>


<h4>15. Work Order Closure Process</h4>

<pre class="code-block">
Work Completed  
→ Review Actuals  
→ Change Status to COMP  
→ Financial Validation  
→ Close WO  
</pre>

<p>
Once Closed:
</p>

<ul>
<li>Cannot edit financial fields</li>
<li>History retained</li>
</ul>

<h4>16. Complete Lifecycle Summary</h4>

<pre class="code-block">
Create WO  
→ Plan  
→ Approve  
→ Assign  
→ Execute  
→ Record Actuals  
→ Complete  
→ Close  
</pre>

<p>
Work Order Management is the operational core of Maximo.
Proper configuration ensures reliability, cost control and compliance.
</p>

`;
}
function getInventoryContent() {
return `

<h3>Inventory Management – Complete Functional & Technical KT</h3>

<div class="info-card">
<p>
Inventory Management in Maximo controls spare parts, materials, balances, 
reorder levels, costing and storeroom operations. It ensures maintenance 
activities are supported with required materials while maintaining cost control.
</p>
</div>


<h4>1. What is Inventory in Maximo?</h4>

<p>
Inventory represents stocked items stored in storerooms and used for 
maintenance, repairs, and operations.
</p>

<p><strong>Main Applications:</strong></p>

<ul>
<li>Item Master</li>
<li>Inventory</li>
<li>Storerooms</li>
<li>Issues and Transfers</li>
<li>Inventory Usage</li>
<li>Reorder</li>
</ul>


<h4>2. Inventory Lifecycle</h4>

<pre class="code-block">
Item Creation  
→ Add to Storeroom  
→ Set Reorder Levels  
→ Receive Stock  
→ Issue to Work Order  
→ Balance Updated  
→ Reorder Trigger  
</pre>


<h4>3. Item Master</h4>

<p>
Item Master defines the global item record.
</p>

<p><strong>Key Fields:</strong></p>

<ul>
<li>Item Number</li>
<li>Description</li>
<li>Item Type (ITEM / SERVICE / TOOL)</li>
<li>Commodity Group</li>
<li>Rotating / Non-Rotating</li>
<li>Issue Unit</li>
<li>Order Unit</li>
</ul>

<p>
Item Master is organization-level.
Inventory is site-level.
</p>


<h4>4. Storerooms</h4>

<p>
Storerooms are physical or logical locations where inventory is stored.
</p>

<ul>
<li>Central Store</li>
<li>Field Store</li>
<li>Project Store</li>
</ul>

<p>
Each storeroom has:
</p>

<ul>
<li>Site association</li>
<li>Default GL account</li>
<li>Inventory balances</li>
</ul>


<h4>5. Inventory Record (Site Level)</h4>

<p>
Inventory application manages item per storeroom.
</p>

<p><strong>Key Details:</strong></p>

<ul>
<li>Current Balance</li>
<li>Reserved Quantity</li>
<li>Available Balance</li>
<li>Reorder Point</li>
<li>Economic Order Quantity (EOQ)</li>
<li>Lead Time</li>
</ul>

<table class="styled-table">
<tr><th>Field</th><th>Meaning</th></tr>
<tr><td>Current Balance</td><td>Total physical stock</td></tr>
<tr><td>Reserved</td><td>Committed to WOs</td></tr>
<tr><td>Available</td><td>Current - Reserved</td></tr>
</table>


<h4>6. Rotating vs Non-Rotating Items</h4>

<table class="styled-table">
<tr><th>Type</th><th>Description</th></tr>
<tr><td>Non-Rotating</td><td>Consumed once (Bolts, Oil)</td></tr>
<tr><td>Rotating</td><td>Tracked individually (Motors, Pumps)</td></tr>
</table>

<p>
Rotating items create Asset records automatically.
</p>


<h4>7. Receiving Process</h4>

<pre class="code-block">
Purchase Order  
→ Receiving Application  
→ Inspect  
→ Accept  
→ Balance Updated  
</pre>

<p>
Receiving updates:
</p>

<ul>
<li>Inventory balance</li>
<li>Average cost</li>
<li>GL postings</li>
</ul>


<h4>8. Issues & Transfers</h4>

<h5>8.1 Issue to Work Order</h5>

<ul>
<li>Select WO</li>
<li>Select Item</li>
<li>Enter Quantity</li>
<li>Cost charged to WO</li>
</ul>

<h5>8.2 Transfer Between Storerooms</h5>

<ul>
<li>Reduce balance in Source</li>
<li>Increase balance in Destination</li>
</ul>

<p><strong>Application:</strong> Issues and Transfers</p>


<h4>9. Reservations</h4>

<p>
When material is planned in WO:
</p>

<ul>
<li>System reserves quantity</li>
<li>Available balance reduces</li>
<li>Actual issue finalizes cost</li>
</ul>


<h4>10. Reorder Process</h4>

<p>
Reorder Cron checks inventory levels.
</p>

<pre class="code-block">
Current Balance <= Reorder Point  
→ Generate PR  
→ Approval  
→ PO  
→ Receiving  
</pre>

<p>
Cron Task: REORDER
</p>


<h4>11. Costing Methods</h4>

<table class="styled-table">
<tr><th>Method</th><th>Description</th></tr>
<tr><td>Average Cost</td><td>Weighted average calculation</td></tr>
<tr><td>Standard Cost</td><td>Predefined fixed cost</td></tr>
<tr><td>LIFO/FIFO</td><td>Based on receipt sequence</td></tr>
</table>

<p>
Most organizations use Average Cost.
</p>


<h4>12. Inventory Adjustments</h4>

<p>
Adjust balance for:
</p>

<ul>
<li>Stock count differences</li>
<li>Damage</li>
<li>Theft</li>
<li>Correction</li>
</ul>

<p>
Requires proper financial controls.
</p>


<h4>13. Physical Count</h4>

<p>
Periodic stock verification.
</p>

<pre class="code-block">
Enter Count  
→ Compare with system balance  
→ Adjust if required  
→ Audit trail maintained  
</pre>


<h4>14. Inventory & Work Management Integration</h4>

<table class="styled-table">
<tr><th>Module</th><th>Integration Purpose</th></tr>
<tr><td>Work Orders</td><td>Material planning & issue</td></tr>
<tr><td>Purchasing</td><td>Replenishment</td></tr>
<tr><td>Assets</td><td>Rotating asset creation</td></tr>
<tr><td>Escalations</td><td>Auto reorder alerts</td></tr>
<tr><td>Integration</td><td>ERP sync</td></tr>
</table>


<h4>15. Common Inventory Issues</h4>

<ul>
<li>Negative balance</li>
<li>Unbalanced GL postings</li>
<li>Duplicate item numbers</li>
<li>Incorrect reorder setup</li>
<li>Missing indexes on large storerooms</li>
</ul>


<h4>16. Performance Considerations</h4>

<ul>
<li>Index ITEMNUM + SITEID</li>
<li>Index BINNUM for large stores</li>
<li>Avoid excessive reorder frequency</li>
<li>Close MboSets in scripts</li>
</ul>


<h4>17. Enterprise Best Practices</h4>

<ul>
<li>Use proper naming convention</li>
<li>Maintain clean item master</li>
<li>Review reorder settings quarterly</li>
<li>Perform periodic physical count</li>
<li>Avoid manual balance edits without audit</li>
<li>Separate storerooms logically</li>
</ul>


<h4>18. Inventory Lifecycle Summary</h4>

<pre class="code-block">
Item Created  
→ Added to Storeroom  
→ Stock Received  
→ Reserved  
→ Issued  
→ Balance Updated  
→ Reorder Triggered  
</pre>

<p>
Inventory Management ensures maintenance continuity while maintaining cost control.
Improper configuration directly impacts operational efficiency.
</p>

`;
}

function getPurchaseContent() {
return `

<h3>Purchase Management – Complete Functional & Technical KT</h3>

<div class="info-card">
<p>
Purchase Management in Maximo controls the end-to-end procurement lifecycle 
including requisition, approval, purchase order creation, receiving, 
invoice matching and financial posting. It integrates tightly with 
Inventory, Work Orders, Assets and Financial systems.
</p>
</div>


<h4>1. Procurement Lifecycle in Maximo</h4>

<pre class="code-block">
Requirement Identified  
→ Purchase Requisition (PR)  
→ PR Approval  
→ Purchase Order (PO)  
→ PO Approval  
→ Receiving  
→ Invoice Matching  
→ Payment  
</pre>


<h4>2. Core Applications Used</h4>

<ul>
<li>Purchase Requisitions (PR)</li>
<li>Purchase Orders (PO)</li>
<li>Receiving</li>
<li>Invoice Matching</li>
<li>Companies</li>
<li>Contracts</li>
</ul>


<h4>3. Purchase Requisition (PR)</h4>

<p>
PR is an internal request to procure materials or services.
</p>

<p><strong>Created From:</strong></p>

<ul>
<li>Work Order</li>
<li>Inventory Reorder</li>
<li>Manual Entry</li>
<li>MRP Planning</li>
</ul>

<p><strong>Key Fields:</strong></p>

<ul>
<li>PR Number</li>
<li>Description</li>
<li>Vendor (optional at PR stage)</li>
<li>Line Items</li>
<li>GL Account</li>
<li>Site / Organization</li>
</ul>

<p><strong>Status Flow:</strong></p>

<pre class="code-block">
WAPPR → APPR → CLOSE / CAN
</pre>


<h4>4. Purchase Order (PO)</h4>

<p>
PO is a legally binding document sent to vendor.
</p>

<p><strong>Created From:</strong></p>

<ul>
<li>Approved PR</li>
<li>Reorder Process</li>
<li>Contract Release</li>
</ul>

<p><strong>PO Types:</strong></p>

<table class="styled-table">
<tr><th>Type</th><th>Description</th></tr>
<tr><td>STD</td><td>Standard PO</td></tr>
<tr><td>BPA</td><td>Blanket PO</td></tr>
<tr><td>RELEASE</td><td>Release against contract</td></tr>
</table>

<p><strong>Status Flow:</strong></p>

<pre class="code-block">
WAPPR → APPR → INPRG → CLOSE
</pre>


<h4>5. Receiving Process</h4>

<p>
Receiving confirms delivery of goods or services.
</p>

<pre class="code-block">
PO Approved  
→ Goods Received  
→ Inspection (if required)  
→ Accept / Reject  
→ Inventory Updated  
</pre>

<p>
Receiving updates:
</p>

<ul>
<li>Inventory balance</li>
<li>Average cost</li>
<li>GL accounts</li>
</ul>


<h4>6. Invoice Matching</h4>

<p>
Invoice Matching validates vendor invoice against PO and receipt.
</p>

<pre class="code-block">
Vendor Invoice  
→ Match with PO  
→ Match with Receipt  
→ Approve Invoice  
→ Payment Processing  
</pre>

<p>
Ensures:
</p>

<ul>
<li>Price accuracy</li>
<li>Quantity validation</li>
<li>Financial control</li>
</ul>


<h4>7. Contracts in Procurement</h4>

<p>
Contracts control long-term vendor agreements.
</p>

<ul>
<li>Purchase Contracts</li>
<li>Price Agreements</li>
<li>Service Contracts</li>
</ul>

<p>
Contracts allow:
</p>

<ul>
<li>Predefined pricing</li>
<li>Volume commitments</li>
<li>Automatic PO generation</li>
</ul>


<h4>8. Financial Integration</h4>

<p>
Procurement integrates with Finance using GL accounts.
</p>

<table class="styled-table">
<tr><th>Stage</th><th>Financial Impact</th></tr>
<tr><td>PR</td><td>No financial posting</td></tr>
<tr><td>PO Approval</td><td>Encumbrance (optional)</td></tr>
<tr><td>Receiving</td><td>Inventory value updated</td></tr>
<tr><td>Invoice Approval</td><td>Expense recorded</td></tr>
</table>


<h4>9. Integration with Work Orders</h4>

<p>
When material not available:
</p>

<pre class="code-block">
WO Created  
→ PR Generated from WO  
→ PO Created  
→ Material Received  
→ Cost Charged to WO  
</pre>

<p>
Ensures accurate cost tracking.
</p>


<h4>10. Reorder Integration</h4>

<p>
Reorder Cron automatically generates PR when stock falls below reorder point.
</p>

<p>
Cron Task: REORDER
</p>


<h4>11. Approval Workflow</h4>

<p>
PR and PO typically use Workflow for approval.
</p>

<ul>
<li>Multi-level approvals</li>
<li>Financial threshold control</li>
<li>Conditional routing</li>
<li>Email notifications</li>
</ul>


<h4>12. Automation Scripts & Escalations</h4>

<ul>
<li>Auto assign buyer</li>
<li>Validate vendor compliance</li>
<li>Restrict approval above threshold</li>
<li>Auto cancel stale PRs</li>
</ul>


<h4>13. Common Procurement Issues</h4>

<ul>
<li>PR stuck in WAPPR</li>
<li>PO cannot be approved</li>
<li>Invoice mismatch error</li>
<li>Incorrect GL account</li>
<li>Duplicate vendor creation</li>
</ul>


<h4>14. Performance & Best Practices</h4>

<ul>
<li>Use proper vendor classification</li>
<li>Maintain clean item master</li>
<li>Use contracts for recurring purchases</li>
<li>Enforce approval workflow</li>
<li>Audit large POs regularly</li>
<li>Avoid manual financial overrides</li>
</ul>


<h4>15. Procurement Lifecycle Summary</h4>

<pre class="code-block">
Requirement  
→ PR  
→ Approval  
→ PO  
→ Vendor Delivery  
→ Receiving  
→ Invoice Matching  
→ Financial Closure  
</pre>

<p>
Purchase Management ensures cost control, vendor governance and 
material availability for operations. Improper setup directly 
impacts financial accuracy and operational efficiency.
</p>

`;
}

function getPMContent() {
return `

<h3>Preventive Maintenance – Complete Functional & Technical KT</h3>

<div class="info-card">
<p>
Preventive Maintenance (PM) in Maximo automates recurring maintenance activities 
based on time or meter readings. It ensures asset reliability, reduces breakdowns, 
and improves lifecycle performance.
</p>
</div>


<h4>1. What is Preventive Maintenance?</h4>

<p>
Preventive Maintenance (PM) is a proactive maintenance strategy 
where Work Orders are generated automatically at predefined intervals.
</p>

<p><strong>Types of PM:</strong></p>

<ul>
<li>Time-Based PM</li>
<li>Meter-Based PM</li>
<li>Seasonal PM</li>
<li>Condition-Based PM</li>
</ul>

<p><strong>Main Application:</strong><br>
Go To → Work Orders → Preventive Maintenance
</p>


<h4>2. PM Lifecycle</h4>

<pre class="code-block">
Create PM  
→ Define Frequency  
→ Associate Asset / Location  
→ Activate PM  
→ PMWOGEN Cron runs  
→ Work Order Generated  
→ WO Executed  
→ Next Due Date Updated  
</pre>


<h4>3. Core Components of PM</h4>

<h5>3.1 PM Header</h5>

<ul>
<li>PM Number</li>
<li>Description</li>
<li>Asset or Location</li>
<li>Frequency</li>
<li>Lead Time</li>
<li>Work Type</li>
<li>Job Plan</li>
</ul>

<h5>3.2 Frequency Definition</h5>

<ul>
<li>Every 30 days</li>
<li>Every 6 months</li>
<li>Every 1000 meter units</li>
</ul>

<h5>3.3 Status</h5>

<table class="styled-table">
<tr><th>Status</th><th>Description</th></tr>
<tr><td>DRAFT</td><td>Not active</td></tr>
<tr><td>ACTIVE</td><td>Generating WOs</td></tr>
<tr><td>INACTIVE</td><td>Temporarily disabled</td></tr>
</table>


<h4>4. Time-Based PM</h4>

<p>
Generates Work Orders based on calendar intervals.
</p>

<p><strong>Example:</strong></p>

<ul>
<li>Every 30 days</li>
<li>Every 3 months</li>
<li>Every 1 year</li>
</ul>

<p>
Uses:
</p>

<ul>
<li>Frequency (days/months)</li>
<li>Last Start Date</li>
<li>Next Due Date</li>
</ul>


<h4>5. Meter-Based PM</h4>

<p>
Generates Work Orders when meter reaches threshold.
</p>

<p><strong>Example:</strong></p>

<ul>
<li>Every 1000 operating hours</li>
<li>Every 5000 kilometers</li>
</ul>

<p>
Requires:
</p>

<ul>
<li>Meter setup in Meters application</li>
<li>Regular meter reading entry</li>
</ul>


<h4>6. Seasonal PM</h4>

<p>
Generates WOs during specific periods.
</p>

<p><strong>Example:</strong></p>

<ul>
<li>Winter inspection</li>
<li>Monsoon preparation</li>
</ul>


<h4>7. PM & Job Plans</h4>

<p>
PM typically references a Job Plan.
</p>

<pre class="code-block">
PM  
→ Linked Job Plan  
→ WO Generated  
→ Tasks Copied from Job Plan  
</pre>

<p>
Job Plan defines:
</p>

<ul>
<li>Tasks</li>
<li>Labor</li>
<li>Materials</li>
<li>Tools</li>
</ul>


<h4>8. PMWOGEN Cron Task</h4>

<p>
PMWOGEN Cron generates Work Orders.
</p>

<p><strong>Flow:</strong></p>

<pre class="code-block">
Cron Runs  
→ Checks ACTIVE PMs  
→ Validates Next Due Date / Meter  
→ Creates WO  
→ Updates Last Start Date  
→ Calculates Next Due Date  
</pre>

<p>
Cron Task Name: PMWOGEN
</p>


<h4>9. Forecasting PM</h4>

<p>
PM Forecast application allows viewing future WOs.
</p>

<ul>
<li>Preview upcoming PMs</li>
<li>Resource planning</li>
<li>Shutdown planning</li>
</ul>


<h4>10. Lead Time & Advance Generation</h4>

<p>
Lead Time allows early WO generation.
</p>

<p><strong>Example:</strong></p>

<ul>
<li>PM due on 30th</li>
<li>Lead time = 5 days</li>
<li>WO generated on 25th</li>
</ul>


<h4>11. PM Hierarchy</h4>

<p>
Parent PM can generate child PMs.
</p>

<pre class="code-block">
Parent PM  
   → Child PM 1  
   → Child PM 2  
</pre>

<p>
Useful for:
</p>

<ul>
<li>Shutdown campaigns</li>
<li>Major overhaul events</li>
</ul>


<h4>12. PM & Asset Lifecycle Integration</h4>

<table class="styled-table">
<tr><th>Module</th><th>Purpose</th></tr>
<tr><td>Assets</td><td>Asset reliability tracking</td></tr>
<tr><td>Work Orders</td><td>Maintenance execution</td></tr>
<tr><td>Inventory</td><td>Spare parts planning</td></tr>
<tr><td>Purchasing</td><td>Material procurement</td></tr>
<tr><td>Escalations</td><td>Auto reminders</td></tr>
</table>


<h4>13. PM Status Impact</h4>

<ul>
<li>If PM is INACTIVE → No WO generated</li>
<li>If Asset status is DECOMMISSIONED → PM should be disabled</li>
<li>If WO not completed → Next cycle may shift</li>
</ul>


<h4>14. Common PM Issues</h4>

<ul>
<li>WO not generating → Check PMWOGEN Cron</li>
<li>Incorrect due date → Verify frequency</li>
<li>Duplicate WOs → Multiple PMs on same asset</li>
<li>Meter not triggering → Check meter reading entry</li>
</ul>


<h4>15. Performance Considerations</h4>

<ul>
<li>Index PM status field</li>
<li>Avoid too frequent PMWOGEN runs</li>
<li>Use proper lead time</li>
<li>Deactivate obsolete PMs</li>
</ul>


<h4>16. Best Practices</h4>

<ul>
<li>Use Job Plans with PM</li>
<li>Define realistic frequency</li>
<li>Maintain accurate meter readings</li>
<li>Deactivate obsolete PMs</li>
<li>Test PM in TEST before PROD</li>
<li>Monitor PMWOGEN logs</li>
</ul>


<h4>17. Complete PM Summary</h4>

<pre class="code-block">
Create PM  
→ Activate  
→ Cron Generates WO  
→ Execute WO  
→ Close WO  
→ Next Cycle Calculated  
</pre>

<p>
Preventive Maintenance ensures proactive reliability strategy.
Improper PM setup leads to asset failures or maintenance overload.
</p>

`;
}