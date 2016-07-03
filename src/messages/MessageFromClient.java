package messages;

public class MessageFromClient {
	
	private String messageType;
	private String message;
	private String conversationId;

	public String getConversationId() {
		return conversationId;
	}

	public void setConversationId(String conversationId) {
		this.conversationId = conversationId;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public String getMessageType() {
		return messageType;
	}

	public void setMessageType(String messageType) {
		this.messageType = messageType;
	}
	
	public String toString(){
		return new String(this.conversationId + ">>>" + this.messageType + ">>>" + this.message);
	}
}
