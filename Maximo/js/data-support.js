function renderSupportSection(){

return `

<div class="section-card">

  <div class="section-title">Vendor Support</div>
  <div class="sub-title">IBM Maximo Support & Microsoft Azure Support Process</div>

  <div class="vendor-tabs">
    <button class="vendor-btn active" onclick="loadVendor('ibm')">IBM Support</button>
    <button class="vendor-btn" onclick="loadVendor('microsoft')">Microsoft Azure</button>
  </div>

  <div id="vendorContent"></div>

</div>

`;

}


/* ================= LOAD VENDOR ================= */

function loadVendor(type){

  const container = document.getElementById("vendorContent");

  if(type === 'ibm'){
    container.innerHTML = renderIBM();
  } else {
    container.innerHTML = renderMicrosoft();
  }

  document.querySelectorAll(".vendor-btn").forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");
}


/* ================= IBM SUPPORT FULL DETAIL ================= */

function renderIBM(){

return `

<div class="section-card">

<h2>IBM Support Case – Maximo Application Suite</h2>

<h3>Step 1 – Account Creation / Login</h3>
<ul>
  <li>Create IBM account using Shell email ID.</li>
  <li>If account already exists → Click Login.</li>
  <li>Complete email verification as per IBM instructions.</li>
  <li>Ensure your account is linked to Shell account ID: <strong>0162306</strong>.</li>
</ul>

<div class="image-box">
  <img src="assets/images/ibm-login.png">
</div>

<hr>

<h3>Step 2 – Open a Case</h3>
<ul>
  <li>From top navigation → Click <strong>Cases</strong> dropdown.</li>
  <li>Select <strong>Open a Case</strong>.</li>
</ul>

<hr>

<h3>Step 3 – Enter Case Details</h3>

<table>
<tr><th>Field</th><th>Required Input / Guidance</th></tr>

<tr>
<td>1. Type of Support</td>
<td>Product Support (Default – do not change)</td>
</tr>

<tr>
<td>2. Case Title</td>
<td>Clear issue summary including environment and impact</td>
</tr>

<tr>
<td>3. Product Manufacturer</td>
<td>IBM (Default)</td>
</tr>

<tr>
<td>4. Product</td>
<td>Select <strong>Maximo Application Suite</strong></td>
</tr>

<tr>
<td>5. Product Version</td>
<td>Select applicable version (Current documented: 8.11)</td>
</tr>

<tr>
<td>6. Severity</td>
<td>
Severity 1 – Production down, critical business impact<br>
Severity 2 – High priority issue<br>
Severity 3 – Minor business impact<br>
Severity 4 – Queries / minor issues
</td>
</tr>

<tr>
<td>7. Account</td>
<td>0162306 [Netherlands] - Shell International Exploration and Production BV</td>
</tr>

<tr>
<td>8. Application</td>
<td>Select Manage or Mobile as applicable</td>
</tr>

<tr>
<td>9. Business Impact</td>
<td>Clearly describe operational/business impact</td>
</tr>

<tr>
<td>10. Description</td>
<td>
Provide:
<ul>
<li>Environment (QGC / STTL – TEST/PROD)</li>
<li>Error message</li>
<li>Exact timestamp</li>
<li>User IDs affected</li>
<li>Logs reference</li>
<li>Steps to reproduce</li>
</ul>
</td>
</tr>

<tr>
<td>11. Attachments</td>
<td>Attach logs, screenshots, trace files if required</td>
</tr>

<tr>
<td>12. Client Reference Number</td>
<td>0162306</td>
</tr>

<tr>
<td>13. Invite Members</td>
<td>Add team member emails for case visibility</td>
</tr>

</table>

<div class="warning-box">
Do NOT select Severity 1 unless Production services are down with business impact.
Misuse may trigger governance escalation.
</div>

<hr>

<h3>Step 4 – Submit Case</h3>
<p>Review all fields → Submit case.</p>

<hr>

<h3>Step 5 – Track & Monitor Cases</h3>

<p>Navigate to Cases → View Your Cases.</p>

<p>Use filters:</p>

<ul>
<li>All – Cases I own</li>
<li>Closed – Cases I own</li>
<li>All – Cases I'm invited to</li>
<li>Open – Cases I'm invited to</li>
<li>Closed – Cases I'm invited to</li>
</ul>


</div>

`;

}


/* ================= MICROSOFT SUPPORT FULL DETAIL ================= */

function renderMicrosoft(){

return `

<div class="section-card">

<h2>Microsoft Azure Support Case</h2>

<h3>Step 1 – Login to Azure Portal</h3>

<p>
<a href="https://portal.azure.com/" target="_blank">https://portal.azure.com/</a>
</p>

<ul>
<li>Navigate to Help + Support.</li>
<li>Click Create a Support Request.</li>
</ul>

<div class="image-box">
  <img src="assets/images/azure-help-support.png">
</div>

<hr>

<h3>Step 2 – Describe Your Issue</h3>

<ul>
<li>Briefly describe issue summary.</li>
<li>Select affected Service.</li>
<li>Select correct Subscription.</li>
<li>Select Resource impacted.</li>
<li>Select correct Problem Type and Subtype.</li>
</ul>

<hr>

<h3>Step 3 – Review & Confirm Details</h3>

<ul>
<li>Issue Type</li>
<li>Subscription</li>
<li>Service Type</li>
<li>Resource</li>
<li>Problem Type</li>
<li>Problem Subtype</li>
</ul>

Provide detailed summary if required.

<hr>

<h3>Step 4 – Advanced Diagnostics & Severity</h3>

<ul>
<li>Click Allow access for advanced diagnostic information (if required).</li>
<li>Select Severity appropriately.</li>
<li>Preferred Contact Method: Email.</li>
</ul>

<div class="warning-box">
Select severity responsibly based on real business impact.
</div>

<hr>

<h3>Step 5 – Additional Details</h3>

<ul>
<li>Provide full technical details.</li>
<li>Attach logs if required.</li>
<li>Provide timestamps.</li>
<li>Mention production impact if any.</li>
</ul>

<hr>

<h3>Step 6 – Submit & Track</h3>

<ul>
<li>Submit case.</li>
<li>Email notification will be received.</li>
<li>Track updates under Help + Support in Azure portal.</li>
</ul>

</div>

`;

}


/* Default Load */
setTimeout(()=> loadVendor('ibm'), 100);