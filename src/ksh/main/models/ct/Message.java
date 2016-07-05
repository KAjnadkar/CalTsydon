package ksh.main.models.ct;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "MESSAGES")
public class Message {
	
	String convId;
	
	@Id @GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	
	String message;
	
	Long timestamp;
	
	public Message(){
		this.convId = "";
		this.message = "";
		this.timestamp = -1L;
	}

	public Message(String conversationId, String message, Long timestamp) {
		this.convId = conversationId;		
		this.message = message;
		this.timestamp = timestamp;		
	}
		
	public String getConv_id() {
		return convId;
	}
	public void setConv_id(String conv_id) {
		this.convId = conv_id;
	}
	
	public String getMessage() {
		return message;
	}
	
	public void setMessage(String message) {
		this.message = message;
	}
	
	public Long getTimestamp() {
		return timestamp;
	}
	
	public void setTimestamp(Long timestamp) {
		this.timestamp = timestamp;
	}	
	
	public String toString(){
		return (new String(this.convId + ">>>" + this.message));
	}
}
