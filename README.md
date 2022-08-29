# Extract information from OIDC

## Common usage

Checkout repositry of current running workflow.

```yaml
    steps:
      - name: extract.oidc
        uses: xxx/oidc@main
        id: oidc

      - name: checkout
        uses: actions/checkout@v3
        with:
          repository: ${{ steps.oidc.outputs.job_workflow_repo_name_and_owner }}
          ref: ${{ steps.oidc.outputs.job_workflow_repo_ref }}
```
