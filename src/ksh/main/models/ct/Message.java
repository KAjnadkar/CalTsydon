package ksh.main.models.ct;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.CascadeType;

@Entity
@Table(name = "MESSAGES")
public class Message {

	String convId;
	
	@Id
	@Column(name = "msg_id")
	String id;
	
	String message;	
	
	Long timestamp;

	public Message(String conversationId, String messageId, String message, Long timestamp) {
		this.convId = conversationId;
		this.id = messageId;
		this.message = message;
		this.timestamp = timestamp;		
	}
		
	public String getConv_id() {
		return convId;
	}
	public void setConv_id(String conv_id) {
		this.convId = conv_id;
	}

	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
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
}
