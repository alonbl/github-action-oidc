const core = require("@actions/core");
const jwt = require("jsonwebtoken");
(async function() {
    try {
        var id_token = await core.getIDToken();
        var decoded = jwt.decode(id_token , {complete: true});
        for(var key in decoded.payload) {
            core.setOutput(key, decoded.payload[key]);
        }
        if(decoded.payload.job_workflow_ref) {
            var nameAndRef = decoded.payload.job_workflow_ref.split("@", 2);
            if(nameAndRef.length === 2) {
                var nameAndPath = nameAndRef[0].split("/");
                if(nameAndPath.length >= 3) {
                    core.setOutput("job_workflow_repo_owner", nameAndPath[0]);
                    core.setOutput("job_workflow_repo_name", nameAndPath[1]);
                    core.setOutput("job_workflow_repo_name_and_owner", nameAndPath[0] + "/" + nameAndPath[1]);
                    core.setOutput("job_workflow_repo_path", nameAndPath.splice(2).join("/"));
                }
                core.setOutput("job_workflow_repo_ref", nameAndRef[1]);
            }
        }
    } catch(ex) {
        core.error("Failed to get odic token, did you forget the `permissions: { id-token: write }` permission in your caller workflow, alternatively `permissions: write-all` works too: " + ex.toString());
        process.exit(1);
    }
})()