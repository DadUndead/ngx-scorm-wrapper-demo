/*
 * There are tasks to:
 * - generate SCORM manifest
 * - pack to zip and put to ./archive dir
 *
 */

import gulp from 'gulp';
import manifest from 'gulp-scorm-manifest'; // generates a valid SCORM IMS manifest file
import pump from 'pump'; // pipes streams together and destroys all of them if one of them closes
import zip from 'gulp-zip';

const timestamp = Date.now();
const COURSE_NAME = 'NGX_SCORM_WRAPPER_DEMO';

const config = {
  buildDir: './dist/',
  archiveDir: './archive/',

  // SCORM manifest configuration
  manifest: {
    version: '2004',                    // 2004||1.2
    courseId: COURSE_NAME + timestamp,
    SCOtitle: COURSE_NAME,              //'Intro Title',
    moduleTitle: COURSE_NAME,           //'Module Title',
    launchPage: 'index.html',
    fileName: 'imsmanifest.xml'
  },
};

gulp.task('manifest', (cb) => {
  pump([
    gulp.src(`${config.buildDir}/**`),
    manifest(config.manifest),
    gulp.dest(config.buildDir)
  ], cb)
});

gulp.task('zip', () => {
  gulp.src(`${config.buildDir}/**`)
    .pipe(zip(`${COURSE_NAME}-${timestamp}.zip`))
    .pipe(gulp.dest(config.archiveDir))
});
