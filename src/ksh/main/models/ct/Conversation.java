package ksh.main.models.ct;

import java.util.ArrayList;
import java.util.LinkedList;

public class Conversation {
    public String topic;
	public LinkedList<Message> messages;
	public Conversation(String topic) {
	    this.topic = topic;
		this.messages = new LinkedList<>();
	}

	public String toString(){
	    StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append(this.topic + "\n");
	    this.messages.forEach(x -> {
	        stringBuilder.append("\t\t" + x.toString() + "\n");
        });
        return stringBuilder.toString();
    }
}
