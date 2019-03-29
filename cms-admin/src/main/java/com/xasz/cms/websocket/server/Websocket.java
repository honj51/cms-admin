package com.xasz.cms.websocket.server;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

import javax.websocket.EndpointConfig;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint(value = "/websocket/{accountName}")
public class Websocket {

	// concurrent包的线程安全Set，用来存放每个客户端对应的MyWebSocket对象。若要实现服务端与单一客户端通信的话，可以使用Map来存放，其中Key可以为用户标识
	private static ConcurrentHashMap<String, Websocket> webSocketSet = new ConcurrentHashMap<String, Websocket>();
	// 与某个客户端的连接会话，需要通过它来给客户端发送数据
	private Session session;
	// 当前发消息的人员编号
	private String accountName = "";

	/**
	 * 连接建立成功调用的方法
	 *
	 * @param session 可选的参数。session为与某个客户端的连接会话，需要通过它来给客户端发送数据
	 */
	@OnOpen
	public void onOpen(@PathParam(value = "accountName") String param, Session session, EndpointConfig config) {
		accountName = param;// 接收到发送消息的人员编号
		this.session = session;
		webSocketSet.put(param, this);// 加入map中
	}

	/**
	 * 连接关闭调用的方法
	 */
	@OnClose
	public void onClose() {
		if (!accountName.equals("")) {
			webSocketSet.remove(accountName); // 从set中删除
		}
	}

	/**
	 * 给指定的人发送消息
	 * 
	 * @param message
	 */
	public void sendToUser(String accountName, String message) {
		try {
			if(webSocketSet.containsKey(accountName)){
				webSocketSet.get(accountName).sendMessage(message);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 发生错误时调用
	 *
	 * @param session
	 * @param error
	 */
	@OnError
	public void onError(Session session, Throwable error) {
		error.printStackTrace();
	}

	/**
	 * 这个方法与上面几个方法不一样。没有用注解，是根据自己需要添加的方法。
	 *
	 * @param message
	 * @throws IOException
	 */
	public void sendMessage(String message) throws IOException {
		this.session.getBasicRemote().sendText(message);
	}
}
