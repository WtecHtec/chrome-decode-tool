

console.log('back groud js')
chrome.runtime.onInstalled.addListener(function () {
	const parent = chrome.contextMenus.create({
		title: 'Decoder',
		id: 'decoder',
		contexts: ['selection'],
	});


	chrome.contextMenus.create({
		id: 'decoder-base64-tool',
		title: 'Decode Base64',
		parentId: 'decoder', // 设置为顶级菜单项的ID来模拟父子关系  
		contexts: ['selection'],
	});

	chrome.contextMenus.create({
		id: 'decode-url-tool',
		title: 'Decode URL',
		parentId: 'decoder', // 设置为顶级菜单项的ID来模拟父子关系  
		contexts: ['selection'],
	});

});



chrome.contextMenus.onClicked.addListener(function (info, tab) {
	const { selectionText } = info
	switch (info.menuItemId) {
		case 'decode-url-tool':
		case 'decoder-base64-tool':
			chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
				// 向content.js发送消息
				chrome.tabs.sendMessage(tabs[0].id, { action: info.menuItemId, data: selectionText }, function (response) {
					console.log(response?.result);
				});
			});
			break;
		default:
			console.log('---')
	}
});

