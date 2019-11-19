// app/controller/upload.js
const Controller = require('egg').Controller;

module.exports = class extends Controller {
  async stream() {
    const { ctx } = this;
    const parts = ctx.multipart();
    ctx.body = parts
    let part;
    while ((part = await parts()) != null) {
      if (part.length) {
        // arrays are busboy fields
        console.log('field: ' + part[0]);
        console.log('value: ' + part[1]);
        console.log('valueTruncated: ' + part[2]);
        console.log('fieldnameTruncated: ' + part[3]);
      } else {
        if (!part.filename) {
          // user click `upload` before choose a file,
          // `part` will be file stream, but `part.filename` is empty
          // must handler this, such as log error.
          continue;
        }
        // otherwise, it's a stream
        console.log('field: ' + part.fieldname);
        console.log('filename: ' + part.filename);
        console.log('encoding: ' + part.encoding);
        console.log('mime: ' + part.mime);
        const result = await ctx.oss.put('egg-multipart-test/' + part.filename, part);
        console.log(result);
      }
    }
    console.log('and we are done parsing the form!');
  }
};