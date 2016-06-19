package ksh.main.models.ct;

import java.util.ArrayList;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "CONVERSATIONS")
public class Conversation {
	String id;
	ArrayList<String> messages;
	
	public Conversation(String id, ArrayList<String> messages) {
		this.id = id;
		this.messages = messages;
	}

	@Id    
    @Column(name = "CONV_ID")
	public String getId() {
		return id;
	}
	
	@Column(name = "MSGS")
	public void setId(String id) {
		this.id = id;
	}
	public ArrayList<String> getMessages() {
		return messages;
	}
	public void setMessages(ArrayList<String> messages) {
		this.messages = messages;
	}	
}
