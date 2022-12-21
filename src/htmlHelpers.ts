const createElementWithChildren = ( children: Array<HTMLElement> = [], className ='',type='div'): HTMLElement =>{
    const newElement = document.createElement(type)
    if(className) newElement.className = className;
    children.forEach(child=>{
        newElement.appendChild(child)
    })
    return  newElement;
}

const createElementWithInnerText = (textContent: string, tag: string = 'span', id: string|undefined = undefined, className: string|undefined = undefined): HTMLElement => {
    return Object.assign(document.createElement(tag), {className, textContent, id})
}

const createElementWithLabel = (textContent: string, element:HTMLElement): HTMLElement=> {
    return createElementWithChildren([
        createElementWithInnerText(textContent, 'span', "input-label"),
        element
    ], "input-with-label")
}

const attachStyleToSheet = (styles: string): void => {
    const styleSheet = document.createElement("style")
    styleSheet.innerText = styles
    document.head.appendChild(styleSheet);
}

export {createElementWithChildren, createElementWithLabel, attachStyleToSheet, createElementWithInnerText}