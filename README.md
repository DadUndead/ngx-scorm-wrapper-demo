# ngx-scorm-wrapper-demo
This is a simple showcase of implementation of [ngx-scorm-wrapper](https://github.com/DadUndead/ngx-scorm-wrapper) library.

Please, check the sources to understand the details.


```$xslt
$ npm run build # builds the project

.zip archive with ready-to-test demo course will be in ./archive folder
```

## Usage with fake lms:
If you want to test your own implementations for example iframe or deep nesting, you can launch a fakelms server.
All files are in ```./demo-fake-lms``` folder, you can modify index.html there to try different ways of including lms API object.
```.env
npm run fakelms
```
