# Front End
Front end with
- React
- Redux
- Redux-obervables
- NextJS

# Production

Set `ENV=production` in [.env](../.env).


## URL

http://localhost:3000

# Development

Set `ENV=development` in [.env](../.env).


## URL

http://localhost:3001

# Commands

## Run service

```bash
../start front-end
```

## Restart service

```bash
../restart front-end
```

## Stop service

```bash
../stop front-end
```

## View logs

```bash
../logs front-end
```

## Shell into service

```bash
../shell front-end
```

## Debug

- Client side code: Use `debugger`
- Server side code: Add `debugger` to server side code. 
  - Chrome: Go to `chrome://inspect/ -> Under "Remote Targets" click on "inspect"`
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
              "port": 9229,
              "preLaunchTask": "clear-editor-history"
            }
          ]
        }
        ```
