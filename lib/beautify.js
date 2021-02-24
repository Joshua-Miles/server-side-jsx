const posthtml =  require('posthtml');
const posthtmlBeautify =  require('posthtml-beautify');

module.exports.beautify = async function(html){
    const result =  await posthtml()
        .use(posthtmlBeautify({rules: {indent: 4}}))
        .process(html)

    return result.html
}