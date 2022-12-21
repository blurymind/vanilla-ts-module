const LOCAL_STORAGE_NAME = document.title + "_localStorage"

const getStore = () => JSON.parse(localStorage?.getItem(LOCAL_STORAGE_NAME)?? "{}") || {};
const storeSetValue = (key: string, value: any, spreadValue = true) => {
    try{
        const spreadPrev = spreadValue && typeof getStore()[key]?.value != null && typeof getStore()[key]?.value === "object";
        const newValue = {...getStore(), [key]: {value: spreadPrev? {...(getStore()[key]?.value ?? {}), ...(value ?? {}) } : value }}
        // console.log({spreadPrev, newValue, store: getStore()})
        localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(
            newValue
        ));
        // updateStorageIndicator();
    } catch(e){
        console.error(e)
    }
}

const storeGetValue = (storeId: string, failValue:any,valueKey = ""): any =>{
    console.log("get store val", {store: getStore()})
    if(valueKey == "") return getStore()[storeId]?.value ?? failValue;
    return getStore()[storeId]?.value[valueKey] ?? failValue;
}

export {storeSetValue,storeGetValue}