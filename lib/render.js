const { JSDOM } = require('jsdom')
const { Fragment, Node } = require('./jsx-runtime')
const { beautify } = require('./beautify')

module.exports.render = function(topNode){
    const dom = new JSDOM(`<!DOCTYPE html>`);
    const document = dom.window.document

    const renderNode = function(node){
        if(Array.isArray(node)) return node.reduce((nodes, node) => [...nodes, ...renderNode(node) ], [])
        if(typeof node === 'string') return [ node ]
        if(node.tagName === Fragment) return renderNode(node.children)
        if(!(node instanceof Node)) throw Error(`Tried to render invalid node ${node}`)
        
        const element = document.createElement(node.tagName)
        const { style, ...props } = node.props
        Object.assign(element.style, style)
        Object.assign(element, props)
        element.append(...node.children.reduce((nodes, node) => [...nodes, ...renderNode(node) ], []))
        return [element]
    }

    if(topNode.tagName === 'html'){
        let headNode = topNode.children.find( node => node.tagName === 'head')
        let bodyNode = topNode.children.find( node => node.tagName === 'body')
        document.head.append(...renderNode(headNode))
        document.body.append(...renderNode(bodyNode))
    } else {
        document.body.append(...renderNode(topNode))
    }

    return beautify(dom.serialize())
}  