


import { useEffect } from "react"

import { Button, notification, Space } from 'antd';

function IndexContent() {
	const [api, contextHolder] = notification.useNotification();
	const copyContent = async (text) => {
		try {
			await navigator.clipboard.writeText(text);
			console.log('Content copied to clipboard');
		} catch (err) {
			console.error('Failed to copy: ', err);
		}
	}
	useEffect(() => {
		chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
			// console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
			const { action, data } = request || {}
			let result = '';
			if ( action === 'decoder-base64-tool') {
				result = base64Decode(data);
			} else if (action === 'decode-url-tool') {
				result = urlDecode(data);
			}
			const key = `open${Date.now()}`;
			const btn = (
				<Space>
					<Button type="primary" size="small" onClick={() => copyContent(result)}>
						Copy
					</Button>
				</Space>
			);
			if (result) {
				api.open({
					message: '',
					description: result,
					btn,
					key,
				});
			}
			sendResponse({ status: true})
		});
	}, [])
	return <>
		 {contextHolder}
	</>
}

function base64Decode(str) {
	return decodeURIComponent(atob(str).split('').map(function (c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));
}

function urlDecode(str) {
	return decodeURIComponent(str.replace(/\+/g, ' '));
}



export default IndexContent