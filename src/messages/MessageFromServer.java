package messages;

import java.util.ArrayList;

//import ksh.main.models.ct.Message;
import ksh.main.models.ct.MessageAbridged;

public class MessageFromServer {
	private ArrayList<MessageAbridged> messages;
	private String type;
	private String message;
	
	public MessageFromServer(String type, ArrayList<MessageAbridged> messages, String message){
		this.type = type;
		this.messages = messages;
		this.message = message;
	}

	public ArrayList<MessageAbridged> getMessages() {
		return messages;
	}

	public void setMessages(ArrayList<MessageAbridged> messages) {
		this.messages = messages;
	}
	
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}	
}
