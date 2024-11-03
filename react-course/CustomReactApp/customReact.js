function customRender(reactElement, container){
    
    /*
    const domElement = document.createElement(reactElement.type)
    domElement.innerHTML = reactElement.children
    doc
    domElement.setAttribute('href', reactElement.props.href)
    domElement.setAttribute('target', reactElement.props.target)
    container.appendChild(domElement)
    */

    const domElement = document.createElement(reactElement.type)
    domElement.innerHTML = reactElement.children

    for (const prop in reactElement.props) {
        if (prop === 'continue') continue
        domElement.setAttribute(prop, reactElement.props[prop])
    }
    container.appendChild(domElement)


}

const reactElement = {
    type: "a",
    props: {
        href: "www.google.com",
        target: "_blank"
    },
    children: "click me to visit google"
}

const mainContainer = document.getElementById("root")

customRender(reactElement, mainContainer)