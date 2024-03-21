## Getting Started

This works but example project has 1 page. When you start to add more pages, then navigation between pages will be problem. NextJS navigation is not working with Electron in production because of Electron uses file based navigation in production. There is no way to use NextJS 13+ with it's native navigation with Electron right now.

## This only and experimental code

## Using

dependencies

- next: "14.1.4"
- electron-serve: "^1.3.0"

devDependencies

- concurrently: "^8.2.2"
- electron: "^29.1.5"
- electron-builder: "^24.13.3"

```bash
npm run dev
# to run locally
npm run build
# to buid ur windows app
# build from electron-builder.yaml
```

the app is on /dist/win-unpacked/exe
the static page is on /out
