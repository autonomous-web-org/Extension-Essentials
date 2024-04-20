// 1: localstorage & 0: session storage

// stores data in chrome local/session storage
async function storeData(data, type = 1) {
    type
    ?
    await chrome.storage.local.set(data)
    :
    await chrome.storage.session.set(data)

    return data
}

// gets data from chrome local/session storage
async function getData(keys=null, type = 1) {
    let data = type
    ?
    await chrome.storage.local.get(keys)
    :
    await chrome.storage.session.get(keys)

    return data
}

// gets current opened tab info
async function getTabInfo(options={active:true, currentWindow:true}) {
    let tabs = await chrome.tabs.query(options);

    return tabs[0];
}

// sends message to content script
async function sendMsgToContent(data, tab = null) {
    tab = tab ?? await getTabInfo();
    await chrome.tabs.sendMessage(tab.id, data);
    
    return {data, tab}
}
