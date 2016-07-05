package messages;

import java.util.ArrayList;

import ksh.main.models.ct.Message;
import ksh.main.models.ct.MessageAbridged;

public class MessageFromServer {
	private ArrayList<MessageAbridged> messages;
	
	public MessageFromServer(ArrayList<MessageAbridged> messages){
		this.messages = messages;
	}

	public ArrayList<MessageAbridged> getMessages() {
		return messages;
	}

	public void setMessages(ArrayList<MessageAbridged> messages) {
		this.messages = messages;
	}
}
