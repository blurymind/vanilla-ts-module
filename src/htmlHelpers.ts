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

// This is a bit inspired by how flutter does dom, although pretty primitive
interface DomObject {
    type?: string;
    children?: Array<DomObject>; //children is a list of dom components - function calls itself in that case
    className?: string;
    css?: string;
    innerText?: string;
    label?: string;
    element?: HTMLElement;// just pass an element instead of creating one
    events?: {[eventKey: string]: (p?: any)=>void };
    style?: { [styleKey: string]: string|null }
    id?: string
}
const createDomTreeFromObject = (data: DomObject, parent: HTMLElement, style: string = "") => {
    let element = data.element ?? document.createElement(data.type ?? 'div');

    if(data.innerText) {
        element.innerText = data.innerText;
    }
    if(data.label) {
        element = createElementWithLabel(data.label, element);
    }
    if(data.className) element.className = data.className;
    if(data.events){
      Object.entries(data.events).forEach(([eventKey,callback])=>{
          element.addEventListener(eventKey, callback);
      })
    }
    if(data.style){
        Object.entries(data.style).forEach(([styleKey,style])=>{
            element.style.setProperty(styleKey, style);
        })
    }
    if(data.id) element.id = data.id;
    if(data.children){
        data.children.forEach(child=>{
            createDomTreeFromObject(child, element)
        })
    }
    parent.appendChild(element);

    if(style){
        attachStyleToSheet(style);
    }

}

export {createElementWithChildren, createElementWithLabel, attachStyleToSheet, createElementWithInnerText, createDomTreeFromObject}