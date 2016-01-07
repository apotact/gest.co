
### Setup

#### Dependencies

node, npm, gulp

#### Getting started

run `npm install` in the repos root dir

#### Deploying to production

Server is set up with a prime and hub repo as outlined at
http://joemaller.com/990/a-web-focused-git-workflow/

Use `gulp deploy` to generate the site into `dist` and then automatically push
to the remote live repo

### Building the site

Use gulp to run various tasks related to moving, building, and minifying files.

`gulp clean` - removes the `dist` directory which contains all the compiled
files

`gulp compile` - compiles the src folder into `dist` as a static site

`gulp deploy` - compile and deploy source to our production server

`gulp server` - Runs a local server to view the site. Gulp will watch for file
changes and recompile automatically.

See `gulpfile.js` to see all the tasks available.

### Hierarchy

All sources files can be found in `src` directory with the following structure:

```
├── assets
│   ├── fonts
│   └── img
├── js
│   ├── bootstrap
│   └── custom
├── less
│   ├── bootstrap
│   │   └── mixins
│   └── custom
│       └── mixins
└── partials
```

The `assets` directory has files that don't need any sort of compilation or minification, and
instead only need to be copied to the `dist` folder when building the site.

Most customization to the site should happen in `less/custom`.

Pages are located in `src`, and all partial templates used are located under
`partials`
