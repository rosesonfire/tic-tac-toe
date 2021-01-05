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

## Static site generation

For super fast first page loading, a static site will be generated in [code/out](code/out) folder and can be served with

```bash
cd code/out

# You can use other ports of your choice
python -m SimpleHTTPServer 8000

# Your static site should now be available on http://localhost:8000
```

NOTE: in order for the static site to work, you need to make sure:

1. [api-server](../api-server/README.md) is running in [PRODUCTION mode](../.env)
1. The url of your static site (e.g. http://localhost:8000) is allowed in [api-server CORS Configuration](../api-server/code/src/config/index.ts)

# Development

Set `ENV=development` in [.env](../.env).

## URL

http://localhost:3001

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
