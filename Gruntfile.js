const path = require('path');
module.exports = function gruntfile(grunt) {
  grunt.registerTask('readdir', function() {
    let files = grunt.file.expand('**/*.pdf');
    files = files.map(filePath => {
      return {
        filename: path.basename(filePath),
        filePath
      };
    });
    grunt.config('files', files);
  });
  grunt.registerTask('mkreadme', function() {
    let tmpl = grunt.file.read('readme-template.md');
    const files = grunt.config('files');
    files.forEach(file => {
      tmpl += '[' + file.filename + '](' + file.filePath + ')  \n';
    });
    grunt.file.write('readme.md', tmpl);
  });
  grunt.registerTask('default', function() {
    grunt.task.run(['readdir', 'mkreadme']);
  });
};
