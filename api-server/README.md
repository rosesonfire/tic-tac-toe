# API Server
GraphQL server for back end

# Production

Set `ENV=production` in [.env](../.env).

## URL

http://localhost:4000

# Development

Set `ENV=development` in [.env](../.env).

## URL

http://localhost:4001

## Debug

- Put `debugger` in code where necessary.
  - VSCode:
    1. Add this task in `.vscode/tasks.json`:
        ```json
        {
          "version": "2.0.0",
          "tasks": [
            {
              "label": "clear-editor-history",
              "command": "${command:workbench.action.clearEditorHistory}"
            }
          ]
        }
        ```
    1. Add this debugger configuration in `.vscode/launch.json` and lauch after starting server:
        ```json
        {
          "version": "0.2.0",
          "configurations": [
            {
              "type": "node",
              "request": "attach",
              "name": "Launch Program",
              "skipFiles": ["<node_internals>/**"],
              "port": 9230,
              "preLaunchTask": "clear-editor-history"
            }
          ]
        }
        ```

# Commands

## Run service

```bash
../start api-server
```

## Restart service

```bash
../restart api-server
```

## Stop service

```bash
../stop api-server
```

## View logs

```bash
../logs api-server
```

## Shell into service

```bash
../shell api-server
```

# Eslint troubleshoot

- If linting not working in VSCode, add this to `.vscode/settings.json`:

```json
{
  "files.watcherExclude": {
    "**/target": true
  },
  "eslint.workingDirectories": [
    "./code"
  ],
  "eslint.enable": true
}
```
