const Fragment = Symbol()

const jsx = (tagName, { children = [], ...props }) => {
    if(!Array.isArray(children)) children = [ children ]
    return new Node({ tagName, children, props })
}

const jsxs = jsx;


class Node {
    constructor({ tagName, children, props}){
        this.tagName = tagName
        this.children = children
        this.props = props
    }
}
module.exports = { Fragment, jsx, jsxs, Node }